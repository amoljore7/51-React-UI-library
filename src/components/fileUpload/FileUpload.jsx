import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import FileUploadRenderer from './components/FileUploadRenderer';
import {
  defaultFileSizeExceededMessage,
  defaultMaxFileSizeMessage,
  defaultUploadFailureMessage,
  defaultUploadPromptText,
} from './constants';
import './FileUpload.scss';

const FileUpload = ({
  uploadPromptText = defaultUploadPromptText,
  maxFileSizeMessage = defaultMaxFileSizeMessage,
  fileSizeExceededMessage = defaultFileSizeExceededMessage,
  uploadFailureMessage = defaultUploadFailureMessage,
  fileSizeLimitKb = 400,
  savedFile = null,
  onChange = () => {},
  onReset = () => {},
  errorBorder = false,
  width = '',
}) => {
  const resolvedWidth = width && parseInt(width) < 270 ? '270px' : width || undefined;
  const [file, setFile] = useState(savedFile);
  const [base64File, setBase64File] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [otherErrors, setOtherError] = useState(false);
  const [formState, setFormState] = useState('input');

  useLayoutEffect(() => {
    if (file) {
      onChange(file);
      setFormState('save');
    }
  }, [file]);

  const stopDefaultBehavior = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const readFile = (files) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onprogress = () => {
      // once loading a file reset to input mode
      setFormState('input')
      setFile(null);
      setBase64File(null);
    }

    fileReader.onload = (progressEvent) => {
      const dataLoadedInBytes = progressEvent.loaded;

      if (dataLoadedInBytes / 1000 <= fileSizeLimitKb) {
        setFile(files[0]);
        setBase64File(fileReader.result);
        setSizeError(false);
        setFormState('save');
      } else {
        setFormState('input');
        setFile(null);
        setBase64File(null);
        setSizeError(true);
        onChange(null);
      }
    };

    fileReader.onerror = () => {
      setFormState('input');
      setOtherError(true);
    };
  };

  useLayoutEffect(() => {
    if (savedFile) {
      readFile([savedFile]);
    }else{
      handleFileReset();
    }
  }, [savedFile]);

  const handleFileReset = () => {
    setFormState('input');
    setFile(null);
    setBase64File(null);
    onReset();
  };

  const handleFileDrop = (e) => {
    stopDefaultBehavior(e);
    readFile(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    stopDefaultBehavior(e);
    readFile(e.target.files);
  };

  const handleFileDragEnter = (e) => {
    stopDefaultBehavior(e);
    setFormState('drag');
  };

  const handleFileDragLeave = (e) => {
    stopDefaultBehavior(e);
    setFormState('input');
  };

  return (
    <FileUploadRenderer
      {...{
        handleFileDragEnter,
        handleFileDragLeave,
        handleFileDrop,
        handleFileSelect,
        handleFileReset,
        uploadPromptText,
        maxFileSizeMessage,
        fileSizeExceededMessage,
        fileSizeLimitKb,
        uploadFailureMessage,
        sizeError,
        otherErrors,
        file,
        base64File,
        formState,
        errorBorder,
        width: resolvedWidth,
      }}
    />
  );
};

FileUpload.propTypes = {
  uploadPromptText: PropTypes.string,
  maxFileSizeMessage: PropTypes.string,
  uploadFailureMessage: PropTypes.string,
  fileSizeExceededMessage: PropTypes.string,
  onChange: PropTypes.func,
  errorBorder: PropTypes.bool,
  width: PropTypes.string,
};

export default FileUpload;
