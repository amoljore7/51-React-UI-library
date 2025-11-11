/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Accordion from './accordion';
import { classes } from './constants';

describe('Accordion component unit test cases', () => {
  const content = 'Accordion Content';

  it('should render the title and children correctly.', () => {
    render(<Accordion title="Title">{content}</Accordion>);
    
    const header = screen.getByTestId('accordion-header');
    expect(header).toHaveTextContent('Title');
    expect(header.lastChild.className).toEqual('typography-page-section-header')

    const accordionContent = screen.getByTestId('accordion-content');
    expect(accordionContent).toHaveTextContent(content);
  });

  it('should toggle the class on click of the header.', () => {
    render(<Accordion title="Title">{content}</Accordion>);
    
    // initial state
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentClosed)).toBe(true)
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentExpanded)).toBe(false)
    
    const header = screen.getByTestId('accordion-header');
    fireEvent.click(header);

    // State after the click
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentClosed)).toBe(false)
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentExpanded)).toBe(true)
    
  });

  it('should toggle the class on click of the header when the initial state is expanded.', () => {
    render(<Accordion title="Title" expanded>{content}</Accordion>);
    
    // initial state
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentClosed)).toBe(false)
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentExpanded)).toBe(true)
    
    const header = screen.getByTestId('accordion-header');
    fireEvent.click(header);

    // State after the click
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentClosed)).toBe(true)
    expect(screen.getByTestId('accordion-content').classList.contains(classes.contentExpanded)).toBe(false)
    
  });
});
