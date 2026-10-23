import{r as h,j as t}from"./iframe-DSshnrLJ.js";import{S as c}from"./switch-DnHG47ZL.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";import"./typography-DAWbNXo9.js";const P={title:"design-components/Switch",component:c},a=()=>{const[e,s]=h.useState(!1);return t.jsx(c,{checked:e,onToggle:()=>s(r=>!r)})},o=()=>{const[e,s]=h.useState(!1),r={true:"On",false:"Off"};return t.jsx(c,{checked:e,onToggle:m=>s(!m),label:r[e]})},d=()=>t.jsx(c,{checked:!1,disabled:!0,label:"Off"}),n=()=>t.jsx(c,{checked:!0,disabled:!0,label:"Off"}),l=()=>{const[e,s]=h.useState(!1);return t.jsx(c,{checked:e,onToggle:()=>s(r=>!r),error:!0,width:240,errorMessage:"Something went wrong! Please try again after sometime."})},i=()=>{const[e,s]=h.useState(!1),r={true:"On",false:"Off"};return t.jsx("div",{"data-theme":"dark",style:{padding:"24px",background:"#040520",borderRadius:"8px"},children:t.jsx(c,{checked:e,onToggle:()=>s(m=>!m),label:r[e]})})};a.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:"",methods:[],displayName:"WithLabel"};d.__docgenInfo={description:"",methods:[],displayName:"Disabled"};n.__docgenInfo={description:"",methods:[],displayName:"DisabledWithChecked"};l.__docgenInfo={description:"",methods:[],displayName:"ErrorMessage"};i.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var u,p,k;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const [checked, setIsChecked] = useState(false);
  return <Switch checked={checked} onToggle={() => setIsChecked(checked => !checked)} />;
}`,...(k=(p=a.parameters)==null?void 0:p.docs)==null?void 0:k.source}}};var f,g,b;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [checked, setIsChecked] = useState(false);
  const label = {
    true: 'On',
    false: 'Off'
  };
  return <Switch checked={checked} onToggle={checked => setIsChecked(!checked)} label={label[checked]} />;
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var S,I,x;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  return <Switch checked={false} disabled label='Off' />;
}`,...(x=(I=d.parameters)==null?void 0:I.docs)==null?void 0:x.source}}};var w,C,_;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  return <Switch checked={true} disabled label='Off' />;
}`,...(_=(C=n.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var O,D,T;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [checked, setIsChecked] = useState(false);
  return <Switch checked={checked} onToggle={() => setIsChecked(checked => !checked)} error width={240} errorMessage='Something went wrong! Please try again after sometime.' />;
}`,...(T=(D=l.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var y,j,E;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const [checked, setIsChecked] = useState(false);
  const label = {
    true: 'On',
    false: 'Off'
  };
  return <div data-theme="dark" style={{
    padding: '24px',
    background: '#040520',
    borderRadius: '8px'
  }}>
      <Switch checked={checked} onToggle={() => setIsChecked(c => !c)} label={label[checked]} />
    </div>;
}`,...(E=(j=i.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};const q=["Default","WithLabel","Disabled","DisabledWithChecked","ErrorMessage","DarkTheme"];export{i as DarkTheme,a as Default,d as Disabled,n as DisabledWithChecked,l as ErrorMessage,o as WithLabel,q as __namedExportsOrder,P as default};
