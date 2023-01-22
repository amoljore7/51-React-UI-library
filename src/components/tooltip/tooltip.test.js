/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Tooltip from './';

describe('Tooltip component unit test cases', () => {
  it('Tooltip should render if we hover on button', () => {
    render(
      <Tooltip title="Submit form" position="top">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );

    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);

    const tooltip = document.getElementsByClassName('bds-tooltip-container')[0];
    expect(tooltip).toBeInTheDocument();

    fireEvent.mouseLeave(element);
    expect(tooltip).not.toBeInTheDocument();
  });
  it('Tooltip should not render if we dont hover on button', () => {
    render(
      <Tooltip title="Submit form" position="top">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );

    const tooltip = document.getElementsByClassName('bds-tooltip-container')[0];
    expect(tooltip).toBe(undefined);
  });
  it('Tooltip should render on top', () => {
    render(
      <Tooltip title="Submit form" position="top">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const rect = tooltip.getBoundingClientRect();
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(0px,8px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on bottom', () => {
    render(
      <Tooltip title="Submit form" position="bottom">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(0px,8px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on left', () => {
    render(
      <Tooltip title="Submit form" position="left">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(8px,0px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on right', () => {
    render(
      <Tooltip title="Submit form" position="right">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(8px,0px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on top-left', () => {
    render(
      <Tooltip title="Submit form" position="top-left">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(-10px,10px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on top-right', () => {
    render(
      <Tooltip title="Submit form" position="top-right">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(10px,10px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on bottom-left', () => {
    render(
      <Tooltip title="Submit form" position="bottom-left">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(10px,10px,0)');
    expect(style.overflow).toBe('auto');
  });
  it('Tooltip should render on bottom-right', () => {
    render(
      <Tooltip title="Submit form" position="bottom-right">
        <button className="bds-test-button-class">Submit</button>
      </Tooltip>
    );
    const element = document.getElementsByClassName('bds-test-button-class')[0];
    fireEvent.mouseOver(element);
    const tooltip = document.getElementById('bds-tooltip-modal');
    const style = window.getComputedStyle(tooltip)
    expect(tooltip).toBeInTheDocument();
    expect(style.transform).toBe('translate3d(10px,10px,0)');
    expect(style.overflow).toBe('auto');
  });
});
