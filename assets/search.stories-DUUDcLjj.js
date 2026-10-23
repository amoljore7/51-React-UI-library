import{r as i,j as e}from"./iframe-DSshnrLJ.js";import{S as l}from"./search-DIvrR_qY.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BWW3-H0m.js";import"./index-DyAci3dY.js";import"./close-x-DdcQyyRw.js";const E={title:"design-components/SearchInput",component:l},r=()=>{const[t,s]=i.useState(""),a=d=>{s(d.target.value)};return e.jsx(l,{value:t,onChange:a,disabled:!1,width:"200px"})},p=["Avatar","Inception","Parasite","Joker","Avengers Endgame"],n=()=>{const[t,s]=i.useState(""),[a,d]=i.useState(p),b=c=>{const u=c.target.value,j=p.filter(w=>w.toLowerCase().includes(u.toLowerCase()));s(u),d(j)};return e.jsxs("div",{children:[e.jsx(l,{value:t,onChange:b,disabled:!1,width:"400px",placeholder:"Search for Movies"}),e.jsx("div",{style:{marginLeft:"15px",marginTop:"20px"},children:e.jsx("ul",{children:a.length?a.map(c=>e.jsx("li",{children:c})):"No Movie Found"})})]})},o=()=>{const[t,s]=i.useState("");return e.jsx("div",{"data-theme":"dark",style:{padding:"24px",background:"#0a0b2e",borderRadius:"8px"},children:e.jsx(l,{value:t,onChange:a=>s(a.target.value),width:"320px",placeholder:"Search"})})};r.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"WithExample"};o.__docgenInfo={description:"",methods:[],displayName:"DarkMode"};var h,m,v;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };
  return <SearchInput value={value} onChange={handleChange} disabled={false} width={'200px'} />;
}`,...(v=(m=r.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var g,x,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const [list, setList] = useState(moviesList);
  const handleSearch = e => {
    const value = e.target.value;
    const filteredList = moviesList.filter(movieName => movieName.toLowerCase().includes(value.toLowerCase()));
    setValue(value);
    setList(filteredList);
  };
  return <div>
      <SearchInput value={value} onChange={handleSearch} disabled={false} width={'400px'} placeholder={'Search for Movies'} />
      <div style={{
      marginLeft: '15px',
      marginTop: '20px'
    }}>
        <ul>
          {list.length ? list.map(movieName => <li>{movieName}</li>) : 'No Movie Found'}
        </ul>
      </div>
    </div>;
}`,...(S=(x=n.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var f,L,C;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  return <div data-theme="dark" style={{
    padding: '24px',
    background: '#0a0b2e',
    borderRadius: '8px'
  }}>
      <SearchInput value={value} onChange={e => setValue(e.target.value)} width="320px" placeholder="Search" />
    </div>;
}`,...(C=(L=o.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};const M=["Default","WithExample","DarkMode"];export{o as DarkMode,r as Default,n as WithExample,M as __namedExportsOrder,E as default};
