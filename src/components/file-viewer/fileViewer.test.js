/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import FileViewer from './';
import { classes } from './constants'



describe('File viewer unit tests', () => {
  it('File viewer is able to open given image', () => {
    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' });
    const { getByText } = render(<FileViewer {...{file}}/>);
    const fileNameEl = getByText('glasses.png')
    expect(fileNameEl).toBeInTheDocument();
    fireEvent.click(fileNameEl);
    expect(document.getElementsByClassName(classes.fullScreenContainer)[0]).toBeInTheDocument();
  });
});