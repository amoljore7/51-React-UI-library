import MultiTextfield from './multiTextfield'
import { DarkStorySurface } from '../../story-assets/story-theme'

export default {
  title: 'design-components/MultiTextfield',
  component: MultiTextfield,
}

export const Default = () => {

  const props = {
    valueString: '',
    finalValue: value => console.log(value),
    finalObject: obj => console.log(obj),
    isAllFieldSaved: flag => console.log(flag),
  }
  return <MultiTextfield {...props} />
}

export const WithData = () => {

  const props = {
    valueString: 'ABC,XYZ',
    finalValue: value => console.log(value),
    finalObject: obj => console.log(obj),
    isAllFieldSaved: flag => console.log(flag),
  }
  return <MultiTextfield {...props} />
}

export const WithTooltip = () => {

  const props = {
    valueString: 'ABC,XYZ',
    tooltip: true,
    addBtnTooltipText: 'Add Additional value with "Or" condition',
    finalValue: value => console.log(value),
    finalObject: obj => console.log(obj),
    isAllFieldSaved: flag => console.log(flag),
  }
  return (
    <div style={{marginTop: '10%'}}>
      <MultiTextfield {...props} />
    </div>
  ) 
}

export const WithHeightWidth = () => {

  const props = {
    valueString: 'ABC,XYZ',
    tooltip: true,
    addBtnTooltipText: 'Add Additional value with "Or" condition',
    finalValue: value => console.log(value),
    finalObject: obj => console.log(obj),
    isAllFieldSaved: flag => console.log(flag),
    width: '100px',
    height: '26px',
  }
  return (
    <div style={{marginTop: '10%'}}>
      <MultiTextfield {...props} />
    </div>
  ) 
}

export const DarkTheme = () => (
  <DarkStorySurface>
    <Default />
  </DarkStorySurface>
)

DarkTheme.storyName = 'Dark theme'

