import{j as e,b as O,D as b,r as d}from"./iframe-DSshnrLJ.js";import{M as i}from"./modal-popup-Do-1riew.js";import{T as P}from"./textfield-CT1gls30.js";import"./preload-helper-Dp1pzeXC.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./index-BWW3-H0m.js";import"./typography-DAWbNXo9.js";import"./index-DyAci3dY.js";import"./button-D98htB4G.js";import"./tooltip-DiFZ0xw-.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";import"./index-BvCv2CeA.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./info-XWXRQWYd.js";const q={title:"design-components/ModalPopup",component:i},l=()=>{const[n,t]=d.useState(!1),[a,c]=d.useState({value:""}),v=()=>{t(!0)},D=()=>{console.log(a),t(!1)},r=()=>{t(!1)},f=p=>{console.log(p.target.value),c({...a,value:p.target.value})},H=[{text:"Ok",variant:"primary",onClick:D,size:"large"},{text:"Cancel",variant:"secondary",onClick:r,size:"large"},{text:"Cancel",variant:"secondary",onClick:r,size:"large"},{text:"Cancel",variant:"secondary",onClick:r,size:"large"},{text:"Cancel",type:"secondary",onClick:r,size:"large"}];return e.jsxs("div",{children:[e.jsx("button",{type:"button",onClick:v,children:"Open Dialog"}),n&&e.jsx(i,{width:464,title:"Add Permission",buttons:H,onCancel:r,children:e.jsx(P,{value:a.value,onChange:f,placeholder:"Enter Name"})})]})},s=()=>{const[n,t]=d.useState(!1),a=()=>{t(!0)},c=()=>{t(!1)};return e.jsxs("div",{children:[e.jsx("button",{type:"button",onClick:a,children:"Open Dialog"}),n&&e.jsx(i,{width:464,title:"Permission Details",onCancel:c,classNamePrefix:"without-action-buttons",children:e.jsx("p",{children:"This row data contains details about Vault Permission"})})]})},o=()=>{const n=()=>{};return e.jsx(O,{children:e.jsxs(b,{style:{minHeight:120,color:"#e6e6e9"},children:[e.jsx("p",{style:{marginBottom:16},children:"Modal is portaled to document; html data-theme is set to dark for this story."}),e.jsx(i,{width:464,title:"Modal on dark theme",onCancel:n,buttons:[{text:"OK",variant:"primary",onClick:n,size:"large"},{text:"Cancel",variant:"secondary",onClick:n,size:"large"}],children:e.jsx("p",{children:"Example content inside the modal."})})]})})};o.storyName="Dark theme";l.__docgenInfo={description:"",methods:[],displayName:"ModalPopupDemo"};s.__docgenInfo={description:"",methods:[],displayName:"WithoutActionButtons"};o.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var m,u,h;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    value: ''
  });
  const modalOpenHandler = () => {
    setOpenModal(true);
  };
  const okHandler = () => {
    console.log(data);
    setOpenModal(false);
  };
  const cancelHandler = () => {
    setOpenModal(false);
  };
  const changeHandler = e => {
    console.log(e.target.value);
    setData({
      ...data,
      value: e.target.value
    });
  };
  const buttons = [{
    text: 'Ok',
    variant: 'primary',
    onClick: okHandler,
    size: 'large'
  }, {
    text: 'Cancel',
    variant: 'secondary',
    onClick: cancelHandler,
    size: 'large'
  }, {
    text: 'Cancel',
    variant: 'secondary',
    onClick: cancelHandler,
    size: 'large'
  }, {
    text: 'Cancel',
    variant: 'secondary',
    onClick: cancelHandler,
    size: 'large'
  }, {
    text: 'Cancel',
    type: 'secondary',
    onClick: cancelHandler,
    size: 'large'
  }];
  return <div>
      <button type='button' onClick={modalOpenHandler}>
        Open Dialog
      </button>
      {openModal && <ModalPopup width={464} title={'Add Permission'} buttons={buttons} onCancel={cancelHandler}>
          <TextField value={data.value} onChange={changeHandler} placeholder='Enter Name' />
        </ModalPopup>}
    </div>;
}`,...(h=(u=l.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,x,k;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [openModal, setOpenModal] = useState(false);
  const modalOpenHandler = () => {
    setOpenModal(true);
  };
  const cancelHandler = () => {
    setOpenModal(false);
  };
  return <div>
      <button type='button' onClick={modalOpenHandler}>
        Open Dialog
      </button>
      {openModal && <ModalPopup width={464} title={'Permission Details'} onCancel={cancelHandler} classNamePrefix="without-action-buttons">
          <p>This row data contains details about Vault Permission</p>
        </ModalPopup>}
    </div>;
}`,...(k=(x=s.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var y,C,M;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const noop = () => {};
  return <DarkStoryDocument>
      <DarkStorySurface style={{
      minHeight: 120,
      color: '#e6e6e9'
    }}>
        <p style={{
        marginBottom: 16
      }}>
          Modal is portaled to document; html data-theme is set to dark for
          this story.
        </p>
        <ModalPopup width={464} title="Modal on dark theme" onCancel={noop} buttons={[{
        text: 'OK',
        variant: 'primary',
        onClick: noop,
        size: 'large'
      }, {
        text: 'Cancel',
        variant: 'secondary',
        onClick: noop,
        size: 'large'
      }]}>
          <p>Example content inside the modal.</p>
        </ModalPopup>
      </DarkStorySurface>
    </DarkStoryDocument>;
}`,...(M=(C=o.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};const G=["ModalPopupDemo","WithoutActionButtons","DarkTheme"];export{o as DarkTheme,l as ModalPopupDemo,s as WithoutActionButtons,G as __namedExportsOrder,q as default};
