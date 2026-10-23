import { useState } from 'react'
import FileViewer from './'
import { DarkStorySurface } from '../../story-assets/story-theme'
export default {
  title: 'design-components/FileViewer',
  component: FileViewer,
}

export const FileViewerDemo = () => {
  const [file,setFile] = useState(null)
  const handleFileSelect = e => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }
  return (
    <div>
      <input type='file' onChange={handleFileSelect} id='file-viewer-demo-input' style={{marginBottom: '40px'}} />
      <FileViewer {...{file}} />
    </div>
       
  )
}

export const DarkTheme = () => (
  <DarkStorySurface>
    <FileViewerDemo />
  </DarkStorySurface>
)

DarkTheme.storyName = 'Dark theme'