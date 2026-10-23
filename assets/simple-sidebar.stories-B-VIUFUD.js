import{j as a,D as f,r as k}from"./iframe-DSshnrLJ.js";import{c as D}from"./index-DyAci3dY.js";import{S as x,a as b}from"./chevron-right-Ds3t0oc5.js";import"./preload-helper-Dp1pzeXC.js";const o={containerActive:"active",container:"simple-sidebar-container",arrow:"sidebar-toggle-arrow"},i=({isOpen:e,onToggle:t,children:n,width:S,height:h})=>{const u={[o.container]:!0,[o.containerActive]:e};return a.jsxs("div",{className:D({...u}),style:{height:h,...e?{width:S}:{}},children:[e?a.jsx(x,{"data-testid":"toggle",className:o.arrow,onClick:t,"aria-hidden":!0,focusable:"false"}):a.jsx(b,{"data-testid":"toggle",className:o.arrow,onClick:t,"aria-hidden":!0,focusable:"false"}),e&&n]})};i.__docgenInfo={description:"",methods:[],displayName:"SimpleSidebar"};const j={title:"design-components/SimpleSidebar",component:i},r=()=>{const[e,t]=k.useState(!0),n=()=>{t(!e)};return a.jsx(i,{isOpen:e,onToggle:n,width:328,height:500,children:"Test"})},s=()=>a.jsx(f,{style:{minHeight:520},children:a.jsx(r,{})});s.storyName="Dark theme";r.__docgenInfo={description:"",methods:[],displayName:"Demo"};s.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var c,d,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [isOpen, setIsOpen] = useState(true);
  const drawerToggleClickHandler = () => {
    setIsOpen(!isOpen);
  };
  return <SimpleSidebar isOpen={isOpen} onToggle={drawerToggleClickHandler} width={328} height={500}>
      Test
    </SimpleSidebar>;
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,p,g;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`() => <DarkStorySurface style={{
  minHeight: 520
}}>
    <Demo />
  </DarkStorySurface>`,...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const v=["Demo","DarkTheme"];export{s as DarkTheme,r as Demo,v as __namedExportsOrder,j as default};
