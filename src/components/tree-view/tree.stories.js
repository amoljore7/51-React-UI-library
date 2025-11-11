import React from 'react';
import Tree from './tree';
import azure from '../../assets/icons/azure.svg'

export default {
  title: 'design-components/TreeView',
  component: Tree,
};

export const DefaultTree = () => {
  const ClickHandler = () => {
    console.log('Icon clicked')
  };
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: 'left icon',
      onClick: ClickHandler,
    },
    rightIcon: {
      icon: azure,
      tooltip: 'Right icon',
      onClick: ClickHandler,
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            checked: false,
            type: 'node',
            nodes: [
              {
                label: 'Project Level1',
                value: 'Project Level1',
                expanded: true,
                checked: false,
                type: 'node',
                nodes: [
                  {
                    label: 'Project Level2',
                    value: 'Project Level2',
                    expanded: true,
                    checked: false,
                    type: 'node',
                    nodes: [
                      {
                        label: 'Project Level3',
                        value: 'Project Level3',
                        expanded: true,
                        checked: false,
                        type: 'node',
                        nodes: [
                          {
                            label: 'Secret Level3',
                            value: 'Secret Level3',
                            expanded: true,
                            checked: false,
                            type: 'leaf',
                          }
                        ],
                      },
                    ],
                  },
                  {
                    label: 'Secret 3',
                    value: 'Secret 3',
                    expanded: true,
                    checked: false,
                    type: 'leaf',
                  },
                ],
              },
              {
                label: 'DB',
                value: 'DB',
                expanded: true,
                checked: false,
                type: 'node',
                nodes: [
                  {
                    label: 'My SQL',
                    value: 'My SQL',
                    expanded: true,
                    checked: false,
                    type: 'leaf',
                  },
                  {
                    label: 'Oracle',
                    value: 'Oracle',
                    expanded: true,
                    checked: false,
                    type: 'leaf',
                  }
                ],
              },
              {
                label: 'Secret 777',
                value: 'Secret 777',
                expanded: true,
                checked: false,
                type: 'leaf',
              }
            ],
          },
          {
            label: 'UAT',
            value: 'UAT',
            expanded: true,
            checked: false,
            type: 'node',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            checked: false,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
      {
        label: 'Project C',
        value: 'Project C',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 3',
            value: 'Secret 3',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div style={{ width: '700px' }}>
      <Tree
        nodes={data}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
      />
    </div>
  );
};

export const ReadOnlyTree = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: '',
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: true,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            type: 'leaf',
          },
          {
            label: 'UAT',
            value: 'UAT',
            expanded: true,
            type: 'node',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div style={{ width: '700px' }}>
      <Tree
        nodes={data}
        readOnly
      />
    </div>
  );
};


export const SelectedFilterByDefault = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: '',
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        highlighted: true,
        checked: true,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            type: 'leaf',
          },
          {
            label: 'UAT',
            value: 'UAT',
            expanded: true,
            type: 'node',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div style={{ width: '700px' }}>
      <Tree
        nodes={data}
        isSelectedDefault
      />
    </div>
  );
};

export const HideCheckboxes = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: '',
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: true,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            type: 'leaf',
          },
          {
            label: 'UAT',
            value: 'UAT',
            expanded: true,
            type: 'node',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div style={{ width: '700px' }}>
      <Tree
        nodes={data}
        hideCheckboxes
        isSelectedDefault
      />
    </div>
  );
};

export const SingleSelect = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: '',
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            type: 'leaf',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div>
      <Tree
        nodes={data}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
        singleSelect
        hideDropdownFilter
      />
    </div>
  );
}

export const SingleSelectOnlyLeafIncludingRoot = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: '',
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            type: 'leaf',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div>
      <Tree
        nodes={data}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
        singleSelect
        hideDropdownFilter
        allowOnlyLeafSelection
      />
    </div>
  );
}

export const SingleSelectOnlyLeafExcludingRoot = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: '',
    },
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            expanded: true,
            type: 'leaf',
          },
          {
            label: 'Secret 1',
            value: 'Secret 1',
            expanded: true,
            type: 'leaf',
          },
        ],
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
    ],
  };

  return (
    <div>
      <Tree
        nodes={data}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
        singleSelect
        hideDropdownFilter
        allowOnlyLeafSelection
        allowRootSelection={false}
      />
    </div>
  );
}

export const WithCreatedDate = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: 'left icon',
    },
    rightIcon: {
      icon: azure,
      tooltip: 'Right icon',
    },
    createdDate: '2023-09-01T04:09:22Z',
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: false,
        type: 'leaf',
        createdDate: '2023-10-05T04:09:22Z',
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'leaf',
        createdDate: '2023-10-01T04:09:22Z',
      },
      {
        label: 'Project C',
        value: 'Project C',
        expanded: true,
        checked: false,
        type: 'leaf',
        createdDate: '2023-10-02T04:09:22Z',
      },
    ],
  };

  return (
    <div style={{ width: '700px' }}>
      <Tree
        nodes={data}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
        showCreatedDate
      />
    </div>
  );
};

export const TreeWithRootLevelLeavesAtTop = () => {
  const data = {
    label: 'All Secrets',
    value: 'All Secrets',
    expanded: true,
    checked: false,
    type: 'node',
    leftIcon: {
      icon: azure,
      tooltip: 'left icon',
    },
    rightIcon: {
      icon: azure,
      tooltip: 'Right icon',
    },
    nodes: [
      {
        label: 'Project B',
        value: 'Project B',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 2',
            value: 'Secret 2',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
      {
        label: 'Project C',
        value: 'Project C',
        expanded: true,
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Secret 3',
            value: 'Secret 3',
            expanded: true,
            checked: false,
            type: 'leaf',
          }
        ],
      },
      {
        label: 'Secret 1',
        value: 'Secret 1',
        expanded: true,
        checked: false,
        type: 'leaf',
      },
      {
        label: 'Secret 4',
        value: 'Secret 4',
        expanded: true,
        checked: false,
        type: 'leaf',
      },
      {
        label: 'Secret 5',
        value: 'Secret 5',
        expanded: true,
        checked: false,
        type: 'leaf',
      }
    ],
  };

  return (
    <div style={{ width: '700px' }}>
      <Tree
        nodes={data}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
        rootLeafNodesFirst
      />
    </div>
  );
};

export const SingleSelectRadio = () => {
const transformedData = {
  label: 'Root Vault',
  value: '/',
  type: 'node',
  disabled: false,
  expanded: true,
  nodes: [
    {
      label: 'QA Vault',
      value: '/QA Vault',
      type: 'node',
      disabled: false,
      expanded: true,
      nodes: [
        {
          label: 'test-1.1',
          value: '/QA Vault/test-1.1',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: [
            {
              label: 'test-1.1.1',
              value: '/QA Vault/test-1.1/test-1.1.1',
              type: 'node',
              disabled: false,
              expanded: true,
              nodes: []
            },
            {
              label: 'test-1.1.2',
              value: '/QA Vault/test-1.1/test-1.1.2',
              type: 'node',
              disabled: false,
              expanded: true,
              nodes: []
            }
          ]
        },
        {
          label: 'test-1.2',
          value: '/QA Vault/test-1.2',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: []
        }
      ]
    },
    {
      label: 'test-2',
      value: '/test-2',
      type: 'node',
      disabled: false,
      expanded: true,
      nodes: [
        {
          label: 'test-2.1',
          value: '/test-2/test-2.1',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: []
        },
        {
          label: 'test-2.2',
          value: '/test-2/test-2.2',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: []
        },
        {
          label: 'test-2.3',
          value: '/test-2/test-2.3',
          type: 'node',
          disabled: true,
          expanded: true,
          nodes: [
            {
              label: 'test-2.3.1',
              value: '/test-2/test-2.3/test-2.3.1',
              type: 'node',
              disabled: false,
              expanded: true,
              nodes: []
            }
          ]
        },
        {
          label: 'test-2.4',
          value: '/test-2/test-2.4',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: [
            {
              label: 'test-2.4.1',
              value: '/test-2/test-2.4/test-2.4.1',
              type: 'node',
              disabled: false,
              expanded: true,
              nodes: []
            },
            {
              label: 'test-2.4.2',
              value: '/test-2/test-2.4/test-2.4.2',
              type: 'node',
              disabled: false,
              expanded: true,
              nodes: []
            }
          ]
        }
      ]
    },
    {
      label: 'test-1',
      value: '/test-1',
      type: 'node',
      disabled: false,
      expanded: true,
      nodes: [
        {
          label: 'test-1.1',
          value: '/test-1/test-1.1',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: []
        }
      ]
    },
    {
      label: 'test-3',
      value: '/test-3',
      type: 'node',
      disabled: false,
      expanded: true,
      nodes: [
        {
          label: 'test-3.1',
          value: '/test-3/test-3.1',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: []
        },
        {
          label: 'test-3.2',
          value: '/test-3/test-3.2',
          type: 'node',
          disabled: false,
          expanded: true,
          nodes: []
        }
      ]
    }
  ]
};

  return (
    <div>
      <Tree
        nodes={transformedData}
        onChange={(selectedItems) => {
          console.log(selectedItems)
        }}
        singleSelect
        singleSelectRadio={true}
        hideDropdownFilter
      />
    </div>
  );
}