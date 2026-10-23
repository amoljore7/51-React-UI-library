import{j as d,D as R,r as p}from"./iframe-DSshnrLJ.js";import{P as m,v as H}from"./PillInput-BavH32w6.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";import"./pill-C92xEsKe.js";import"./index-BvCv2CeA.js";import"./iconBase-D3NFPLFw.js";const F={title:"design-components/PillInput",component:m},r=()=>{const a=["US","KR"],[n,s]=p.useState([]);p.useEffect(()=>{s(a)},[]);const u=e=>{if(e){const t=[...n];t.push(e),s(t)}},l=e=>{if(e){let t=[...n];t=t.filter(h=>h!==e),s(t)}};return d.jsx(m,{pillListData:n,handleUpdatePillList:u,handleDeletePill:l,error:!1,errorMsg:"Error Message Here",placeholder:"Type something and press Enter"})},c=()=>{const a=["255.255.255.255"],[n,s]=p.useState([]),[u,l]=p.useState(!1);p.useEffect(()=>{s(a)},[]);const e=i=>{l(!1),s(L=>[...L,i])},t=i=>{s(L=>L.filter(b=>b!==i))},h=i=>H.test(i),N=i=>i===""?!0:(l(!h(i)),h(i));return d.jsx(m,{pillListData:n,handleUpdatePillList:e,handleDeletePill:t,error:u,errorMsg:"Invalid Ip address in Value",isValid:N,setError:l,placeholder:"Type something and press Enter"})},D=()=>{const[a,n]=p.useState([]),s=l=>{if(l){const e=[...a];e.push(l),n(e)}},u=l=>{if(l){let e=[...a];e=e.filter(t=>t!==l),n(e)}};return d.jsx(m,{pillListData:a,handleUpdatePillList:s,handleDeletePill:u})},P=()=>{const a=["255.255.255.255"];return d.jsx(m,{pillListData:a,disabled:!0})},o=()=>d.jsx(R,{children:d.jsx(r,{})});o.storyName="Dark theme";r.__docgenInfo={description:"",methods:[],displayName:"ManagePill"};c.__docgenInfo={description:"",methods:[],displayName:"InvalidIPPill"};D.__docgenInfo={description:"",methods:[],displayName:"Default"};P.__docgenInfo={description:"",methods:[],displayName:"Disabled"};o.__docgenInfo={description:"",methods:[],displayName:"DarkTheme"};var f,E,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const pillList = ['US', 'KR'];
  const [pillListData, setPillListData] = useState([]);
  useEffect(() => {
    setPillListData(pillList);
  }, []);
  const handleEditPillData = value => {
    if (value) {
      const pillValues = [...pillListData];
      pillValues.push(value);
      setPillListData(pillValues);
    }
  };
  const handleDeletePillData = pill => {
    if (pill) {
      let pillValues = [...pillListData];
      pillValues = pillValues.filter(e => e !== pill);
      setPillListData(pillValues);
    }
  };
  return <PillInput pillListData={pillListData} handleUpdatePillList={handleEditPillData} handleDeletePill={handleDeletePillData} error={false} errorMsg='Error Message Here' placeholder='Type something and press Enter' />;
}`,...(v=(E=r.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var g,I,V;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const pillList = ['255.255.255.255'];
  const [pillListData, setPillListData] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    setPillListData(pillList);
  }, []);
  const handleEditPillData = value => {
    setError(false);
    setPillListData(prevData => [...prevData, value]);
  };
  const handleDeletePillData = pill => {
    setPillListData(prevData => prevData.filter(item => item !== pill));
  };
  const validateInput = value => {
    return validationRule.test(value);
  };
  const isValid = value => {
    if (value === '') return true;
    setError(!validateInput(value));
    return validateInput(value);
  };
  return <PillInput pillListData={pillListData} handleUpdatePillList={handleEditPillData} handleDeletePill={handleDeletePillData} error={error} errorMsg='Invalid Ip address in Value' isValid={isValid} setError={setError} placeholder='Type something and press Enter' />;
}`,...(V=(I=c.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var S,y,_;D.parameters={...D.parameters,docs:{...(S=D.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [pillListData, setPillListData] = useState([]);
  const handleEditPillData = value => {
    if (value) {
      const pillValues = [...pillListData];
      pillValues.push(value);
      setPillListData(pillValues);
    }
  };
  const handleDeletePillData = pill => {
    if (pill) {
      let pillValues = [...pillListData];
      pillValues = pillValues.filter(e => e !== pill);
      setPillListData(pillValues);
    }
  };
  return <PillInput pillListData={pillListData} handleUpdatePillList={handleEditPillData} handleDeletePill={handleDeletePillData} />;
}`,...(_=(y=D.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var x,M,j;P.parameters={...P.parameters,docs:{...(x=P.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const pillList = ['255.255.255.255'];
  return <PillInput pillListData={pillList} disabled={true} />;
}`,...(j=(M=P.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var U,k,T;o.parameters={...o.parameters,docs:{...(U=o.parameters)==null?void 0:U.docs,source:{originalSource:`() => <DarkStorySurface>
    <ManagePill />
  </DarkStorySurface>`,...(T=(k=o.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const G=["ManagePill","InvalidIPPill","Default","Disabled","DarkTheme"];export{o as DarkTheme,D as Default,P as Disabled,c as InvalidIPPill,r as ManagePill,G as __namedExportsOrder,F as default};
