import{j as n,D as _}from"./iframe-DSshnrLJ.js";import{P as E}from"./pill-C92xEsKe.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";import"./index-BvCv2CeA.js";import"./iconBase-D3NFPLFw.js";const G={title:"design-components/Pill",component:E},r={args:{label:"Regular",onDelete:t=>alert("This Pill will be deleted")}},l={args:{label:"Regular",pillColor:"#4B0082"}},a={args:{error:!0,label:"Error",onDelete:()=>alert("This Pill will be deleted")}},s={args:{disabled:!0,label:"Disabled"}},o={args:{readOnly:!0,label:"Read Only"}},e={render:t=>n.jsx(_,{children:n.jsx(E,{...t})}),args:{label:"Regular",onDelete:()=>{}}};e.storyName="Regular (dark theme)";var i,c,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Regular',
    onDelete: _event => alert('This Pill will be deleted')
  }
}`,...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,m,p;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Regular',
    pillColor: '#4B0082'
  }
}`,...(p=(m=l.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,b,P;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    error: true,
    label: 'Error',
    onDelete: () => alert('This Pill will be deleted')
  }
}`,...(P=(b=a.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var D,R,S;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Disabled'
  }
}`,...(S=(R=s.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var h,y,O;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    label: 'Read Only'
  }
}`,...(O=(y=o.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var f,k,x;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <DarkStorySurface>
      <Pill {...args} />
    </DarkStorySurface>,
  args: {
    label: 'Regular',
    onDelete: () => {}
  }
}`,...(x=(k=e.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};const N=["RegularPill","PillWithBGColor","PillWithError","DisabledPill","ReadOnlyPill","RegularPillDark"];export{s as DisabledPill,l as PillWithBGColor,a as PillWithError,o as ReadOnlyPill,r as RegularPill,e as RegularPillDark,N as __namedExportsOrder,G as default};
