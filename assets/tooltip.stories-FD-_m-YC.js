import{j as t}from"./iframe-DSshnrLJ.js";import{T as o}from"./tooltip-DiFZ0xw-.js";import{B as r}from"./button-D98htB4G.js";import"./preload-helper-Dp1pzeXC.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./index-BWW3-H0m.js";import"./typography-DAWbNXo9.js";import"./index-DyAci3dY.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./iconBase-D3NFPLFw.js";const nt={title:"design-components/Tooltip",component:o,parameters:{notes:"Tooltip requires a single child that can receive a ref (e.g. wrap a React component in a div, or use a native element)."}},e="This is a tooltip text for tooltip component which is quite useful to show information of any actions",i={width:"100%",height:"500px",display:"flex",justifyContent:"center",alignItems:"center"},s=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,children:t.jsx("button",{type:"button",children:"Hover (default position: top)"})})}),n=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"top",zIndex:2e3,children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),a=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"bottom",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),l=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"left",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),p=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"right",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),d=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"bottom-left",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),c=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"bottom-right",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),m=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"top-left",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),u=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:e,position:"top-right",children:t.jsx("div",{children:t.jsx(r,{variant:"primary",size:"small",children:"Submit"})})})}),v=()=>t.jsx("div",{style:i,children:t.jsx(o,{title:"Short caption (Figma / design tokens: caption1, 8px radius, neutral-80 bg)",children:t.jsx("span",{style:{textDecoration:"underline",cursor:"pointer"},children:"Hover me"})})}),h=()=>t.jsx("div",{style:{...i,background:"#040520",padding:24},children:t.jsx(o,{title:"Tooltip on dark background",theme:"dark",position:"top",children:t.jsx("button",{type:"button",style:{color:"#fff"},children:"Hover for tooltip"})})});s.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"TooltipTop"};a.__docgenInfo={description:"",methods:[],displayName:"TooltipBottom"};l.__docgenInfo={description:"",methods:[],displayName:"TooltipLeft"};p.__docgenInfo={description:"",methods:[],displayName:"TooltipRight"};d.__docgenInfo={description:"",methods:[],displayName:"TooltipBottomLeft"};c.__docgenInfo={description:"",methods:[],displayName:"TooltipBottomRight"};m.__docgenInfo={description:"",methods:[],displayName:"TooltipTopLeft"};u.__docgenInfo={description:"",methods:[],displayName:"TooltipTopRight"};v.__docgenInfo={description:"",methods:[],displayName:"TooltipCaptionFigma"};h.__docgenInfo={description:"",methods:[],displayName:"DarkMode"};var y,T,x;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text}>
      <button type="button">Hover (default position: top)</button>
    </Tooltip>
  </div>`,...(x=(T=s.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var g,f,j;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  return <div style={layout}>
      <Tooltip title={text} position="top" zIndex={2000}>
        <div>
          <Button variant="primary" size="small">
            Submit
          </Button>
        </div>
      </Tooltip>
    </div>;
}`,...(j=(f=n.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var b,S,B;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="bottom">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(B=(S=a.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var _,z,I;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="left">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(I=(z=l.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var k,N,R;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="right">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(R=(N=p.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var L,D,H;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="bottom-left">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(H=(D=d.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var F,w,C;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="bottom-right">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(C=(w=c.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var M,q,E;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="top-left">
      <div>
        <Button variant="primary" size="small">
            Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(E=(q=m.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var O,A,G;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title={text} position="top-right">
      <div>
        <Button variant="primary" size="small">
          Submit
        </Button>
      </div>
    </Tooltip>
  </div>`,...(G=(A=u.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var J,K,P;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`() => <div style={layout}>
    <Tooltip title="Short caption (Figma / design tokens: caption1, 8px radius, neutral-80 bg)">
      <span style={{
      textDecoration: 'underline',
      cursor: 'pointer'
    }}>Hover me</span>
    </Tooltip>
  </div>`,...(P=(K=v.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var Q,U,V;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <div style={{
  ...layout,
  background: '#040520',
  padding: 24
}}>
    <Tooltip title="Tooltip on dark background" theme="dark" position="top">
      <button type="button" style={{
      color: '#fff'
    }}>
        Hover for tooltip
      </button>
    </Tooltip>
  </div>`,...(V=(U=h.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};const at=["Default","TooltipTop","TooltipBottom","TooltipLeft","TooltipRight","TooltipBottomLeft","TooltipBottomRight","TooltipTopLeft","TooltipTopRight","TooltipCaptionFigma","DarkMode"];export{h as DarkMode,s as Default,a as TooltipBottom,d as TooltipBottomLeft,c as TooltipBottomRight,v as TooltipCaptionFigma,l as TooltipLeft,p as TooltipRight,n as TooltipTop,m as TooltipTopLeft,u as TooltipTopRight,at as __namedExportsOrder,nt as default};
