import{r as d,j as e,D as he}from"./iframe-DSshnrLJ.js";import{c as C}from"./index-DyAci3dY.js";import{P as n}from"./index-BWW3-H0m.js";import{T as ge}from"./tooltip-DiFZ0xw-.js";import{S as xe}from"./info-XWXRQWYd.js";import"./preload-helper-Dp1pzeXC.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./typography-DAWbNXo9.js";const r={container:"bds-textarea-line-main-container",textareaLabel:"bds-textarea-line-label",textareaLabelDisabled:"bds-textarea-line-label-disabled",textareaHelperText:"bds-textarea-line-helper-text",textareaHelperTextDisabled:"bds-textarea-line-helper-text-disabled",textareaContainer:"bds-textarea-line-container",textareaContainerDisabled:"bds-textarea-line-container-disabled",textareaContainerErrorBorder:"bds-textarea-line-container-error-border",textareaContainerFocus:"bds-textarea-line-container-focus",textareaBox:"bds-textarea-line-box",textareaBoxDisabled:"bds-textarea-line-box-disabled",textareaBoxReadOnly:"bds-textarea-line-box-read-only",errorMsgText:"bds-error-msg-text",variantNaked:"bds-naked",helperIcon:"bds-textarea-line-helper-icon",helperRow:"bds-textarea-line-helper-row"},_="naked",me="textarea-test-id",fe="104px",be={error:"●",warning:"⚠"},p=({value:a="",label:t,placeholder:u,error:l=!1,helperText:i,variant:s,onChange:w,onBlur:T,onFocus:S,disabled:x=!1,errorMsg:j,readOnly:H=!1,width:ne,height:re=fe,name:te,lineMessages:m})=>{const se={[r.textareaLabel]:!0,[r.textareaLabelDisabled]:x},oe={[r.textareaHelperText]:!0,[r.textareaHelperTextDisabled]:x},le={[r.textareaContainer]:!0,[r.textareaContainerDisabled]:x,[r.textareaContainerErrorBorder]:l,[r.variantNaked]:s===_,[r.textareaContainerFocus]:!H},ie={[r.textareaBox]:!0,[r.textareaBoxDisabled]:x,[r.textareaBoxReadOnly]:H,[r.variantNaked]:s===_},de=(a==null?void 0:a.split(`
`).length)||1,[ce,pe]=d.useState(de),[q,N]=d.useState({}),B=d.useRef(null);d.useEffect(()=>{pe((a==null?void 0:a.split(`
`).length)||1)},[a]),d.useEffect(()=>{m!=null&&m.length?N(Object.fromEntries(m.filter(Boolean).map(o=>[o.line,{type:o.type,message:o.message}]))):N({})},[m]),d.useEffect(()=>{const o=B.current;if(!o)return;const c=()=>{o.style.height="auto",o.style.height=`${o.scrollHeight+8}px`};return o.addEventListener("input",c),()=>o.removeEventListener("input",c)},[]);const ue=({lineNumber:o})=>{var V,E;const c=(V=q[o])==null?void 0:V.type,D=(E=q[o])==null?void 0:E.message;return D?e.jsx(ge,{title:D||null,position:"bottom-right",children:e.jsxs("div",{children:[c&&e.jsx("span",{className:c,children:be[c]}),e.jsx("span",{children:o})]})}):e.jsxs("div",{children:[e.jsx("span",{}),e.jsx("span",{children:o})]})};return e.jsxs("div",{className:r.container,children:[t&&e.jsx("div",{className:C({...se}),children:t}),e.jsxs("div",{style:{width:ne??void 0,height:re??void 0},children:[e.jsxs("div",{className:C({...le}),children:[e.jsx("div",{className:"line-number","data-testid":"line-number",children:Array.from({length:ce},(o,c)=>e.jsx(ue,{lineNumber:c+1},c))}),e.jsx("textarea",{ref:B,className:C({...ie}),onBlur:T,onFocus:S,value:a,name:te,placeholder:u,onChange:w,disabled:x,readOnly:H,"data-testid":me,wrap:"off"})]}),l&&j&&e.jsx("div",{className:r.errorMsgText,children:j})]}),i&&e.jsx("div",{className:r.helperRow,children:e.jsxs("div",{className:C({...oe}),children:[e.jsx(xe,{className:r.helperIcon,"aria-hidden":!0}),e.jsx("span",{children:i})]})})]})};p.propTypes={value:n.string,label:n.string,errorMsg:n.string,placeholder:n.string,error:n.bool,helperText:n.string,disabled:n.bool,readOnly:n.bool,onChange:n.func.isRequired,name:n.string,onBlur:n.func,onFocus:n.func,variant:n.string,width:n.string,height:n.string,lineMessages:n.arrayOf(n.shape({line:n.number.isRequired,message:n.string,type:n.string}))};p.__docgenInfo={description:"",methods:[],displayName:"TextareaLines",props:{value:{defaultValue:{value:'""',computed:!1},description:"",type:{name:"string"},required:!1},error:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},readOnly:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},height:{defaultValue:{value:"'104px'",computed:!1},description:"",type:{name:"string"},required:!1},label:{description:"",type:{name:"string"},required:!1},errorMsg:{description:"",type:{name:"string"},required:!1},placeholder:{description:"",type:{name:"string"},required:!1},helperText:{description:"",type:{name:"string"},required:!1},onChange:{description:"",type:{name:"func"},required:!0},name:{description:"",type:{name:"string"},required:!1},onBlur:{description:"",type:{name:"func"},required:!1},onFocus:{description:"",type:{name:"func"},required:!1},variant:{description:"",type:{name:"string"},required:!1},width:{description:"",type:{name:"string"},required:!1},lineMessages:{description:"",type:{name:"arrayOf",value:{name:"shape",value:{line:{name:"number",required:!0},message:{name:"string",required:!1},type:{name:"string",required:!1}}}},required:!1}}};const qe={title:"design-components/TextareaLines",component:p},h=()=>{const[a,t]=d.useState(`A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.
A paragraph consists of one or more sentences.
 Though not required by the syntax of any language,
paragraphs are usually an expected part of formal writing.`),l={label:"Label",helperText:"Sub Label",value:a,placeholder:"Placeholder...",width:"600px",height:"400px",onChange:i=>{const{value:s}=i.target;console.log(s),t(s)}};return e.jsx(p,{...l})},f=()=>{const[a,t]=d.useState("A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing."),l={label:"Label",helperText:"Sub Label",value:a,placeholder:"Placeholder...",width:"600px",height:"400px",variant:"naked",readOnly:!0,onChange:i=>{const{value:s}=i.target;console.log(s),t(s)}};return e.jsx(p,{...l})},b=()=>{const[a,t]=d.useState(""),l={label:"Label",helperText:"Sub Label",type:"text",value:a,placeholder:"Placeholder...",error:!0,errorMsg:"Error Message Here",width:"600px",height:"400px",onChange:i=>{const{value:s}=i.target;t(s)}};return e.jsx(p,{...l})},y=()=>{const[a,t]=d.useState(`A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.
A paragraph consists of one or more sentences.
 Though not required by the syntax of any language,
paragraphs are usually an expected part of formal writing.`),l={label:"Label",helperText:"Sub Label",type:"text",value:a,placeholder:"Placeholder...",width:"600px",height:"400px",onChange:i=>{const{value:s}=i.target;t(s)},lineMessages:[{line:1,message:` undeclared reference to 'a-expression' (in container '')
 | expression
 | ^`,type:"error"},{line:4,message:` undeclared reference to 'expression' (in container '')
        | add
        | ^`,type:"warning"}]};return e.jsx(p,{...l})},v=()=>{const[a,t]=d.useState("A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea."),l={label:"Label",helperText:"Sub Label",type:"text",value:a,placeholder:"Placeholder...",width:"300px",height:"104px",disabled:!0,onChange:i=>{const{value:s}=i.target;t(s)}};return e.jsx(p,{...l})},L=()=>{const[a,t]=d.useState(""),[u,l]=d.useState(""),i=T=>{const{value:S}=T.target;l(S),t("")},s=()=>{t("Triggered because this input lost focus")},w=()=>{t("")};return e.jsxs(e.Fragment,{children:[e.jsx(p,{label:"Enter Name",name:"name",type:"text",value:u,width:"400px",placeholder:"Enter vault name",onChange:i,onBlur:s,onFocus:w}),e.jsx("label",{children:a&&a})]})},g=()=>e.jsx(he,{style:{minHeight:480},children:e.jsx(h,{})});g.storyName="Dark theme";h.__docgenInfo={description:"",methods:[],displayName:"Default"};f.__docgenInfo={description:"",methods:[],displayName:"Readonly"};b.__docgenInfo={description:"",methods:[],displayName:"Error"};y.__docgenInfo={description:"",methods:[],displayName:"LineMessages"};v.__docgenInfo={description:"",methods:[],displayName:"Disabled"};L.__docgenInfo={description:"",methods:[],displayName:"OnBlur"};g.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var A,k,I;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.\\nA paragraph consists of one or more sentences.\\n Though not required by the syntax of any language,\\nparagraphs are usually an expected part of formal writing.');
  const onChangeHandler = e => {
    const {
      value
    } = e.target;
    console.log(value);
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    value: value,
    placeholder: 'Placeholder...',
    width: '600px',
    height: '400px',
    onChange: onChangeHandler
  };
  return <TextareaLines {...props} />;
}`,...(I=(k=h.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var O,P,R;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.');
  const onChangeHandler = e => {
    const {
      value
    } = e.target;
    console.log(value);
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    value: value,
    placeholder: 'Placeholder...',
    width: '600px',
    height: '400px',
    variant: 'naked',
    readOnly: true,
    onChange: onChangeHandler
  };
  return <TextareaLines {...props} />;
}`,...(R=(P=f.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var F,M,W;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const {
      value
    } = e.target;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    error: true,
    errorMsg: 'Error Message Here',
    width: '600px',
    height: '400px',
    onChange: onChangeHandler
  };
  return <TextareaLines {...props} />;
}`,...(W=(M=b.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var $,z,G;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.\\nA paragraph consists of one or more sentences.\\n Though not required by the syntax of any language,\\nparagraphs are usually an expected part of formal writing.');
  const onChangeHandler = e => {
    const {
      value
    } = e.target;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    width: '600px',
    height: '400px',
    onChange: onChangeHandler,
    lineMessages: [{
      line: 1,
      message: " undeclared reference to 'a-expression' (in container '')\\n | expression\\n | ^",
      type: 'error'
    }, {
      line: 4,
      message: \` undeclared reference to 'expression' (in container '')
        | add
        | ^\`,
      type: 'warning'
    }]
  };
  return <TextareaLines {...props} />;
}`,...(G=(z=y.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var J,K,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.');
  const onChangeHandler = e => {
    const {
      value
    } = e.target;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    disabled: true,
    onChange: onChangeHandler
  };
  return <TextareaLines {...props} />;
}`,...(Q=(K=v.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;L.parameters={...L.parameters,docs:{...(U=L.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const [blurLable, setBlurLabel] = useState('');
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const {
      value
    } = e.target;
    setValue(value);
    setBlurLabel('');
  };
  const onBlurHandler = () => {
    setBlurLabel('Triggered because this input lost focus');
  };
  const onFocusHandler = () => {
    setBlurLabel('');
  };
  return <>
      <TextareaLines label="Enter Name" name="name" type="text" value={value} width="400px" placeholder="Enter vault name" onChange={onChangeHandler} onBlur={onBlurHandler} onFocus={onFocusHandler} />
      <label>{blurLable && blurLable}</label>
    </>;
}`,...(Y=(X=L.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ae;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`() => <DarkStorySurface style={{
  minHeight: 480
}}>
    <Default />
  </DarkStorySurface>`,...(ae=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};const Ne=["Default","Readonly","Error","LineMessages","Disabled","OnBlur","DarkTheme"];export{g as DarkTheme,h as Default,v as Disabled,b as Error,y as LineMessages,L as OnBlur,f as Readonly,Ne as __namedExportsOrder,qe as default};
