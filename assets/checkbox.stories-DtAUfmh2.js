import{r as g,j as e,D as C}from"./iframe-DSshnrLJ.js";import{C as a}from"./checkbox-CZg_hrpR.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";const w={title:"design-components/Checkbox",component:a},r=()=>{const[t,c]=g.useState(!1),n=s=>{c(s.target.checked)};return e.jsx(a,{name:"checkbox",label:"Checkbox",checked:t,onChange:n})};r.storyName="Checkbox (with state)";const i=()=>{const[t,c]=g.useState({india:!0,new_zealand:!1,australia:!1,zimbambwe:!0}),n=s=>{c({...t,[s.target.name]:s.target.checked})};return e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{marginBottom:"8px",fontFamily:"OpenSansRegular",fontWeight:"600",fontSize:"14px"},children:"Countries"}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"india",label:"India",checked:t.india,onChange:n})}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"new_zealand",label:"New Zealand",checked:t.new_zealand,disabled:!0,onChange:n})}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"germany",label:"Germany",checked:!0,disabled:!0,onChange:n})}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"australia",label:"Australia",checked:t.australia,onChange:n})}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"zimbambwe",label:"Zimbambwe",checked:t.zimbambwe,readOnly:!0,onChange:n})}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"Austria",label:"Austria",indeterminate:!0})}),e.jsx("div",{style:{marginBottom:"8px"},children:e.jsx(a,{name:"Ukraine",label:"Ukraine",indeterminate:!0,disabled:!0})})]})},o=()=>e.jsx(C,{children:e.jsx(r,{})});o.storyName="Dark theme";r.__docgenInfo={description:"",methods:[],displayName:"CheckboxWithState"};i.__docgenInfo={description:"",methods:[],displayName:"CheckboxGroup"};o.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var d,m,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [checkState, setCheckState] = useState(false);
  const onChange = e => {
    setCheckState(e.target.checked);
  };
  return <Checkbox name="checkbox" label="Checkbox" checked={checkState} onChange={onChange} />;
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var h,x,k;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [checkState, setCheckState] = useState({
    india: true,
    new_zealand: false,
    australia: false,
    zimbambwe: true
  });
  const onChange = e => {
    setCheckState({
      ...checkState,
      [e.target.name]: e.target.checked
    });
  };
  return <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
      <div style={{
      marginBottom: '8px',
      fontFamily: 'OpenSansRegular',
      fontWeight: '600',
      fontSize: '14px'
    }}>
        Countries
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="india" label="India" checked={checkState.india} onChange={onChange} />
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="new_zealand" label="New Zealand" checked={checkState.new_zealand} disabled={true} onChange={onChange} />
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="germany" label="Germany" checked={true} disabled={true} onChange={onChange} />
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="australia" label="Australia" checked={checkState.australia} onChange={onChange} />
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="zimbambwe" label="Zimbambwe" checked={checkState.zimbambwe} readOnly={true} onChange={onChange} />
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="Austria" label="Austria" indeterminate />
      </div>
      <div style={{
      marginBottom: '8px'
    }}>
        <Checkbox name="Ukraine" label="Ukraine" indeterminate disabled />
      </div>
    </div>;
}`,...(k=(x=i.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var b,u,p;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => <DarkStorySurface>
    <CheckboxWithState />
  </DarkStorySurface>`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const B=["CheckboxWithState","CheckboxGroup","DarkTheme"];export{i as CheckboxGroup,r as CheckboxWithState,o as DarkTheme,B as __namedExportsOrder,w as default};
