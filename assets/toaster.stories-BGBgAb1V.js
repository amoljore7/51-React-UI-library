import{r as n,j as e}from"./iframe-DSshnrLJ.js";import{R as je}from"./index-jeJjRp3B.js";import{P as u}from"./index-BWW3-H0m.js";import{c as Te}from"./index-DyAci3dY.js";import{b as Ee,a as _e,S as De}from"./warning-B-srIOQH.js";import{S as Pe}from"./close-BgG3N9nv.js";import{B as p}from"./button-D98htB4G.js";import"./preload-helper-Dp1pzeXC.js";import"./index-Bfwlc43E.js";import"./tooltip-DiFZ0xw-.js";import"./typography-DAWbNXo9.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";const Ie=5e3,i={container:"bds-toaster",topCenter:"bds-toaster--top-center",topRight:"bds-toaster--top-right",topLeft:"bds-toaster--top-left",bottomCenter:"bds-toaster--bottom-center",bottomRight:"bds-toaster--bottom-right",bottomLeft:"bds-toaster--bottom-left",toast:"bds-toast",accentBar:"bds-toast__accent",icon:"bds-toast__icon",content:"bds-toast__content",headRow:"bds-toast__head-row",title:"bds-toast__title",description:"bds-toast__description",buttons:"bds-toast__buttons",closeButton:"bds-toast__close",toastSuccess:"bds-toast--success",toastError:"bds-toast--error",toastWarning:"bds-toast--warning",toastInfo:"bds-toast--info"},qe={success:i.toastSuccess,error:i.toastError,warning:i.toastWarning,info:i.toastInfo},Ae={"top-center":i.topCenter,"top-right":i.topRight,"top-left":i.topLeft,"bottom-center":i.bottomCenter,"bottom-right":i.bottomRight,"bottom-left":i.bottomLeft},Ne=["top-center","top-right","top-left","bottom-center","bottom-right","bottom-left"],Re="top-center",ze=5,q=new Set;let d=[];const f=new Map,t={create(s){const o=s.id??crypto.randomUUID(),a=d.findIndex(m=>m.id===o);a>=0?(clearTimeout(f.get(o)),f.delete(o),d=[...d.slice(0,a),{...s,id:o},...d.slice(a+1)]):d=[...d,{...s,id:o}];const r=s.duration!==void 0?s.duration:Ie;return r!==null&&f.set(o,setTimeout(()=>t.dismiss(o),r)),q.forEach(m=>m([...d])),o},dismiss(s){s!==void 0?(clearTimeout(f.get(s)),f.delete(s),d=d.filter(o=>o.id!==s)):(f.forEach(o=>clearTimeout(o)),f.clear(),d=[]),q.forEach(o=>o([...d]))}},We=s=>(q.add(s),s([...d]),()=>q.delete(s)),Ve=s=>n.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},n.createElement("path",{d:"M11.9998 17.0004C12.2831 17.0004 12.5206 16.9045 12.7123 16.7129C12.9039 16.5212 12.9998 16.2837 12.9998 16.0004C12.9998 15.717 12.9039 15.4795 12.7123 15.2879C12.5206 15.0962 12.2831 15.0004 11.9998 15.0004C11.7164 15.0004 11.4789 15.0962 11.2873 15.2879C11.0956 15.4795 10.9998 15.717 10.9998 16.0004C10.9998 16.2837 11.0956 16.5212 11.2873 16.7129C11.4789 16.9045 11.7164 17.0004 11.9998 17.0004ZM11.9998 13.0004C12.2831 13.0004 12.5206 12.9045 12.7123 12.7129C12.9039 12.5212 12.9998 12.2837 12.9998 12.0004V8.00037C12.9998 7.71703 12.9039 7.47953 12.7123 7.28787C12.5206 7.0962 12.2831 7.00037 11.9998 7.00037C11.7164 7.00037 11.4789 7.0962 11.2873 7.28787C11.0956 7.47953 10.9998 7.71703 10.9998 8.00037V12.0004C10.9998 12.2837 11.0956 12.5212 11.2873 12.7129C11.4789 12.9045 11.7164 13.0004 11.9998 13.0004ZM11.9998 22.0004C10.6164 22.0004 9.31642 21.7379 8.09976 21.2129C6.88309 20.6879 5.82476 19.9754 4.92476 19.0754C4.02476 18.1754 3.31226 17.117 2.78726 15.9004C2.26226 14.6837 1.99976 13.3837 1.99976 12.0004C1.99976 10.617 2.26226 9.31703 2.78726 8.10037C3.31226 6.8837 4.02476 5.82537 4.92476 4.92537C5.82476 4.02537 6.88309 3.31287 8.09976 2.78787C9.31642 2.26287 10.6164 2.00037 11.9998 2.00037C13.3831 2.00037 14.6831 2.26287 15.8998 2.78787C17.1164 3.31287 18.1748 4.02537 19.0748 4.92537C19.9748 5.82537 20.6873 6.8837 21.2123 8.10037C21.7373 9.31703 21.9998 10.617 21.9998 12.0004C21.9998 13.3837 21.7373 14.6837 21.2123 15.9004C20.6873 17.117 19.9748 18.1754 19.0748 19.0754C18.1748 19.9754 17.1164 20.6879 15.8998 21.2129C14.6831 21.7379 13.3831 22.0004 11.9998 22.0004ZM11.9998 20.0004C14.2331 20.0004 16.1248 19.2254 17.6748 17.6754C19.2248 16.1254 19.9998 14.2337 19.9998 12.0004C19.9998 9.76703 19.2248 7.87537 17.6748 6.32537C16.1248 4.77537 14.2331 4.00037 11.9998 4.00037C9.76642 4.00037 7.87476 4.77537 6.32476 6.32537C4.77476 7.87537 3.99976 9.76703 3.99976 12.0004C3.99976 14.2337 4.77476 16.1254 6.32476 17.6754C7.87476 19.2254 9.76642 20.0004 11.9998 20.0004Z",fill:"#005FB2"})),Fe={success:e.jsx(De,{"aria-hidden":"true"}),error:e.jsx(_e,{"aria-hidden":"true"}),warning:e.jsx(Ee,{"aria-hidden":"true"}),info:e.jsx(Ve,{"aria-hidden":"true"})},R=u.shape({text:u.string.isRequired,onClick:u.func.isRequired,disabled:u.bool}),z=({btn:s})=>e.jsx(p,{variant:"textOnly",size:"small",onClick:s.onClick,disabled:s.disabled??!1,children:s.text}),A=({id:s,title:o,description:a,type:r="info",closable:m,primaryButton:y,secondaryButton:c})=>{const g=!!a,b=!!(y||c),h=b&&e.jsxs(e.Fragment,{children:[c&&e.jsx(z,{btn:c}),y&&e.jsx(z,{btn:y})]});return e.jsxs("div",{className:Te(i.toast,qe[r]),role:r==="error"||r==="warning"?"alert":"status",children:[e.jsx("div",{className:i.accentBar}),e.jsxs("div",{className:i.content,children:[e.jsxs("div",{className:i.headRow,children:[e.jsx("div",{className:i.icon,children:Fe[r]}),e.jsx("span",{className:i.title,children:o}),!g&&b&&h,m&&e.jsx("button",{className:i.closeButton,"aria-label":"Dismiss",onClick:()=>t.dismiss(s),children:e.jsx(Pe,{"aria-hidden":"true"})})]}),a&&e.jsx("div",{className:i.description,children:a}),g&&b&&e.jsx("div",{className:i.buttons,children:h})]})]})};A.propTypes={id:u.string.isRequired,title:u.string.isRequired,description:u.string,type:u.oneOf(["success","error","warning","info"]),closable:u.bool,primaryButton:R,secondaryButton:R};A.__docgenInfo={description:"",methods:[],displayName:"ToastItem",props:{type:{defaultValue:{value:"'info'",computed:!1},description:"",type:{name:"enum",value:[{value:"'success'",computed:!1},{value:"'error'",computed:!1},{value:"'warning'",computed:!1},{value:"'info'",computed:!1}]},required:!1},id:{description:"",type:{name:"string"},required:!0},title:{description:"",type:{name:"string"},required:!0},description:{description:"",type:{name:"string"},required:!1},closable:{description:"",type:{name:"bool"},required:!1},primaryButton:{description:"",type:{name:"shape",value:{text:{name:"string",required:!0},onClick:{name:"func",required:!0},disabled:{name:"bool",required:!1}}},required:!1},secondaryButton:{description:"",type:{name:"shape",value:{text:{name:"string",required:!0},onClick:{name:"func",required:!0},disabled:{name:"bool",required:!1}}},required:!1}}};const l=({position:s=Re,maxVisible:o=ze,portalTarget:a})=>{const[r,m]=n.useState([]);n.useEffect(()=>We(m),[]);const y=r.slice(-o);return je.createPortal(e.jsx("div",{className:Te(i.container,Ae[s]),children:y.map(c=>e.jsx(A,{id:c.id,title:c.title,description:c.description,type:c.type,closable:c.closable,primaryButton:c.primaryButton,secondaryButton:c.secondaryButton},c.id))}),a??document.body)};l.propTypes={position:u.oneOf(Ne),maxVisible:u.number,portalTarget:u.instanceOf(Element)};const et={title:"design-components/Toaster",component:l,argTypes:{position:{control:{type:"select"},options:["top-center","top-right","top-left","bottom-center","bottom-right","bottom-left"],description:"Position of the toast container on screen"},maxVisible:{control:{type:"number",min:1,max:10},description:"Maximum number of toasts visible at once"},title:{control:"text",description:"Toast title text"},description:{control:"text",description:"Optional supporting description below the title"},type:{control:{type:"select"},options:["success","error","warning","info"],description:"Visual type variant — controls icon, border, and accent color"},closable:{control:"boolean",description:"Show the dismiss (×) button"},duration:{control:{type:"number",min:0,step:500},description:"Auto-dismiss delay in ms. Set to 0 for persistent toast."},primaryButtonText:{control:"text",description:"Primary button label. Leave blank to hide the button."},primaryButtonDisabled:{control:"boolean",description:"Disable the primary button"},secondaryButtonText:{control:"text",description:"Secondary button label. Leave blank to hide the button."},secondaryButtonDisabled:{control:"boolean",description:"Disable the secondary button"}}},x=({position:s,maxVisible:o,title:a,description:r,type:m,closable:y,duration:c,primaryButtonText:g,primaryButtonDisabled:b,secondaryButtonText:h,secondaryButtonDisabled:N})=>(n.useEffect(()=>{t.dismiss(),t.create({title:a,description:r||void 0,type:m,closable:y,duration:c>0?c:null,primaryButton:g?{text:g,onClick:()=>console.log("Primary clicked"),disabled:b}:void 0,secondaryButton:h?{text:h,onClick:()=>console.log("Secondary clicked"),disabled:N}:void 0})},[a,r,m,y,c,g,b,h,N]),e.jsx(l,{position:s,maxVisible:o}));x.args={position:"top-center",maxVisible:5,title:"Profile access granted",description:"",type:"success",closable:!0,duration:0,primaryButtonText:"",primaryButtonDisabled:!1,secondaryButtonText:"",secondaryButtonDisabled:!1};const v=()=>(n.useEffect(()=>{t.dismiss()},[]),e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,padding:16},children:[e.jsx(p,{variant:"secondary",size:"small",onClick:()=>t.create({title:"Profile access granted",type:"success",closable:!0}),children:"Show Success"}),e.jsx(p,{variant:"secondary",size:"small",onClick:()=>t.create({title:"Failed to withdraw access",type:"error",closable:!0}),children:"Show Error"}),e.jsx(p,{variant:"secondary",size:"small",onClick:()=>t.create({title:"Session expiring in 5 minutes",type:"warning",closable:!0}),children:"Show Warning"}),e.jsx(p,{variant:"secondary",size:"small",onClick:()=>t.create({title:"Session will expire soon",type:"info",closable:!0}),children:"Show Info"}),e.jsx(p,{variant:"secondary",size:"small",onClick:()=>t.dismiss(),children:"Dismiss All"})]})]})),k=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Profile access granted successfully",type:"success",duration:null,closable:!0})},[]),e.jsx(l,{})),B=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Failed to process request",type:"error",duration:null,closable:!0})},[]),e.jsx(l,{})),S=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Session expiring in 5 minutes",type:"warning",duration:null,closable:!0})},[]),e.jsx(l,{})),w=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Your session expires in 5 minutes",type:"info",duration:null,closable:!0})},[]),e.jsx(l,{})),T=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Access request submitted",description:"You will be notified once your request is approved.",type:"success",duration:null,closable:!0})},[]),e.jsx(l,{})),j=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Profile checkout requires approval",type:"info",duration:null,closable:!0,primaryButton:{text:"View",onClick:()=>console.log("View clicked")},secondaryButton:{text:"Dismiss",onClick:()=>t.dismiss()}})},[]),e.jsx(l,{})),E=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Profile checkout requires approval",type:"info",duration:null,closable:!0,primaryButton:{text:"View",onClick:()=>console.log("View clicked")}})},[]),e.jsx(l,{})),_=()=>(n.useEffect(()=>{t.dismiss(),t.create({title:"Access request failed",description:"Your request could not be processed. Please try again or contact support.",type:"error",duration:null,closable:!0,primaryButton:{text:"Retry",onClick:()=>console.log("Retry clicked")},secondaryButton:{text:"Cancel",onClick:()=>t.dismiss()}})},[]),e.jsx(l,{})),D=()=>{const s=()=>{t.dismiss(),t.create({title:"This will dismiss in 2 seconds",type:"success",duration:2e3})};return e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsx("div",{style:{padding:16},children:e.jsx(p,{variant:"secondary",size:"small",onClick:s,children:"Trigger auto-dismiss toast (2s)"})})]})},P=()=>{const s=()=>{t.dismiss(),t.create({title:"Access granted",type:"success",duration:null,closable:!0}),t.create({title:"Connection error",type:"error",duration:null,closable:!0}),t.create({title:"Session expiring in 5 minutes",type:"warning",duration:null,closable:!0}),t.create({title:"Session expiring soon",type:"info",duration:null,closable:!0})};return e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsx("div",{style:{padding:16},children:e.jsx(p,{variant:"secondary",size:"small",onClick:s,children:"Stack all four types"})})]})},I=()=>{const[s,o]=n.useState("top-center"),a=r=>{o(r),t.dismiss(),t.create({title:`Toast at ${r}`,type:"info",duration:3e3,closable:!0})};return e.jsxs(e.Fragment,{children:[e.jsx(l,{position:s},s),e.jsx("div",{style:{display:"flex",gap:8,padding:16},children:["top-center","top-right","top-left","bottom-center","bottom-right","bottom-left"].map(r=>e.jsx(p,{variant:"secondary",size:"small",onClick:()=>a(r),children:r},r))})]})},C=()=>{const[s,o]=n.useState(null);n.useEffect(()=>{const r=document.createElement("div");return r.setAttribute("data-theme","dark"),document.body.appendChild(r),o(r),t.dismiss(),()=>{t.dismiss(),document.body.removeChild(r)}},[]);const a=()=>{t.dismiss(),t.create({title:"Access granted",type:"success",duration:null,closable:!0}),t.create({title:"Request failed",type:"error",duration:null,closable:!0}),t.create({title:"Session expiring in 5 minutes",type:"warning",duration:null,closable:!0}),t.create({title:"Session expiring",type:"info",duration:null,closable:!0})};return e.jsxs("div",{"data-theme":"dark",style:{padding:24,background:"#040520",borderRadius:8,minHeight:120,display:"flex",gap:8},children:[s&&e.jsx(l,{portalTarget:s}),e.jsx(p,{variant:"secondary",size:"small",onClick:a,children:"Stack all four types"}),e.jsx(p,{variant:"secondary",size:"small",onClick:()=>t.dismiss(),children:"Dismiss All"})]})};C.storyName="Dark theme";x.__docgenInfo={description:"",methods:[],displayName:"Playground"};v.__docgenInfo={description:"",methods:[],displayName:"ImperativeAPI"};k.__docgenInfo={description:"",methods:[],displayName:"Success"};B.__docgenInfo={description:"",methods:[],displayName:"Error"};S.__docgenInfo={description:"",methods:[],displayName:"Warning"};w.__docgenInfo={description:"",methods:[],displayName:"Info"};T.__docgenInfo={description:"",methods:[],displayName:"WithDescription"};j.__docgenInfo={description:"",methods:[],displayName:"WithButtons"};E.__docgenInfo={description:"",methods:[],displayName:"WithPrimaryButtonOnly"};_.__docgenInfo={description:"",methods:[],displayName:"WithDescriptionAndButtons"};D.__docgenInfo={description:"",methods:[],displayName:"AutoDismiss"};P.__docgenInfo={description:"",methods:[],displayName:"Stacking"};I.__docgenInfo={description:"",methods:[],displayName:"Positions"};C.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var W,V,F;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`({
  position,
  maxVisible,
  title,
  description,
  type,
  closable,
  duration,
  primaryButtonText,
  primaryButtonDisabled,
  secondaryButtonText,
  secondaryButtonDisabled
}) => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title,
      // Empty string from the control is treated as "no description"
      description: description || undefined,
      type,
      closable,
      // duration === 0 means the control was left at its minimum — treat as
      // persistent
      duration: duration > 0 ? duration : null,
      primaryButton: primaryButtonText ? {
        text: primaryButtonText,
        onClick: () => console.log('Primary clicked'),
        disabled: primaryButtonDisabled
      } : undefined,
      secondaryButton: secondaryButtonText ? {
        text: secondaryButtonText,
        onClick: () => console.log('Secondary clicked'),
        disabled: secondaryButtonDisabled
      } : undefined
    });
  }, [title, description, type, closable, duration, primaryButtonText, primaryButtonDisabled, secondaryButtonText, secondaryButtonDisabled]);
  return <Toaster position={position} maxVisible={maxVisible} />;
}`,...(F=(V=x.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var O,M,L;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  // Clear any leftover toasts from other stories on mount
  useEffect(() => {
    toaster.dismiss();
  }, []);
  return <>
      <Toaster />
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 16
    }}>
        <Button variant="secondary" size="small" onClick={() => toaster.create({
        title: 'Profile access granted',
        type: 'success',
        closable: true
      })}>
          Show Success
        </Button>
        <Button variant="secondary" size="small" onClick={() => toaster.create({
        title: 'Failed to withdraw access',
        type: 'error',
        closable: true
      })}>
          Show Error
        </Button>
        <Button variant="secondary" size="small" onClick={() => toaster.create({
        title: 'Session expiring in 5 minutes',
        type: 'warning',
        closable: true
      })}>
          Show Warning
        </Button>
        <Button variant="secondary" size="small" onClick={() => toaster.create({
        title: 'Session will expire soon',
        type: 'info',
        closable: true
      })}>
          Show Info
        </Button>
        {/* No id passed — dismisses every active toast */}
        <Button variant="secondary" size="small" onClick={() => toaster.dismiss()}>
          Dismiss All
        </Button>
      </div>
    </>;
}`,...(L=(M=v.parameters)==null?void 0:M.docs)==null?void 0:L.source}}};var Y,U,Z;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Profile access granted successfully',
      type: 'success',
      duration: null,
      closable: true
    });
  }, []);
  return <Toaster />;
}`,...(Z=(U=k.parameters)==null?void 0:U.docs)==null?void 0:Z.source}}};var H,$,G;B.parameters={...B.parameters,docs:{...(H=B.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Failed to process request',
      type: 'error',
      duration: null,
      closable: true
    });
  }, []);
  return <Toaster />;
}`,...(G=($=B.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var J,K,Q;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Session expiring in 5 minutes',
      type: 'warning',
      duration: null,
      closable: true
    });
  }, []);
  return <Toaster />;
}`,...(Q=(K=S.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,ee,te;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Your session expires in 5 minutes',
      type: 'info',
      duration: null,
      closable: true
    });
  }, []);
  return <Toaster />;
}`,...(te=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var se,oe,re;T.parameters={...T.parameters,docs:{...(se=T.parameters)==null?void 0:se.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Access request submitted',
      description: 'You will be notified once your request is approved.',
      type: 'success',
      duration: null,
      closable: true
    });
  }, []);
  return <Toaster />;
}`,...(re=(oe=T.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var ie,ne,ae;j.parameters={...j.parameters,docs:{...(ie=j.parameters)==null?void 0:ie.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Profile checkout requires approval',
      type: 'info',
      duration: null,
      closable: true,
      primaryButton: {
        text: 'View',
        onClick: () => console.log('View clicked')
      },
      secondaryButton: {
        text: 'Dismiss',
        onClick: () => toaster.dismiss()
      }
    });
  }, []);
  return <Toaster />;
}`,...(ae=(ne=j.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var ce,le,de;E.parameters={...E.parameters,docs:{...(ce=E.parameters)==null?void 0:ce.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Profile checkout requires approval',
      type: 'info',
      duration: null,
      closable: true,
      primaryButton: {
        text: 'View',
        onClick: () => console.log('View clicked')
      }
    });
  }, []);
  return <Toaster />;
}`,...(de=(le=E.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,pe,me;_.parameters={..._.parameters,docs:{...(ue=_.parameters)==null?void 0:ue.docs,source:{originalSource:`() => {
  useEffect(() => {
    toaster.dismiss();
    toaster.create({
      title: 'Access request failed',
      description: 'Your request could not be processed. Please try again or contact support.',
      type: 'error',
      duration: null,
      closable: true,
      primaryButton: {
        text: 'Retry',
        onClick: () => console.log('Retry clicked')
      },
      secondaryButton: {
        text: 'Cancel',
        onClick: () => toaster.dismiss()
      }
    });
  }, []);
  return <Toaster />;
}`,...(me=(pe=_.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ye,fe,ge;D.parameters={...D.parameters,docs:{...(ye=D.parameters)==null?void 0:ye.docs,source:{originalSource:`() => {
  const trigger = () => {
    toaster.dismiss();
    toaster.create({
      title: 'This will dismiss in 2 seconds',
      type: 'success',
      duration: 2000
    });
  };
  return <>
      <Toaster />
      <div style={{
      padding: 16
    }}>
        <Button variant="secondary" size="small" onClick={trigger}>Trigger auto-dismiss toast (2s)</Button>
      </div>
    </>;
}`,...(ge=(fe=D.parameters)==null?void 0:fe.docs)==null?void 0:ge.source}}};var be,he,xe;P.parameters={...P.parameters,docs:{...(be=P.parameters)==null?void 0:be.docs,source:{originalSource:`() => {
  const triggerAll = () => {
    toaster.dismiss();
    toaster.create({
      title: 'Access granted',
      type: 'success',
      duration: null,
      closable: true
    });
    toaster.create({
      title: 'Connection error',
      type: 'error',
      duration: null,
      closable: true
    });
    toaster.create({
      title: 'Session expiring in 5 minutes',
      type: 'warning',
      duration: null,
      closable: true
    });
    toaster.create({
      title: 'Session expiring soon',
      type: 'info',
      duration: null,
      closable: true
    });
  };
  return <>
      <Toaster />
      <div style={{
      padding: 16
    }}>
        <Button variant="secondary" size="small" onClick={triggerAll}>Stack all four types</Button>
      </div>
    </>;
}`,...(xe=(he=P.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var Ce,ve,ke;I.parameters={...I.parameters,docs:{...(Ce=I.parameters)==null?void 0:Ce.docs,source:{originalSource:`() => {
  const [position, setPosition] = useState('top-center');
  const show = pos => {
    setPosition(pos);
    toaster.dismiss();
    toaster.create({
      title: \`Toast at \${pos}\`,
      type: 'info',
      duration: 3000,
      closable: true
    });
  };
  return <>
      {/* key forces a remount when position changes, avoiding stale placement */}
      <Toaster key={position} position={position} />
      <div style={{
      display: 'flex',
      gap: 8,
      padding: 16
    }}>
        {['top-center', 'top-right', 'top-left', 'bottom-center', 'bottom-right', 'bottom-left'].map(p => <Button key={p} variant="secondary" size="small" onClick={() => show(p)}>{p}</Button>)}
      </div>
    </>;
}`,...(ke=(ve=I.parameters)==null?void 0:ve.docs)==null?void 0:ke.source}}};var Be,Se,we;C.parameters={...C.parameters,docs:{...(Be=C.parameters)==null?void 0:Be.docs,source:{originalSource:`() => {
  // null until the effect appends the node; Toaster is not rendered until ready
  const [portalEl, setPortalEl] = useState(null);
  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('data-theme', 'dark');
    document.body.appendChild(el);
    setPortalEl(el);
    toaster.dismiss();
    return () => {
      toaster.dismiss();
      document.body.removeChild(el);
    };
  }, []);
  const stackAll = () => {
    toaster.dismiss();
    toaster.create({
      title: 'Access granted',
      type: 'success',
      duration: null,
      closable: true
    });
    toaster.create({
      title: 'Request failed',
      type: 'error',
      duration: null,
      closable: true
    });
    toaster.create({
      title: 'Session expiring in 5 minutes',
      type: 'warning',
      duration: null,
      closable: true
    });
    toaster.create({
      title: 'Session expiring',
      type: 'info',
      duration: null,
      closable: true
    });
  };
  return (
    // data-theme="dark" + dark background gives the canvas the right visual context
    <div data-theme="dark" style={{
      padding: 24,
      background: '#040520',
      borderRadius: 8,
      minHeight: 120,
      display: 'flex',
      gap: 8
    }}>
      {portalEl && <Toaster portalTarget={portalEl} />}
      <Button variant="secondary" size="small" onClick={stackAll}>
        Stack all four types
      </Button>
      <Button variant="secondary" size="small" onClick={() => toaster.dismiss()}>
        Dismiss All
      </Button>
    </div>
  );
}`,...(we=(Se=C.parameters)==null?void 0:Se.docs)==null?void 0:we.source}}};const tt=["Playground","ImperativeAPI","Success","Error","Warning","Info","WithDescription","WithButtons","WithPrimaryButtonOnly","WithDescriptionAndButtons","AutoDismiss","Stacking","Positions","DarkTheme"];export{D as AutoDismiss,C as DarkTheme,B as Error,v as ImperativeAPI,w as Info,x as Playground,I as Positions,P as Stacking,k as Success,S as Warning,j as WithButtons,T as WithDescription,_ as WithDescriptionAndButtons,E as WithPrimaryButtonOnly,tt as __namedExportsOrder,et as default};
