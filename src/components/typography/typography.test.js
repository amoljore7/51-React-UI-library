/* eslint-disable no-undef */
import React from 'react';
import Typography from '.';
import { render } from '@testing-library/react';

describe('Unit test for Typography component', () => {
  it('Variant code1 is reflected with the specified text content', () => {
    const variantCode1 = 'code1';
    const text = 'Code text here';
    const { getByRole } = render(
      <Typography variant={variantCode1}>{text}</Typography>
    );
    expect(getByRole('figure').classList[0]).toContain('code-01');
    expect(getByRole('figure').textContent).toEqual(text);
  });

  it('Variant button (label text) is reflected with the specified text content', () => {
    const variantButtonText = 'button';
    const text = 'Submit';
    render(<Typography variant={variantButtonText}>{text}</Typography>);
    expect(document.getElementsByTagName('span')[0].classList[0]).toContain(
      'button-label'
    );
    expect(document.getElementsByTagName('span')[0].textContent).toEqual(text);
  });

  it('Variant label1 is reflected with the specified text content', () => {
    const variantLabel1 = 'label1';
    const text = 'Here is label of type 1';
    render(<Typography variant={variantLabel1}>{text}</Typography>);
    expect(document.getElementsByTagName('span')[0].classList[0]).toContain(
      'label-01'
    );
    expect(document.getElementsByTagName('span')[0].textContent).toEqual(text);
  });

  it('Variant label2 is reflected with the specified text content', () => {
    const variantLabel2 = 'label2';
    const text = 'Here is label of type 2';
    render(<Typography variant={variantLabel2}>{text}</Typography>);
    expect(document.getElementsByTagName('span')[0].classList[0]).toContain(
      'label-02'
    );
    expect(document.getElementsByTagName('span')[0].textContent).toEqual(text);
  });

  it('Variant caption1 is reflected with the specified text content', () => {
    const variantCaption = 'caption1';
    const text = 'Here is a caption';
    render(<Typography variant={variantCaption}>{text}</Typography>);
    expect(document.getElementsByTagName('span')[0].classList[0]).toContain(
      'caption-01'
    );
    expect(document.getElementsByTagName('span')[0].textContent).toEqual(text);
  });

  it('Variant helper1 is reflected with the specified text content', () => {
    const variantHelper = 'helper1';
    const text = 'Here is a helper 1';
    render(<Typography variant={variantHelper}>{text}</Typography>);
    expect(document.getElementsByTagName('span')[0].classList[0]).toContain(
      'helper-text-01'
    );
    expect(document.getElementsByTagName('span')[0].textContent).toEqual(text);
  });

  it('Variant pageTitle is reflected with the specified text content', () => {
    const variantPageTitle = 'pageTitle';
    const text = 'Here is page Title';
    const { getByRole } = render(
      <Typography variant={variantPageTitle}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('page-title');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant pageSectionHeader is reflected with the specified text content', () => {
    const variantPageSectionHeader = 'pageSectionHeader';
    const text = 'Here is a page section header';
    const { getByRole } = render(
      <Typography variant={variantPageSectionHeader}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('page-section-header');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading1 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading1';
    const text = 'Here is Heading 1';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-01');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading2 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading2';
    const text = 'Here is Heading 2';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-02');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading3 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading3';
    const text = 'Here is Heading 3';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-03');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading4 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading4';
    const text = 'Here is Heading 4';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-04');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading5 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading5';
    const text = 'Here is Heading 5';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-05');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading6 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading6';
    const text = 'Here is Heading 6';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-06');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant heading7 is reflected with the specified text content', () => {
    const variantHeading1 = 'heading7';
    const text = 'Here is Heading 7';
    const { getByRole } = render(
      <Typography variant={variantHeading1}>{text}</Typography>
    );
    expect(getByRole('heading').classList[0]).toContain('heading-07');
    expect(getByRole('heading').textContent).toEqual(text);
  });

  it('Variant body is reflected with the specified text content', () => {
    const variantHelper = 'body';
    const text = 'Here is a body text';
    render(<Typography variant={variantHelper}>{text}</Typography>);
    expect(document.getElementsByTagName('p')[0].classList[0]).toContain(
      'body-text'
    );
    expect(document.getElementsByTagName('p')[0].textContent).toEqual(text);
  });
});
