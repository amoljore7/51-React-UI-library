import{r as d,j as e,D as de}from"./iframe-DSshnrLJ.js";import{Q as oe}from"./query-selector-lfAxpqaB.js";import{B as v}from"./button-D98htB4G.js";import{T as O}from"./typography-DAWbNXo9.js";import{P as ue}from"./pill-C92xEsKe.js";import{l as o}from"./lodash-CZCsm8Vw.js";import{f as ce}from"./index-BvCv2CeA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DyAci3dY.js";import"./select-BPCd_p1U.js";import"./menu-options-container-Dz3d7hAm.js";import"./index-jeJjRp3B.js";import"./index-Bfwlc43E.js";import"./index-BWW3-H0m.js";import"./renderSvgGraphic-DA9DnIUH.js";import"./resolve-portal-data-theme-3zjxciPe.js";import"./tooltip-DiFZ0xw-.js";import"./index-DDIoMWDg.js";import"./iconBase-D3NFPLFw.js";import"./multiTextfield-C2WpN58z.js";import"./textfield-CT1gls30.js";import"./info-XWXRQWYd.js";import"./autocomplete-BqXVoget.js";import"./cancel-CSA1kihF.js";import"./close-BgG3N9nv.js";const pe="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let L=(a=21)=>{let r="",f=crypto.getRandomValues(new Uint8Array(a|=0));for(;a--;)r+=pe[f[a]&63];return r};const D={pillsContainer:"bds-query-builder-pills-container"},A=({combinator:a="AND",isEditMode:r,savedQuery:f,existingSavedQueries:u,attributeGetOptionLabel:h,saveQueryFlag:p,addButtonLabel:m="Add Criteria",onlyAttributeInput:g=!1,disableAddButton:l=!1,attributeOptions:P,getQueryCount:x,...$})=>{const[c,Q]=d.useState([]),[s,E]=d.useState([]),[U,j]=d.useState(),[M,J]=d.useState(),X=t=>{const i=s.findIndex(n=>n.queryId===t.queryId);i===-1?E(n=>[...n,t]):(s[i]=t,E(s)),w(s),C()},Y=(t,i)=>{const n=s.findIndex(y=>(y==null?void 0:y.queryId)===t);n!==-1&&(s[n].isActiveIndex=i,E(s)),C()};d.useEffect(()=>{w(s)},[s,r]),d.useEffect(()=>{typeof x=="function"&&x(c.length)},[c.length]);const w=t=>{const i=t==null?void 0:t.map(({queryId:n,...y})=>({...y}));f(i)};d.useEffect(()=>{if(!o.isEmpty(u)&&!r){let t=u.map(i=>{const n=L();return{attribute:h(i),operator:i==null?void 0:i.operator,value:i==null?void 0:i.value,isActiveIndex:!1,queryId:n}});E(t)}o.isEmpty(u)&&!r&&E([])},[JSON.stringify(u),r]),d.useEffect(()=>{Q([]),r&&!o.isEmpty(s)&&s.map(t=>{t!=null&&K(t)})},[r]);const K=t=>{Q(i=>[...i,e.jsx("span",{object:t},t==null?void 0:t.queryId)])},ee=()=>{const t=L();Q(i=>[...i,e.jsx("span",{},t)])},te=t=>{Q(i=>i.filter(n=>n.key!==t)),C()},ie=t=>{const i=s.findIndex(n=>(n==null?void 0:n.queryId)===t);i!==-1&&(s[i].isActiveIndex=!1),E(n=>n.filter(y=>y.queryId!==t))};d.useEffect(()=>{if(C())return p(!1);if(!o.isEmpty(u)&&o.isEmpty(c)&&o.isEmpty(s))return p(!0);if(o.isEmpty(u)&&o.isEmpty(c)&&o.isEmpty(s))return p(!1);if(!o.isEmpty(u)&&r&&o.isEmpty(c)&&o.isEmpty(s))return j(!0),p(!0);if(o.isEmpty(s))return j(!1),p(!1);if(!o.isEmpty(c))return(c==null?void 0:c.length)===s.length?(j(!0),p(!0)):(j(!1),p(!1))},[s,c,r,M]);const se=()=>o.isEmpty(c)&&o.isEmpty(s)?!1:!U,C=()=>{let t=s==null?void 0:s.some(i=>(i==null?void 0:i.isActiveIndex)===!0);return J(t),t},re=t=>{let i=/,/g;return t.split(",").map(b=>b==null?void 0:b.trim()).filter(b=>b).join(",").split(",").map(b=>'"'+(b==null?void 0:b.trim())+'"').join(",").replace(i," or ")},ae=({attribute:t,operator:i,value:n})=>g?t:`${t} ${i} ${re(n)}`,ne=s==null?void 0:s.map(t=>t.attribute);return e.jsxs("div",{children:[!r&&e.jsx("div",{className:D.pillsContainer,children:s&&s.map((t,i)=>e.jsxs(d.Fragment,{children:[i!==0&&e.jsx("div",{style:{display:"flex",alignItems:"center",padding:"0 10px"},children:e.jsx(O,{variant:"label1",children:a})}),e.jsx("div",{"data-testid":"query-pill-wrapper",className:D.pillsContainer,children:e.jsx(ue,{readOnly:!0,label:ae(t)})})]},t.queryId))}),r&&e.jsxs(e.Fragment,{children:[e.jsxs(v,{variant:"textOnly",size:"medium",onClick:ee,disabled:l||M||se(),children:[e.jsx(ce,{size:"20",color:"#067fdb",style:{marginRight:5}}),m]}),e.jsx("div",{className:D.pillsContainer,children:c.map((t,i)=>{var b;const n=(b=s[i])==null?void 0:b.attribute,y=ne.filter(le=>le!==n);return e.jsxs("span",{style:{display:"flex"},children:[e.jsx(oe,{queryId:t.key,deleteHandleClick:()=>{ie(t.key),te(t.key)},index:i,handleAddQueryPills:X,updateActiveIndex:Y,currentElement:s[i],query:s,selectorList:c,attributeGetOptionLabel:h,onlyAttributeInput:g,attributeOptions:P,excludedAttributes:y,...$}),i!==c.length-1&&e.jsx("div",{className:D.pillsContainer,style:{padding:"0 8px",margin:"auto",width:"max-content"},children:e.jsx(O,{variant:"label1",children:a})})]},`${y.join("-")}-${i}`)})})]})]})};A.__docgenInfo={description:"",methods:[],displayName:"QueryBuilder",props:{combinator:{defaultValue:{value:"'AND'",computed:!1},required:!1},addButtonLabel:{defaultValue:{value:"'Add Criteria'",computed:!1},required:!1},onlyAttributeInput:{defaultValue:{value:"false",computed:!1},required:!1},disableAddButton:{defaultValue:{value:"false",computed:!1},required:!1}}};const _e={title:"design-components/QueryBuilder",component:A};let me=[{attribute:"skills-1",operator:"is",value:"ABC,XYZ"},{attribute:"skills-2",operator:"contains",value:"PQR,ZMR"}];const S=()=>{const[a,r]=d.useState(!1),[f,u]=d.useState(),[h,p]=d.useState(),[m,g]=d.useState(me),l={isEditMode:a,attributeOptions:[{attribute:"skills-1"},{attribute:"skills-2"},{attribute:"skills-3"}],attributeGetOptionLabel:function(x){return x==null?void 0:x.attribute},attributeOptionsLabel:"attribute",savedQuery:x=>p(x),saveQueryFlag:x=>u(!x),existingSavedQueries:m},P=()=>{g(h),r(!a)};return e.jsxs("div",{children:[e.jsx("div",{style:{padding:"15px 15px 15px 0px"},children:a?e.jsxs("span",{style:{display:"flex",gap:"10px"},children:[e.jsx(v,{variant:"primary",size:"medium",disabled:f,onClick:()=>P(),children:"Save"}),e.jsx(v,{variant:"secondary",size:"medium",onClick:()=>r(!1),children:"Cancel"})]}):e.jsx(v,{variant:"primary",size:"medium",onClick:()=>r(!a),children:"Edit"})}),e.jsx(A,{...l})]})},k=()=>{const[a,r]=d.useState(!1),[f,u]=d.useState(),p={isEditMode:a,attributeOptions:[{attribute:"skills-1"},{attribute:"skills-2"},{attribute:"skills-3"}],attributeGetOptionLabel:function(m){return m==null?void 0:m.attribute},attributeOptionsLabel:"attribute",savedQuery:m=>console.log(m),saveQueryFlag:m=>u(!m),existingSavedQueries:[{attribute:"skills-1"},{attribute:"skills-2"}],onlyAttributeInput:!0,addButtonLabel:"Add Something With Only Attribute",attributeSelectPlaceholder:"A Placeholder",combinator:"Or"};return e.jsxs("div",{children:[e.jsx("div",{style:{padding:"15px 15px 15px 0px"},children:a?e.jsxs("span",{style:{display:"flex",gap:"10px"},children:[e.jsx(v,{variant:"primary",size:"medium",disabled:f,onClick:()=>r(!a),children:"Save"}),e.jsx(v,{variant:"secondary",size:"medium",onClick:()=>window.location.reload(),children:"Cancel"})]}):e.jsx(v,{variant:"primary",size:"medium",onClick:()=>r(!a),children:"Edit"})}),e.jsx(A,{...p})]})},B=()=>{const[a,r]=d.useState(!1),[f,u]=d.useState();let h=[],p=[];const m={isEditMode:a,attributeOptions:[{attribute:"New accounts are created"},{attribute:"Existing accounts are deleted"},{attribute:"New permissions are created"},{attribute:"Existing permissions are deleted"}],attributeGetOptionLabel:function(l){return l==null?void 0:l.attribute},savedQuery:l=>console.log(l),saveQueryFlag:l=>u(!l),existingSavedQueries:h,onlyAttributeInput:!0,addButtonLabel:"Add Event",attributeSelectPlaceholder:"A Placeholder",combinator:"Or",attributeInputWidth:"250px"},g={isEditMode:a,attributeOptions:[{attribute:"AWS"},{attribute:"GCP"},{attribute:"AZURE"},{attribute:"OCI"},{attribute:"SalesForce"},{attribute:"Britive"}],attributeGetOptionLabel:function(l){return l==null?void 0:l.attribute},savedQuery:l=>console.log(l),saveQueryFlag:l=>u(!l),existingSavedQueries:p,onlyAttributeInput:!0,addButtonLabel:"Add Application",attributeSelectPlaceholder:"A Placeholder",combinator:"Or"};return e.jsxs("div",{children:[e.jsx("div",{style:{padding:"15px 15px 15px 0px"},children:a?e.jsxs("span",{style:{display:"flex",gap:"10px"},children:[e.jsx(v,{variant:"primary",size:"medium",disabled:f,onClick:()=>r(!a),children:"Save"}),e.jsx(v,{variant:"secondary",size:"medium",onClick:()=>window.location.reload(),children:"Cancel"})]}):e.jsx(v,{variant:"primary",size:"medium",onClick:()=>r(!a),children:"Edit"})}),e.jsx(O,{variant:"heading5",children:"When"}),e.jsx("br",{}),e.jsx(A,{...m}),e.jsx("br",{}),e.jsx(O,{variant:"heading5",children:"In"}),e.jsx("br",{}),e.jsx(A,{...g})]})},I=()=>e.jsx(de,{style:{minHeight:400},children:e.jsx(S,{})});I.storyName="Dark theme";S.__docgenInfo={description:"",methods:[],displayName:"QueryBuilderDemo"};k.__docgenInfo={description:"",methods:[],displayName:"OnlyAttribute"};B.__docgenInfo={description:"",methods:[],displayName:"WorkflowExample"};I.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var z,N,q;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();
  const [savedQuery, setSavedQuery] = useState();
  const [existingSavedQueries, setExistingSavedQueries] = useState(existingSavedQueriesResponse);
  const props = {
    isEditMode: isEditMode,
    attributeOptions: [{
      attribute: 'skills-1'
    }, {
      attribute: 'skills-2'
    }, {
      attribute: 'skills-3'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    savedQuery: value => setSavedQuery(value),
    saveQueryFlag: value => setIsDisabled(!value),
    existingSavedQueries
  };
  const saveHandler = () => {
    setExistingSavedQueries(savedQuery);
    setIsEditMode(!isEditMode);
  };
  return <div>
      <div style={{
      padding: '15px 15px 15px 0px'
    }}>
        {isEditMode ? <span style={{
        display: 'flex',
        gap: '10px'
      }}>
            <Button variant='primary' size='medium' disabled={isDisabled} onClick={() => saveHandler()}>
              {'Save'}
            </Button>
            <Button variant='secondary' size='medium' onClick={() => setIsEditMode(false)}>
              {'Cancel'}
            </Button>
          </span> : <Button variant='primary' size='medium' onClick={() => setIsEditMode(!isEditMode)}>
            {'Edit'}
          </Button>}
      </div>

      <QueryBuilder {...props} />
    </div>;
}`,...(q=(N=S.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var _,W,F;k.parameters={...k.parameters,docs:{...(_=k.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();
  let existingSavedQueries = [{
    attribute: 'skills-1'
  }, {
    attribute: 'skills-2'
  }];
  const props = {
    isEditMode: isEditMode,
    attributeOptions: [{
      attribute: 'skills-1'
    }, {
      attribute: 'skills-2'
    }, {
      attribute: 'skills-3'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    savedQuery: value => console.log(value),
    saveQueryFlag: value => setIsDisabled(!value),
    existingSavedQueries,
    onlyAttributeInput: true,
    addButtonLabel: 'Add Something With Only Attribute',
    attributeSelectPlaceholder: 'A Placeholder',
    combinator: 'Or'
  };
  return <div>
      <div style={{
      padding: '15px 15px 15px 0px'
    }}>
        {isEditMode ? <span style={{
        display: 'flex',
        gap: '10px'
      }}>
            <Button variant='primary' size='medium' disabled={isDisabled} onClick={() => setIsEditMode(!isEditMode)}>
              {'Save'}
            </Button>
            <Button variant='secondary' size='medium' onClick={() => window.location.reload()}>
              {'Cancel'}
            </Button>
          </span> : <Button variant='primary' size='medium' onClick={() => setIsEditMode(!isEditMode)}>
            {'Edit'}
          </Button>}
      </div>

      <QueryBuilder {...props} />
    </div>;
}`,...(F=(W=k.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var R,G,T;B.parameters={...B.parameters,docs:{...(R=B.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();
  let existingSavedQueries = [];
  let existingSavedQueriesApps = [];
  const eventProps = {
    isEditMode: isEditMode,
    attributeOptions: [{
      attribute: 'New accounts are created'
    }, {
      attribute: 'Existing accounts are deleted'
    }, {
      attribute: 'New permissions are created'
    }, {
      attribute: 'Existing permissions are deleted'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    savedQuery: value => console.log(value),
    saveQueryFlag: value => setIsDisabled(!value),
    existingSavedQueries,
    onlyAttributeInput: true,
    addButtonLabel: 'Add Event',
    attributeSelectPlaceholder: 'A Placeholder',
    combinator: 'Or',
    attributeInputWidth: '250px'
  };
  const applicationProps = {
    isEditMode: isEditMode,
    attributeOptions: [{
      attribute: 'AWS'
    }, {
      attribute: 'GCP'
    }, {
      attribute: 'AZURE'
    }, {
      attribute: 'OCI'
    }, {
      attribute: 'SalesForce'
    }, {
      attribute: 'Britive'
    }],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    savedQuery: value => console.log(value),
    saveQueryFlag: value => setIsDisabled(!value),
    existingSavedQueries: existingSavedQueriesApps,
    onlyAttributeInput: true,
    addButtonLabel: 'Add Application',
    attributeSelectPlaceholder: 'A Placeholder',
    combinator: 'Or'
  };
  return <div>
      <div style={{
      padding: '15px 15px 15px 0px'
    }}>
        {isEditMode ? <span style={{
        display: 'flex',
        gap: '10px'
      }}>
            <Button variant='primary' size='medium' disabled={isDisabled} onClick={() => setIsEditMode(!isEditMode)}>
              {'Save'}
            </Button>
            <Button variant='secondary' size='medium' onClick={() => window.location.reload()}>
              {'Cancel'}
            </Button>
          </span> : <Button variant='primary' size='medium' onClick={() => setIsEditMode(!isEditMode)}>
            {'Edit'}
          </Button>}
      </div>
      <Typography variant="heading5">When</Typography>
      <br />

      <QueryBuilder {...eventProps} />
      <br />

      <Typography variant="heading5">In</Typography>
      <br />

      <QueryBuilder {...applicationProps} />
    </div>;
}`,...(T=(G=B.parameters)==null?void 0:G.docs)==null?void 0:T.source}}};var H,V,Z;I.parameters={...I.parameters,docs:{...(H=I.parameters)==null?void 0:H.docs,source:{originalSource:`() => <DarkStorySurface style={{
  minHeight: 400
}}>
    <QueryBuilderDemo />
  </DarkStorySurface>`,...(Z=(V=I.parameters)==null?void 0:V.docs)==null?void 0:Z.source}}};const We=["QueryBuilderDemo","OnlyAttribute","WorkflowExample","DarkTheme"];export{I as DarkTheme,k as OnlyAttribute,S as QueryBuilderDemo,B as WorkflowExample,We as __namedExportsOrder,_e as default};
