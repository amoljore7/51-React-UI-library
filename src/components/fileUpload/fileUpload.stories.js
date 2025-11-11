import React, { useEffect, useState } from 'react';
import Typography from '../typography';
import FileUpload from './FileUpload';

export default {
  title: 'design-components/FileUpload',
  component: FileUpload,
};

export const FileUploadDemo = () => {
  const fileSizeLimitKb = 400;
  // use these state variables to do
  // programmatic file load
  const [savedFile, setSavedFile] = useState(null);

  const onChange = (file) => {
    console.log('onChange called', file);
  };

  const onReset = () => {
    console.log('onReset called');
  }

  const handleFileSelect = (e) => {
    setSavedFile(e.target.files[0]);
  };

  /**
   * first 4 props are for controlling the translation of text in the component
   *
   * All props re optional
   *
   * Props
   *    uploadPromptText -  ['Default to 'Drag and Drop file or click to upload' in enh]
   *    maxFileSizeMessage -  [ Default to 'Max Size']
   *    fileSizeExceededMessage -  [Defaults to 'file is too big, please try another file' in en]
   *    uploadFailureMessage -  [Default to 'An error occurred while uploading, please try again' in en]
   * ---> use above four props to include translation of this component text
   *    fileSizeLimitKb - Number indicating max-size in KB
   *    savedFile - for loading files at runtime
   *    onChange: -- function (file) -- use file parameter to read it;
   *    onReset: -- function () --- this is called when an uploaded file is removed
   *                                 use this to update your savedFile in local state
   */
  return (
    <div>
      <input
        type='file'
        onChange={handleFileSelect}
        id='file-viewer-demo-input'
        style={{ marginBottom: '40px' }}
      />
      <FileUpload {...{ fileSizeLimitKb, onChange, savedFile, onReset }} />
    </div>
  );
};

export const FileUploadInputValidation = () => {

  // use errorBorder prop to show validation on input of file
  const fileSizeLimitKb = 400;
  const [savedFile, setSavedFile] = useState(null);

  const onChange = (file) => {
    setSavedFile(file);
  };

  const onReset = () => {
    setSavedFile(null);
  }

  const handleFileSelect = (e) => {
    setSavedFile(e.target.files[0]);
  };

  return (
    <div>
      <input
        type='file'
        onChange={handleFileSelect}
        id='file-viewer-demo-input'
        style={{ marginBottom: '40px' }}
      />
      <FileUpload
        {...{
          fileSizeLimitKb,
          onChange,
          savedFile,
          onReset,
          errorBorder: !savedFile,
        }}
      />
      {!savedFile ? (
        <div style={{ color: 'red' }}>
          <Typography variant='helper1'>{'Please Upload File'}</Typography>
        </div>
      ): null}
    </div>
  );
}

export const ReduceWidth = () => {
  const fileSizeLimitKb = 400;
  const [savedFile, setSavedFile] = useState(null);

  const onChange = (file) => {
    console.log('onChange called', file);
  };

  const onReset = () => {
    console.log('onReset called');
  }

  const handleFileSelect = (e) => {
    setSavedFile(e.target.files[0]);
  };
  return (
    <div>
      <input
        type='file'
        onChange={handleFileSelect}
        id='file-viewer-demo-input'
        style={{ marginBottom: '40px' }}
      />
      <FileUpload {...{ fileSizeLimitKb, onChange, savedFile, onReset, width: 270 }} />
    </div>
  );
};