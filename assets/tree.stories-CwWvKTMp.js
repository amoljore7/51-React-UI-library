import{r as l,j as e,D as ne}from"./iframe-DSshnrLJ.js";import{M as te}from"./modal-popup-Do-1riew.js";import{T as ae}from"./textfield-CT1gls30.js";import{P as f}from"./index-BWW3-H0m.js";import{c as Z}from"./index-DyAci3dY.js";import{B as re,a as oe}from"./index-7wkQa-av.js";import{a as se}from"./index-DYkpmOsP.js";import{c as le}from"./index-CKFxPKe7.js";import{O as ee}from"./overflow-menu-CrNKOq9o.js";import"./preload-helper-Dp1pzeXC.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./typography-DAWbNXo9.js";import"./button-D98htB4G.js";import"./tooltip-DiFZ0xw-.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";import"./index-BvCv2CeA.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./info-XWXRQWYd.js";import"./menu-options-container-Dz3d7hAm.js";const b={container:"tree-node-container",trackingLine:"tree-node-tracking-line-container",dirIconContainer:"tree-node-dir-icon",contentBoxContainer:"tree-node-content-box-container",contentBox:"tree-node-content-box",contentBoxLeftWrapper:"tree-node-content-box-left-wrapper",treeNodeParentContainerLeftWrapper:"tree-node-parent-container-left-wrapper",contentBoxIcon:"tree-node-content-box-icon",contentBoxText:"tree-node-content-box-text",contentBoxSelect:"tree-node-content-box-select",parentNodeContainer:"tree-node-parent-node-container",parentNodeContainerSelect:"tree-node-parent-node-container-select",parentContainer:"tree-node-parent-container",parentIcon:"tree-node-parent-icon",parentText:"tree-node-parent-text",actionIconHolder:"tree-node-action-item-holder"},W={boundingContainer:"tree-bounding-container",container:"tree-container",resize:"tree-resize-line"},_=28,z=32,H=24,ie=4,q="0",de="-1",ce="leaf-item-",pe="tree-node-item-",ue="mousedown",X="mousemove",fe="mouseup",me="nodes",ye=t=>t?e.jsx(re,{size:H}):e.jsx(oe,{size:H}),he=({leave:t,level:c,clickHandler:g,parents:d,actionClickHandler:I,selectedItemParents:p,actionItems:s})=>{const x=l.useRef(),[y,j]=l.useState(!1),[D,m]=l.useState(!1);l.useLayoutEffect(()=>{x.current.style.marginLeft=`${_+z*c}px`},[]),l.useEffect(()=>{var P,S;j(!1);const o=p==null?void 0:p.length;let N=0;if((d==null?void 0:d.length)<=(p==null?void 0:p.length))for(let T=0;T<o&&(d[T]&&p[T]&&((P=d[T])==null?void 0:P.label)===((S=p[T])==null?void 0:S.label));T++)N++;N===o&&j(!0)});const v={[b.contentBoxContainer]:!0,[b.contentBoxSelect]:y};return e.jsx("div",{className:Z({...v}),onClick:()=>{g(d)},tabIndex:q,onMouseEnter:()=>m(!0),onMouseLeave:()=>m(!1),children:e.jsxs("div",{className:b.contentBox,ref:x,tabIndex:q,children:[e.jsxs("div",{className:b.contentBoxLeftWrapper,children:[e.jsx("div",{className:b.contentBoxIcon,children:e.jsx(le,{size:H})}),e.jsx("div",{className:b.contentBoxText,children:e.jsx("span",{children:t.label})})]}),e.jsx("div",{className:b.actionIconHolder,children:D&&!!s.length&&e.jsx(ee,{onClick:o=>{o.stopPropagation()},options:t.actionItems,getOptionLabel:o=>o.title,onChange:(o,N)=>{o.stopPropagation(),m(!1),I(d,N)}})})]})})},ge=({name:t,actionItems:c,expansionHandler:g,expandedItems:d,expanded:I,level:p,parents:s,clickHandler:x,isNodesEmpty:y,isLeavesEmpty:j,actionClickHandler:D,expandIconClickHandler:m,hasChildren:v,selectedItemParents:o})=>{const N=l.useRef(),P=l.useRef(),[S,T]=l.useState(!1),[L,F]=l.useState(!1);l.useLayoutEffect(()=>{N.current.style.marginLeft=`${p===0?0:_+z*(p-1)+ie}px`},[]),l.useEffect(()=>{var C,A,a;for(let i=0;i<(d==null?void 0:d.length);i++)if(((C=d[i])==null?void 0:C.length)===(s==null?void 0:s.length)){let n=0;for(let u=0;u<s.length&&((A=d[i][u])==null?void 0:A.label)===((a=s[u])==null?void 0:a.label);u++)n++;if(n===(s==null?void 0:s.length)){g();break}}},[]),l.useEffect(()=>{var a,i;T(!1);const C=o==null?void 0:o.length;let A=0;if((s==null?void 0:s.length)<=(o==null?void 0:o.length))for(let n=0;n<C&&(s[n]&&o[n]&&((a=s[n])==null?void 0:a.label)===((i=o[n])==null?void 0:i.label));n++)A++;A===C&&T(!0)});const U={[b.parentNodeContainer]:!0,[b.parentNodeContainerSelect]:S},M=y()&&j()?de:q;return e.jsx("div",{className:Z({...U}),ref:P,onClick:()=>{x(s)},tabIndex:q,onMouseEnter:()=>F(!0),onMouseLeave:()=>F(!1),children:e.jsxs("div",{className:b.parentContainer,ref:N,children:[e.jsxs("div",{className:b.treeNodeParentContainerLeftWrapper,children:[e.jsx("div",{className:b.dirIconContainer,onClick:C=>{C.stopPropagation(),g(),m&&m(s)},tabIndex:M,children:v&&ye(I)}),e.jsx("div",{className:b.parentIcon,children:e.jsx(se,{size:H})}),e.jsx("div",{className:b.parentText,children:t})]}),e.jsx("div",{className:b.actionIconHolder,children:L&&!!c.length&&e.jsx(ee,{onClick:C=>{C.stopPropagation()},options:c,getOptionLabel:C=>C.title,onChange:(C,A)=>{C.stopPropagation(),F(!1),D(s,A)}})})]})})},O=({nodes:t,level:c,parents:g,clickHandler:d,expandIconClickHandler:I,actionClickHandler:p,selectedItemParents:s,expandedItems:x})=>{const[y,j]=l.useState(!1),D=l.useRef(),m=l.useRef();l.useLayoutEffect(()=>{y&&(!N()||!o())&&(D.current.style.left=`${_+z*c}px`)});const v=()=>{j(!y)},o=()=>!t.nodes||t.nodes.length===0,N=()=>!t.leaves||t.leaves.length===0,P={name:t.label,actionItems:t.actionItems,hasChildren:t.hasChildren,expansionHandler:v,expandedItems:x,expanded:y,level:c,isNodesEmpty:o,isLeavesEmpty:N,parents:[...g,{...t}],clickHandler:d,actionClickHandler:p,expandIconClickHandler:I,selectedItemParents:s};return e.jsxs("div",{className:b.container,ref:m,children:[e.jsx(ge,{...P}),y&&t.nodes&&t.nodes.map((S,T)=>{const L={nodes:S,level:c+1,parents:[...g,{...t}],clickHandler:d,key:`${pe}-${t.label}-${T}`,actionClickHandler:p,expandIconClickHandler:I,selectedItemParents:s,expandedItems:x};return e.jsx(O,{...L})}),y&&t.leaves&&t.leaves.map((S,T)=>{const L={clickHandler:d,actionItems:S.actionItems,leave:S,level:c,parents:[...g,{...t},{...S}],key:`${ce}-${t.label}-${T}`,actionClickHandler:p,selectedItemParents:s};return e.jsx(he,{...L})}),y&&(!N()||!o())&&e.jsx("div",{ref:D,className:b.trackingLine})]})};O.__docgenInfo={description:"",methods:[],displayName:"TreeNode"};const $=({nodes:t,clickHandler:c,expandIconClickHandler:g,actionClickHandler:d,topPadding:I,selectedItemParents:p,expandedItems:s})=>{const x=l.useRef(),y=l.useRef(),j=m=>{const o=x.current.getBoundingClientRect().left+window.pageXOffset,N=m.pageX-o;x.current.style.width=parseInt(N)+"px"};l.useLayoutEffect(()=>{const m=x.current.getBoundingClientRect();y.current.style.top=window.pageYOffset+m.top,y.current.style.right=window.pageXOffset+m.left},[]),l.useEffect(()=>{y.current.addEventListener(ue,m=>{const o=y.current.getBoundingClientRect().right+window.pageXOffset;m.pageX>o-4&&m.pageX<o+4&&document.addEventListener(X,j,!1)},!1),document.addEventListener(fe,()=>{document.removeEventListener(X,j,!1)})},[]);const D={nodes:t,level:0,parents:[],clickHandler:c,expandIconClickHandler:g,actionClickHandler:d,selectedItemParents:p,expandedItems:s};return e.jsxs("div",{className:W.boundingContainer,children:[e.jsx("div",{ref:x,style:{paddingTop:I},className:W.container,tabIndex:q,children:e.jsx(O,{...D})}),e.jsx("div",{className:W.resize,ref:y})]})},be=(t={},c)=>{const g=(...d)=>f.shape(t).apply(null,d);return t[c]=f.arrayOf(g),g};$.propTypes={nodes:f.shape({label:f.string.isRequired,leaves:f.any,hasChildren:f.bool.isRequired,actionItems:f.any,details:f.any,nodes:f.arrayOf(be({label:f.string.isRequired,leaves:f.arrayOf(f.object),hasChildren:f.bool.isRequired,actionItems:f.any,details:f.any},me))}).isRequired,clickHandler:f.func.isRequired,topPadding:f.string,expandIconClickHandler:f.func.isRequired,actionClickHandler:f.func.isRequired,expandedItems:f.array,selectedItemParents:f.array.isRequired};$.__docgenInfo={description:"",methods:[],displayName:"Tree",props:{nodes:{description:"",type:{name:"shape",value:{label:{name:"string",required:!0},leaves:{name:"any",required:!1},hasChildren:{name:"bool",required:!0},actionItems:{name:"any",required:!1},details:{name:"any",required:!1},nodes:{name:"arrayOf",value:{name:"custom",raw:`recursiveShapeType(
  {
    label: PropTypes.string.isRequired,
    leaves: PropTypes.arrayOf(PropTypes.object),
    hasChildren: PropTypes.bool.isRequired,
    actionItems: PropTypes.any,
    details: PropTypes.any,
  },
  recursivePropName
)`},required:!1}}},required:!0},clickHandler:{description:"",type:{name:"func"},required:!0},topPadding:{description:"",type:{name:"string"},required:!1},expandIconClickHandler:{description:"",type:{name:"func"},required:!0},actionClickHandler:{description:"",type:{name:"func"},required:!0},expandedItems:{description:"",type:{name:"array"},required:!1},selectedItemParents:{description:"",type:{name:"array"},required:!0}}};const Me={title:"design-components/Tree",component:O},B=()=>{const t={label:"All Secrets",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}],nodes:[{label:"Project A",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}],nodes:[{label:"Dev",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}],nodes:[{label:"Project Level1",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}],nodes:[{label:"Project Level2",hasChildren:!0,details:{entityType:"node"},nodes:[{label:"Project Level3",hasChildren:!0,details:{entityType:"node"},nodes:[],actionItems:[{title:"Add Folder"}],leaves:[{label:"Secret Level3",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]}],actionItems:[{title:"Add Folder"}],leaves:[{label:"Secret 37",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]}],leaves:[{label:"Secret 3",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]},{label:"DB",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}],leaves:[{label:"My SQL",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]},{label:"Oracle",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]}],leaves:[{label:"Secret 777",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]},{label:"UAT",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}]}],leaves:[{label:"Secret 1",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]},{label:"Project B",hasChildren:!0,details:{entityType:"node"},actionItems:[{title:"Add Folder"}],nodes:[],leaves:[{label:"Secret 2",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]},{label:"Project C",hasChildren:!0,details:{entityType:"node"},nodes:[],leaves:[{label:"Secret 3",details:{entityType:"leaf"},actionItems:[{title:"Delete Secret"}]}]}]},[c,g]=l.useState(t),[d]=l.useState([]),[I,p]=l.useState(!1),[s,x]=l.useState(""),[y,j]=l.useState([]),[D,m]=l.useState([{...t}]),[v,o]=l.useState([]),N=a=>{let i=!1,n=[...v];for(let u=0;u<v.length;u++)if(v[u].length===a.length){let h=0;for(let r=0;r<a.length&&v[u][r].label===a[r].label;r++)h++;if(h===a.length){i=!0,n.splice(u,1),o(n);break}}i||o([...v,a])},P=(a,i)=>{m([...a])},S=a=>{N(a)},T=(a,i)=>{switch(i.title){case"Add Folder":{const n=a.slice(1);j(n),p(!0),x("");break}case"Delete Folder":{let n=a.slice(1);const u=[...n];u.splice(-1,1);const h=L(c.nodes,u,n[n.length-1].label,"node");g({...c,nodes:h});const r=[...a];r.splice(-1,1),m([...r]);break}case"Delete Secret":{let n=a.slice(1);const u=[...n];u.splice(-1,1);const h=L(c.nodes,u,n[n.length-1].label,"leaf");g({...c,nodes:h});break}}},L=(a,i,n,u)=>{let h=[...a],r=h;for(let k=0;k<i.length;k++)for(let E=0;E<(r==null?void 0:r.length);E++)if(r[E].label===i[k].label){k===i.length-1&&u==="leaf"?r=r[E].leaves:r=r[E].nodes;break}let w;for(let k=0;k<(r==null?void 0:r.length);k++)if(r[k].label===n){w=k;break}return r.splice(w,1),h},F=(a,i,n)=>{let u=[...a],h=u;for(let r=0;r<i.length;r++)for(let w=0;w<(h==null?void 0:h.length);w++)if(h[w].label===i[r].label){h[w].nodes||(h[w].nodes=[]),h=h[w].nodes;break}for(let r=0;r<n.length;r++)n[r].entityType==="node"&&h.push({label:n[r].name,hasChildren:!0,details:{entityType:n[r].entityType},actionItems:[{title:"Add Folder"},{title:"Delete Folder"}]});return u},M=[{text:"Add",variant:"primary",onClick:()=>{const a=F(c.nodes,y,[{name:s,entityType:"node"}]),i=[...y,{label:s,entityType:"node"}];p(!1),g({...c,nodes:a}),m([...i])},size:"large"}],C=()=>e.jsx(te,{width:512,buttons:M,title:"Add New Folder",onCancel:()=>{p(!1)},children:e.jsx(ae,{value:s,onChange:a=>x(a.target.value)})}),A=a=>{let i="";for(let n=0;n<a.length;n++)i=i.concat(` | ${a[n].label}`);return i};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{marginBottom:"20px",width:"fit-content"},children:A(d)}),e.jsx("div",{style:{width:"fit-content",height:"400px"},children:e.jsx($,{topPadding:"48px",nodes:c,clickHandler:P,expandIconClickHandler:S,expandedItems:v,actionClickHandler:T,selectedItemParents:D})}),I&&C()]})},R=()=>e.jsx(ne,{style:{minHeight:500},children:e.jsx(B,{})});R.storyName="Dark theme";B.__docgenInfo={description:"",methods:[],displayName:"DemoTree"};R.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var V,K,Q;B.parameters={...B.parameters,docs:{...(V=B.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const data = {
    label: 'All Secrets',
    hasChildren: true,
    details: {
      entityType: 'node'
    },
    actionItems: [{
      title: 'Add Folder'
    }],
    nodes: [{
      label: 'Project A',
      hasChildren: true,
      details: {
        entityType: 'node'
      },
      actionItems: [{
        title: 'Add Folder'
      }],
      nodes: [{
        label: 'Dev',
        hasChildren: true,
        details: {
          entityType: 'node'
        },
        actionItems: [{
          title: 'Add Folder'
        }],
        nodes: [{
          label: 'Project Level1',
          hasChildren: true,
          details: {
            entityType: 'node'
          },
          actionItems: [{
            title: 'Add Folder'
          }],
          nodes: [{
            label: 'Project Level2',
            hasChildren: true,
            details: {
              entityType: 'node'
            },
            nodes: [{
              label: 'Project Level3',
              hasChildren: true,
              details: {
                entityType: 'node'
              },
              nodes: [],
              actionItems: [{
                title: 'Add Folder'
              }],
              leaves: [{
                label: 'Secret Level3',
                details: {
                  entityType: 'leaf'
                },
                actionItems: [{
                  title: 'Delete Secret'
                }]
              }]
            }],
            actionItems: [{
              title: 'Add Folder'
            }],
            leaves: [{
              label: 'Secret 37',
              details: {
                entityType: 'leaf'
              },
              actionItems: [{
                title: 'Delete Secret'
              }]
            }]
          }],
          leaves: [{
            label: 'Secret 3',
            details: {
              entityType: 'leaf'
            },
            actionItems: [{
              title: 'Delete Secret'
            }]
          }]
        }, {
          label: 'DB',
          hasChildren: true,
          details: {
            entityType: 'node'
          },
          actionItems: [{
            title: 'Add Folder'
          }],
          leaves: [{
            label: 'My SQL',
            details: {
              entityType: 'leaf'
            },
            actionItems: [{
              title: 'Delete Secret'
            }]
          }, {
            label: 'Oracle',
            details: {
              entityType: 'leaf'
            },
            actionItems: [{
              title: 'Delete Secret'
            }]
          }]
        }],
        leaves: [{
          label: 'Secret 777',
          details: {
            entityType: 'leaf'
          },
          actionItems: [{
            title: 'Delete Secret'
          }]
        }]
      }, {
        label: 'UAT',
        hasChildren: true,
        details: {
          entityType: 'node'
        },
        actionItems: [{
          title: 'Add Folder'
        }]
      }],
      leaves: [{
        label: 'Secret 1',
        details: {
          entityType: 'leaf'
        },
        actionItems: [{
          title: 'Delete Secret'
        }]
      }]
    }, {
      label: 'Project B',
      hasChildren: true,
      details: {
        entityType: 'node'
      },
      actionItems: [{
        title: 'Add Folder'
      }],
      nodes: [],
      leaves: [{
        label: 'Secret 2',
        details: {
          entityType: 'leaf'
        },
        actionItems: [{
          title: 'Delete Secret'
        }]
      }]
    }, {
      label: 'Project C',
      hasChildren: true,
      details: {
        entityType: 'node'
      },
      nodes: [],
      leaves: [{
        label: 'Secret 3',
        details: {
          entityType: 'leaf'
        },
        actionItems: [{
          title: 'Delete Secret'
        }]
      }]
    }]
  };
  const [treeData, setTreeData] = useState(data);
  const [parentList] = useState([]);
  const [isAddNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [parentsWhereChildrenAreToBeAdded, setParentsWhereChildrenAreToBeAdded] = useState([]);
  const [selectedItemParents, setSelectedItemParents] = useState([{
    ...data
  }]);
  const [expandedItems, setExpandedItems] = useState([]);
  const expandViewHandler = parents => {
    let isExpanded = false;
    let expansionArray = [...expandedItems];
    for (let i = 0; i < expandedItems.length; i++) {
      if (expandedItems[i].length === parents.length) {
        let counter = 0;
        for (let j = 0; j < parents.length; j++) {
          if (expandedItems[i][j].label !== parents[j].label) break;else counter++;
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
  const clickHandler = (parents, _value) => {
    setSelectedItemParents([...parents]);
  };
  const expandIconClickHandler = parents => {
    expandViewHandler(parents);
  };
  const actionClickHandler = (allParents, value) => {
    switch (value.title) {
      case 'Add Folder':
        {
          const newParents = allParents.slice(1);
          setParentsWhereChildrenAreToBeAdded(newParents);
          setAddNodeModalOpen(true);
          setNewNodeName('');
          break;
        }
      case 'Delete Folder':
        {
          let parents = allParents.slice(1);
          const newParents = [...parents];
          newParents.splice(-1, 1);
          const updatedData = getUpdatedDataAfterDeletion(treeData.nodes, newParents, parents[parents.length - 1].label, 'node');
          setTreeData({
            ...treeData,
            nodes: updatedData
          });
          const newSelectedItemParents = [...allParents];
          newSelectedItemParents.splice(-1, 1);
          setSelectedItemParents([...newSelectedItemParents]);
          break;
        }
      case 'Delete Secret':
        {
          let parents = allParents.slice(1);
          const newParents = [...parents];
          newParents.splice(-1, 1);
          const updatedData = getUpdatedDataAfterDeletion(treeData.nodes, newParents, parents[parents.length - 1].label, 'leaf');
          setTreeData({
            ...treeData,
            nodes: updatedData
          });
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
            entityType: children[i].entityType
          },
          actionItems: [{
            title: 'Add Folder'
          }, {
            title: 'Delete Folder'
          }]
        });
      }
    }
    return nodesCopy;
  };
  const formSubmitHandler = () => {
    const updatedData = getUpdatedData(treeData.nodes, parentsWhereChildrenAreToBeAdded, [{
      name: newNodeName,
      entityType: 'node'
    }]);
    const newSelectedItemParents = [...parentsWhereChildrenAreToBeAdded, {
      label: newNodeName,
      entityType: 'node'
    }];
    setAddNodeModalOpen(false);
    setTreeData({
      ...treeData,
      nodes: updatedData
    });
    setSelectedItemParents([...newSelectedItemParents]);
  };
  const addNewFolderActionButtons = [{
    text: 'Add',
    variant: 'primary',
    onClick: formSubmitHandler,
    size: 'large'
  }];
  const getAddNodeModal = () => {
    return <ModalPopup width={512} buttons={addNewFolderActionButtons} title={'Add New Folder'} onCancel={() => {
      setAddNodeModalOpen(false);
    }}>
        <Textfield value={newNodeName} onChange={e => setNewNodeName(e.target.value)} />
      </ModalPopup>;
  };
  const renderParentList = arr => {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str = str.concat(\` | \${arr[i].label}\`);
    }
    return str;
  };
  return <>
      <div style={{
      marginBottom: '20px',
      width: 'fit-content'
    }}>
        {renderParentList(parentList)}
      </div>
      <div style={{
      width: 'fit-content',
      height: '400px'
    }}>
        <Tree topPadding="48px" nodes={treeData} clickHandler={clickHandler} expandIconClickHandler={expandIconClickHandler} expandedItems={expandedItems} actionClickHandler={actionClickHandler} selectedItemParents={selectedItemParents} />
      </div>
      {isAddNodeModalOpen && getAddNodeModal()}
    </>;
}`,...(Q=(K=B.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Y,G,J;R.parameters={...R.parameters,docs:{...(Y=R.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <DarkStorySurface style={{
  minHeight: 500
}}>
    <DemoTree />
  </DarkStorySurface>`,...(J=(G=R.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};const We=["DemoTree","DarkTheme"];export{R as DarkTheme,B as DemoTree,We as __namedExportsOrder,Me as default};
