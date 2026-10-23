# CLAUDE.md — britive-design-system (BDS)

React 19 component library for Britive, developed in Storybook and shipped as Babel-transpiled
`core/` output. No TypeScript. No CSS-in-JS — plain SCSS compiled per component.

## Commands

| Task | Command |
|------|---------|
| Storybook dev server (port 6006) | `npm start` |
| Build the publishable library | `npm run build` |
| Build static Storybook | `npm run build-storybook` |
| Tests (single run / watch) | `npm test` / `npm run test:watch` |
| Lint / autofix | `npm run lint` / `npm run lint:fix` |

`npm run build` must be run from the repo root — the SCSS Babel plugin resolves load paths via
`process.env.PWD`.

**Pre-existing test failures:** 5 tests fail on a clean checkout (4 in `tooltip.test.jsx` for
positioning, 1 in `table.test.jsx` for sort icons). Expect `Test Files 2 failed | 46 passed`.
Don't chase these; verify against a stash before assuming you caused a failure.

## Architecture

```
src/
  components/<name>/     one folder per component; index.js barrel at src/components/index.js
  global-style/          getRem(), color palettes, theme.scss, tokens/
  utils/                 renderSvgGraphic, resolve-portal-data-theme, common-portal/
  assets/icons/          product SVGs (imported with ?react)
  story-assets/          story-only icons + story-theme.jsx theme helpers
.storybook/              main.js, preview.jsx (theme toolbar), preview.scss
```

**Build pipeline:** Babel transpiles `src/components` → `core/components` and `src/utils` →
`core/utils`; gulp copies `src/assets` → `core/assets`. Stories and tests are excluded.

**`babel-plugin-transform-scss-modern.cjs` is the unusual part:** it compiles each
`import './x.scss'` with `sass` at build time and replaces the import with code that injects a
`<style data-sass-component="...">` tag into `document.head` at runtime. Consequences:

- Every component's SCSS is compiled independently, so each file must `@use` what it needs.
- CSS order follows import order — components that borrow another's tokens (e.g. `pill-input`
  using `--bds-textfield-*`) depend on it.
- `src/global-style/theme.scss` is imported only by `.storybook/preview.scss`, so **consuming
  apps must import it themselves** — or independently declare the same `--theme-*` variable
  names on `:root`/`<html>`, since that's all component SCSS actually resolves against (`var(--theme-*, …)`
  fallback chains). `ui-tenant-portal` takes this second path: it never imports this file and instead
  reimplements the same variable set from scratch in its own CSS. There is nothing that keeps the two
  in sync — renaming or removing a `--theme-*` var here silently breaks theming in any consumer that
  took that path, with no build-time signal.
- Two known consumers depend on the token work described below: `ui-tenant-portal` and
  `secmgr-frontend-ui` (which is itself consumed by `ui-tenant-portal`), so a change here reaches
  both apps.

**Barrel caveat:** `src/components/index.js` imports `./accordion/index.js` while the source
file is `index.jsx`. It resolves only after Babel emits `.js`, i.e. the barrel is valid for
`core/`, not for source. Inside `src/`, stories and tests import components directly.

## Component conventions

Per folder: `index.js(x)` (thin default re-export), `<name>.jsx`, `<name>.scss`,
`constants.js`, `<name>.stories.jsx`, `<name>.test.jsx`. Optional `utils.js`, nested
`components/`.

- Function components with destructured props and **destructuring defaults**
  (`disabled = false`); `defaultProps` is not used.
- `PropTypes` assigned at the bottom of the file. Most components have them; when editing a
  component that does, keep them complete — new props are routinely forgotten here.
- **Class names come from `constants.js`**, not inline strings:
  `export const classes = { iconWrapper: 'icon-wrapper' }`. A few components use other export
  names (`TreeNodeClasses`, `queryBuilderClasses`, `UploadFormClasses`).
- Compose classes with `classnames` object syntax, not template literals — `${cond && cls}`
  emits the string `"false"` into `className`:

```jsx
// BAD: renders class="icon-wrapper false"
className={`${classes.iconWrapper} ${disabled && classes.disableMenu}`}
// GOOD
className={classNames(classes.iconWrapper, { [classes.disableMenu]: disabled })}
```

- CSS prefix is `bds-` with BEM-ish modifiers (`bds-btn--primary`, `bds-btn__content`). Older
  components use unprefixed component-scoped names (`tree-view-node-*`, `typography-*`).
- Naming is inconsistent across folders (kebab-case, camelCase, and PascalCase all appear).
  Follow whatever the folder you're editing already does.

### SCSS

`@use '../../global-style/index.scss' as global-style;` then `global-style.getRem(16px)` for
px→rem. Declare `$variables` at the top of the file, then use them in rules.

Nest with `&` rather than repeating a prefix across flat selectors — `.bds-x { &__part { … } }`,
and the same for the `theme-tab-*` style names in consuming apps.

**Factor repeated declarations into a `@mixin`.** Both when a set is shared across selectors — a
mixin, not a grouped selector list, so each rule stays inside its own nest — and when the same set
simply recurs in three or more rules, or recurs differing only by one value, which takes an argument
(`@mixin stack($gap)`). A mechanical way to check a refactor changed nothing: compile before and
after with `npx sass` and diff the output.

Tokens under `src/global-style/tokens/`: `colors.scss` (`$neutral-*`, `$tint-primary-*`, `$feedback-*`),
`spacing.scss`, `type.scss`, `radius.scss`, `elevations.scss`. `global-style/color.scss` holds
the legacy `$gray-*` palette.

### Icons

SVGs import as components via `vite-plugin-svgr`: `import Icon from '.../x.svg?react'`. SVGR is
configured to rewrite `#161616` and `#393939` to `currentColor`, which is what makes icons
themeable — **new SVG assets should use those hex values or `currentColor` directly**, never
other hardcoded colors. `renderSvgGraphic(graphic, props)` (`src/utils/renderSvgGraphic.jsx`)
normalizes an icon prop that may be a `?react` component, a React element, or a URL string.
`react-icons` is used for chevrons, close buttons, and story demos across ~24 existing
components; `defaultIconSize = 24` is the convention in `constants.js`.

**Prefer an asset from `src/assets/icons/` over `react-icons` in new code.** Consumers have asked
for SVG assets specifically — `react-icons` glyphs are a second visual language and don't match
the product set. `fileUploadV2` is the current example: `close-x.svg?react`,
`upload-cloud.svg?react`, `delete.svg?react` and `maximize.svg?react`, no `react-icons` import.
Existing components keep theirs; don't sweep them.

`delete.svg` and `maximize.svg` carry `currentColor` literally rather than one of the two hexes
SVGR rewrites, because consuming apps configure their own SVGR and none of them is guaranteed to
carry the same `replaceAttrValues` map. A stroke-only glyph also needs an explicit `fill="none"`
on the path: `fill` is an inherited SVG property, so `sanitize.css`'s `svg { fill: currentColor }`
in `ui-tenant-portal` would otherwise paint the outline solid.

## Theming

Source of truth: `src/global-style/theme.scss`. Three layers, each derived from the one above:

1. **Base surface vars** — `--theme-content-bg` and `--theme-text-primary`. A custom theme
   overrides *only* these two.
2. **Derived `--theme-*`** — computed from the base pair with `color-mix`:
   `--theme-hover-bg` 13%, `--theme-border-subtle` 13%, `--theme-separator` 25%,
   `--theme-border` 37%, `--theme-border-strong` 62%, `--theme-text-secondary` 62%,
   `--theme-text-placeholder` 55%.
3. **Component `--bds-*`** — named `--bds-<component>-<part>[-<state>]`, e.g.
   `--bds-menu-option-label-disabled`, `--bds-checkbox-fill-hover`.

### The three-block convention

Every component declares its tokens in exactly these blocks, then uses only `var(--bds-*)` in
rules. Never put a raw color in a rule.

```scss
:root {
  // Custom-theme / unthemed default: derive from surface vars
  --bds-menu-option-hover-bg: var(--theme-hover-bg);
  --bds-menu-option-label-disabled: var(--theme-text-placeholder);
}

[data-theme='light'] {
  // Preserve the original light values exactly — light must not change
  --bds-menu-option-hover-bg: #{tokens.$neutral-5};
  --bds-menu-option-label-disabled: #{tokens.$neutral-40};
}

[data-theme='dark'] {
  --bds-menu-option-hover-bg: #{tokens.$neutral-60};
  --bds-menu-option-label-disabled: #{tokens.$neutral-60};
}
```

A `[data-theme='light']` block may be partial (only brand tokens), letting `:root` supply the
structural ones — see `src/components/checkbox/checkbox.scss` for the canonical example.

Palette variables (`$gray-*` from `global-style/color.scss`; `$neutral-*`, `$tint-primary-*`,
`$feedback-*` from `global-style/tokens/colors.scss`) belong **only** inside the light/dark
blocks, never in a rule.

### Rules to follow

- **Brand/accent colors stay pinned in all three blocks.** They signal meaning (a match, an
  error), so they must not dissolve into a custom surface. Structural colors derive.
- **Express disabled/muted with color tokens, not `opacity`.** Opacity stacks with an
  already-muted token and can render text unreadable on dark and custom surfaces.
- **If light mode set no color on an element, use `inherit` as the light token value** so light
  stays pixel-identical instead of getting pinned to a border token.
- **Delete `[data-theme='dark']` selector override blocks** once the values live in tokens.
- Converting a component means replacing hardcoded colors, not restyling. Preserve light exactly.

### Applying a theme

- Light/dark: `data-theme="light" | "dark"`.
- Custom: override the two base vars on `:root`/`<html>` and set **no** `data-theme`.

That two-var story is how Storybook works and how the layering is *designed*, but it is not what the
product does at runtime, and the difference decides whether a new token works outside Storybook. In
the tenant app a custom theme is an admin record (General Settings → Theme in `secmgr-frontend-ui`),
and `secmgr-frontend-ui/src/utils/customTheme.js` — which `ui-tenant-portal` imports as
`secret-manager-ui/core/utils/customTheme` — resolves that record into **every** `--theme-*` value as
a precomputed hex and sets them inline on `<html>`, along with `data-custom-theme="true"`. It does not
set the two base vars and let `color-mix` do the rest, for the same reason the layering warning above
gives: a `var()` inside a custom property resolves where it is declared, and inline base vars would
leave the derived block blending `:root`'s pair rather than the theme's.

So `theme.scss` derives the tokens for Storybook and for any consumer that imports it, while the
product derives them in JS. **Adding a `--theme-*` var to `theme.scss` therefore only half-lands** —
it works in every story and is `undefined` in the tenant app until `resolveThemeVars` supplies it too.
Nothing enforces the pairing; to check it, diff the two var sets:

```sh
rg -o '^\s*(--theme-[a-z-]+):' -r '$1' src/global-style/theme.scss | sort -u
rg -o "'(--theme-[a-z-]+)'" -r '$1' ../secmgr-frontend-ui/src/utils/customTheme.js | sort -u
```

The runtime side is currently a superset (it also carries the app's chrome zones — `--theme-nav-bg`,
`--theme-topbar-*`, `--theme-nav-pill-bg`, `--icon-color-disabled` — which no BDS component reads).
`--bds-*` tokens are unaffected: they are declared in component SCSS and resolve against whatever
`--theme-*` is in scope, which is the whole point of the indirection.

**A custom theme only works at the document root.** `var()` inside a custom property resolves
at the element that *declares* it, so a subtree that overrides the base vars inherits values
already resolved against `:root` and the override has no effect. A custom theme sets no
`data-theme`, so no selector can re-declare the tokens deeper.

A nested preset theme (`<div data-theme="dark">` inside a light page) *does* work, but only
because the tokens are re-declared for that element. Two mechanisms keep that true, and both
matter when adding tokens:

- The derived `--theme-*` block in `theme.scss` is declared for `:root, [data-theme]`.
- Each component's tokens are re-declared in its `[data-theme='dark']` block. Where a dark block
  intentionally overrides only *some* tokens (`checkbox`, `radio` override brand but not
  structural), that component's default block is declared for `:root, [data-theme]` instead.

So when you add a token: either declare it in all three blocks, or — if the light/dark blocks
don't repeat it — make sure the default block's selector is `:root, [data-theme]`.

### Portaled overlays

Menus, dropdowns, dialogs and modals mount on `document.body`, outside any themed wrapper, so
they do not inherit the theme from their trigger. Use the helpers in
`src/utils/resolve-portal-data-theme.js`:

- `mountPortalRootWithThemeSync(portalEl, themeSourceRef)` — appends the host, mirrors
  `data-theme` from the trigger (then `<html>`), keeps it in sync via `MutationObserver`, and
  returns a cleanup function. Prefer this over mounting by hand.
- `resolvePortalDataTheme(anchorEl)` returns `null` when no `data-theme` exists anywhere, which
  is what a custom theme needs. Never pass that result straight to `setAttribute` — it writes
  the literal string `"null"`. The helper removes the attribute instead.

Portal roots must also set `color`, because `currentColor` icons would otherwise inherit the
host application's `body` color rather than the theme:

```scss
.bds-menu-options-portal {
  background-color: var(--bds-menu-options-bg);
  color: var(--bds-menu-option-label);
}
```

Pass `themeSourceRef` (a ref to the trigger) whenever rendering `MenuOptions`.

### Consumer escape hatches

Props like `tagIconClassName` let apps inject arbitrary classes onto icons. Give the element a
themed token so it looks correct by default, and do not rely on consumers passing colors.

`fileUploadV2`'s `file` prop is documented as a `File` but only ever reads `file.name`, so consumers
render an already-uploaded asset (which they hold as a URL) by passing a `{ name }` shim —
`secmgr-frontend-ui`'s theme tab does exactly this. Don't tighten that prop to require a real
`File`. The thumbnail comes from a separate `previewUrl` prop for exactly that reason: a shim has
no bytes to draw. For a real `File` the component reads the bytes itself and prefers the result over
`previewUrl`, which still points at the asset being replaced. An image that fails to load falls back
to the filename-only row, so a deleted or expired asset URL doesn't leave a broken-image glyph.

`showFileName={false}` drops that filename row entirely, which is how the branding tab renders its
brand assets — a logo is recognised by its thumbnail. The row then carries only the thumbnail and
the two actions, and the enlarge action becomes the only way to read what the asset actually is,
so it is deliberately **not** gated on `disabled`: a read-only form still has to let the asset be
inspected. Only the delete control mutes, which is why the disabled dropzone block re-declares
`color` on `__actions` instead of letting the muting cascade into both icons.

The enlarge action opens `components/FilePreview.jsx`, a portaled lightbox titled with the field's
`label`. It reuses whatever `src` the row is already showing, so the CSP note below covers it too.

**Preview a picked `File` as a `data:` URL, never `URL.createObjectURL`.** Deployed tenants serve a
Content-Security-Policy whose `img-src` allows `self data: https://*.britive-app.com:*` — a `blob:`
URL is blocked outright and the thumbnail renders broken, with nothing failing locally to warn you.
The CSP is set by the platform, not by any of these repos, so there is no build-time signal. Reading
is async, so tests must `await findBy*` rather than assert on the first render.

### Migration status

21 SCSS files declare `--bds-*` tokens. 23 others still carry only a `[data-theme='dark']`
override block with hardcoded colors at base level and are **not** custom-theme safe:
`accordion`, `backToTop`, `buttonGroup`, `card`, `dialog`, `elevations`, `FileViewer`,
`FileUpload`, `flexibleMenu`, `modal-popup`, `multiTextfield`, `notificationCard`,
`ProgressBar`, `query-builder`, `search`, `sidebar`, `simple-sidebar`,
`snackbar`, `spinner`, `tabs`, `tooltip`, `tree/treeNode`, `vertical-tabs`.

There is no stylelint rule enforcing any of this — it is convention only. A quick audit:
`rg -l '^\s*--bds-' src --glob '*.scss'` versus `rg -l '\[data-theme' src --glob '*.scss'`.
`table.scss` now follows the three-block convention throughout (a from-scratch migration on this
branch, not inherited from `develop`) — see Table Component below.

## Table Component

`src/components/table/` is the standard, reusable table — use it instead of hand-building table
markup unless there's a documented reason the interaction model doesn't fit. It's split across
`table.jsx` (orchestrator), `hooks/useColumnState.js` (column order/visibility/pin state), and
`components/{TableGrid,TableHeader,TableHeaderCell,TableRow,TableCell,ActionColumnCell,ColumnSettingsDrawer}.jsx`.
`TableGrid` owns the `<table>`/`<TableHeader>`/`<tbody>` shell and the `dnd-kit` wrapping shared by
the draggable and non-draggable cases; `table.jsx` no longer renders a `<table>` itself.

**Column definition** — each entry in the `columns` array: `field`, `headerName`, `renderColumn(row,
value, index)`, `renderHeader()`, `sortable`, `width`, `horizontalAlignment`, `allowExpand`,
`onExpand`, `showFilter` + `filter.{options,onApply,singleSelector,onSearch,selectedFilters}`,
`isActions`, `actions`, `collapsedWidth`, `actionsMenuWidth`, `isCompact`, `rowIcon(row)`.

**Row selection** — `allowCheckbox` adds a checkbox column; `allowSelectAll` (default `true`) adds
a header select-all checkbox; `checkedRows` + `onCheckboxChange` carry the controlled checked-row
list, matched by reference (`===`), not value — two rows with identical data are still distinct
row instances in `rows`, so value-equality would check/uncheck every row sharing that data at
once; `bulkActions` (`{ options: [{ label, value, onClick(rows) }] }`) renders a toolbar dropdown
acting on `actionableCheckedRows` — `activeCheckedRows` filtered against `isCheckboxDisabled`, not
the raw checked list — wrapped in a `Tooltip` (`bulkActionsDisabledTooltipText`) that only shows a
message while it's disabled (`actionableCheckedRows.length === 0`) — `Select` has a fixed prop list
with no `...rest` passthrough, so `Tooltip`'s `cloneElement`, which injects
`onMouseOver`/`onMouseLeave` onto its single child, would attach them to props `Select` silently
ignores; the actual child is a plain wrapping `<div>` around `Select` instead, so hover fires
regardless of `Select`'s own disabled state. The filter matters because `isCheckboxDisabled` is
normally derived from row status, so the common case is a row getting checked and *then* starting
to read as disabled, not the other way round — select-all/clear-all already exclude such a row
from the set they produce, but nothing else retroactively drops it from `checkedRows` (that's
consumer-owned state, not table.jsx's to mutate mid-render), so without this filter a bulk action's
`onClick` could still receive a row whose checkbox is currently disabled, and the dropdown could
read "enabled" on the strength of that one uncontrollable row alone. `isCheckboxDisabled(row)` disables one row's own checkbox
(a native `disabled` `<input>`, so a real click on it is already a no-op — nothing extra needed
there) and excludes it from both `handleCheckAll`'s select-all/clear-all set and the
`allRowsChecked`/`someRowsChecked` count the header checkbox reads: without that second half, a
row that's permanently disabled-and-unchecked would keep the header stuck at "some checked"
forever, even once every row a user can actually act on is checked. `table.jsx` resolves the
consumer's predicate exactly once per row per render into `checkboxDisabledByRow` (a `Map` keyed
by row reference, mirroring how checked-row membership is already tracked), rather than calling it
again for `selectableRowList`, `actionableCheckedRows`, and each row's own checkbox — `TableGrid.jsx`
receives that map (not the function) and does a plain `.get(row)` lookup, resolving it into a
per-row `disableCheckbox` boolean — deliberately renamed from the function prop it's derived from,
since a reader hitting `isCheckboxDisabled` lower in the tree (e.g. `TableCell.jsx`) would
reasonably expect a function there too, not the boolean it already produced — and threads that
through `TableRow.jsx`/`SortableTableRow.jsx` → `RenderTableRow.jsx` → `TableCell.jsx`, the same
path `isChecked` already takes. This is separate from
`allowRowSelect`/`onRowSelect`/
`highlightedRow`, which is click-to-highlight, not multi-select. `leftToolbarContent` (a node)
renders before bulk actions/search in the same toolbar row, for a consumer's own custom control.

**Row identity** — `getRowId(row, index)` is optional and controls the React `key` (via
`TableGrid`) for each `<tr>`; it falls back to `index` when omitted, matching the table's
long-standing default behavior. Without a stable identity, sorting/filtering/reordering rows
leaves each row's component instance sitting at its position instead of following its data, so
any state living inside `TableRow`/`TableCell` (e.g. the More/Less clamp-toggle's expanded state)
sticks to the position rather than the row that had it. Pass `getRowId` whenever rows can reorder
across renders and per-row UI state matters. `dnd-kit`'s own sortable item ids (`useSortable`,
`SortableContext`) stay index-based regardless — that's a separate, already-correct mechanism for
computing `onDragEnd`'s `{ source: { index }, destination: { index } }`, not a row-identity concern.
`expandedRows` (row expand/collapse state) is keyed the same way: `TableGrid` computes the same
`getRowId(row, index)` value as `rowId` and threads it down through `TableRow`/`TableCell` for
expand-tracking specifically, separate from the plain numeric `index` still passed to
`renderColumn(row, value, index)` and other index-based uses — without it, a row's expanded state
would stay pinned to a position across a reorder even though its `<tr>` DOM node (keyed by the same
`getRowId`) correctly follows the row.

**Actions column** — set `isActions: true` to mark a column as *the* action column.
`useColumnState`'s `computeKeyFlags` force-pins it `pinned: 'right'` and locks it against hide/
unpin — never hand-roll sticky-right positioning or a hide/pin toggle for it. Populate
`actions: [{ name, icon, tooltip, onClick(row) }]`; these render as inline icon buttons when there's
room and collapse into a `⋮` `OverflowMenu` (`ActionColumnCell.jsx`) once toggled to its collapsed
width (`collapsedWidth`, default `compactColumnWidth`, 32px) via the header chevron — collapse
state lives in `table.jsx` and is passed down through `onToggleActionColumn`. `TableHeaderCell.jsx`
floors the expanded column's `min-width` at its own declared `width` when the consumer set one,
falling back to `actionColumnMinWidth` (75px) otherwise — never a value smaller than the declared
width. See "Pinned columns can be squeezed below their declared width" below for why that matters:
this is the same fix, applied to the one column that's always pinned. `actionsMenuWidth` (a CSS
width string, e.g. `'250px'`) sets the width of that collapsed `⋮` dropdown itself — passed through
`RenderTableRow.jsx` → `TableCell.jsx` → `ActionColumnCell.jsx`'s `OverflowMenu`, defaulting to
`200px` (the prior hardcoded value) when unset.

An action may carry `button: { variant, size, disabled }`, which makes the **expanded** column
render it as a full labelled `Button` (icon + `name`) instead of a bare icon button — for screens
whose row action is a primary call to action (Check Out, Request) rather than one of a row of icon
controls. `size` defaults to `'medium'` and `variant` to `'primary'`. The collapsed `⋮` menu is
unaffected and still shows the same icon and name, which is the point of expressing these as actions
rather than a `renderColumn`. The `Button` is wrapped in a plain `<div>` when it has a `tooltip`,
for the same reason the bulk-actions `Select` is: `Tooltip`'s `cloneElement` injects hover handlers
onto its single child, and `Button` has a fixed prop list with no `...rest`. `button.disabled`
only stops the inline Button — the collapsed menu has no disabled state — so an action that can be
blocked must also guard its own `onClick`.

`actionsDirection: 'column'` stacks a row's controls vertically instead of in a line, and stretches
them to a shared width so two different labels don't render two different button widths. My Access
uses it: a profile row carries one action per enabled access type, which read as a stacked pair
before the column was an action column.

`actions` also accepts a function of the row (`actions: row => [...]`), resolved in `TableCell.jsx`
— the one place with `row` in scope that both the expanded and collapsed branches read from, so both
honor it. That's how anything row-dependent is expressed: an `icon`, `tooltip` or `name` that
follows the row, or an action omitted from a row's array entirely because it doesn't apply there.
There is **no `disabled` field** on an action — nothing reads one — so an inapplicable action is
omitted rather than greyed out, or its `icon` carries the muted styling itself. An action's
`tooltip` renders through the `Tooltip` component (portaled, so the table's `overflow: auto` and
the column's sticky positioning don't clip it), opening leftward since the column is pinned right
— not as a native `title`, which read as a slow unstyled OS tooltip next to the styled ones the
rest of the table uses. Prefer this over reaching for `renderColumn` on an action column:
`renderColumn` is row-aware but `TableCell`'s collapsed branch returns before the render path and
ignores it, so the `⋮` menu silently loses whatever it expressed.

**Column resizing** — enabled by `resizableColumns`. The resizer handle (`TableHeaderCell.jsx`)
drives the drag via Pointer Events with `setPointerCapture`, not document-level mouse listeners:
`pointerdown` captures the pointer on the resizer element itself, which then keeps receiving
`pointermove`/`pointerup`/`pointercancel` regardless of where the cursor ends up — outside the
browser window, through a context menu, even if the tab loses focus — so cleanup always runs.
`resizeHandler` (`TableHeader.jsx`) captures the drag's starting cursor position and both columns'
starting widths once per drag (`resizeStartRef`, keyed by column `index` so a second drag that
starts before a stale ref would be cleared re-captures instead of reusing the wrong column's
anchor), then computes each frame's delta arithmetically from that anchor rather than re-measuring
`getBoundingClientRect()` every frame. It mutates `currentColumn`/`adjacentColumn` widths directly
via `element.style.width` **in px, not %** — a % width is relative to the table's own width, and
under `table-layout: fixed` any slack a column's `min-width` frees up gets redistributed across
every other %-width column with room to grow, so dragging one handle visibly resized columns having
nothing to do with that drag (this was a real, verified bug). Fixed px widths carry no such
relationship, so a drag only ever touches the two columns actually being dragged. `resizeHelper`
clamps the drag so neither column crosses `columnMinWidth` (96px) rather than rejecting the whole
gesture once a neighbor is already narrow. `columnMaxWidth` (264px) additionally caps *growth*,
but only for a column that starts below it — `currentColumn` can't grow past it in that case, on
top of the pre-existing floor bound from the adjacent column shrinking. A column that starts at or
past the cap (routine for percentage-width columns at ordinary table widths — a 50%-wide column in
a 1200px table is already 600px) grows unbounded by `columnMaxWidth`, capped only by the adjacent
column's own floor; otherwise `columnMaxWidth - startCurrentWidth` goes negative, zeroing growth
and permanently deadlocking that handle's rightward drag. Shrinking is never capped by
`columnMaxWidth` either, only by `columnMinWidth`, even though it grows the adjacent column by the
same amount — capping shrink the same way would deadlock a handle any time a neighbor's declared
width already exceeds `columnMaxWidth`.
`columnMinWidth` is also the CSS `min-width` on every `<th>` (React auto-suffixes the numeric
style value with `px`), except compact or collapsed-action columns, where it's `0`. There is no
equivalent CSS `max-width` on `<th>` — `columnMaxWidth` only bounds the resize *drag*, so a
consumer's own declared `column.width` can still exceed it. The default header label
(`.bds-table-header-text-label`) truncates with an ellipsis when the column is too narrow for it,
independent of this clamp — `.bds-table-header-text-icon`'s `contain: inline-size` (`table.scss`)
is what makes that hold even under `table-layout: fixed`, which otherwise floors a `<th>`'s width
at its content's min-content size (a real, verified bug: a long `white-space: nowrap` label could
make a column's resize handle refuse to shrink past that size at all, no matter `columnMinWidth`).
A custom `renderHeader()` bypasses `.bds-table-header-text-icon` entirely — it replaces that
wrapper rather than rendering inside it — so it gets neither the ellipsis nor the containment fix;
a `renderHeader` that renders long `nowrap` text can reproduce the same stuck-resize bug and is
responsible for its own overflow handling, the same way a custom `renderColumn` is for body cells.

**Unpinned columns don't shrink with the viewport.** `TableHeader.jsx`'s `lockUnpinnedColumnWidths`
converts every unpinned column's rendered width into a fixed px `width` + `min-width` (replacing
whatever %/auto width it started with) the moment the column set settles, so a later
container/viewport shrink can't squeeze a column narrower than what was first measured —
`table-layout: fixed` instead lets the `<table>` overflow `.bds-table-scroll-wrapper` (already
`overflow: auto`), producing a horizontal scrollbar in place of shrinking columns. This only runs
once per `stickySignature` (a `lockedSignatureRef` guard), not on every call: it's invoked both from
a mount-time `useLayoutEffect` and from the table's `ResizeObserver` callback, because `tableNode`'s
ref isn't reliably attached yet on that first effect pass in every mount sequence (the same race
`syncStickyOffsets` already lived with, self-healing only because a `ResizeObserver` fires an
initial callback once the browser guarantees the element is really there) — without the
`ResizeObserver` as a retry path, a mount that loses that race would never lock anything. Re-running
this on every *later*, real resize tick would re-lock at the already-shrunk width — the guard is
what keeps it a one-time conversion instead. Pinned columns are excluded from the lock itself —
sticky positioning keeps their *position* from moving — but a pinned column can still arrive
carrying a stale locked `width`/`min-width` from a previous pass where it was unpinned (e.g.
`columnConfig` resolves `pinnedColumns` a tick after mount, or the drawer pins an
already-locked column directly); `lockUnpinnedColumnWidths` resets both back to what
`TableHeaderCell.jsx` would render for that column — `width: col.width ?? ''` (not
`removeProperty('width')`: React skips rewriting a DOM style value when the source prop is
unchanged since the last render, so relying on the next render to reapply `column.width` doesn't
actually happen and the cleared width just stays cleared) — gated by a `lockedElementsRef`
`WeakSet` tracking exactly which `<th>` elements *this hook* locked, not "is this column currently
pinned," so a column that was *always* pinned (never passed through the lock) is left untouched.
`resizeHelper` keeps a manually-dragged column's width (and min-width, kept identical to it) in
sync directly, so dragging still works, and a later viewport shrink holds the column at the new,
manually-chosen width rather than the original locked one.

**Pinned columns can be squeezed below their declared width — a real, verified bug, not just the
actions column's problem.** `TableHeaderCell.jsx` floors every pinned column's `min-width` at its
own declared `width` (falling back to `columnMinWidth` only when no width was declared), the same
way a *locked* unpinned column always keeps `min-width` equal to `width`. Without that floor, a
plain pinned column with e.g. `width: '250px'` has 250px worth of `width` but only 96px
(`columnMinWidth`) of `min-width` — real slack — and `table-layout: fixed` is only guaranteed to
honor a column's declared `width` when nothing else in the row is competing for space; the moment
something does (another column's own resize converting a percentage into a bigger fixed px value,
or real row content settling), the browser can and does shrink the column with slack down toward
its floor instead of growing the table to fit everyone. Verified live: a pinned column declaring
`width: '250px'` rendered at exactly `columnMinWidth` (96px) from the very first paint — no drag
needed to trigger it, since the other columns' own percentage-to-fixed-px settling was enough
pressure on its own. This can't be caught in a jsdom test (`offsetWidth` is always 0 there), so it
was only caught and verified by driving a real browser.

**Sticky columns & header** — `column.pinned` (`'left' | 'right' | null`, computed by
`useColumnState`) becomes `position: sticky` offset by a `--bds-col-sticky-<columnKey>` custom
property, applied identically in `TableHeaderCell.jsx` and `TableCell.jsx` so header and body align.
`TableHeader.jsx`'s `syncStickyOffsets` computes the actual offsets (summed `offsetWidth` of
preceding/following pinned columns) and writes them onto the `<table>` element — recomputed on
mount, after a resize (via `requestAnimationFrame`, since resizing mutates the DOM directly with no
React re-render to hook into), and via a `ResizeObserver` on the table (covers window resize and
percentage-width reflow that touch no column prop). The `<thead>` is always `position: sticky; top:
0` at a higher `z-index` than pinned body cells, so the header and any open filter panel are never
painted over.

A pinned column's separator is structural and always paints. Its *shadow* only paints while the
table actually overflows in that direction — a table that fits its container shouldn't advertise a scroll that
doesn't exist. `TableGrid.jsx` watches the scroll wrapper (scroll events plus a `ResizeObserver` on
both the viewport and the `<table>`, since a resize drag mutates widths with no React re-render) and
toggles `bds-table-scrolled-from-start` / `bds-table-scrollable-to-end` on it as plain classes, not
React state, so a scroll tick doesn't re-render every row. In `stickyHeader` mode the header sits in
its own scroller, so the body's measurements drive both elements. Only `box-shadow` is toggled —
never a border — so the column's width never shifts with the scroll position.

**Status columns** — `isStatus: true` renders the cell value as a `StatusBadge` instead of plain
text. `statusType` picks one of the five semantic types (`success`, `error`, `warning`, `info`,
`general` — `general` when omitted), `statusIcon` adds an optional leading icon, `statusLabel`
replaces the text shown (the raw `row[field]` otherwise), and `statusHeight` overrides the badge
height. Each of the four accepts **either a literal or a function of `(row, value)`** — a single
Scan Status column is Success on one row and Failed on the next, which a column-level string could
never express. `StatusBadge` renders `null` when it has neither a label nor an icon — a status column renders a
badge per row, and a row's status can legitimately be absent (an unscanned entity, an optional
field), where an empty pill reads as a status the viewer can't make out rather than as no status.
An icon alone still earns a badge, and `0` is a value rather than an absence.

A column's own `renderColumn` wins over `isStatus`: it is the more specific
instruction, and it is the documented escape hatch for a cell holding *several* statuses at once
(`my-access`'s Status column renders one badge per access type), where the column-level props have
no way to express more than one badge. Import `StatusBadge` directly for that case.

**Cell content** — `TableCell.jsx` renders `renderColumn(row, value, index)` when provided,
otherwise the raw `row[field]`. Long text clamps to `cellMaxLines` (3) lines via
`-webkit-line-clamp`, detected by `scrollHeight > clientHeight + 1` (the `+1` avoids rounding false
positives), revealing a hover-only "More/Less" toggle only when actually clamped. `rowIcon(row)`
renders a small leading icon via `renderSvgGraphic`; `isCompact` switches a column to reduced
padding for narrow icon-only use.

**Column visibility/management** — the "N of M columns visible" toolbar trigger opens
`ColumnSettingsDrawer`, which renders through the shared `ModalPopup` — don't add custom overlay/
panel/close-button markup here; an earlier iteration did, and the dead classes
(`.bds-table-column-drawer-overlay`/`-panel`/`-header`/`-title`/`-close-button`/`-reset-button`)
sat unused in `table.scss` until removed. The drawer offers show/hide, pin left, and drag-to-reorder.
`Table`'s `columnConfig` prop (`{ pinnedColumns, hiddenColumns, defaultPinnedColumns,
defaultHiddenColumns, onColumnConfigChange }`) exposes `useColumnState`'s hidden/pinned state.
`pinnedColumns`/`hiddenColumns` are flat arrays of `columnKey`s (pinning is always left from the
drawer — `useColumnState`'s internal `{ left, right }` split stays a hook-only detail, since
`right` is reserved for the forced action column). `onColumnConfigChange({ order, hidden, pinned })`
fires on every drawer change (hide/show, pin/unpin, reorder), controlled or not — mirroring
`useColumnState`'s own `onColumnSettingsChange` contract.

A table always keeps one data column: `useColumnState` marks the last visible non-action column
`canHide: false`, `toggleVisibility` refuses to hide it, and both controls that could
(`ColumnSettingsDrawer`'s eye button and `TableHeaderCell`'s ⋮ *Toggle Visibility*) drop the
control rather than showing it disabled — the ⋮ menu itself disappears once no option is left.
This is deliberately *not* `hideLocked`, which marks a structurally fixed column (actions,
checkbox) and moves it into the drawer's Fixed section, losing pin and reorder; `canHide` only
withdraws the visibility control. Action columns don't count towards the tally, so a table can't
be hidden down to actions-only either.

**`pinnedColumns`/`hiddenColumns` are a hybrid, not a strict controlled prop — deliberate, not an
oversight.** `useColumnState` always renders from its own internal state; `toggleVisibility`/
`togglePin` always call `setState` directly, so the drawer stays fully interactive whether or not a
consumer supplies `onColumnConfigChange`, or ever feeds a value back through it. What the prop does
is let a consumer *optionally* steer that internal state from outside: an effect compares the
incoming value against what it looked like on the *previous* render — by contents, not reference,
since an inline `columnConfig={{ pinnedColumns: [...] }}` is a fresh array every render regardless
of content — and adopts it into internal state only on a genuine change. This fixes a real,
twice-reported bug in an earlier version, which used `controlledHiddenColumns ?? internalHiddenColumns`
at render time: the instant the prop was set to anything, it won forever, and a drawer click's own
`setState` was skipped in that case, so a consumer who set `columnConfig.pinnedColumns` once,
meaning it as a default, got a drawer that visibly let them click pin/hide on *any* column while
silently discarding every change. `defaultPinnedColumns`/`defaultHiddenColumns` are simpler still:
they only ever seed the initial value at mount — there's no controlled counterpart for them to sync
against later, so nothing reads them again after that.

**Other notable exports** — `ExpandRowIcon` (expand/collapse chevron), `TableWithNoData` (empty
state), `SortableTableRow` (drag-and-drop row variant, its own file — shares row-cell building
with `TableRow` via the `renderTableRow` helper in `RenderTableRow.jsx`),
`sortingType`/`sortIconColors`/`cellMaxLines`/`columnMinWidth`/`columnMaxWidth`/
`compactColumnWidth` (`constants.js`).

### Developer guidance

- Use this component for any new table; don't hand-roll table markup.
- Follow the column-definition shape above rather than inventing new column fields.
- Use `isActions: true` for an actions column — never implement sticky-right positioning or a
  hide/pin lock by hand for it.
- Before changing shared behavior, check existing consumers (e.g.
  `src/components/tree-view/components/nodesTable.jsx`, `table.stories.jsx`) so a fix for one
  doesn't regress another.
- If a new feature is needed, add it to `Table`/`useColumnState` rather than building a one-off
  variant.

## Storybook

CSF2 style: `export default { title: 'design-components/<Name>', component: X }` with named
exports per story and `storyName` for display names. All stories are under
`design-components/`.

Every new visual state must be checked in **light, dark, and custom**. Custom is the one that
catches hardcoded preset values.

- The toolbar in `.storybook/preview.jsx` has Light / Dark / Custom and applies the theme to
  `<html>`.
- Helpers in `src/story-assets/story-theme.jsx`:
  - `DarkStorySurface` — themed panel via nested `data-theme="dark"`; fine for non-portaled content.
  - `DarkStoryDocument` / `CustomStoryDocument` — apply the theme to `<html>`. **Required for
    portaled overlays** and the only correct way to apply a custom theme.
  - `CustomStorySurface` — paints a panel from the active theme; it does not apply a theme
    itself, so pair it with `CustomStoryDocument`.

```jsx
export const CustomTheme = () => (
  <CustomStoryDocument>
    <CustomStorySurface>
      <MyComponent />
    </CustomStorySurface>
  </CustomStoryDocument>
)
```

A story that pins the document theme marks `<html>` with `storyThemeOwnerAttribute`, and the
toolbar decorator skips reapplying when it sees that marker. This is load-bearing: effects run
child-first, so without it the decorator (a parent) would overwrite the story's theme on mount.
Keep the marker set/removed in any new document-level theme helper.

**When adding a component variant, add it to the dark and custom theme stories too.** They are
the only regression check — there are no visual or snapshot tests.

## Testing

Vitest + jsdom + `@testing-library/react`, globals enabled, `css: true`, setup file loads
`@testing-library/jest-dom/vitest`. Tests are smoke/interaction level: rendering, click
handlers, disabled/readOnly behavior, class names. `vi.fn()` for mocks. `data-testid` naming
is not standardized. No snapshots.

`vitest.setup.js` also polyfills `URL.createObjectURL` / `revokeObjectURL`, which jsdom does not
implement. Nothing in `src` uses them any more — see the CSP note under Consumer escape hatches —
but the polyfill stays for any consumer-side code under test.

## Test IDs

Components that consumers drive in tests expose a **`testId` prop**, never a `data-testid`
passthrough — there is no `...rest` spread on these, so a `data-testid` written by a consumer is
silently dropped. When adding or changing any interactive component here, give it a `testId` prop
applied to the element a test would actually target (the `<input>`, the `<button>`, the clickable
wrapper), with a default so existing tests keep working:

| Component | Prop | Default |
|---|---|---|
| `Button` | `testId` | `'button'` |
| `Textfield` | `testId` | falls back to `inputTestId` |
| `Textarea` | `dataTestId` | — |
| `Select` | `testId` | `'select-value'` |
| `Switch` | `testId` | `classes.switch` |
| `Checkbox` | `testId` | the `name` prop |
| `RadioGroup` | `testId` | — |
| `ModalPopup` | `buttons[].testId` | — |
| `DialogPopup` | `primaryButtonTestId` / `secondaryButtonTestId` | `'dialog-primary-btn'` / `'dialog-secondary-btn'` |
| `Table` | `columns[].actions[].testId` | the action's `name` |
| `StatusBadge` | `testId` | — |

A table action's `testId` must reach **both** render paths — the inline icon button in
`TableCell.jsx` and the option row in `ActionColumnCell.jsx`'s collapsed `⋮` menu — or the ID
disappears the moment the column is collapsed. That pairing is what lets consumers put the ID on
the action object instead of wrapping the `icon` node, which only ever covers the inline path.

**Any change that adds or edits an input requires a test ID.** That holds for consumers too: the
tenant portal and `secmgr-frontend-ui` compose theirs from a per-file `TEST_ID_PREFIX` constant, so
a component with no `testId` prop forces them into wrapper `<span>`s — which then break `Tooltip`,
whose `cloneElement` injects hover handlers onto its single child.

## Conventions for changes

ESLint enforces: single quotes, **no semicolons**, 2-space indent, trailing commas on
multiline, `arrow-parens: as-needed`. `max-len` 85 is a warning. Run `npm run lint:fix` after
editing JS/JSX; a Husky `pre-commit` hook runs `lint-staged` (`eslint --fix`) on
`src/**/*.{js,jsx}`.

**Comments: only where they carry information the code can't.** A non-obvious constraint, a
"why this and not the obvious thing", a cross-repo contract — worth a line. Restating what the
next line already says, labelling sections, or narrating a change is noise; leave it out. This
applies to SCSS and Markdown as much as to JS.

Commit messages start with the Jira ticket: `PAB-12345: Short description`. Feature branches
merge into `develop`; `release` merges back into `develop`; CI (Bitbucket Pipelines) triggers a
Jenkins build on `develop` commits only.

Note the SCSS/JSX split when a component gains a feature: a new visual state usually needs a
class in `constants.js`, a token in the SCSS theme blocks, and coverage in the dark/custom
stories. Skipping the token step is the most common way custom theme regresses.
