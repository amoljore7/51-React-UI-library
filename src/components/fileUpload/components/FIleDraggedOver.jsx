import React from 'react';
import DraggedOverIcon from '../../../assets/icons/file-upload-dragged-over.svg';
import { UploadFormClasses } from '../constants';

const FileDraggedOver = ({ handleFileDragLeave, handleFileDrop, width }) => {
  return (
    <div
      className={UploadFormClasses.uploadFormDraggedOverContainer}
      onDrop={handleFileDrop}
      onDragLeave={handleFileDragLeave}
      // make it a valid on drop target
      onDragOver={(e) => e.preventDefault()}
      style={width ? { width } : undefined}
    >
      <img
        className={UploadFormClasses.uploadFormDraggedOver}
        src={DraggedOverIcon}
      />
    </div>
  );
};

export default FileDraggedOver;
