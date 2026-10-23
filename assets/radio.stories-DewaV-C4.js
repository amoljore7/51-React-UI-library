import{j as a,r as W}from"./iframe-DSshnrLJ.js";import{B as F}from"./button-D98htB4G.js";import{R as p}from"./radio-vCE7mThg.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";import"./tooltip-DiFZ0xw-.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./typography-DAWbNXo9.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";const _=[{label:"Male",value:"male"},{label:"Female",value:"female"},{label:"Other",value:"other",disabled:!0}],X={title:"design-components/RadioButton",component:p,argTypes:{label:{control:"text"},name:{control:"text"},defaultValue:{control:"text"},direction:{options:["horizontal","vertical"],control:{type:"radio"}},options:{control:"object"}}};function t(e){const[r,c]=W.useState(e.defaultValue??"");return a.jsx(p,{...e,defaultValue:r,onChange:A=>c(A.target.value)})}const l={args:{label:"Gender",name:"gender",defaultValue:"male",options:_,direction:"horizontal"},render:e=>a.jsx(t,{...e})},o={args:{label:"Choose one",name:"choice",defaultValue:"a",options:[{label:"Option A",value:"a"},{label:"Option B",value:"b"},{label:"Option C",value:"c"}],direction:"vertical"},render:e=>a.jsx(t,{...e})},s={args:{name:"no-label",defaultValue:"second",options:[{label:"First",value:"first"},{label:"Second",value:"second"},{label:"Third",value:"third"}],direction:"horizontal"},render:e=>a.jsx(t,{...e})},i={args:{label:"Status",name:"status",defaultValue:"active",options:[{label:"Active",value:"active"},{label:"Inactive",value:"inactive",disabled:!0},{label:"Pending",value:"pending",disabled:!0}],direction:"horizontal"},render:e=>a.jsx(t,{...e})},d={args:{label:"Select one",name:"default-unset",defaultValue:"",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"},{label:"Option 3",value:"3"}],direction:"horizontal"},render:e=>a.jsx(t,{...e})},u={render:e=>a.jsx("div",{"data-theme":"dark",style:{padding:"24px",background:"#0a0b2e",borderRadius:"8px"},children:a.jsx(t,{...e})}),args:{label:"Theme",name:"theme-dark",defaultValue:"light",options:[{label:"Light",value:"light"},{label:"Dark",value:"dark"},{label:"System",value:"system"}],direction:"horizontal"}},n=()=>{const[e,r]=W.useState("male");return a.jsxs(a.Fragment,{children:[a.jsx(p,{label:"Gender",name:"gender-reset",defaultValue:e,options:_,direction:"horizontal",onChange:c=>r(c.target.value)}),a.jsx(F,{size:"large",onClick:()=>r("male"),style:{marginTop:12},children:"Reset to Male"})]})};n.__docgenInfo={description:"",methods:[],displayName:"WithReset"};var m,b,v;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Gender',
    name: 'gender',
    defaultValue: 'male',
    options: defaultOptions,
    direction: 'horizontal'
  },
  render: args => <InteractiveRadio {...args} />
}`,...(v=(b=l.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var g,h,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Choose one',
    name: 'choice',
    defaultValue: 'a',
    options: [{
      label: 'Option A',
      value: 'a'
    }, {
      label: 'Option B',
      value: 'b'
    }, {
      label: 'Option C',
      value: 'c'
    }],
    direction: 'vertical'
  },
  render: args => <InteractiveRadio {...args} />
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var V,x,O;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    name: 'no-label',
    defaultValue: 'second',
    options: [{
      label: 'First',
      value: 'first'
    }, {
      label: 'Second',
      value: 'second'
    }, {
      label: 'Third',
      value: 'third'
    }],
    direction: 'horizontal'
  },
  render: args => <InteractiveRadio {...args} />
}`,...(O=(x=s.parameters)==null?void 0:x.docs)==null?void 0:O.source}}};var R,S,z;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Status',
    name: 'status',
    defaultValue: 'active',
    options: [{
      label: 'Active',
      value: 'active'
    }, {
      label: 'Inactive',
      value: 'inactive',
      disabled: true
    }, {
      label: 'Pending',
      value: 'pending',
      disabled: true
    }],
    direction: 'horizontal'
  },
  render: args => <InteractiveRadio {...args} />
}`,...(z=(S=i.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var j,k,y;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Select one',
    name: 'default-unset',
    defaultValue: '',
    options: [{
      label: 'Option 1',
      value: '1'
    }, {
      label: 'Option 2',
      value: '2'
    }, {
      label: 'Option 3',
      value: '3'
    }],
    direction: 'horizontal'
  },
  render: args => <InteractiveRadio {...args} />
}`,...(y=(k=d.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var I,C,T;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <div data-theme="dark" style={{
    padding: '24px',
    background: '#0a0b2e',
    borderRadius: '8px'
  }}>
      <InteractiveRadio {...args} />
    </div>,
  args: {
    label: 'Theme',
    name: 'theme-dark',
    defaultValue: 'light',
    options: [{
      label: 'Light',
      value: 'light'
    }, {
      label: 'Dark',
      value: 'dark'
    }, {
      label: 'System',
      value: 'system'
    }],
    direction: 'horizontal'
  }
}`,...(T=(C=u.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var D,G,B;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('male');
  return <>
      <RadioGroup label="Gender" name="gender-reset" defaultValue={value} options={defaultOptions} direction="horizontal" onChange={e => setValue(e.target.value)} />
      <Button size="large" onClick={() => setValue('male')} style={{
      marginTop: 12
    }}>
        Reset to Male
      </Button>
    </>;
}`,...(B=(G=n.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};const Y=["Horizontal","Vertical","NoGroupLabel","WithDisabledOptions","DefaultValueUnselected","DarkTheme","WithReset"];export{u as DarkTheme,d as DefaultValueUnselected,l as Horizontal,s as NoGroupLabel,o as Vertical,i as WithDisabledOptions,n as WithReset,Y as __namedExportsOrder,X as default};
