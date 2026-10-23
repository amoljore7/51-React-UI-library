import{r as l,j as e,D as le}from"./iframe-DSshnrLJ.js";import{T as S}from"./typography-DAWbNXo9.js";import{P as h}from"./index-BWW3-H0m.js";import{c as ne}from"./index-DyAci3dY.js";import{I as re}from"./index-DDIoMWDg.js";import{I as se}from"./index-DP8aCK5i.js";import{S as ie}from"./file-upload-text-KDX3f_T1.js";import{B as de}from"./button-D98htB4G.js";import{T as pe}from"./tooltip-DiFZ0xw-.js";import"./preload-helper-Dp1pzeXC.js";import"./iconBase-D3NFPLFw.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";const ce=o=>l.createElement("svg",{width:120,height:120,viewBox:"0 0 120 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",...o},l.createElement("rect",{width:120,height:120,rx:3,fill:"#D0E2FF"}),l.createElement("path",{d:"M36 39.4883C36 37.8314 37.3431 36.4883 39 36.4883H81C82.6569 36.4883 84 37.8314 84 39.4883V81.4883C84 83.1451 82.6569 84.4883 81 84.4883H39C37.3431 84.4883 36 83.1451 36 81.4883V39.4883Z",fill:"#D0E2FF"}),l.createElement("path",{d:"M62 40.4883H48C46.9391 40.4883 45.9217 40.9097 45.1716 41.6599C44.4214 42.41 44 43.4274 44 44.4883V76.4883C44 77.5491 44.4214 78.5666 45.1716 79.3167C45.9217 80.0669 46.9391 80.4883 48 80.4883H72C73.0609 80.4883 74.0783 80.0669 74.8284 79.3167C75.5786 78.5666 76 77.5491 76 76.4883V54.4883L62 40.4883Z",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M62 40.4883V54.4883H76",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})),t={uploadFormContainer:"bds-upload-form-container",uploadFormContainerInput:"bds-upload-form-container-input",uploadFormContainerInputLabel:"bds-upload-form-container-input-label",uploadFormInstructText:"bds-upload-form-instruct-text",uploadFormMaxSizeText:"bds-upload-form-max-size-text",uploadFormErrorText:"bds-upload-form-error-text",uploadFormErrorTextFileName:"bds-upload-form-error-text-file",uploadErrorIcon:"bds-upload-form-error-icon",uploadFormCompleteContainer:"bds-upload-form-file-complete-container",uploadFormComplete:"bds-upload-form-file-complete",uploadFormCompleteFileIcon:"bds-upload-form-file-complete-icon",uploadFormCompleteThumbnail:"bds-upload-form-file-complete-thumbnail",uploadFormCompleteFileContainer:"bds-upload-form-complete-file-container",uploadFormCompleteFileName:"bds-upload-form-complete-file-name",uploadFormCompleteReset:"bds-upload-form-complete-reset",uploadFormCompleteReplace:"bds-upload-form-complete-replace",uploadFormDraggedOverContainer:"bds-upload-form-dragged-over-container",uploadFormDraggedOver:"bds-upload-form-dragged-over",uploadFormErrorBorder:"bds-upload-form-container-error-border"},ue="Drag & Drop a file here or click to upload",me="Max size",fe="An error has occurred during upload, please try again",ge="File size exceeds the maximum permissible limit",H="16",he="img",Fe="Upload file",ve="file-uploaded",xe="Replace",A=({handleFileDragLeave:o,handleFileDrop:s,width:r})=>e.jsx("div",{className:t.uploadFormDraggedOverContainer,onDrop:s,onDragLeave:o,onDragOver:i=>i.preventDefault(),style:r?{width:r}:void 0,children:e.jsx(ce,{className:t.uploadFormDraggedOver,"aria-hidden":!0,focusable:"false"})});A.__docgenInfo={description:"",methods:[],displayName:"FileDraggedOver"};const Ce=o=>l.createElement("svg",{width:120,height:121,viewBox:"0 0 120 121",fill:"none",xmlns:"http://www.w3.org/2000/svg",...o},l.createElement("path",{d:"M80 80.1709L60 60.1709L40 80.1709",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M60 60.1709V105.171",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M101.95 92.1213C106.826 89.4627 110.679 85.2557 112.899 80.1644C115.119 75.0731 115.581 69.3875 114.211 64.0048C112.841 58.6221 109.717 53.8489 105.333 50.4385C100.949 47.0282 95.5541 45.175 89.9998 45.1713H83.6998C82.1864 39.3175 79.3656 33.883 75.4495 29.2763C71.5335 24.6696 66.624 21.0106 61.0903 18.5743C55.5566 16.1381 49.5426 14.9881 43.5004 15.2107C37.4582 15.4333 31.5451 17.0228 26.2057 19.8596C20.8662 22.6965 16.2394 26.7068 12.6729 31.5892C9.10646 36.4716 6.69325 42.099 5.6147 48.0483C4.53615 53.9976 4.82033 60.114 6.44587 65.9376C8.07141 71.7613 10.996 77.1406 14.9998 81.6713",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M80 80.1709L60 60.1709L40 80.1709",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})),$=({handleFileDragEnter:o,handleFileSelect:s,uploadPromptText:r,maxFileSizeMessage:i,fileSizeExceededMessage:d,fileSizeLimitKb:n,uploadFailureMessage:a,sizeError:m,otherErrors:F,file:c,errorBorder:v=!1,width:u})=>{const f={[t.uploadFormContainer]:!0,[t.uploadFormErrorBorder]:v};return e.jsxs("div",{className:ne(f),onDragEnter:o,style:u?{width:u}:void 0,children:[e.jsx("label",{htmlFor:"file-upload",className:t.uploadFormContainerInputLabel}),e.jsx("input",{id:"file-upload",className:t.uploadFormContainerInput,type:"file",onChange:s}),e.jsx(Ce,{role:he,"aria-label":Fe}),e.jsx("div",{className:t.uploadFormInstructText,children:e.jsx(S,{variant:"heading6",children:r})}),!(m||F)&&e.jsx("div",{className:t.uploadFormMaxSizeText,children:e.jsx(S,{variant:"label1",children:`${i} ${n} kb`})}),(m||F)&&e.jsxs("div",{className:t.uploadFormErrorText,children:[e.jsx(re,{size:H,className:t.uploadErrorIcon}),m&&e.jsx("div",{className:t.uploadFormErrorTextFileName,children:e.jsx(S,{variant:"helper1",children:(c==null?void 0:c.name)||""})})," ",e.jsx(S,{variant:"helper1",children:m?`${d} (${n}kb)`:a})]})]})};$.__docgenInfo={description:"",methods:[],displayName:"FileInput",props:{errorBorder:{defaultValue:{value:"false",computed:!1},required:!1}}};const Z=({file:o,base64File:s,handleFileReset:r,handleFileSelect:i,width:d})=>{const n=l.useRef();return e.jsxs("div",{className:t.uploadFormCompleteContainer,style:d?{width:d}:void 0,children:[e.jsxs("div",{className:t.uploadFormComplete,children:[!(o.type.startsWith("image")||o.type.startsWith("img"))&&e.jsx(ie,{className:t.uploadFormCompleteFileIcon,role:"img","aria-label":ve}),(o.type.startsWith("image")||o.type.startsWith("img"))&&e.jsx("img",{className:t.uploadFormCompleteThumbnail,src:s})]}),e.jsxs("div",{className:t.uploadFormCompleteFileContainer,children:[e.jsx(pe,{title:o.name,position:"bottom",children:e.jsx("div",{className:t.uploadFormCompleteFileName,children:e.jsx(S,{variant:"label1",children:o.name})})}),e.jsx("div",{className:t.uploadFormCompleteReplace,children:e.jsxs(de,{onClick:()=>{var a;(a=n==null?void 0:n.current)==null||a.click()},variant:"secondary",size:"small",type:"reset",children:[e.jsx("input",{id:"file-upload",className:t.uploadFormContainerInput,type:"file",onChange:i,ref:n}),e.jsx("label",{htmlFor:"file-upload",className:t.uploadFormContainerInputLabel}),xe]})}),e.jsx("div",{className:t.uploadFormCompleteReset,children:e.jsx(se,{size:H,onClick:r})})]})]})};Z.__docgenInfo={description:"",methods:[],displayName:"FileSave"};const G=({handleFileDragEnter:o,handleFileDragLeave:s,handleFileDrop:r,handleFileSelect:i,handleFileReset:d,uploadPromptText:n,maxFileSizeMessage:a,fileSizeExceededMessage:m,uploadFailureMessage:F,fileSizeLimitKb:c,file:v,base64File:u,sizeError:f,otherErrors:I,formState:x,errorBorder:z,width:C})=>{switch(x){case"input":return e.jsx($,{handleFileSelect:i,handleFileDragEnter:o,uploadPromptText:n,maxFileSizeMessage:a,fileSizeExceededMessage:m,fileSizeLimitKb:c,uploadFailureMessage:F,sizeError:f,otherErrors:I,file:v,errorBorder:z,width:C});case"save":return e.jsx(Z,{file:v,base64File:u,handleFileReset:d,handleFileSelect:i,width:C});case"drag":return e.jsx(A,{handleFileDragLeave:s,handleFileDrop:r,width:C})}};G.__docgenInfo={description:"",methods:[],displayName:"FileUploadRenderer"};const j=({uploadPromptText:o=ue,maxFileSizeMessage:s=me,fileSizeExceededMessage:r=ge,uploadFailureMessage:i=fe,fileSizeLimitKb:d=400,savedFile:n=null,onChange:a=()=>{},onReset:m=()=>{},errorBorder:F=!1,width:c=""})=>{const v=c&&parseInt(c)<270?"270px":c||void 0,[u,f]=l.useState(n),[I,x]=l.useState(null),[z,C]=l.useState(!1),[J,Q]=l.useState(!1),[X,g]=l.useState("input");l.useLayoutEffect(()=>{u&&(a(u),g("save"))},[u]);const N=p=>{p.preventDefault(),p.stopPropagation()},E=p=>{const D=new FileReader;D.readAsDataURL(p[0]),D.onprogress=()=>{g("input"),f(null),x(null)},D.onload=te=>{te.loaded/1e3<=d?(f(p[0]),x(D.result),C(!1),g("save")):(g("input"),f(null),x(null),C(!0),a(null))},D.onerror=()=>{g("input"),Q(!0)}};l.useLayoutEffect(()=>{n?E([n]):R()},[n]);const R=()=>{g("input"),f(null),x(null),m()},Y=p=>{N(p),E(p.dataTransfer.files)},ee=p=>{N(p),E(p.target.files)},oe=p=>{N(p),g("drag")},ae=p=>{N(p),g("input")};return e.jsx(G,{handleFileDragEnter:oe,handleFileDragLeave:ae,handleFileDrop:Y,handleFileSelect:ee,handleFileReset:R,uploadPromptText:o,maxFileSizeMessage:s,fileSizeExceededMessage:r,fileSizeLimitKb:d,uploadFailureMessage:i,sizeError:z,otherErrors:J,file:u,base64File:I,formState:X,errorBorder:F,width:v})};j.propTypes={uploadPromptText:h.string,maxFileSizeMessage:h.string,uploadFailureMessage:h.string,fileSizeExceededMessage:h.string,onChange:h.func,errorBorder:h.bool,width:h.string};j.__docgenInfo={description:"",methods:[],displayName:"FileUpload",props:{uploadPromptText:{defaultValue:{value:"'Drag & Drop a file here or click to upload'",computed:!1},description:"",type:{name:"string"},required:!1},maxFileSizeMessage:{defaultValue:{value:"'Max size'",computed:!1},description:"",type:{name:"string"},required:!1},fileSizeExceededMessage:{defaultValue:{value:"'File size exceeds the maximum permissible limit'",computed:!1},description:"",type:{name:"string"},required:!1},uploadFailureMessage:{defaultValue:{value:"'An error has occurred during upload, please try again'",computed:!1},description:"",type:{name:"string"},required:!1},fileSizeLimitKb:{defaultValue:{value:"400",computed:!1},required:!1},savedFile:{defaultValue:{value:"null",computed:!1},required:!1},onChange:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},onReset:{defaultValue:{value:"() => {}",computed:!1},required:!1},errorBorder:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},width:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1}}};const Be={title:"design-components/FileUpload",component:j},y=()=>{const[s,r]=l.useState(null),i=a=>{console.log("onChange called",a)},d=()=>{console.log("onReset called")},n=a=>{r(a.target.files[0])};return e.jsxs("div",{children:[e.jsx("input",{type:"file",onChange:n,id:"file-viewer-demo-input",style:{marginBottom:"40px"}}),e.jsx(j,{fileSizeLimitKb:400,onChange:i,savedFile:s,onReset:d})]})},k=()=>{const[s,r]=l.useState(null),i=a=>{r(a)},d=()=>{r(null)},n=a=>{r(a.target.files[0])};return e.jsxs("div",{children:[e.jsx("input",{type:"file",onChange:n,id:"file-viewer-demo-input",style:{marginBottom:"40px"}}),e.jsx(j,{fileSizeLimitKb:400,onChange:i,savedFile:s,onReset:d,errorBorder:!s}),s?null:e.jsx("div",{style:{color:"red"},children:e.jsx(S,{variant:"helper1",children:"Please Upload File"})})]})},L=()=>{const[s,r]=l.useState(null),i=a=>{console.log("onChange called",a)},d=()=>{console.log("onReset called")},n=a=>{r(a.target.files[0])};return e.jsxs("div",{children:[e.jsx("input",{type:"file",onChange:n,id:"file-viewer-demo-input",style:{marginBottom:"40px"}}),e.jsx(j,{fileSizeLimitKb:400,onChange:i,savedFile:s,onReset:d,width:270})]})},b=()=>e.jsx(le,{children:e.jsx(y,{})});b.storyName="Dark theme";y.__docgenInfo={description:"",methods:[],displayName:"FileUploadDemo"};k.__docgenInfo={description:"",methods:[],displayName:"FileUploadInputValidation"};L.__docgenInfo={description:"",methods:[],displayName:"ReduceWidth"};b.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var T,U,M;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const fileSizeLimitKb = 400;
  // use these state variables to do
  // programmatic file load
  const [savedFile, setSavedFile] = useState(null);
  const onChange = file => {
    console.log('onChange called', file);
  };
  const onReset = () => {
    console.log('onReset called');
  };
  const handleFileSelect = e => {
    setSavedFile(e.target.files[0]);
  };

  /**
   * first 4 props are for controlling the translation of text in the component
   *
   * All props re optional
   *
   * Props
   *    uploadPromptText -
   *      ['Default to 'Drag and Drop file
   *      or click to upload' in enh]
   *    maxFileSizeMessage -
   *      [ Default to 'Max Size']
   *    fileSizeExceededMessage -
   *      [Defaults to 'file is too big,
   *      please try another file' in en]
   *    uploadFailureMessage -
   *      [Default to 'An error occurred
   *      while uploading, please try
   *      again' in en]
   * ---> use above four props to include translation of this component text
   *    fileSizeLimitKb - Number indicating max-size in KB
   *    savedFile - for loading files at runtime
   *    onChange: -- function (file) -- use file parameter to read it;
   *    onReset: -- function () --- this is called when an uploaded file is removed
   *                                 use this to update your savedFile in local state
   */
  return <div>
      <input type='file' onChange={handleFileSelect} id='file-viewer-demo-input' style={{
      marginBottom: '40px'
    }} />
      <FileUpload {...{
      fileSizeLimitKb,
      onChange,
      savedFile,
      onReset
    }} />
    </div>;
}`,...(M=(U=y.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};var B,w,_;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  // use errorBorder prop to show validation on input of file
  const fileSizeLimitKb = 400;
  const [savedFile, setSavedFile] = useState(null);
  const onChange = file => {
    setSavedFile(file);
  };
  const onReset = () => {
    setSavedFile(null);
  };
  const handleFileSelect = e => {
    setSavedFile(e.target.files[0]);
  };
  return <div>
      <input type='file' onChange={handleFileSelect} id='file-viewer-demo-input' style={{
      marginBottom: '40px'
    }} />
      <FileUpload {...{
      fileSizeLimitKb,
      onChange,
      savedFile,
      onReset,
      errorBorder: !savedFile
    }} />
      {!savedFile ? <div style={{
      color: 'red'
    }}>
          <Typography variant='helper1'>{'Please Upload File'}</Typography>
        </div> : null}
    </div>;
}`,...(_=(w=k.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};var V,W,K;L.parameters={...L.parameters,docs:{...(V=L.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const fileSizeLimitKb = 400;
  const [savedFile, setSavedFile] = useState(null);
  const onChange = file => {
    console.log('onChange called', file);
  };
  const onReset = () => {
    console.log('onReset called');
  };
  const handleFileSelect = e => {
    setSavedFile(e.target.files[0]);
  };
  return <div>
      <input type='file' onChange={handleFileSelect} id='file-viewer-demo-input' style={{
      marginBottom: '40px'
    }} />
      <FileUpload {...{
      fileSizeLimitKb,
      onChange,
      savedFile,
      onReset,
      width: 270
    }} />
    </div>;
}`,...(K=(W=L.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var q,O,P;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`() => <DarkStorySurface>
    <FileUploadDemo />
  </DarkStorySurface>`,...(P=(O=b.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};const we=["FileUploadDemo","FileUploadInputValidation","ReduceWidth","DarkTheme"];export{b as DarkTheme,y as FileUploadDemo,k as FileUploadInputValidation,L as ReduceWidth,we as __namedExportsOrder,Be as default};
