import{j as o,r as te}from"./iframe-DSshnrLJ.js";import{S as r}from"./select-BPCd_p1U.js";import{B as oe}from"./button-D98htB4G.js";import"./preload-helper-Dp1pzeXC.js";import"./menu-options-container-Dz3d7hAm.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./index-DyAci3dY.js";import"./index-BWW3-H0m.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./tooltip-DiFZ0xw-.js";import"./typography-DAWbNXo9.js";import"./index-DDIoMWDg.js";import"./iconBase-D3NFPLFw.js";const fe={title:"design-components/Select",component:r},l=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],placeholder:"Choose an option",width:"300px",label:"Actions",helperText:"Choose actions for Permission",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},s=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],disabled:!0,value:{title:"secret-delete"},placeholder:"Choose An Option",width:"300px",label:"Actions",helperText:"Choose actions for Permission",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},i=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],error:!0,errorMessage:"You can't choose this action. Actions can only be chosen from pre-defined list of action",value:{title:"secret-delete"},width:"300px",label:"Actions",helperText:"Choose actions for Permission",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},a=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],readOnly:!0,value:{title:"secret-delete"},width:"300px",label:"Actions",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},c=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],value:{title:"secret-delete"},width:"300px",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},p=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],inline:!0,value:{title:"secret-delete"},width:"300px",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},d=()=>{const t={width:"56px",size:"small",options:[10,20,30,40],value:10,onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e}};return o.jsx(r,{...t})},u=()=>{const[t,e]=te.useState(!1),n={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"}],placeholder:"Choose an option",width:"500px",label:"Actions",helperText:"Choose actions for Permission",onChange:(x,ee)=>console.log(ee),getOptionLabel:function(x){return x.title},disablePortal:t};return o.jsxs("div",{style:{width:"600px",height:"600px",overflowY:"scroll"},children:[o.jsxs("div",{style:{width:"400px",height:"300px",border:"1px solid salmon",fontSize:"18px",letterSpacing:"1px",padding:"10%"},children:["Usually the options container is a portal and hence sits above all other elements. This can cause problems if container has scrolling. ",o.jsx("br",{}),o.jsx("br",{}),o.jsx("br",{}),"Click on the dropdown and try to scroll this container.",o.jsx("br",{}),o.jsx("br",{}),"Observe that options container remains fixed.",o.jsx("br",{}),o.jsx("div",{style:{padding:"10%"},children:o.jsxs(oe,{size:"large",type:"primary",onClick:()=>e(!t),children:[t?"Enable Portal":"Disable Portal"," portal in dropdown"]})})]}),o.jsx("div",{style:{margin:"20px"},children:o.jsx(r,{...n})}),o.jsx("div",{style:{width:"400px",height:"300px",border:"1px solid teal",textAlign:"center",padding:"10%",paddingTop:"40%",fontSize:"36px",marginTop:"10%"},children:"some form content"})]})},h=()=>{const t={options:[{title:"secret-create-secret-create-secret-create-secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],placeholder:"Choose an option",width:"300px",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},g=()=>{const t={options:[{title:"secret-create-secret-create-secret-create-secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],placeholder:"Choose an option",width:"300px",showTooltip:!1,onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title}};return o.jsx(r,{...t})},v=()=>{const t={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],placeholder:"Choose an option",width:"140px",label:"Actions",helperText:"Choose actions for Permission",onChange:(e,n)=>console.log(n),getOptionLabel:function(e){return e.title},height:"26px"};return o.jsx(r,{...t})},ne={options:[{title:"secret-create"},{title:"secret-delete"},{title:"secret-update"},{title:"vault-create"},{title:"vault-update"},{title:"vault-delete"}],placeholder:"Choose an option",width:"300px",label:"Actions",helperText:"Choose actions for Permission",onChange:(t,e)=>console.log(e),getOptionLabel:t=>t.title},m=()=>o.jsx("div",{"data-theme":"dark",style:{padding:"24px",background:"#0a0b2e",borderRadius:"8px"},children:o.jsx(r,{...ne})});l.__docgenInfo={description:"",methods:[],displayName:"DropdownWithLabelAndHelperText"};s.__docgenInfo={description:"",methods:[],displayName:"Disabled"};i.__docgenInfo={description:"",methods:[],displayName:"Error"};a.__docgenInfo={description:"",methods:[],displayName:"ReadOnly"};c.__docgenInfo={description:"",methods:[],displayName:"WithoutLabel"};p.__docgenInfo={description:"",methods:[],displayName:"Inline"};d.__docgenInfo={description:"",methods:[],displayName:"SmallDropdown"};u.__docgenInfo={description:"",methods:[],displayName:"DropdownWithoutPortal"};h.__docgenInfo={description:"",methods:[],displayName:"TooltipForLongValues"};g.__docgenInfo={description:"",methods:[],displayName:"HideTooltipForLongValues"};v.__docgenInfo={description:"",methods:[],displayName:"Height"};m.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var b,f,C;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    placeholder: 'Choose an option',
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(C=(f=l.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var w,S,y;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    disabled: true,
    value: {
      title: 'secret-delete'
    },
    placeholder: 'Choose An Option',
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var L,O,T;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    error: true,
    errorMessage: "You can't choose this action. Actions can only be chosen from pre-defined list of action",
    value: {
      title: 'secret-delete'
    },
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(T=(O=i.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var _,P,j;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    readOnly: true,
    value: {
      title: 'secret-delete'
    },
    width: '300px',
    label: 'Actions',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(j=(P=a.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var A,D,I;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    value: {
      title: 'secret-delete'
    },
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(I=(D=c.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var N,k,H;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    inline: true,
    value: {
      title: 'secret-delete'
    },
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(H=(k=p.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};var W,z,E;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
  const props = {
    width: '56px',
    size: 'small',
    options: [10, 20, 30, 40],
    value: 10,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option;
    }
  };
  return <Select {...props} />;
}`,...(E=(z=d.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,R,V;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const [disablePortal, setDisablePortal] = useState(false);
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }],
    placeholder: 'Choose an option',
    width: '500px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (_, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
    disablePortal
  };
  return <div style={{
    width: '600px',
    height: '600px',
    overflowY: 'scroll'
  }}>
      <div style={{
      width: '400px',
      height: '300px',
      border: '1px solid salmon',
      fontSize: '18px',
      letterSpacing: '1px',
      padding: '10%'
    }}>
        Usually the options container is a
        portal and hence sits above all other
        elements. This can
        cause problems if container has scrolling. <br />
        <br />
        <br />
        Click on the dropdown and try to scroll this container.
        <br />
        <br />
        Observe that options container remains fixed.
        <br />
        <div style={{
        padding: '10%'
      }}>
          <Button size="large" type="primary" onClick={() => setDisablePortal(!disablePortal)}>
            {!disablePortal ? 'Disable Portal' : 'Enable Portal'} portal in dropdown
          </Button>
        </div>
      </div>
      <div style={{
      margin: '20px'
    }}>
        <Select {...props} />
      </div>

      <div style={{
      width: '400px',
      height: '300px',
      border: '1px solid teal',
      textAlign: 'center',
      padding: '10%',
      paddingTop: '40%',
      fontSize: '36px',
      marginTop: '10%'
    }}>
        some form content
      </div>
    </div>;
}`,...(V=(R=u.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var B,Y,M;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create-secret-create-secret-create-secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    placeholder: 'Choose an option',
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(M=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:M.source}}};var U,q,G;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create-secret-create-secret-create-secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    placeholder: 'Choose an option',
    width: '300px',
    showTooltip: false,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    }
  };
  return <Select {...props} />;
}`,...(G=(q=g.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var J,K,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const props = {
    options: [{
      title: 'secret-create'
    }, {
      title: 'secret-delete'
    }, {
      title: 'secret-update'
    }, {
      title: 'vault-create'
    }, {
      title: 'vault-update'
    }, {
      title: 'vault-delete'
    }],
    placeholder: 'Choose an option',
    width: '140px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
    height: '26px'
  };
  return <Select {...props} />;
}`,...(Q=(K=v.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Z,$;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`() => <div data-theme="dark" style={{
  padding: '24px',
  background: '#0a0b2e',
  borderRadius: '8px'
}}>
    <Select {...defaultSelectProps} />
  </div>`,...($=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const Ce=["DropdownWithLabelAndHelperText","Disabled","Error","ReadOnly","WithoutLabel","Inline","SmallDropdown","DropdownWithoutPortal","TooltipForLongValues","HideTooltipForLongValues","Height","DarkTheme"];export{m as DarkTheme,s as Disabled,l as DropdownWithLabelAndHelperText,u as DropdownWithoutPortal,i as Error,v as Height,g as HideTooltipForLongValues,p as Inline,a as ReadOnly,d as SmallDropdown,h as TooltipForLongValues,c as WithoutLabel,Ce as __namedExportsOrder,fe as default};
