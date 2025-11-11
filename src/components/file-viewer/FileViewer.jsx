import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Preview from './components/Preview';
import './FileViewer.scss';
import FullScreen from './components/FullScreen';

const FileViewer = ({ file }) => {
  const [isOpen, setIsOpen] = useState(false);
  const props = { file, setIsOpen };
  
  return isOpen ? <FullScreen {...props} /> : <Preview {...props} />;
};

FileViewer.propTypes = {
  file: PropTypes.object,
};

export default FileViewer;
