import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import QueryBuilder from './query-builder';


describe('Query builder component unit test cases', () => {
    const primaryVariant = 'primary';
    const secondaryVariant = 'secondary';
    const textOnlyVariant = 'textOnly';

    const smallSize = 'small';

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
        savedQuery: jest.fn(),
        saveQueryFlag: jest.fn(),
        existingSavedQueries: [
            { attribute: 'skills-1', operator: 'is', value: 'A' },
            { attribute: 'skills-2', operator: 'is', value: 'B' },
        ],
    }

    it('Add Criteria Button in the page', () => {
        const { queryByRole } = render(<QueryBuilder {...props} />);
        let loadBtn = queryByRole('button', { name: 'Add Criteria' });
        expect(loadBtn).toBeInTheDocument();
    });

    it('Check Add Criteria Button Primary', () => {
        const { queryByRole } = render(<QueryBuilder variant={primaryVariant} {...props} />);
        let btn = queryByRole('button', { name: 'Add Criteria' });
        expect(btn).toBeInTheDocument();
    });

    it('Check Add Criteria Button Secondary', () => {
        const { queryByRole } = render(<QueryBuilder variant={secondaryVariant} {...props} />);
        let btn = queryByRole('button', { name: 'Add Criteria' });
        expect(btn).toBeInTheDocument();
    });

    it('Check Add Criteria Button TextOnly', () => {
        const { queryByRole } = render(<QueryBuilder variant={textOnlyVariant} {...props} />);
        let btn = queryByRole('button', { name: 'Add Criteria' });
        expect(btn).toBeInTheDocument();
    });

    it('Check Button Primary & Size Small', () => {
        const { queryByRole } = render(<QueryBuilder variant={primaryVariant} size={smallSize} {...props} />);
        let btn = queryByRole('button', { name: 'Add Criteria' });
        expect(btn).toBeInTheDocument();
    });

    it('corresponding existing saved queries appear on screen', () => {
        const props = {
            isEditMode: false,
            attributeOptions: [
                { attribute: 'skills-1' },
                { attribute: 'skills-2' },
                { attribute: 'skills-3' },
            ],
            attributeGetOptionLabel: function (option) {
                return option.attribute;
            },
            savedQuery: jest.fn(),
            saveQueryFlag: jest.fn(),
            existingSavedQueries: [
                { attribute: 'skills-1', operator: 'is', value: 'A' },
                { attribute: 'skills-2', operator: 'is', value: 'B' },
            ],
        }
        const { getAllByTestId } = render(<QueryBuilder {...props} />);
        expect(getAllByTestId('query-pill-wrapper').length).toEqual(2);
    });

    it('should render only the attribute in the pill if the onlyAttributeInput prop is true.', () => {
        const props = {
            isEditMode: false,
            attributeOptions: [
                { attribute: 'skills-1' },
                { attribute: 'skills-2' },
                { attribute: 'skills-3' },
            ],
            attributeGetOptionLabel: function (option) {
                return option.attribute;
            },
            savedQuery: jest.fn(),
            saveQueryFlag: jest.fn(),
            existingSavedQueries: [
                { attribute: 'skills-1' },
                { attribute: 'skills-2' },
            ],
            onlyAttributeInput: true
        }

        const { getAllByTestId } = render(<QueryBuilder {...props} />);
        const pills = getAllByTestId('query-pill-wrapper')
        expect(pills[0].firstChild.firstChild.innerHTML).toBe('skills-1')
        expect(pills[1].firstChild.firstChild.innerHTML).toBe('skills-2')
    })
});