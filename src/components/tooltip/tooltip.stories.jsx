import Tooltip from '.'
import Button from '../button'

export default {
  title: 'design-components/Tooltip',
  component: Tooltip,
  parameters: {
    notes: 'Tooltip requires a single child that can receive a ref (e.g. wrap a React component in a div, or use a native element).',
  },
}

const text =
  'This is a tooltip text for tooltip component which is quite useful to show information of any actions'

const layout = {
  width: '100%',
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const Default = () => (
  <div style={layout}>
    <Tooltip title={text}>
      <button type="button">Hover (default position: top)</button>
    </Tooltip>
  </div>
)

export const TooltipTop = () => {
  return (
    <div style={layout}>
      <Tooltip title={text} position="top" zIndex={2000}>
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>
  )
}

export const TooltipBottom = () => (
  <div style={layout}>
    <Tooltip title={text} position="bottom">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipLeft = () => (
  <div style={layout}>
    <Tooltip title={text} position="left">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipRight = () => (
  <div style={layout}>
    <Tooltip title={text} position="right">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipBottomLeft = () => (
  <div style={layout}>
    <Tooltip title={text} position="bottom-left">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipBottomRight = () => (
  <div style={layout}>
    <Tooltip title={text} position="bottom-right">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipTopLeft = () => (
  <div style={layout}>
    <Tooltip title={text} position="top-left">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipTopRight = () => (
  <div style={layout}>
    <Tooltip title={text} position="top-right">
      <div>
        <Button variant="primary" size="small">
          Submit
        </Button>
      </div>
    </Tooltip>
  </div>
)

export const TooltipCaptionFigma = () => (
  <div style={layout}>
    <Tooltip title="Short caption (Figma / design tokens: caption1, 8px radius, neutral-80 bg)">
      <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Hover me</span>
    </Tooltip>
  </div>
)

export const DarkMode = () => (
  <div style={{ ...layout, background: '#040520', padding: 24 }}>
    <Tooltip title="Tooltip on dark background" theme="dark" position="top">
      <button type="button" style={{ color: '#fff' }}>
        Hover for tooltip
      </button>
    </Tooltip>
  </div>
)
