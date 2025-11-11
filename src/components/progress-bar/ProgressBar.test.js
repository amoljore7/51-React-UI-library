/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { classes } from './constants';
import ProgressBar from './ProgressBar';

describe('Unit test cases for Progress bar component', ( ) => {
   it('To show the Progress with green shade with the correct width % and show display value', () => {
    const props = {
        progressPercentage: 40,
        displayValue: '40 Units',
        width: 200,
        height: 10,
    }
    render(<ProgressBar {...props} />)
    const leadingProgressEl = document.getElementsByClassName(classes.leading)[0];
    const trailingEl = document.getElementsByClassName(classes.trailing)[0];
    const displayValueEl = document.getElementsByClassName(classes.value)[0].getElementsByTagName('span')[0];

    expect(leadingProgressEl.getAttribute('style')).toBe('width: 80px;');
    expect(trailingEl.getAttribute('style')).toBe('width: 120px;');
    expect(displayValueEl.innerHTML).toBe('40 Units');
   }) 
})
