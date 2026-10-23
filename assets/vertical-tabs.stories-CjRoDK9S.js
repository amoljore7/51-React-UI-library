import{j as e,D as W,r as T}from"./iframe-DSshnrLJ.js";import{s as t}from"./index-BvCv2CeA.js";import{P as m}from"./index-BWW3-H0m.js";import{c as v}from"./index-DyAci3dY.js";import"./preload-helper-Dp1pzeXC.js";import"./iconBase-D3NFPLFw.js";const d={verticalTabsUlList:"bds-vertical-tabs-ul-list",verticalLi:"bds-vertical-li",selectedVerticalLi:"bds-selected-vertical-li",verticalLiWithIcon:"bds-vertical-li-with-icon",selectedVerticalLiWithIcon:"bds-selected-vertical-li-with-icon",verticalTabContainer:"bds-vertical-tab-container",verticalTabIconContainer:"bds-vertical-tab-icon-container",verticalTabTitle:"bds-vertical-tab-title",selectedVerticalTabTitle:"bds-selected-vertical-tab-title"},L="0",N="48px",_="288px",E="tab-item-",u=({value:i,handleChange:r,items:o,width:a=_,topPadding:n=N})=>{const s=l=>{r(l)},c={[d.verticalTabsUlList]:!0};return e.jsx("ul",{style:{width:a,paddingTop:n},className:v({...c}),tabIndex:L,children:o&&o.length&&o.map((l,p)=>{const O=p===i;return e.jsx(k,{itemIndex:p,isSelected:O,title:l.title,icon:l.icon,tabClickHandler:s},`${E}${p}`)})})},k=({title:i,isSelected:r,tabClickHandler:o,itemIndex:a,icon:n})=>{const s={[d.verticalLi]:!n,[d.selectedVerticalLi]:r&&!n,[d.verticalLiWithIcon]:!!n,[d.selectedVerticalLiWithIcon]:!!n&&r},c={[d.verticalTabTitle]:!0,[d.selectedVerticalTabTitle]:r};return e.jsx("li",{tabIndex:L,className:v({...s}),onClick:()=>o(a),title:i,children:e.jsxs("div",{className:d.verticalTabContainer,children:[n&&e.jsx("div",{className:d.verticalTabIconContainer,children:n}),i&&e.jsx("div",{className:v({...c}),children:i})]})})};u.propTypes={value:m.number.isRequired,handleChange:m.func.isRequired,items:m.array.isRequired,width:m.string,topPadding:m.string};u.__docgenInfo={description:"",methods:[],displayName:"VerticalTabs",props:{width:{defaultValue:{value:"'288px'",computed:!1},description:"",type:{name:"string"},required:!1},topPadding:{defaultValue:{value:"'48px'",computed:!1},description:"",type:{name:"string"},required:!1},value:{description:"",type:{name:"number"},required:!0},handleChange:{description:"",type:{name:"func"},required:!0},items:{description:"",type:{name:"array"},required:!0}}};const H={title:"design-components/VerticalTabs",component:u},h=()=>{const[i,r]=T.useState(0),o=s=>{r(s)},a=[{title:"Page One "},{title:"Page Two"},{title:"Page Three"},{title:"Page Four"}],n=s=>{const{value:c,index:l}=s;return c===l&&e.jsx("div",{children:s.children})};return e.jsxs("div",{style:{display:"flex"},children:[e.jsx(u,{value:i,handleChange:o,items:a,width:"200px",topPadding:"32px"}),e.jsxs("div",{style:{marginLeft:"20px",paddingTop:"32px"},children:[e.jsx(n,{value:i,index:0,children:e.jsx("h1",{style:{margin:0},children:"Item One"})}),e.jsx(n,{value:i,index:1,children:e.jsx("h1",{style:{margin:0},children:"Item Two"})}),e.jsx(n,{value:i,index:2,children:e.jsx("h1",{style:{margin:0},children:"Item Three"})}),e.jsx(n,{value:i,index:3,children:e.jsx("h1",{style:{margin:0},children:"Item Four"})})]})]})},P=()=>{const[i,r]=T.useState(0),o=s=>{r(s)},a=s=>{const{value:c,index:l}=s;return c===l&&e.jsx("div",{children:s.children})},n=[{title:"Page One ",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Two",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Three",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Four with its details",icon:e.jsx(t,{size:"24"}),iconPosition:"start"}];return e.jsxs("div",{style:{display:"flex"},children:[e.jsx(u,{value:i,handleChange:o,items:n,width:"200px",topPadding:"48px"}),e.jsxs("div",{style:{marginLeft:"20px",paddingTop:"48px"},children:[e.jsx(a,{value:i,index:0,children:e.jsx("h1",{style:{margin:0},children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{style:{margin:0},children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{style:{margin:0},children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{style:{margin:0},children:"Item Four"})})]})]})},g=()=>{const[i,r]=T.useState(0),o=s=>{r(s)},a=s=>{const{value:c,index:l}=s;return c===l&&e.jsx("div",{children:s.children})},n=[{title:"Page One ",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Two",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Three",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Four",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Five",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Six",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Seven",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Eight",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Nine",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Ten",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Eleven",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Twelve",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Thirteen",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Fourteen",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Fifteen",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Sixteen",icon:e.jsx(t,{size:"24"}),iconPosition:"start"},{title:"Page Seventeen",icon:e.jsx(t,{size:"24"}),iconPosition:"start"}];return e.jsxs("div",{style:{display:"flex",height:"500px"},children:[e.jsx(u,{value:i,handleChange:o,items:n,width:"200px"}),e.jsxs("div",{style:{marginLeft:"20px"},children:[e.jsx(a,{value:i,index:0,children:e.jsx("h1",{style:{margin:0},children:"Item One"})}),e.jsx(a,{value:i,index:1,children:e.jsx("h1",{style:{margin:0},children:"Item Two"})}),e.jsx(a,{value:i,index:2,children:e.jsx("h1",{style:{margin:0},children:"Item Three"})}),e.jsx(a,{value:i,index:3,children:e.jsx("h1",{style:{margin:0},children:"Item Four"})})]})]})},x=()=>e.jsx(W,{style:{minHeight:400},children:e.jsx(h,{})});x.storyName="Dark theme";h.__docgenInfo={description:"",methods:[],displayName:"TabsWithManyItems"};P.__docgenInfo={description:"",methods:[],displayName:"WithIconAndEllipsis"};g.__docgenInfo={description:"",methods:[],displayName:"WithOverflow"};x.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var b,y,j;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(0);
  const handleChange = index => {
    setValue(index);
  };
  const items = [{
    title: 'Page One '
  }, {
    title: 'Page Two'
  }, {
    title: 'Page Three'
  }, {
    title: 'Page Four'
  }];
  const TabPanel = props => {
    const {
      value,
      index
    } = props;
    return value === index && <div>{props.children}</div>;
  };
  return <div style={{
    display: 'flex'
  }}>
      <VerticalTabs value={value} handleChange={handleChange} items={items} width="200px" topPadding="32px" />
      <div style={{
      marginLeft: '20px',
      paddingTop: '32px'
    }}>
        <TabPanel value={value} index={0}>
          <h1 style={{
          margin: 0
        }}>Item One</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1 style={{
          margin: 0
        }}>Item Two</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 style={{
          margin: 0
        }}>Item Three</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1 style={{
          margin: 0
        }}>Item Four</h1>
        </TabPanel>
      </div>
    </div>;
}`,...(j=(y=h.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var I,f,z;P.parameters={...P.parameters,docs:{...(I=P.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(0);
  const handleChange = index => {
    setValue(index);
  };
  const TabPanel = props => {
    const {
      value,
      index
    } = props;
    return value === index && <div>{props.children}</div>;
  };
  const items = [{
    title: 'Page One ',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Two',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Three',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Four with its details',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }];
  return <div style={{
    display: 'flex'
  }}>
      <VerticalTabs value={value} handleChange={handleChange} items={items} width="200px" topPadding="48px" />
      <div style={{
      marginLeft: '20px',
      paddingTop: '48px'
    }}>
        <TabPanel value={value} index={0}>
          <h1 style={{
          margin: 0
        }}>Item One</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1 style={{
          margin: 0
        }}>Item Two</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 style={{
          margin: 0
        }}>Item Three</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1 style={{
          margin: 0
        }}>Item Four</h1>
        </TabPanel>
      </div>
    </div>;
}`,...(z=(f=P.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var F,w,U;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(0);
  const handleChange = index => {
    setValue(index);
  };
  const TabPanel = props => {
    const {
      value,
      index
    } = props;
    return value === index && <div>{props.children}</div>;
  };
  const items = [{
    title: 'Page One ',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Two',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Three',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Four',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Five',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Six',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Seven',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Eight',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Nine',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Ten',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Eleven',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Twelve',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Thirteen',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Fourteen',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Fifteen',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Sixteen',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }, {
    title: 'Page Seventeen',
    icon: <FiUser size="24" />,
    iconPosition: 'start'
  }];
  return <div style={{
    display: 'flex',
    height: '500px'
  }}>
      <VerticalTabs value={value} handleChange={handleChange} items={items} width="200px" />
      <div style={{
      marginLeft: '20px'
    }}>
        <TabPanel value={value} index={0}>
          <h1 style={{
          margin: 0
        }}>Item One</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1 style={{
          margin: 0
        }}>Item Two</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 style={{
          margin: 0
        }}>Item Three</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1 style={{
          margin: 0
        }}>Item Four</h1>
        </TabPanel>
      </div>
    </div>;
}`,...(U=(w=g.parameters)==null?void 0:w.docs)==null?void 0:U.source}}};var C,S,V;x.parameters={...x.parameters,docs:{...(C=x.parameters)==null?void 0:C.docs,source:{originalSource:`() => <DarkStorySurface style={{
  minHeight: 400
}}>
    <TabsWithManyItems />
  </DarkStorySurface>`,...(V=(S=x.parameters)==null?void 0:S.docs)==null?void 0:V.source}}};const $=["TabsWithManyItems","WithIconAndEllipsis","WithOverflow","DarkTheme"];export{x as DarkTheme,h as TabsWithManyItems,P as WithIconAndEllipsis,g as WithOverflow,$ as __namedExportsOrder,H as default};
