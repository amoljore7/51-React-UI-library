import React, { useEffect, useRef, useState } from 'react';
import closeIcon from '../../../assets/icons/close-file-viewer.svg';
import DownloadIcon from '../../../assets/icons/small-download-icon.svg';
import ZoomIn from '../../../assets/icons/zoom-in.svg';
import ZoomOut from '../../../assets/icons/zoom-out.svg';
import Typography from '../../../components/typography';
import { classes } from '../constants';

const FullScreen = ({ file, setIsOpen }) => {
  const [percentageZoom, setPercentageZoom] = useState(0);
  const [base64File, setBase64File] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setBase64File(fileReader.result);
      if ((file.type || '').includes('image')) {
        setIsOpen(true);
      }
    }
  }, [file]);
  const onCloseClick = () => setIsOpen(false);
  const onZoomAction = (magnify = false) => {
    const imgEl = imgRef?.current;
    if (imgEl) {
      const aspectRatio = imgEl.width / imgEl.height;
      const currentArea = imgEl.width * imgEl.height;
      const newArea = magnify
        ? (currentArea * 5.0) / 4.0
        : (currentArea * 3.0) / 4.0;
      const newHeight = Math.sqrt(newArea / aspectRatio);
      const newWidth = Math.sqrt(newArea * aspectRatio);

      imgEl.width = newWidth;
      imgEl.height = newHeight;
      setPercentageZoom(magnify ? percentageZoom + 25 : percentageZoom - 25);
    }
  };

  return (
    file && (
      <div className={classes.fullScreenContainer}>
        <TopPanel
          {...{
            file,
            base64File,
            onCloseClick,
          }}
        />
        <div className={classes.fullScreenImage}>
          <img src={base64File} ref={imgRef} />
        </div>

        <BottomPanel
          {...{
            onZoomIn: () => onZoomAction(true),
            onZoomOut: () => onZoomAction(false),
            percentageZoom,
          }}
        />
      </div>
    )
  );
};

const BottomPanel = ({ onZoomIn, onZoomOut, percentageZoom }) => (
  <div className={classes.fullScreenBottomPanel}>
    <div className={classes.fullScreenBottomPanelZoom}>
      <img
        className={classes.fullScreenBottomPanelZoomIn}
        src={ZoomOut}
        onClick={onZoomOut}
      />
      <img
        className={classes.fullScreenBottomPanelZoomOut}
        src={ZoomIn}
        onClick={onZoomIn}
      />
      {percentageZoom && (
        <div className={classes.fullScreenBottomPanelZoomPercentage}>
          <Typography variant='heading6'>{`${
            100 + percentageZoom
          } %`}</Typography>
        </div>
      )}
    </div>
  </div>
);

const TopPanel = ({ file, base64File, onCloseClick }) => (
  <div className={classes.fullScreenTopPanel}>
    <div className={classes.fullScreenTopPanelName}>
      <div className={classes.fullScreenTopPanelNameTypeSize}>
        <Typography variant='heading6'>
          {`${file.name}`}
          <br />
          {`${file.type.substring(0, file.type.indexOf('/'))} ${Math.round(
            file.size / 1000
          )} Kb`}
        </Typography>
      </div>
    </div>
    <div className={classes.fullScreenTopPanelNameButtons}>
      <a href={base64File} download={file.name}>
        <img src={DownloadIcon} />
      </a>
      <img
        className={classes.fullscreenTopPanelCloseFile}
        src={closeIcon}
        onClick={onCloseClick}
      />
    </div>
  </div>
);

export default FullScreen;
