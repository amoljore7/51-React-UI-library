import{r,j as e,b as E,D as B}from"./iframe-DSshnrLJ.js";import{M as D}from"./modal-popup-Do-1riew.js";import{T as A}from"./textfield-CT1gls30.js";import{P as z}from"./index-BWW3-H0m.js";import{r as P}from"./index-jeJjRp3B.js";import{B as _}from"./index-CKFxPKe7.js";import"./preload-helper-Dp1pzeXC.js";import"./typography-DAWbNXo9.js";import"./index-DyAci3dY.js";import"./button-D98htB4G.js";import"./tooltip-DiFZ0xw-.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";import"./index-BvCv2CeA.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./info-XWXRQWYd.js";import"./index-Bfwlc43E.js";const y={container:"bds-back-to-top-container",arrow:"bds-back-to-top-arrow"},O="bds-back-to-top-modal",N=32,u=56,I=96,M=16,c=({parentRef:t,id:i})=>{const[o]=r.useState(document.createElement("div")),[n,s]=r.useState(!1);o.id=`${O}-${i}`,o.style.top=0,o.style.left=0,r.useLayoutEffect(()=>{t.current&&p()},[t.current]);const w=()=>{t.current.scrollTop>=t.current.offsetHeight/2?s(!0):t.current.scrollTop<=t.current.offsetHeight/2&&s(!1)},p=()=>{if(t.current){const{bottom:C,right:T}=t.current.getBoundingClientRect();t.current.onscroll=()=>w(),o.style.transform=`translate(${T-u-M-(t.current.offsetWidth-t.current.clientWidth)}px,${C-I-u}px)`}};r.useEffect(()=>(document.body.appendChild(o),()=>document.body.removeChild(o)),[]),r.useEffect(()=>(window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)),[]);const j=()=>{t.current.scrollTo(0,0)};return n&&P.createPortal(e.jsx("div",{className:y.container,onClick:j,children:e.jsx("div",{className:y.arrow,children:e.jsx(_,{size:N})})}),o)};c.propTypes={parentRef:z.any};const te={title:"design-components/BackToTop",component:c},d=()=>{const t=r.useRef();r.useEffect(()=>{const s=document.body.style.overflow;return document.body.style.overflow="hidden",()=>document.body.style.overflow=s},[]);const i={borderLeft:"2px solid #1EA7FD",width:"800px",height:"100vh",overflow:"auto",margin:"auto",paddingTop:"15px",paddingBottom:"15px",backgroundColor:"#E9E8E2"},o={display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"600px",height:"100vh",margin:"auto",marginBottom:"32px",background:"white",textAlign:"center",fontSize:"32px"},n={verticalAlign:"center",display:"flex"};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:i,ref:t,children:[e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 1"})}),e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 2"})}),e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 3"})}),e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 4"})})]}),e.jsx(c,{id:"some-id",parentRef:t})]})},a=()=>{const t=r.useRef();r.useEffect(()=>{const o=document.body.style.overflow;return document.body.style.overflow="hidden",()=>document.body.style.overflow=o},[]);const i=[{text:"Ok",variant:"primary",onClick:()=>console.log("Ok button clicked"),size:"large"},{text:"Cancel",variant:"secondary",onClick:()=>console.log("Cancel button clicked"),size:"large"}];return e.jsxs("div",{className:"testname",style:{width:"100vw",height:"100vh",marginRight:"200px",backgroundColor:"red"},children:[e.jsx(D,{ref:t,width:464,title:"Add Permission",buttons:i,onCancel:()=>console.log("Cancel button clicked"),children:e.jsx(e.Fragment,{children:e.jsx("div",{children:Array(50).fill().map((o,n)=>e.jsx("div",{style:{marginTop:32},children:e.jsx(A,{label:`Value ${n}`,value:`Some values ${n}`,onChange:()=>{}})}))})})}),e.jsx(c,{id:"#123",parentRef:t})]})},l=()=>{const t=r.useRef();r.useEffect(()=>{const s=document.body.style.overflow;return document.body.style.overflow="hidden",()=>document.body.style.overflow=s},[]);const i={borderLeft:"2px solid #5b8def",width:"800px",height:"100vh",overflow:"auto",margin:"auto",paddingTop:"15px",paddingBottom:"15px",backgroundColor:"#1a1b2e"},o={display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"600px",height:"100vh",margin:"auto",marginBottom:"32px",background:"#2a2b3d",color:"#e6e6e9",textAlign:"center",fontSize:"32px"},n={verticalAlign:"center",display:"flex"};return e.jsx(E,{children:e.jsxs(B,{style:{minHeight:"100vh",display:"flex",justifyContent:"center"},children:[e.jsxs("div",{style:i,ref:t,children:[e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 1"})}),e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 2"})}),e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 3"})}),e.jsx("div",{style:o,children:e.jsx("div",{style:n,children:"Section 4"})})]}),e.jsx(c,{id:"back-to-top-dark",parentRef:t})]})})};l.storyName="Dark theme";d.__docgenInfo={description:"",methods:[],displayName:"BackToTopSimple"};a.__docgenInfo={description:"",methods:[],displayName:"BackToTopModalPopup"};l.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var m,h,v;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const parentContainer = useRef();

  // hide the scroll bar for this story
  useEffect(() => {
    const earlier = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = earlier;
  }, []);
  const containerStyles = {
    borderLeft: '2px solid #1EA7FD',
    width: '800px',
    height: '100vh',
    overflow: 'auto',
    margin: 'auto',
    paddingTop: '15px',
    paddingBottom: '15px',
    backgroundColor: '#E9E8E2'
  };
  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: '100vh',
    margin: 'auto',
    marginBottom: '32px',
    background: 'white',
    textAlign: 'center',
    fontSize: '32px'
  };
  const textStyle = {
    verticalAlign: 'center',
    display: 'flex'
  };
  return <>
      <div style={containerStyles} ref={parentContainer}>
        <div style={pageStyles}>
          <div style={textStyle}>Section 1</div>
        </div>
        <div style={pageStyles}>
          <div style={textStyle}>Section 2</div>
        </div>
        <div style={pageStyles}>
          <div style={textStyle}>Section 3</div>
        </div>
        <div style={pageStyles}>
          <div style={textStyle}>Section 4</div>
        </div>
      </div>
      {/*
        Add Back to top as a sibling
        (just below the div) jsx element
        wherever scrolling is to happen.
       */}
      {/*
        DO NOT add the back to top inside
        the scrolling div.
       */}
      {/*
        Pass the ref of dom element inside
        which button is to be used.
       */}
      <BackToTop id="some-id" parentRef={parentContainer} />
    </>;
}`,...(v=(h=d.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var f,x,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const parentContainer = useRef();
  // hide the scroll bar for this story
  useEffect(() => {
    const earlier = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = earlier;
  }, []);
  const buttons = [{
    text: 'Ok',
    variant: 'primary',
    onClick: () => console.log('Ok button clicked'),
    size: 'large'
  }, {
    text: 'Cancel',
    variant: 'secondary',
    onClick: () => console.log('Cancel button clicked'),
    size: 'large'
  }];
  return <div className="testname" style={{
    width: '100vw',
    height: '100vh',
    marginRight: '200px',
    backgroundColor: 'red'
  }}>
      <ModalPopup ref={parentContainer} width={464} title={'Add Permission'} buttons={buttons} onCancel={() => console.log('Cancel button clicked')}>
        <>
          <div>
            {Array(50).fill().map((_, i) => <div style={{
            marginTop: 32
          }}>
                  <Textfield label={\`Value \${i}\`} value={\`Some values \${i}\`} onChange={() => {}} />
                </div>)}
          </div>
        </>
      </ModalPopup>
      <BackToTop id={'#123'} parentRef={parentContainer} />
    </div>;
}`,...(g=(x=a.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var S,b,k;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const parentContainer = useRef();
  useEffect(() => {
    const earlier = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = earlier;
  }, []);
  const containerStyles = {
    borderLeft: '2px solid #5b8def',
    width: '800px',
    height: '100vh',
    overflow: 'auto',
    margin: 'auto',
    paddingTop: '15px',
    paddingBottom: '15px',
    backgroundColor: '#1a1b2e'
  };
  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: '100vh',
    margin: 'auto',
    marginBottom: '32px',
    background: '#2a2b3d',
    color: '#e6e6e9',
    textAlign: 'center',
    fontSize: '32px'
  };
  const textStyle = {
    verticalAlign: 'center',
    display: 'flex'
  };
  return <DarkStoryDocument>
      <DarkStorySurface style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center'
    }}>
        <div style={containerStyles} ref={parentContainer}>
          <div style={pageStyles}>
            <div style={textStyle}>Section 1</div>
          </div>
          <div style={pageStyles}>
            <div style={textStyle}>Section 2</div>
          </div>
          <div style={pageStyles}>
            <div style={textStyle}>Section 3</div>
          </div>
          <div style={pageStyles}>
            <div style={textStyle}>Section 4</div>
          </div>
        </div>
        <BackToTop id="back-to-top-dark" parentRef={parentContainer} />
      </DarkStorySurface>
    </DarkStoryDocument>;
}`,...(k=(b=l.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};const oe=["BackToTopSimple","BackToTopModalPopup","DarkTheme"];export{a as BackToTopModalPopup,d as BackToTopSimple,l as DarkTheme,oe as __namedExportsOrder,te as default};
