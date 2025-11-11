import classNames from 'classnames';
import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import UploadIcon from '../../../assets/icons/cloud-upload.svg';
import Typography from '../../typography';
import {
  altTextFileUpload, defaultErrorIconSize,
  imageRole, UploadFormClasses
} from '../constants';

const FileInput = ({
  handleFileDragEnter,
  handleFileSelect,
  uploadPromptText,
  maxFileSizeMessage,
  fileSizeExceededMessage,
  fileSizeLimitKb,
  uploadFailureMessage,
  sizeError,
  otherErrors,
  file,
  errorBorder = false,
  width,
}) => {
  const uploadFormContainer = {
    [UploadFormClasses.uploadFormContainer]: true,
    [UploadFormClasses.uploadFormErrorBorder]: errorBorder,
  }
  return (
    <div
      className={classNames(uploadFormContainer)}
      onDragEnter={handleFileDragEnter}
      style={width ? { width } : undefined}
    >
      <label
        htmlFor='file-upload'
        className={UploadFormClasses.uploadFormContainerInputLabel}
      />
      <input
        id='file-upload'
        className={UploadFormClasses.uploadFormContainerInput}
        type='file'
        onChange={handleFileSelect}
      />
      <img role={imageRole} src={UploadIcon} alt={altTextFileUpload} />
      <div className={UploadFormClasses.uploadFormInstructText}>
        <Typography variant='heading6'>{uploadPromptText}</Typography>
      </div>
      {!(sizeError || otherErrors) && <div className={UploadFormClasses.uploadFormMaxSizeText}>
        <Typography variant='label1'>{`${maxFileSizeMessage} ${fileSizeLimitKb} kb`}</Typography>
      </div>}
      {(sizeError || otherErrors) && (
        <div className={UploadFormClasses.uploadFormErrorText}>
          <IoWarningOutline
            size={defaultErrorIconSize}
            className={UploadFormClasses.uploadErrorIcon}
          />
          {sizeError && (
            <div className={UploadFormClasses.uploadFormErrorTextFileName}>
              <Typography variant='helper1'>
                {file?.name || ''}
              </Typography>
            </div>
          )}
          &nbsp;
          <Typography variant='helper1'>
            {sizeError ? `${fileSizeExceededMessage} (${fileSizeLimitKb}kb)` : uploadFailureMessage}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FileInput;
