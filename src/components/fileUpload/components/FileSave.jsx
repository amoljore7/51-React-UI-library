import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import FileUploadTextIcon from '../../../assets/icons/file-upload-text.svg';
import Button from '../../button';
import Tooltip from '../../tooltip';
import Typography from '../../typography';
import {
  defaultIconSize,
  fileUploaded,
  replaceFile,
  UploadFormClasses,
} from '../constants';

const FileSave = ({ file, base64File, handleFileReset, handleFileSelect, width }) => {
  const inputRef = useRef();
  return (
    <div className={UploadFormClasses.uploadFormCompleteContainer} style={width ? { width } : undefined}>
      <div className={UploadFormClasses.uploadFormComplete}>
        {!(file.type.startsWith('image') || file.type.startsWith('img')) && (
          <img
            className={UploadFormClasses.uploadFormCompleteFileIcon}
            role='img'
            alt={fileUploaded}
            src={FileUploadTextIcon}
          />
        )}
        {(file.type.startsWith('image') || file.type.startsWith('img')) && (
          <img
            className={UploadFormClasses.uploadFormCompleteThumbnail}
            src={base64File}
          />
        )}
      </div>
      <div className={UploadFormClasses.uploadFormCompleteFileContainer}>
        <Tooltip title={file.name} position='bottom'>
          <div className={UploadFormClasses.uploadFormCompleteFileName}>
            <Typography variant='label1'>{file.name}</Typography>
          </div>
        </Tooltip>
        <div className={UploadFormClasses.uploadFormCompleteReplace}>
          <Button
            onClick={() => {
              inputRef?.current?.click();
            }}
            variant='secondary'
            size='small'
            type='reset'
          >
            <input
              id='file-upload'
              className={UploadFormClasses.uploadFormContainerInput}
              type='file'
              onChange={handleFileSelect}
              ref={inputRef}
            />
            <label
              htmlFor='file-upload'
              className={UploadFormClasses.uploadFormContainerInputLabel}
            ></label>
            {replaceFile}
          </Button>
        </div>
        <div className={UploadFormClasses.uploadFormCompleteReset}>
          <IoMdClose size={defaultIconSize} onClick={handleFileReset} />
        </div>
      </div>
    </div>
  );
};

export default FileSave;
