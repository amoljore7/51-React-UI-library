import{j as a,r as u}from"./iframe-DSshnrLJ.js";import{P as l}from"./index-BWW3-H0m.js";import{c as T}from"./index-DyAci3dY.js";import{S as ge}from"./info-XWXRQWYd.js";import"./preload-helper-Dp1pzeXC.js";const s={container:"bds-textarea-main-container",textareaLabel:"bds-textarea-label",textareaLabelDisabled:"bds-textarea-label-disabled",textareaHelperText:"bds-textarea-helper-text",textareaHelperTextDisabled:"bds-textarea-helper-text-disabled",textareaContainer:"bds-textarea-container",textareaContainerDisabled:"bds-textarea-container-disabled",textareaContainerErrorBorder:"bds-textarea-container-error-border",textareaContainerFocus:"bds-textarea-container-focus",textareaBox:"bds-textarea-box",textareaBoxDisabled:"bds-textarea-box-disabled",textareaBoxReadOnly:"bds-textarea-box-read-only",errorMsgText:"bds-error-msg-text",variantNaked:"bds-naked",charLeftCount:"bds-textarea-character-count-left-text",charCountOnly:"bds-textarea-char-count-only",helperIcon:"bds-textarea-helper-icon",helperRow:"bds-textarea-helper-row"},_="character-left-count-test-id",V="naked",xe="textarea-test-id",be="104px",d=({showCharLeftCount:t=!1,maxLength:e,value:i,label:r,placeholder:o,error:n=!1,helperText:c,variant:p,onChange:w,onBlur:oe,onFocus:le,disabled:h=!1,errorMsg:N,readOnly:S=!1,width:g,height:ie=be,name:de})=>{const ue={[s.textareaLabel]:!0,[s.textareaLabelDisabled]:h},ce={[s.textareaHelperText]:!0,[s.textareaHelperTextDisabled]:h},pe={[s.textareaContainer]:!0,[s.textareaContainerDisabled]:h,[s.textareaContainerErrorBorder]:n,[s.variantNaked]:p===V,[s.textareaContainerFocus]:!S},he={[s.textareaBox]:!0,[s.textareaBoxDisabled]:h,[s.textareaBoxReadOnly]:S,[s.variantNaked]:p===V},j=(i==null?void 0:i.length)??0,q=e!=null&&parseInt(e,10)>0,B=q&&t;return a.jsxs("div",{className:s.container,children:[r&&a.jsx("div",{className:T({...ue}),children:r}),a.jsx("div",{className:T({...pe}),style:{width:g??void 0,height:p===V?"auto":ie},children:a.jsx("textarea",{className:T({...he}),onBlur:oe,onFocus:le,value:i,name:de,placeholder:o,onChange:w,disabled:h,readOnly:S,"data-testid":xe,...q&&{maxLength:e}})}),n&&N&&a.jsx("div",{className:s.errorMsgText,children:N}),c&&a.jsxs("div",{className:s.helperRow,style:g?{width:g}:void 0,children:[a.jsxs("div",{className:T({...ce}),children:[a.jsx(ge,{className:s.helperIcon,"aria-hidden":!0}),a.jsx("span",{children:c})]}),B&&a.jsx("div",{"data-testid":_,className:s.charLeftCount,children:`${j}/${e}`})]}),B&&!c&&a.jsx("div",{className:s.charCountOnly,style:g?{width:g}:void 0,children:a.jsx("span",{"data-testid":_,className:s.charLeftCount,children:`${j}/${e}`})})]})};d.propTypes={value:l.string.isRequired,label:l.string,errorMsg:l.string,placeholder:l.string,error:l.bool,helperText:l.string,disabled:l.bool,readOnly:l.bool,onChange:l.func.isRequired,name:l.string,onBlur:l.func,onFocus:l.func,showCharLeftCount:l.bool,maxLength:l.number,variant:l.string,width:l.string,height:l.string};d.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{showCharLeftCount:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},error:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},readOnly:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},height:{defaultValue:{value:"'104px'",computed:!1},description:"",type:{name:"string"},required:!1},value:{description:"",type:{name:"string"},required:!0},label:{description:"",type:{name:"string"},required:!1},errorMsg:{description:"",type:{name:"string"},required:!1},placeholder:{description:"",type:{name:"string"},required:!1},helperText:{description:"",type:{name:"string"},required:!1},onChange:{description:"",type:{name:"func"},required:!0},name:{description:"",type:{name:"string"},required:!1},onBlur:{description:"",type:{name:"func"},required:!1},onFocus:{description:"",type:{name:"func"},required:!1},maxLength:{description:"",type:{name:"number"},required:!1},variant:{description:"",type:{name:"string"},required:!1},width:{description:"",type:{name:"string"},required:!1}}};const Le={title:"design-components/Textarea",component:d},x=()=>{const[t,e]=u.useState(""),r={label:"Label",helperText:"Sub Label",value:t,placeholder:"Placeholder...",width:"300px",height:"104px",onChange:o=>{const n=o.target.value;e(n)}};return a.jsx(d,{...r})},b=()=>{const[t,e]=u.useState("A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing."),r={label:"Label",helperText:"Sub Label",type:"text",value:t,placeholder:"Placeholder...",variant:"naked",readOnly:!0,width:"300px",height:"104px",onChange:o=>{const n=o.target.value;e(n)}};return a.jsx(d,{...r})},m=()=>{const[t,e]=u.useState(""),r={label:"Label",helperText:"Sub Label",type:"text",value:t,placeholder:"Placeholder...",error:!0,errorMsg:"Error Message Here",width:"300px",height:"104px",onChange:o=>{const n=o.target.value;e(n)}};return a.jsx(d,{...r})},f=()=>{const[t,e]=u.useState("A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing."),r={label:"Label",helperText:"Sub Label",type:"text",value:t,placeholder:"Placeholder...",width:"300px",height:"104px",onChange:o=>{const n=o.target.value;e(n)}};return a.jsx(d,{...r})},v=()=>{const[t,e]=u.useState("A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing."),r={label:"Label",helperText:"Sub Label",type:"text",value:t,placeholder:"Placeholder...",onChange:o=>{const n=o.target.value;e(n)}};return a.jsx(d,{...r})},C=()=>{const[t,e]=u.useState("A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea."),r={label:"Label",helperText:"Sub Label",type:"text",value:t,placeholder:"Placeholder...",width:"300px",height:"104px",disabled:!0,onChange:o=>{const n=o.target.value;e(n)}};return a.jsx(d,{...r})},y=()=>{const[t,e]=u.useState(""),[i,r]=u.useState(""),o=p=>{const w=p.target.value;r(w),e("")},n=()=>{e("Triggered because this input lost focus")},c=()=>{e("")};return a.jsxs(a.Fragment,{children:[a.jsx(d,{label:"Enter Name",name:"name",type:"text",value:i,width:"400px",placeholder:"Enter vault name",onChange:o,onBlur:n,onFocus:c}),a.jsx("label",{children:t&&t})]})},L=()=>{const[t,e]=u.useState(""),r={type:"text",label:"Label",value:t,placeholder:"Placeholder...",width:"300px",height:"104px",onChange:o=>{const n=o.target.value;e(n)},maxLength:512,showCharLeftCount:!0};return a.jsx(d,{...r})},H=()=>{const[t,e]=u.useState(""),r={label:"Label",helperText:"Assistive text goes here",value:t,placeholder:"Placeholder...",width:"300px",height:"104px",maxLength:512,showCharLeftCount:!0,onChange:o=>{const n=o.target.value;e(n)}};return a.jsx("div",{"data-theme":"dark",style:{padding:"24px",background:"#0a0b2e",borderRadius:"8px"},children:a.jsx(d,{...r})})};x.__docgenInfo={description:"",methods:[],displayName:"Default"};b.__docgenInfo={description:"",methods:[],displayName:"Readonly"};m.__docgenInfo={description:"",methods:[],displayName:"Error"};f.__docgenInfo={description:"",methods:[],displayName:"Scroll"};v.__docgenInfo={description:"",methods:[],displayName:"FullWidth"};C.__docgenInfo={description:"",methods:[],displayName:"Disabled"};y.__docgenInfo={description:"",methods:[],displayName:"OnBlur"};L.__docgenInfo={description:"",methods:[],displayName:"MaxLength"};H.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var P,D,A;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const value = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    onChange: onChangeHandler
  };
  return <Textarea {...props} />;
}`,...(A=(D=x.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var I,k,E;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.');
  const onChangeHandler = e => {
    const value = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    variant: 'naked',
    readOnly: true,
    width: '300px',
    height: '104px',
    onChange: onChangeHandler
  };
  return <Textarea {...props} />;
}`,...(E=(k=b.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var F,R,M;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const value = e.target.value;
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
    width: '300px',
    height: '104px',
    onChange: onChangeHandler
  };
  return <Textarea {...props} />;
}`,...(M=(R=m.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var O,W,$;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.');
  const onChangeHandler = e => {
    const value = e.target.value;
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
    onChange: onChangeHandler
  };
  return <Textarea {...props} />;
}`,...($=(W=f.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var z,G,J;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.');
  const onChangeHandler = e => {
    const value = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    onChange: onChangeHandler
  };
  return <Textarea {...props} />;
}`,...(J=(G=v.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,U;C.parameters={...C.parameters,docs:{...(K=C.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.');
  const onChangeHandler = e => {
    const value = e.target.value;
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
  return <Textarea {...props} />;
}`,...(U=(Q=C.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [blurLable, setBlurLabel] = useState('');
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const value = e.target.value;
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
      <Textarea label="Enter Name" name="name" type="text" value={value} width="400px" placeholder="Enter vault name" onChange={onChangeHandler} onBlur={onBlurHandler} onFocus={onFocusHandler} />
      <label>{blurLable && blurLable}</label>
    </>;
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,te;L.parameters={...L.parameters,docs:{...(ee=L.parameters)==null?void 0:ee.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const value = e.target.value;
    setValue(value);
  };
  const props = {
    type: 'text',
    label: 'Label',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    onChange: onChangeHandler,
    maxLength: 512,
    showCharLeftCount: true
  };
  return <Textarea {...props} />;
}`,...(te=(ae=L.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,ne,se;H.parameters={...H.parameters,docs:{...(re=H.parameters)==null?void 0:re.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const onChangeHandler = e => {
    const value = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Assistive text goes here',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    maxLength: 512,
    showCharLeftCount: true,
    onChange: onChangeHandler
  };
  return <div data-theme="dark" style={{
    padding: '24px',
    background: '#0a0b2e',
    borderRadius: '8px'
  }}>
      <Textarea {...props} />
    </div>;
}`,...(se=(ne=H.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};const He=["Default","Readonly","Error","Scroll","FullWidth","Disabled","OnBlur","MaxLength","DarkTheme"];export{H as DarkTheme,x as Default,C as Disabled,m as Error,v as FullWidth,L as MaxLength,y as OnBlur,b as Readonly,f as Scroll,He as __namedExportsOrder,Le as default};
