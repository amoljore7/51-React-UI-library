import{j as e,C as A,a as T,D as F}from"./iframe-DSshnrLJ.js";import{O as d,d as p}from"./overflow-menu-CrNKOq9o.js";import{a as R,b as W,c as L,d as k,e as M}from"./index-BvCv2CeA.js";import"./preload-helper-Dp1pzeXC.js";import"./menu-options-container-Dz3d7hAm.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./index-DyAci3dY.js";import"./index-BWW3-H0m.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./iconBase-D3NFPLFw.js";const Y={title:"design-components/OverflowMenu",component:d},r=()=>{const n={options:[{title:"Open"},{title:"Add New Node under the same parent node"},{title:"Rename",isDisabled:!0},{separator:!0},{title:"Delete"},{title:"Add Secret"},{title:"Add policy"},{separator:!0},{title:"View Policy"}],onChange:(t,o)=>console.log(o),getOptionLabel:function(t){return t.title}};return e.jsx(d,{...n})},c=()=>{const n={options:[{title:"Open"},{title:"Add New Node under the same parent node"},{title:"Rename"},{separator:!0},{title:"Delete"},{title:"Add Secret"},{title:"Add policy"},{separator:!0},{title:"View Policy"}],width:"300px",icon:e.jsx(R,{size:p}),onChange:(t,o)=>console.log(o),getOptionLabel:function(t){return t.title}};return e.jsx(d,{...n})},s=()=>{const n={options:[{title:"Rename",icon:e.jsx(W,{size:p})},{title:"View Policy",icon:e.jsx(L,{size:p})},{title:"Copy",icon:e.jsx(k,{size:p})},{separator:!0},{title:"Delete",icon:e.jsx(M,{size:p})}],onChange:(t,o)=>console.log(o),getOptionLabel:t=>t.title,getOptionIcon:t=>t.icon};return e.jsx(d,{...n})},i=()=>{const n={options:[{title:"Open"},{title:"Rename"},{separator:!0},{title:"Delete"}],onChange:(t,o)=>console.log(o),getOptionLabel:t=>t.title,disabled:!0};return e.jsx(d,{...n})},_=()=>e.jsxs("div",{style:{display:"flex",gap:"48px"},children:[e.jsx(r,{}),e.jsx(s,{}),e.jsx(i,{})]}),a=()=>e.jsx(F,{children:e.jsx(_,{})});a.storyName="Dark theme";const l=()=>e.jsx(A,{children:e.jsx(T,{children:e.jsx(_,{})})});l.storyName="Custom theme";r.__docgenInfo={description:"",methods:[],displayName:"WithDefaultIcon"};c.__docgenInfo={description:"",methods:[],displayName:"WithCustomIcon"};s.__docgenInfo={description:"",methods:[],displayName:"WithIconsInOptions"};i.__docgenInfo={description:"",methods:[],displayName:"Disabled"};a.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};l.__docgenInfo={description:"",methods:[],displayName:"CustomTheme"};var u,m,h;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'Open'
    }, {
      title: 'Add New Node under the same parent node'
    }, {
      title: 'Rename',
      isDisabled: true
    }, {
      separator: true
    }, {
      title: 'Delete'
    }, {
      title: 'Add Secret'
    }, {
      title: 'Add policy'
    }, {
      separator: true
    }, {
      title: 'View Policy'
    }],
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <OverflowMenu {...props} />;
}`,...(h=(m=r.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var g,f,y;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'Open'
    }, {
      title: 'Add New Node under the same parent node'
    }, {
      title: 'Rename'
    }, {
      separator: true
    }, {
      title: 'Delete'
    }, {
      title: 'Add Secret'
    }, {
      title: 'Add policy'
    }, {
      separator: true
    }, {
      title: 'View Policy'
    }],
    width: '300px',
    icon: <FiInfo size={defaultIconSize} />,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <OverflowMenu {...props} />;
}`,...(y=(f=c.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var S,I,D;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'Rename',
      icon: <FiEdit2 size={defaultIconSize} />
    }, {
      title: 'View Policy',
      icon: <FiEye size={defaultIconSize} />
    }, {
      title: 'Copy',
      icon: <FiCopy size={defaultIconSize} />
    }, {
      separator: true
    }, {
      title: 'Delete',
      icon: <FiTrash2 size={defaultIconSize} />
    }],
    onChange: (event, value) => console.log(value),
    getOptionLabel: option => option.title,
    getOptionIcon: option => option.icon
  };
  return <OverflowMenu {...props} />;
}`,...(D=(I=s.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var O,x,C;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'Open'
    }, {
      title: 'Rename'
    }, {
      separator: true
    }, {
      title: 'Delete'
    }],
    onChange: (event, value) => console.log(value),
    getOptionLabel: option => option.title,
    disabled: true
  };
  return <OverflowMenu {...props} />;
}`,...(C=(x=i.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var v,w,j;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`() => <DarkStorySurface>
    <ThemeShowcase />
  </DarkStorySurface>`,...(j=(w=a.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var b,z,N;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`() => <CustomStoryDocument>
    <CustomStorySurface>
      <ThemeShowcase />
    </CustomStorySurface>
  </CustomStoryDocument>`,...(N=(z=l.parameters)==null?void 0:z.docs)==null?void 0:N.source}}};const Z=["WithDefaultIcon","WithCustomIcon","WithIconsInOptions","Disabled","DarkTheme","CustomTheme"];export{l as CustomTheme,a as DarkTheme,i as Disabled,c as WithCustomIcon,r as WithDefaultIcon,s as WithIconsInOptions,Z as __namedExportsOrder,Y as default};
