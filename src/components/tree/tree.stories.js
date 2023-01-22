import React, { useState } from 'react';
import ModalPopup from '../modal-popup';
import Textfield from '../textfield';
import Tree from './tree';
import TreeNode from './treeNode';

export default {
  title: 'design-components/Tree',
  component: TreeNode,
};

export const DemoTree = () => {
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
                label: 'Project Level1',
                hasChildren: true,
                details: { entityType: 'node' },
                actionItems: [{ title: 'Add Folder' }],
                nodes: [
                  {
                    label: 'Project Level2',
                    hasChildren: true,
                    details: { entityType: 'node' },
                    nodes: [
                      {
                        label: 'Project Level3',
                        hasChildren: true,
                        details: { entityType: 'node' },
                        nodes: [],
                        actionItems: [{ title: 'Add Folder' }],
                        leaves: [
                          {
                            label: 'Secret Level3',
                            details: { entityType: 'leaf' },
                            actionItems: [{ title: 'Delete Secret' }],
                          },
                        ],
                      },
                    ],
                    actionItems: [{ title: 'Add Folder' }],

                    leaves: [
                      {
                        label: 'Secret 37',
                        details: { entityType: 'leaf' },
                        actionItems: [{ title: 'Delete Secret' }],
                      },
                    ],
                  },
                ],
                leaves: [
                  {
                    label: 'Secret 3',
                    details: { entityType: 'leaf' },
                    actionItems: [{ title: 'Delete Secret' }],
                  },
                ],
              },
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
  const [treeData, setTreeData] = useState(data);
  const [parentList, setParentList] = useState([]);
  const [isAddNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [parentsWhereChildrenAreToBeAdded, setParentsWhereChildrenAreToBeAdded] = useState([]);
  const [selectedItemParents, setSelectedItemParents] = useState([{ ...data }]);
  const [expandedItems, setExpandedItems] = useState([]);

  const expandViewHandler = (parents) => {
    let isExpanded = false;
    let expansionArray = [...expandedItems];
    for (let i = 0; i < expandedItems.length; i++) {
      if (expandedItems[i].length === parents.length) {
        let counter = 0;
        for (let j = 0; j < parents.length; j++) {
          if (expandedItems[i][j].label !== parents[j].label) break;
          else counter++;
        }
        if (counter === parents.length) {
          isExpanded = true;
          expansionArray.splice(i, 1);
          setExpandedItems(expansionArray);
          break;
        }
      }
    }
    if (!isExpanded) setExpandedItems([...expandedItems, parents]);
  };

  const clickHandler = (parents, value) => {
    setSelectedItemParents([...parents]);
  };

  const expandIconClickHandler = (parents) => {
    expandViewHandler(parents);
  };

  const actionClickHandler = (allParents, value) => {
    switch (value.title) {
      case 'Add Folder': {
        const newParents = allParents.slice(1);
        setParentsWhereChildrenAreToBeAdded(newParents);
        setAddNodeModalOpen(true);
        setNewNodeName('');
        break;
      }
      case 'Delete Folder': {
        let parents = allParents.slice(1);
        const newParents = [...parents];
        newParents.splice(-1, 1);
        const updatedData = getUpdatedDataAfterDeletion(
          treeData.nodes,
          newParents,
          parents[parents.length - 1].label,
          'node'
        );
        setTreeData({ ...treeData, nodes: updatedData });
        const newSelectedItemParents = [...allParents];
        newSelectedItemParents.splice(-1, 1);
        setSelectedItemParents([...newSelectedItemParents]);
        break;
      }
      case 'Delete Secret': {
        let parents = allParents.slice(1);
        const newParents = [...parents];
        newParents.splice(-1, 1);
        const updatedData = getUpdatedDataAfterDeletion(
          treeData.nodes,
          newParents,
          parents[parents.length - 1].label,
          'leaf'
        );
        setTreeData({ ...treeData, nodes: updatedData });
        break;
      }
    }
  };

  const getUpdatedDataAfterDeletion = (rootNodes, ancestorsArray, child, entity) => {
    let nodesCopy = [...rootNodes];
    let desiredNodes = nodesCopy;
    for (let i = 0; i < ancestorsArray.length; i++) {
      for (let j = 0; j < desiredNodes?.length; j++) {
        if (desiredNodes[j].label === ancestorsArray[i].label) {
          if (i === ancestorsArray.length - 1 && entity === 'leaf') {
            desiredNodes = desiredNodes[j].leaves;
          } else desiredNodes = desiredNodes[j].nodes;
          break;
        }
      }
    }
    let requiredIndex;
    for (let j = 0; j < desiredNodes?.length; j++) {
      if (desiredNodes[j].label === child) {
        requiredIndex = j;
        break;
      }
    }
    desiredNodes.splice(requiredIndex, 1);
    return nodesCopy;
  };

  const getUpdatedData = (rootNodes, ancestorsArray, children) => {
    let nodesCopy = [...rootNodes];
    let desiredNodes = nodesCopy;
    for (let i = 0; i < ancestorsArray.length; i++) {
      for (let j = 0; j < desiredNodes?.length; j++) {
        if (desiredNodes[j].label === ancestorsArray[i].label) {
          if (!desiredNodes[j].nodes) {
            desiredNodes[j].nodes = [];
          }
          desiredNodes = desiredNodes[j].nodes;
          break;
        }
      }
    }
    for (let i = 0; i < children.length; i++) {
      if (children[i].entityType === 'node') {
        desiredNodes.push({
          label: children[i].name,
          hasChildren: true,
          details: {
            entityType: children[i].entityType,
          },
          actionItems: [{ title: 'Add Folder' }, { title: 'Delete Folder' }],
        });
      }
    }
    return nodesCopy;
  };

  const formSubmitHandler = () => {
    const updatedData = getUpdatedData(treeData.nodes, parentsWhereChildrenAreToBeAdded, [
      { name: newNodeName, entityType: 'node' },
    ]);
    const newSelectedItemParents = [
      ...parentsWhereChildrenAreToBeAdded,
      { label: newNodeName, entityType: 'node' },
    ];
    setAddNodeModalOpen(false);
    setTreeData({ ...treeData, nodes: updatedData });
    setSelectedItemParents([...newSelectedItemParents]);
  };

  const addNewFolderActionButtons = [
    {
      text: 'Add',
      variant: 'primary',
      onClick: formSubmitHandler,
      size: 'large',
    },
  ];

  const getAddNodeModal = () => {
    return (
      <ModalPopup
        width={512}
        buttons={addNewFolderActionButtons}
        title={'Add New Folder'}
        onCancel={() => {
          setAddNodeModalOpen(false);
        }}
      >
        <Textfield value={newNodeName} onChange={(e) => setNewNodeName(e.target.value)}></Textfield>
      </ModalPopup>
    );
  };

  const renderParentList = (arr) => {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str = str.concat(` | ${arr[i].label}`);
    }
    return str;
  };
  return (
    <>
      <div style={{ marginBottom: '20px', width: 'fit-content' }}>
        {renderParentList(parentList)}
      </div>
      <div style={{ width: 'fit-content', height: '400px' }}>
        <Tree
          topPadding="48px"
          nodes={treeData}
          clickHandler={clickHandler}
          expandIconClickHandler={expandIconClickHandler}
          expandedItems={expandedItems}
          actionClickHandler={actionClickHandler}
          selectedItemParents={selectedItemParents}
        />
      </div>
      {isAddNodeModalOpen && getAddNodeModal()}
    </>
  );
};
