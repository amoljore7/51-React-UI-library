import{j as r,D as q,r as c}from"./iframe-DSshnrLJ.js";import{Q as p}from"./query-selector-lfAxpqaB.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DyAci3dY.js";import"./select-BPCd_p1U.js";import"./menu-options-container-Dz3d7hAm.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./index-BWW3-H0m.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./tooltip-DiFZ0xw-.js";import"./typography-DAWbNXo9.js";import"./index-DDIoMWDg.js";import"./iconBase-D3NFPLFw.js";import"./multiTextfield-C2WpN58z.js";import"./index-BvCv2CeA.js";import"./lodash-CZCsm8Vw.js";import"./textfield-CT1gls30.js";import"./info-XWXRQWYd.js";import"./autocomplete-BqXVoget.js";import"./pill-C92xEsKe.js";import"./cancel-CSA1kihF.js";import"./close-BgG3N9nv.js";const Z={title:"design-components/QuerySelector",component:p},s=()=>{const[e,n]=c.useState([]),i={attributeOptions:[{attribute:"skills-1"},{attribute:"skills-2"},{attribute:"skills-3"}],attributeGetOptionLabel:function(t){return t==null?void 0:t.attribute},attributeOptionsLabel:"attribute",handleAddQueryPills:t=>{n([t]),console.log(t)},queryId:1,query:e,currentElement:e[0],isStandalone:!0};return r.jsx("div",{children:r.jsx(p,{...i})})},a=()=>{const[e,n]=c.useState([{attribute:"skills-1",isActiveIndex:!1,value:""}]),i={attributeOptions:[{attribute:"skills-1"},{attribute:"skills-2"},{attribute:"skills-3"}],attributeGetOptionLabel:function(t){return t==null?void 0:t.attribute},attributeOptionsLabel:"attribute",handleAddQueryPills:t=>{n([t]),console.log(t)},onInputChange:()=>{},query:e,currentElement:e[0],isStandalone:!0,onlyAttributeInput:!0};return r.jsx("div",{children:r.jsx(p,{...i})})},l=()=>{const[e,n]=c.useState([{attribute:"skills-1",isActiveIndex:!1,value:""}]),i={attributeOptions:[{attribute:"skills-1"},{attribute:"skills-2"},{attribute:"skills-3"}],attributeGetOptionLabel:function(t){return t==null?void 0:t.attribute},attributeOptionsLabel:"attribute",handleAddQueryPills:t=>{n([t]),console.log(t)},onInputChange:()=>{},query:e,currentElement:e[0],isStandalone:!0,onlyAttributeInput:!0,excludedAttributes:["skills-3"]};return r.jsx("div",{children:r.jsx(p,{...i})})},o=()=>{const[e,n]=c.useState([{attribute:"skills-1",isActiveIndex:!1,value:""}]),i={attributeOptions:[{attribute:"skills-1",type:"Type-1"},{attribute:"skills-2",type:"Type-1"},{attribute:"skills-3",type:"Type-1"},{attribute:"skills-4",type:"Type-2"},{attribute:"skills-5",type:"Type-2"},{attribute:"skills-6",type:"Type-3"}],attributeGetOptionLabel:function(t){return t==null?void 0:t.attribute},attributeOptionsLabel:"attribute",handleAddQueryPills:t=>{n([t]),console.log(t)},onInputChange:()=>{},query:e,currentElement:e[0],isStandalone:!0,onlyAttributeInput:!0,groupPropertyName:"type"};return r.jsx("div",{children:r.jsx(p,{...i})})},u=()=>r.jsx(q,{style:{minHeight:120},children:r.jsx(s,{})});u.storyName="Dark theme";s.__docgenInfo={description:"",methods:[],displayName:"QuerySelectorDemo"};a.__docgenInfo={description:"",methods:[],displayName:"OnlyAttribute"};l.__docgenInfo={description:"",methods:[],displayName:"OnlyAttributeWithExcludedAtributes"};o.__docgenInfo={description:"",methods:[],displayName:"OnlyAttributeWithGroupOptions"};u.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var b,d,y;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState([]);
  const props = {
    attributeOptions: [{
      attribute: 'skills-1'
    }, {
      attribute: 'skills-2'
    }, {
      attribute: 'skills-3'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: value => {
      setQuery([value]), console.log(value);
    },
    queryId: 1,
    query: query,
    currentElement: query[0],
    isStandalone: true
  };
  return <div>
      <QuerySelector {...props} />
    </div>;
}`,...(y=(d=s.parameters)==null?void 0:d.docs)==null?void 0:y.source}}};var m,h,k;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState([{
    attribute: 'skills-1',
    isActiveIndex: false,
    value: ''
  }]);
  const props = {
    attributeOptions: [{
      attribute: 'skills-1'
    }, {
      attribute: 'skills-2'
    }, {
      attribute: 'skills-3'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: value => {
      setQuery([value]), console.log(value);
    },
    onInputChange: () => {},
    query,
    // This is equivalent to the value
    // in the input element.
    currentElement: query[0],
    isStandalone: true,
    onlyAttributeInput: true
  };
  return <div>
      <QuerySelector {...props} />
    </div>;
}`,...(k=(h=a.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var v,S,O;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState([{
    attribute: 'skills-1',
    isActiveIndex: false,
    value: ''
  }]);
  const props = {
    attributeOptions: [{
      attribute: 'skills-1'
    }, {
      attribute: 'skills-2'
    }, {
      attribute: 'skills-3'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: value => {
      setQuery([value]), console.log(value);
    },
    onInputChange: () => {},
    query,
    // This is equivalent to the value
    // in the input element.
    currentElement: query[0],
    isStandalone: true,
    onlyAttributeInput: true,
    excludedAttributes: ['skills-3']
  };
  return <div>
      <QuerySelector {...props} />
    </div>;
}`,...(O=(S=l.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var A,Q,g;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState([{
    attribute: 'skills-1',
    isActiveIndex: false,
    value: ''
  }]);
  const props = {
    attributeOptions: [{
      attribute: 'skills-1',
      type: 'Type-1'
    }, {
      attribute: 'skills-2',
      type: 'Type-1'
    }, {
      attribute: 'skills-3',
      type: 'Type-1'
    }, {
      attribute: 'skills-4',
      type: 'Type-2'
    }, {
      attribute: 'skills-5',
      type: 'Type-2'
    }, {
      attribute: 'skills-6',
      type: 'Type-3'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: value => {
      setQuery([value]), console.log(value);
    },
    onInputChange: () => {},
    query,
    // This is equivalent to the value
    // in the input element.
    currentElement: query[0],
    isStandalone: true,
    onlyAttributeInput: true,
    groupPropertyName: 'type'
  };
  return <div>
      <QuerySelector {...props} />
    </div>;
}`,...(g=(Q=o.parameters)==null?void 0:Q.docs)==null?void 0:g.source}}};var x,f,I;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`() => <DarkStorySurface style={{
  minHeight: 120
}}>
    <QuerySelectorDemo />
  </DarkStorySurface>`,...(I=(f=u.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};const $=["QuerySelectorDemo","OnlyAttribute","OnlyAttributeWithExcludedAtributes","OnlyAttributeWithGroupOptions","DarkTheme"];export{u as DarkTheme,a as OnlyAttribute,l as OnlyAttributeWithExcludedAtributes,o as OnlyAttributeWithGroupOptions,s as QuerySelectorDemo,$ as __namedExportsOrder,Z as default};
