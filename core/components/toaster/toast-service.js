function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { DEFAULT_DURATION } from './constants';

// Registered Toaster components — notified on every state change
const listeners = new Set();
// Single source of truth for all active toasts
let toasts = [];
// Tracks auto-dismiss timers keyed by toast id
const timers = new Map();
export const toaster = {
  create(opts) {
    var _opts$id;
    // Fall back to a UUID so callers can omit id when deduplication isn't needed
    const id = (_opts$id = opts.id) !== null && _opts$id !== void 0 ? _opts$id : crypto.randomUUID();
    const existing = toasts.findIndex(t => t.id === id);
    if (existing >= 0) {
      // Same id already visible — reset its timer and update content in-place
      clearTimeout(timers.get(id));
      timers.delete(id);
      toasts = [...toasts.slice(0, existing), _objectSpread(_objectSpread({}, opts), {}, {
        id
      }), ...toasts.slice(existing + 1)];
    } else {
      // New toast — append to the end (Toaster slices from the tail for maxVisible)
      toasts = [...toasts, _objectSpread(_objectSpread({}, opts), {}, {
        id
      })];
    }

    // Explicit null duration means the toast must be dismissed manually
    const duration = opts.duration !== undefined ? opts.duration : DEFAULT_DURATION;
    if (duration !== null) {
      timers.set(id, setTimeout(() => toaster.dismiss(id), duration));
    }

    // Broadcast updated list to all subscribed Toaster instances
    listeners.forEach(fn => fn([...toasts]));
    return id;
  },
  dismiss(id) {
    if (id !== undefined) {
      // Targeted dismiss — clear only this toast's timer and remove it
      clearTimeout(timers.get(id));
      timers.delete(id);
      toasts = toasts.filter(t => t.id !== id);
    } else {
      // No id — dismiss all toasts at once
      timers.forEach(t => clearTimeout(t));
      timers.clear();
      toasts = [];
    }
    listeners.forEach(fn => fn([...toasts]));
  }
};
export const subscribeToasts = fn => {
  listeners.add(fn);
  // Immediately call with current state so the subscriber doesn't start empty
  fn([...toasts]);
  // Return an unsubscribe function for useEffect cleanup
  return () => listeners.delete(fn);
};