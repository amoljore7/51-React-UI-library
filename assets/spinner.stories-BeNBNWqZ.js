import{j as e,D as O}from"./iframe-DSshnrLJ.js";import{S as r}from"./spinner-BIcR_yT0.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";import"./typography-DAWbNXo9.js";const T={title:"design-components/Spinner",component:r},o=()=>{const n={message:"Loading Message..."};return e.jsx(r,{...n})},a=()=>{const n={size:"medium",message:"Loading Message..."};return e.jsx(r,{...n})},t=()=>{const n={size:"small"};return e.jsx(r,{...n})},i=()=>{const n={size:"medium",message:"Loading Message...",overlay:!0};return e.jsxs("div",{children:[e.jsx("span",{children:"Some page content on background"}),e.jsx(r,{...n})]})},p=()=>{const n={size:"medium",message:"Loading Message...",overlayOnContainer:!0};return e.jsxs("div",{children:[e.jsx("span",{children:"Some page content on background"}),e.jsxs("div",{style:{border:"1px solid black",height:"300px",width:"300px",position:"relative"},children:[e.jsx("p",{children:"Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box. Some page content inside box."}),e.jsx(r,{...n})]})]})},s=()=>e.jsx(O,{children:e.jsx(o,{})});s.storyName="Dark theme";o.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"Medium"};t.__docgenInfo={description:"",methods:[],displayName:"Small"};i.__docgenInfo={description:"",methods:[],displayName:"WithOverlay"};p.__docgenInfo={description:"",methods:[],displayName:"WithContainerOverlay"};s.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var d,c,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const props = {
    message: 'Loading Message...'
  };
  return <Spinner {...props}></Spinner>;
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var g,l,u;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const props = {
    size: 'medium',
    message: 'Loading Message...'
  };
  return <Spinner {...props}></Spinner>;
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var S,x,h;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const props = {
    size: 'small'
  };
  return <Spinner {...props}></Spinner>;
}`,...(h=(x=t.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var b,v,y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
    overlay: true
  };
  return <div>
      <span>Some page content on background</span>
      <Spinner {...props}></Spinner>
    </div>;
}`,...(y=(v=i.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var f,j,_;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const props = {
    size: 'medium',
    message: 'Loading Message...',
    overlayOnContainer: true
  };

  //NOTE: Parent div element must always have position as "relative"
  //      to support the spinner to overlay above the container
  //      and not on the page.

  return <div>
      <span>Some page content on background</span>
      <div style={{
      border: '1px solid black',
      height: '300px',
      width: '300px',
      position: 'relative'
    }}>
        <p>
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
          Some page content inside box.
        </p>
        <Spinner {...props}></Spinner>
      </div>
    </div>;
}`,...(_=(j=p.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var k,D,M;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`() => <DarkStorySurface>
    <Default />
  </DarkStorySurface>`,...(M=(D=s.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};const w=["Default","Medium","Small","WithOverlay","WithContainerOverlay","DarkTheme"];export{s as DarkTheme,o as Default,a as Medium,t as Small,p as WithContainerOverlay,i as WithOverlay,w as __namedExportsOrder,T as default};
