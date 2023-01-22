/* eslint-disable no-undef */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tree from './tree';
import { TreeNodeClasses } from './constants';
describe('Unit tests for Tree component', () => {
  const data = {
    label: 'All Secrets',
    hasChildren: true,
    details: { entityType: 'node' },
    actionItems: [{ title: 'Add Folder' }],
    nodes: [
      {
        label: 'Project A',
        hasChildren: true,
        details: { entityType: 'node' },
        actionItems: [{ title: 'Add Folder' }],
        nodes: [
          {
            label: 'Dev',
            hasChildren: true,
            details: { entityType: 'node' },
            actionItems: [{ title: 'Add Folder' }],
            nodes: [
              {
                label: 'DB',
                hasChildren: true,
                details: { entityType: 'node' },
                actionItems: [{ title: 'Add Folder' }],
                leaves: [
                  {
                    label: 'My SQL',
                    details: { entityType: 'leaf' },
                    actionItems: [{ title: 'Delete Secret' }],
                  },
                  {
                    label: 'Oracle',
                    details: { entityType: 'leaf' },
                    actionItems: [{ title: 'Delete Secret' }],
                  },
                ],
              },
            ],
            leaves: [
              {
                label: 'Secret 777',
                details: { entityType: 'leaf' },
                actionItems: [{ title: 'Delete Secret' }],
              },
            ],
          },
          {
            label: 'UAT',
            hasChildren: true,
            details: { entityType: 'node' },
            actionItems: [{ title: 'Add Folder' }],
          },
        ],
        leaves: [
          {
            label: 'Secret 1',
            details: { entityType: 'leaf' },
            actionItems: [{ title: 'Delete Secret' }],
          },
        ],
      },
      {
        label: 'Project B',
        hasChildren: true,
        details: { entityType: 'node' },
        actionItems: [{ title: 'Add Folder' }],
        nodes: [],
        leaves: [
          {
            label: 'Secret 2',
            details: { entityType: 'leaf' },
            actionItems: [{ title: 'Delete Secret' }],
          },
        ],
      },
      {
        label: 'Project C',
        hasChildren: true,
        details: { entityType: 'node' },
        nodes: [],
        leaves: [
          {
            label: 'Secret 3',
            details: { entityType: 'leaf' },
            actionItems: [{ title: 'Delete Secret' }],
          },
        ],
      },
    ],
  };

  const treeProps = {
    clickHandler: jest.fn(),
    nodes: data,
    expandIconClickHandler: jest.fn(),
    expandedItems: [],
    actionClickHandler: jest.fn(),
    selectedItemParents: [],
  };

  it('To render the top level node intitally', () => {
    render(<Tree {...treeProps} />);
    expect(document.getElementsByClassName(TreeNodeClasses.parentContainer)).toHaveLength(1);
  });

  it('To Expand on clicking and show first three level nodes', () => {
    render(<Tree {...treeProps} />);
    let parentNodeContainer = document.getElementsByClassName(TreeNodeClasses.parentContainer);
    fireEvent.click(document.querySelector(`.${TreeNodeClasses.dirIconContainer} > svg`));
    parentNodeContainer = document.getElementsByClassName(TreeNodeClasses.parentContainer);
    expect(parentNodeContainer).toHaveLength(4);
  });

  it('To Expand second item and show the leaf nodes', () => {
    const expandIconClickHandler = jest.fn();
    const clickHandler = jest.fn();

    render(
      <Tree
        nodes={data}
        expandIconClickHandler={expandIconClickHandler}
        clickHandler={clickHandler}
        actionClickHandler={() => {}}
        selectedItemParents={[]}
      />
    );

    const expandedNode = document.getElementsByClassName(TreeNodeClasses.dirIconContainer);
    fireEvent.click(expandedNode[0]);
    fireEvent.click(expandedNode[1]);
    expect(expandIconClickHandler).toBeCalled();
    const leafNodes = document.getElementsByClassName(TreeNodeClasses.contentBoxContainer);
    expect(leafNodes).toHaveLength(1);
  });
});
