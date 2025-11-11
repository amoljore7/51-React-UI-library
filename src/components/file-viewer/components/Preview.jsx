import React, { useEffect, useState, useRef } from 'react';
import { FiDownloadCloud } from 'react-icons/fi';
import FileUploadTextIcon from '../../../assets/icons/file-upload-text.svg';
import Typography from '../../typography';
import Tooltip from '../../tooltip';
import { classes, nonImageAltText } from '../constants';
import classNames from 'classnames';

const Preview = ({ file, setIsOpen }) => {
  const [base64File, setBase64File] = useState(null);
  const [fileName, setFileName] = useState('');
  const downloadRef = useRef();

  useEffect(() => {
    if (file) {
      setFileName(file?.name || '');
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setBase64File(fileReader.result);}
      
    }
  }, [file]);

  const onDownloadClick = () => {
    if (downloadRef?.current) {
      downloadRef.current.click();
    }
  };
  return (
    file && (
      <div className={classes.previewContainer}>
        {base64File && file.type.includes('image') && (
          <img
            className={classes.previewImageContainer}
            src={base64File}
            alt={fileName}
            onClick={() => file.type.includes('image') && setIsOpen(true)}
          />
        )}
        {
          !file.type.includes('image') && 
          <img
            className={classes.previewNonImageContainer}
            role='img'
            alt={nonImageAltText}
            src={FileUploadTextIcon}
          />
        }
        <Tooltip title={file.name} position='top'>
          <div
            className={classes.previewFileName}
           onClick={onDownloadClick}
          >
            <Typography variant='label1'>{fileName}</Typography>
          </div>
        </Tooltip>
        <a
          className='file-viewer-download-link'
          ref={downloadRef}
          href={base64File}
          download={file.name}
        />
      </div>
    )
  );
};

export default Preview;
