import OverflowMenuSearch from './overflow-menu-search';
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import AWS_Icon from '../../assets/icons/aws.svg';
import AZURE_Icon from '../../assets/icons/azure.svg';
import GCP_Icon from '../../assets/icons/gcp.svg';
import SALESFORCE_Icon from '../../assets/icons/salesforce.svg';

describe('overflow-menu-search test case', () => {
  let options = [
    { id: 1, checked: false, title: 'AWS', icon: AWS_Icon },
    { id: 2, checked: false, title: 'Azure', icon: AZURE_Icon },
    { id: 3, checked: true, title: 'Salesforce', icon: GCP_Icon },
    { id: 4, checked: false, title: 'GCP', icon: SALESFORCE_Icon },
  ];

  const props = {
    options: options,
    open: true,
    getSelectedOption: jest.fn(),
    iconRef: {},
  };

  it('all options appear on screen when user passes the options fields', () => {
    const { getByTestId } = render(<OverflowMenuSearch {...props} />);
    expect(getByTestId('menu-wrapper')).toBeInTheDocument();
  });

  it('onChange is called when user selects an option', () => {
    const { getByTestId } = render(<OverflowMenuSearch {...props} />);
    const checkWrapper = getByTestId('check-box-wrapper');
    fireEvent.click(checkWrapper);
    expect(props.onChange).toBeCalled;
  });
});
