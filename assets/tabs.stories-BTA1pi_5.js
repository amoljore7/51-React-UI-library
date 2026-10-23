import{j as e,r as c}from"./iframe-DSshnrLJ.js";import{i as h,j as u,k as x,l as P,m as Z,n as ee,o as ie,p as ae}from"./index-BvCv2CeA.js";import{P as F}from"./index-BWW3-H0m.js";import{c as X}from"./index-DyAci3dY.js";import"./preload-helper-Dp1pzeXC.js";import"./iconBase-D3NFPLFw.js";const r={horizontalTabsUlList:"bds-horizontal-tabs-ul-list",horizontalTabsLiList:"bds-horizontal-tabs-li-list",horizontalTabContainer:"bds-horizontal-tab-container",horizontalTabIconBox:"bds-horizontal-tab-icon-box",horizontalTabTitle:"bds-horizontal-tab-title",selected:"bds-selected",variantAuto:"bds-variant-auto",variantFixed:"bds-variant-fixed"},ne="selected",te="auto",se="fixed",oe="tab-test-id",le=0,re="start",ce="end",de="top",l=({value:i,handleChange:s,items:t,variant:o})=>{const n={[r.horizontalTabsUlList]:!0,[r.variantAuto]:o===te};return e.jsx("ul",{className:X({...n}),"data-testid":oe,children:t&&t.length&&t.map((d,T)=>{const z=T===i?ne:null;return e.jsx(he,{index:T,selectedTab:z,title:d.title,icon:d.icon,iconPosition:d.iconPosition,handleChange:s,variant:o},`tab-item-${T}`)})})},he=({title:i,selectedTab:s,handleChange:t,index:o,icon:n,iconPosition:d,variant:T})=>{const z={[r.horizontalTabsLiList]:!0,[r.selected]:s,[r.variantFixed]:T===se},S=Y=>e.jsx("div",{className:r.horizontalTabIconBox,children:Y});return e.jsx("li",{className:X({...z}),tabIndex:le,onClick:()=>t(o),children:e.jsxs("div",{className:r.horizontalTabContainer,children:[re===d&&n&&S(n),e.jsxs("div",{children:[de===d&&n&&S(n),i&&e.jsx("div",{className:r.horizontalTabTitle,children:i})]}),ce===d&&n&&S(n)]})},`list-item-${o}`)};l.propTypes={value:F.number.isRequired,handleChange:F.func.isRequired,items:F.array.isRequired,variant:F.string};l.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{value:{description:"",type:{name:"number"},required:!0},handleChange:{description:"",type:{name:"func"},required:!0},items:{description:"",type:{name:"array"},required:!0},variant:{description:"",type:{name:"string"},required:!1}}};const be={title:"design-components/Tabs",component:l},a=i=>{const{value:s,index:t}=i;return s===t&&e.jsx("div",{children:i.children})},v=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{title:"Page One "},{title:"Page Two"},{title:"Page Three"},{title:"Page Four"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"auto"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})})]})},m=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{title:"Page One",icon:e.jsx(h,{size:"24"}),iconPosition:"start"},{title:"Page Two",icon:e.jsx(u,{size:"24"}),iconPosition:"start"},{title:"Page Three",icon:e.jsx(x,{size:"24"}),iconPosition:"start"},{title:"Page Four",icon:e.jsx(P,{size:"24"}),iconPosition:"start"},{title:"Page Five",icon:e.jsx(Z,{size:"24"}),iconPosition:"start"},{title:"Page Six",icon:e.jsx(ee,{size:"24"}),iconPosition:"start"},{title:"Page Seven",icon:e.jsx(ie,{size:"24"}),iconPosition:"start"},{title:"Page Eighgt",icon:e.jsx(ae,{size:"24"}),iconPosition:"start"},{title:"Page Nine",icon:e.jsx(h,{size:"24"}),iconPosition:"start"},{title:"Page Ten",icon:e.jsx(u,{size:"24"}),iconPosition:"start"},{title:"Page Eleven",icon:e.jsx(x,{size:"24"}),iconPosition:"start"},{title:"Page Twelve",icon:e.jsx(P,{size:"24"}),iconPosition:"start"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"auto"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})}),e.jsx(a,{value:i,index:4,children:e.jsx("h1",{children:"Item Five"})}),e.jsx(a,{value:i,index:5,children:e.jsx("h1",{children:"Item Six"})}),e.jsx(a,{value:i,index:6,children:e.jsx("h1",{children:"Item Seven"})}),e.jsx(a,{value:i,index:7,children:e.jsx("h1",{children:"Item Eight"})}),e.jsx(a,{value:i,index:8,children:e.jsx("h1",{children:"Item Nine"})}),e.jsx(a,{value:i,index:9,children:e.jsx("h1",{children:"Item Ten"})}),e.jsx(a,{value:i,index:10,children:e.jsx("h1",{children:"Item Eleven"})}),e.jsx(a,{value:i,index:11,children:e.jsx("h1",{children:"Item Twelve"})})]})},b=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{title:"Page One"},{title:"Page Two"},{title:"Page Three"},{title:"Page Four"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"fixed"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})})]})},g=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{title:"Page One",icon:e.jsx(h,{size:"24"}),iconPosition:"start"},{title:"Page Two",icon:e.jsx(u,{size:"24"}),iconPosition:"start"},{title:"Page Three",icon:e.jsx(x,{size:"24"}),iconPosition:"start"},{title:"Page Four",icon:e.jsx(P,{size:"24"}),iconPosition:"start"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"fixed"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})})]})},j=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{title:"Page One",icon:e.jsx(h,{size:"24"}),iconPosition:"end"},{title:"Page Two",icon:e.jsx(u,{size:"24"}),iconPosition:"end"},{title:"Page Three",icon:e.jsx(x,{size:"24"}),iconPosition:"end"},{title:"Page Four",icon:e.jsx(P,{size:"24"}),iconPosition:"end"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"fixed"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})})]})},p=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{title:"Page One",icon:e.jsx(h,{size:"24"}),iconPosition:"top"},{title:"Page Two",icon:e.jsx(u,{size:"24"}),iconPosition:"top"},{title:"Page Three",icon:e.jsx(x,{size:"24"}),iconPosition:"top"},{title:"Page Four",icon:e.jsx(P,{size:"24"}),iconPosition:"top"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"fixed"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})})]})},I=()=>{const[i,s]=c.useState(0),t=n=>{s(n)},o=[{icon:e.jsx(h,{size:"24"}),iconPosition:"top"},{icon:e.jsx(u,{size:"24"}),iconPosition:"top"},{icon:e.jsx(x,{size:"24"}),iconPosition:"top"},{icon:e.jsx(P,{size:"24"}),iconPosition:"top"}];return e.jsxs("div",{children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"fixed"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{children:"Item Four"})})]})},f=()=>{const[i,s]=c.useState(0),t=n=>s(n),o=[{title:"Page One",icon:e.jsx(h,{size:"24"}),iconPosition:"start"},{title:"Page Two",icon:e.jsx(u,{size:"24"}),iconPosition:"start"},{title:"Page Three",icon:e.jsx(x,{size:"24"}),iconPosition:"start"},{title:"Page Four",icon:e.jsx(P,{size:"24"}),iconPosition:"start"}];return e.jsxs("div",{"data-theme":"dark",style:{padding:"24px",background:"#040520",borderRadius:"8px"},children:[e.jsx(l,{value:i,handleChange:t,items:o,variant:"auto"}),e.jsx(a,{value:i,index:0,children:e.jsx("h1",{style:{color:"#ffffff"},children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{style:{color:"#ffffff"},children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{style:{color:"#ffffff"},children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{style:{color:"#ffffff"},children:"Item Four"})})]})};v.__docgenInfo={description:"",methods:[],displayName:"AutoWidthLeftAligned"};m.__docgenInfo={description:"",methods:[],displayName:"AutoScrollTabs"};b.__docgenInfo={description:"",methods:[],displayName:"FixedWidth"};g.__docgenInfo={description:"",methods:[],displayName:"StartIconTabs"};j.__docgenInfo={description:"",methods:[],displayName:"EndIconTabs"};p.__docgenInfo={description:"",methods:[],displayName:"TopIconTabs"};I.__docgenInfo={description:"",methods:[],displayName:"IconTabs"};f.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var C,w,O;v.parameters={...v.parameters,docs:{...(C=v.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    title: 'Page One '
  }, {
    title: 'Page Two'
  }, {
    title: 'Page Three'
  }, {
    title: 'Page Four'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="auto" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>;
}`,...(O=(w=v.parameters)==null?void 0:w.docs)==null?void 0:O.source}}};var y,_,N;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    title: 'Page One',
    icon: <FiPhone size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Two',
    icon: <FiHeart size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Three',
    icon: <FiStar size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Four',
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Five',
    icon: <FiPauseCircle size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Six',
    icon: <FiPaperclip size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Seven',
    icon: <FiPackage size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Eighgt',
    icon: <FiOctagon size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Nine',
    icon: <FiPhone size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Ten',
    icon: <FiHeart size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Eleven',
    icon: <FiStar size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Twelve',
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'start'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="auto" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h1>Item Five</h1>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <h1>Item Six</h1>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <h1>Item Seven</h1>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <h1>Item Eight</h1>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <h1>Item Nine</h1>
      </TabPanel>
      <TabPanel value={value} index={9}>
        <h1>Item Ten</h1>
      </TabPanel>
      <TabPanel value={value} index={10}>
        <h1>Item Eleven</h1>
      </TabPanel>
      <TabPanel value={value} index={11}>
        <h1>Item Twelve</h1>
      </TabPanel>
    </div>;
}`,...(N=(_=m.parameters)==null?void 0:_.docs)==null?void 0:N.source}}};var E,A,k;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    title: 'Page One'
  }, {
    title: 'Page Two'
  }, {
    title: 'Page Three'
  }, {
    title: 'Page Four'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="fixed" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>;
}`,...(k=(A=b.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};var L,H,q;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    title: 'Page One',
    icon: <FiPhone size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Two',
    icon: <FiHeart size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Three',
    icon: <FiStar size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Four',
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'start'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="fixed" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>;
}`,...(q=(H=g.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};var R,W,D;j.parameters={...j.parameters,docs:{...(R=j.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    title: 'Page One',
    icon: <FiPhone size="24" />,
    iconPosition: 'end'
  }, {
    title: 'Page Two',
    icon: <FiHeart size="24" />,
    iconPosition: 'end'
  }, {
    title: 'Page Three',
    icon: <FiStar size="24" />,
    iconPosition: 'end'
  }, {
    title: 'Page Four',
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'end'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="fixed" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>;
}`,...(D=(W=j.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var B,U,$;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    title: 'Page One',
    icon: <FiPhone size="24" />,
    iconPosition: 'top'
  }, {
    title: 'Page Two',
    icon: <FiHeart size="24" />,
    iconPosition: 'top'
  }, {
    title: 'Page Three',
    icon: <FiStar size="24" />,
    iconPosition: 'top'
  }, {
    title: 'Page Four',
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'top'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="fixed" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>;
}`,...($=(U=p.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var G,J,K;I.parameters={...I.parameters,docs:{...(G=I.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => {
    setvalue(index);
  };
  const initialTab = [{
    icon: <FiPhone size="24" />,
    iconPosition: 'top'
  }, {
    icon: <FiHeart size="24" />,
    iconPosition: 'top'
  }, {
    icon: <FiStar size="24" />,
    iconPosition: 'top'
  }, {
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'top'
  }];
  return <div>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="fixed" />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>;
}`,...(K=(J=I.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var M,Q,V;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const [value, setvalue] = useState(0);
  const handleChange = index => setvalue(index);
  const initialTab = [{
    title: 'Page One',
    icon: <FiPhone size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Two',
    icon: <FiHeart size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Three',
    icon: <FiStar size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Four',
    icon: <FiShoppingCart size="24" />,
    iconPosition: 'start'
  }];
  return <div data-theme="dark" style={{
    padding: '24px',
    background: '#040520',
    borderRadius: '8px'
  }}>
      <Tabs value={value} handleChange={handleChange} items={initialTab} variant="auto" />
      <TabPanel value={value} index={0}>
        <h1 style={{
        color: '#ffffff'
      }}>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1 style={{
        color: '#ffffff'
      }}>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1 style={{
        color: '#ffffff'
      }}>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1 style={{
        color: '#ffffff'
      }}>Item Four</h1>
      </TabPanel>
    </div>;
}`,...(V=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};const ge=["AutoWidthLeftAligned","AutoScrollTabs","FixedWidth","StartIconTabs","EndIconTabs","TopIconTabs","IconTabs","DarkTheme"];export{m as AutoScrollTabs,v as AutoWidthLeftAligned,f as DarkTheme,j as EndIconTabs,b as FixedWidth,I as IconTabs,g as StartIconTabs,p as TopIconTabs,ge as __namedExportsOrder,be as default};
