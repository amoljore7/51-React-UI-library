import{r as g,j as e,b as ce,D as pe}from"./iframe-DSshnrLJ.js";import{r as ge}from"./index-jeJjRp3B.js";import{P as t}from"./index-BWW3-H0m.js";import{T as k}from"./typography-DAWbNXo9.js";import{B as de}from"./button-D98htB4G.js";import{F as ue}from"./index-BvCv2CeA.js";import{m as me}from"./resolve-portal-data-theme-3zjxciPe.js";import{T}from"./textfield-CT1gls30.js";import"./preload-helper-Dp1pzeXC.js";import"./index-Bfwlc43E.js";import"./index-DyAci3dY.js";import"./tooltip-DiFZ0xw-.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";import"./info-XWXRQWYd.js";const n={overlayContainer:"overlay-container",dialogContainer:"dialog-container",popupStrap:"popup-strap",headingContainer:"heading-container",titleContainer:"title-container",iconContainer:"icon-container",messageContainer:"message-container",buttonContainer:"button-container",buttonWrapper:"button-wrapper",dialogChildrenWrapper:"dialog-children-wrapper"},p={general:"general",alert:"alert",error:"error"},he="#F1C21B",De="#E15C5C",ye=24,Ce=200,ve=278,xe=464,m=({type:r=p.general,width:a=xe,height:o=ve,title:l,message:s,primaryButtonText:i,secondaryButtonText:c,onSubmit:h,onCancel:d,children:f,primaryButtonDisabled:Q=!1,themeSourceRef:S,primaryButtonTestId:U="dialog-primary-btn",secondaryButtonTestId:Y="dialog-secondary-btn"})=>{const[u]=g.useState(document.createElement("div"));u.id="dialog-popup",u.style.position="fixed",u.style.zIndex=Ce,g.useEffect(()=>me(u,S),[u,S]);const Z=()=>{switch(r){case p.general:return window.getComputedStyle(document.body).getPropertyValue("--brand");case p.alert:return he;case p.error:return De}},$=()=>e.jsx("div",{role:"popup-strap",className:n.popupStrap,style:{width:a-2,backgroundColor:Z()}}),ee=()=>e.jsxs("div",{className:n.headingContainer,children:[e.jsx("div",{className:n.titleContainer,children:e.jsx(k,{variant:"heading4",children:l})}),e.jsx("div",{className:n.iconContainer,children:e.jsx(ue,{size:ye,onClick:d,style:{cursor:"pointer"},"data-testid":"dialog-popup-close-icon"})})]}),te=()=>e.jsx("div",{role:"message",className:n.messageContainer,children:e.jsx(k,{variant:"body",children:s})}),ae=()=>e.jsx("div",{className:n.dialogChildrenWrapper,children:f}),oe=()=>e.jsxs("div",{className:n.buttonContainer,children:[c&&j("secondary",c,d,!1,Y),i&&j("primary",i,h,Q,U)]}),j=(ne,re,se,le,ie)=>e.jsx("div",{className:n.buttonWrapper,children:e.jsx(de,{variant:ne,size:"large",onClick:se,disabled:le,testId:ie,children:re})});return ge.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:n.overlayContainer}),e.jsxs("div",{role:"dialog-popup",className:n.dialogContainer,style:{width:a,height:o},children:[$(),ee(),s&&te(),f&&ae(),(i||c)&&oe()]})]}),u)};m.propTypes={type:t.oneOf([p.general,p.alert,p.error]),width:t.number,height:t.number,title:t.string.isRequired,message:t.string,primaryButtonText:t.string,secondaryButtonText:t.string,onSubmit:t.func,onCancel:t.func,children:t.oneOfType([t.elementType,t.func]),primaryButtonDisabled:t.bool,themeSourceRef:t.shape({current:t.any}),primaryButtonTestId:t.string,secondaryButtonTestId:t.string};const We={title:"design-components/DialogPopup",component:m,argTypes:{type:{options:["general","alert","error"],control:{type:"radio"}}}},x={args:{type:"general",title:"Title",message:"Message here"}},b={args:{type:"alert",title:"Title",message:"Message here"}},O={args:{type:"error",title:"Title",message:"Message here"}},D=()=>{const[r,a]=g.useState(!1),o=()=>{a(!0)},l=()=>{console.log("onOK clicked"),a(!1)},s=()=>{console.log("onCancel clicked"),a(!1)};return e.jsxs("div",{children:[e.jsx("button",{type:"button",onClick:o,children:"Open Dialog"}),r&&e.jsx(m,{width:464,height:278,type:"general",title:"Title",message:"Message here",primaryButtonText:"OK",secondaryButtonText:"Cancel",onSubmit:l,onCancel:s})]})},y=()=>{const[r,a]=g.useState(!1),[o,l]=g.useState({value:""}),s=d=>{l({...o,value:d.target.value})},i=()=>{a(!0)},c=()=>{a(!1)},h=()=>{a(!1)};return e.jsxs("div",{children:[e.jsx("button",{type:"button",onClick:i,children:"Open Dialog"}),r&&e.jsx(m,{width:464,height:345,type:"general",title:"Delete Vault?",message:"This will remove all secrets from the vault. The vault will no longer will accessible.",primaryButtonText:"OK",secondaryButtonText:"Cancel",onSubmit:c,onCancel:h,primaryButtonDisabled:o.value.trim()!=="DELETE",children:e.jsx(T,{label:"Please type 'DELETE' to confirm",value:o.value,onChange:s})})]})},C=()=>{const[r,a]=g.useState(!1),[o,l]=g.useState({value:""}),s=d=>{l({...o,value:d.target.value})},i=()=>{a(!0)},c=()=>{a(!1)},h=()=>{a(!1)};return e.jsxs("div",{children:[e.jsx("button",{type:"button",onClick:i,children:"Open Dialog"}),r&&e.jsxs(m,{width:464,height:445,type:"general",title:"Title",message:"Message here.",primaryButtonText:"OK",secondaryButtonText:"Cancel",onSubmit:c,onCancel:h,children:[e.jsx(T,{label:"Label",value:o.value,onChange:s}),e.jsx("div",{style:{marginTop:"32px"},children:e.jsx(T,{label:"Label",value:o.value,onChange:s})})]})]})},v={render:r=>e.jsx(ce,{children:e.jsx(pe,{style:{minHeight:320},children:e.jsx(m,{...r,width:464,height:278,primaryButtonText:"OK",secondaryButtonText:"Cancel",onSubmit:()=>{},onCancel:()=>{}})})}),args:{type:"general",title:"Title",message:"Message on dark theme (portaled dialog uses document theme)."}};v.storyName="General (dark theme)";D.__docgenInfo={description:"",methods:[],displayName:"DialogPopupDemo"};y.__docgenInfo={description:"",methods:[],displayName:"DialogWithSingleInputFieldDemo"};C.__docgenInfo={description:"",methods:[],displayName:"DialogWithMultipleInputFieldDemo"};var B,E,w;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    type: 'general',
    title: 'Title',
    message: 'Message here'
  }
}`,...(w=(E=x.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var P,M,N;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    type: 'alert',
    title: 'Title',
    message: 'Message here'
  }
}`,...(N=(M=b.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var F,I,W;O.parameters={...O.parameters,docs:{...(F=O.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    type: 'error',
    title: 'Title',
    message: 'Message here'
  }
}`,...(W=(I=O.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var H,K,_;D.parameters={...D.parameters,docs:{...(H=D.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const onOk = () => {
    console.log('onOK clicked');
    setOpenDialog(false);
  };
  const onCancel = () => {
    console.log('onCancel clicked');
    setOpenDialog(false);
  };
  return <div>
      <button type="button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      {openDialog && <DialogPopup width={464} height={278} type={'general'} title={'Title'} message={'Message here'} primaryButtonText={'OK'} secondaryButtonText={'Cancel'} onSubmit={onOk} onCancel={onCancel} />}
    </div>;
}`,...(_=(K=D.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var L,z,G;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({
    value: ''
  });
  const changeHandler = e => {
    setData({
      ...data,
      value: e.target.value
    });
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const onOk = () => {
    setOpenDialog(false);
  };
  const onCancel = () => {
    setOpenDialog(false);
  };
  return <div>
      <button type="button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      {openDialog && <DialogPopup width={464} height={345} type={'general'} title={'Delete Vault?'} message={'This will remove all secrets from the vault. The vault will no longer will accessible.'} primaryButtonText={'OK'} secondaryButtonText={'Cancel'} onSubmit={onOk} onCancel={onCancel} primaryButtonDisabled={data.value.trim() !== 'DELETE'}>
          <TextField label="Please type 'DELETE' to confirm" value={data.value} onChange={changeHandler} />
        </DialogPopup>}
    </div>;
}`,...(G=(z=y.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var A,R,V;C.parameters={...C.parameters,docs:{...(A=C.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({
    value: ''
  });
  const changeHandler = e => {
    setData({
      ...data,
      value: e.target.value
    });
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const onOk = () => {
    setOpenDialog(false);
  };
  const onCancel = () => {
    setOpenDialog(false);
  };
  return <div>
      <button type="button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      {openDialog && <DialogPopup width={464} height={445} type={'general'} title={'Title'} message={'Message here.'} primaryButtonText={'OK'} secondaryButtonText={'Cancel'} onSubmit={onOk} onCancel={onCancel}>
          <TextField label="Label" value={data.value} onChange={changeHandler} />
          <div style={{
        marginTop: '32px'
      }}>
            <TextField label="Label" value={data.value} onChange={changeHandler} />
          </div>
        </DialogPopup>}
    </div>;
}`,...(V=(R=C.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var q,X,J;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <DarkStoryDocument>
      <DarkStorySurface style={{
      minHeight: 320
    }}>
        <DialogPopup {...args} width={464} height={278} primaryButtonText="OK" secondaryButtonText="Cancel" onSubmit={() => {}} onCancel={() => {}} />
      </DarkStorySurface>
    </DarkStoryDocument>,
  args: {
    type: 'general',
    title: 'Title',
    message: 'Message on dark theme (portaled dialog uses document theme).'
  }
}`,...(J=(X=v.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};const He=["GeneralDialog","AlertDialog","ErrorDialog","DialogPopupDemo","DialogWithSingleInputFieldDemo","DialogWithMultipleInputFieldDemo","GeneralDialogDark"];export{b as AlertDialog,D as DialogPopupDemo,C as DialogWithMultipleInputFieldDemo,y as DialogWithSingleInputFieldDemo,O as ErrorDialog,x as GeneralDialog,v as GeneralDialogDark,He as __namedExportsOrder,We as default};
