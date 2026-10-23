import React, { useState } from 'react'
import FileUploadV2 from './FileUploadV2'
import {
  DarkStoryDocument,
  CustomStoryDocument,
  CustomStorySurface,
} from '../../story-assets/story-theme'

export default {
  title: 'design-components/FileUploadV2',
  component: FileUploadV2,
}

const logoProps = {
  label: 'Light logo',
  promptText: 'Upload light logo',
  hintText: 'PNG or SVG, under 1.5 MB',
  accept: 'image/png,image/svg+xml',
  maxFileSizeKb: 1500,
  width: '314px',
}

export const Default = () => {
  const [file, setFile] = useState(null)
  return <FileUploadV2 {...logoProps} file={file} onChange={setFile} />
}

export const WithoutLabel = () => {
  const [file, setFile] = useState(null)
  return (
    <FileUploadV2
      promptText="Upload favicon"
      hintText="SVG or PNG or ICO, under 1 MB"
      maxFileSizeKb={1000}
      width="314px"
      file={file}
      onChange={setFile}
    />
  )
}

// Several on one page — each gets its own generated input id, so clicking one
// dropzone never opens another's file picker.
export const MultipleOnOnePage = () => {
  const [files, setFiles] = useState({ light: null, dark: null, favicon: null })
  const set = key => file => setFiles(prev => ({ ...prev, [key]: file }))

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <FileUploadV2 {...logoProps} file={files.light} onChange={set('light')} />
      <FileUploadV2
        {...logoProps}
        label="Dark logo"
        promptText="Upload dark logo"
        file={files.dark}
        onChange={set('dark')}
      />
      <FileUploadV2
        label="Favicon"
        promptText="Upload favicon"
        hintText="SVG or PNG or ICO, under 1 MB"
        maxFileSizeKb={1000}
        width="314px"
        file={files.favicon}
        onChange={set('favicon')}
      />
    </div>
  )
}

export const Selected = () => {
  const [file, setFile] = useState({ name: 'company-logo.svg' })
  return (
    <FileUploadV2
      {...logoProps}
      file={file}
      onChange={setFile}
      onReset={() => setFile(null)}
    />
  )
}

// A stored asset: the caller has a URL but no File, so `file` is a `{ name }`
// stand-in and `previewUrl` supplies the thumbnail. This is the state a form
// returns to on a later visit.
const storedLogoUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 24">' +
      '<rect width="48" height="24" rx="4" fill="#5a3fd6"/>' +
      '<circle cx="12" cy="12" r="5" fill="#ffffff"/></svg>',
  )

export const SelectedWithThumbnail = () => {
  const [file, setFile] = useState({ name: 'company-logo.svg' })
  return (
    <FileUploadV2
      {...logoProps}
      file={file}
      previewUrl={file ? storedLogoUrl : undefined}
      onChange={setFile}
      onReset={() => setFile(null)}
    />
  )
}

SelectedWithThumbnail.storyName = 'Selected with thumbnail'

export const WithoutFileName = () => {
  const [file, setFile] = useState({ name: 'company-logo.svg' })
  return (
    <FileUploadV2
      {...logoProps}
      showFileName={false}
      file={file}
      previewUrl={file ? storedLogoUrl : undefined}
      onChange={setFile}
      onReset={() => setFile(null)}
    />
  )
}

WithoutFileName.storyName = 'Selected without the file name'

export const DisabledWithThumbnail = () => (
  <FileUploadV2
    {...logoProps}
    showFileName={false}
    file={{ name: 'company-logo.svg' }}
    previewUrl={storedLogoUrl}
    disabled
  />
)

DisabledWithThumbnail.storyName = 'Disabled with an enlargeable thumbnail'

// Picking a file here shows the thumbnail with no previewUrl at all — the
// component reads the bytes off the File itself.
export const LocalPreview = () => {
  const [file, setFile] = useState(null)
  return (
    <FileUploadV2
      {...logoProps}
      file={file}
      onChange={setFile}
      onReset={() => setFile(null)}
    />
  )
}

LocalPreview.storyName = 'Local preview of a picked file'

export const Disabled = () => <FileUploadV2 {...logoProps} disabled />

export const WithError = () => (
  <FileUploadV2 {...logoProps} error errorMessage="A logo is required" />
)

export const DarkTheme = () => {
  const [file, setFile] = useState(null)
  return (
    <DarkStoryDocument>
      <div style={{ display: 'flex', gap: '12px' }}>
        <FileUploadV2 {...logoProps} file={file} onChange={setFile} />
        <FileUploadV2
          {...logoProps}
          label="Stored logo"
          file={{ name: 'company-logo.svg' }}
          previewUrl={storedLogoUrl}
        />
        <FileUploadV2
          {...logoProps}
          label="Stored logo, no name"
          showFileName={false}
          file={{ name: 'company-logo.svg' }}
          previewUrl={storedLogoUrl}
          disabled
        />
      </div>
    </DarkStoryDocument>
  )
}

DarkTheme.storyName = 'Dark theme'

export const CustomTheme = () => {
  const [file, setFile] = useState(null)
  return (
    <CustomStoryDocument>
      <CustomStorySurface>
        <div style={{ display: 'flex', gap: '12px' }}>
          <FileUploadV2 {...logoProps} file={file} onChange={setFile} />
          <FileUploadV2
            {...logoProps}
            label="Stored logo"
            file={{ name: 'company-logo.svg' }}
            previewUrl={storedLogoUrl}
          />
          <FileUploadV2
            {...logoProps}
            label="Stored logo, no name"
            showFileName={false}
            file={{ name: 'company-logo.svg' }}
            previewUrl={storedLogoUrl}
            disabled
          />
        </div>
      </CustomStorySurface>
    </CustomStoryDocument>
  )
}

CustomTheme.storyName = 'Custom theme'
