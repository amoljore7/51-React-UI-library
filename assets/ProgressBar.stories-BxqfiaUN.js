import{j as e,D as f,r as p}from"./iframe-DSshnrLJ.js";import{P as m}from"./index-BWW3-H0m.js";import{T as x}from"./typography-DAWbNXo9.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DyAci3dY.js";const t={parentContainer:"bds-progress-bar-parent-container",container:"bds-progress-bar-container",leading:"bds-progress-bar-leading",trailing:"bds-progress-bar-trailing",value:"bds-progress-bar-value"},n=({progressPercentage:r,displayValue:o,width:i,height:y})=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:t.parentContainer,children:[e.jsxs("div",{className:t.container,style:{width:i,height:y},children:[e.jsx("div",{className:t.leading,style:{width:`${r/100*i}px`}}),e.jsx("div",{className:t.trailing,style:{width:`${(100-r)/100*i}px`}})]}),e.jsx("div",{className:t.value,children:e.jsx(x,{variant:"label1",children:o})})]})});n.propTypes={progressPercentage:m.number,width:m.number,displayValue:m.string};n.__docgenInfo={description:"",methods:[],displayName:"ProgressBar",props:{progressPercentage:{description:"",type:{name:"number"},required:!1},width:{description:"",type:{name:"number"},required:!1},displayValue:{description:"",type:{name:"string"},required:!1}}};const S={title:"design-components/ProgressBar",component:n},s=()=>{const[r,o]=p.useState(30);return p.useEffect(()=>{r===0?o(30):setTimeout(()=>{o(r-1)},1e3)},[r]),e.jsx(n,{progressPercentage:r/30*100,displayValue:`${r}s`,width:170,height:8})},a=()=>e.jsx(f,{children:e.jsx(s,{})});a.storyName="Dark theme";s.__docgenInfo={description:"",methods:[],displayName:"ProgressBarDemo"};a.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var c,d,l;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [time, setTime] = useState(30);
  useEffect(() => {
    if (time === 0) {
      setTime(30);
    } else {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);
  return <ProgressBar progressPercentage={time / 30 * 100} displayValue={\`\${time}s\`} width={170} height={8} />;
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var g,u,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => <DarkStorySurface>
    <ProgressBarDemo />
  </DarkStorySurface>`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const v=["ProgressBarDemo","DarkTheme"];export{a as DarkTheme,s as ProgressBarDemo,v as __namedExportsOrder,S as default};
