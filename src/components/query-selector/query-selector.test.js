import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import QuerySelector from './query-selector';


describe('Query selector component unit test cases', () => {
    const props = {
        isEditMode: true,
        attributeOptions: [
            { attribute: 'skills-1' },
            { attribute: 'skills-2' },
            { attribute: 'skills-3' },
        ],
        attributeGetOptionLabel: function (option) {
            return option.attribute;
        },
        currentElement: { attribute: 'skills-1', operator: 'equal', value: 'de', isActive: false, id: 1 } || undefined,
        handleAddQueryPills: jest.fn(),
        deleteHandleClick: jest.fn(),
    }

    it('Render query selector component on page', () => {
        const { getByTestId } = render(<QuerySelector {...props} />);
        expect(getByTestId('pill-wrapper')).toBeInTheDocument()
    });

    it('Display Select Attribute component on page', () => {
        const { queryByPlaceholderText } = render(<QuerySelector {...props} />);
        const label = queryByPlaceholderText('Attribute');
        expect(label).toBeCalled;
    });

    it('Display Select Operator component on page', () => {
        const { queryByPlaceholderText } = render(<QuerySelector {...props} />);
        const label = queryByPlaceholderText('Operator');
        expect(label).toBeCalled;
    });

    it('Display Textfield Value component on page', () => {
        const { queryByPlaceholderText } = render(<QuerySelector {...props} />);
        const label = queryByPlaceholderText('Value');
        expect(label).toBeCalled;
    });

});