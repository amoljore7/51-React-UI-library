import{r as q,j as r}from"./iframe-DSshnrLJ.js";import{P as c}from"./index-BWW3-H0m.js";import{c as x}from"./index-DyAci3dY.js";import"./preload-helper-Dp1pzeXC.js";const o={container:"bds-breadcrumb-container",item:"bds-breadcrumb-item",lastItem:"bds-breadcrumb-item-last",separator:"bds-breadcrumb-item-separator"},H=3,p="breadcrumbitem_",R="list",f=0,L="_blank",O=({history:a,routeToNameList:e,expansionHandlder:t})=>{const s=e[0],n=e[e.length-1];return r.jsxs("ul",{role:R,className:o.container,children:[r.jsx(l,{route:s.route,name:s.name,href:s.href,history:a},`${p}0`),r.jsx(l,{overflowItem:!0,expansionHandlder:t},`${p}1`),r.jsx(l,{route:n.route,name:n.name,href:n.href,isLastItem:!0,history:a},`${p}2`)]})},$=({history:a,routeToNameList:e})=>r.jsx("ul",{role:R,className:o.container,children:e&&e.map((t,s)=>{const{route:n,name:g,href:h}=t,m=s===e.length-1,B={route:n,name:g,isLastItem:m,href:h,history:a};return r.jsx(l,{...B},`${p}${s}`)})}),b=({routeToNameList:a,history:e})=>{const[t,s]=q.useState(a.length>H);return t?O({routeToNameList:a,expansionHandlder:()=>{s(!1)},history:e}):$({routeToNameList:a,history:e})},l=({history:a,href:e,route:t,name:s,isLastItem:n,expansionHandlder:g,overflowItem:h})=>{const m={[o.item]:!0,[o.lastItem]:n},B=S=>{!e&&S.preventDefault(),!e&&a&&t&&a.push(t)};return h?r.jsxs("li",{className:x(m),onClick:()=>g(),tabIndex:f,children:[r.jsx("span",{children:"..."}),r.jsx("span",{className:o.separator,children:"/"})]}):r.jsxs("li",{className:x(m),tabIndex:f,children:[r.jsx("a",{href:e,onClick:B,target:L,children:s}),!n&&r.jsx("span",{className:o.separator,children:"/"})]})};b.propTypes={routeToNameList:c.arrayOf(c.shape({route:c.string,name:c.string.isRequired}).isRequired)};b.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb",props:{routeToNameList:{description:"",type:{name:"arrayOf",value:{name:"shape",value:{route:{name:"string",required:!1},name:{name:"string",required:!0}}}},required:!1}}};const G={title:"design-components/Breadcrumb",component:b,argTypes:{routeToNameList:[]}},d={args:{routeToNameList:[{href:"https://google.com",name:"Breadcrumb1"},{route:"https://google.com",name:"Breadcrumb2"},{name:"Breadcrumb3"}]}},u={args:{routeToNameList:[{route:"#",name:"Breadcrumb1"},{route:"#",name:"Breadcrumb2"},{route:"#",name:"Breadcrumb3"},{route:"#",name:"Breadcrumb4"},{route:"#",name:"Breadcrumb5"}]}},i={render:a=>r.jsx("div",{"data-theme":"dark",style:{padding:"24px",background:"#0a0b2e",borderRadius:"8px"},children:r.jsx(b,{...a})}),args:{routeToNameList:[{href:"https://google.com",name:"Home"},{route:"#",name:"Section"},{name:"Current page"}]}};var j,k,I;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    routeToNameList: [{
      href: 'https://google.com',
      name: 'Breadcrumb1'
    }, {
      route: 'https://google.com',
      name: 'Breadcrumb2'
    }, {
      name: 'Breadcrumb3'
    }]
  }
}`,...(I=(k=d.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var N,v,C;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    routeToNameList: [{
      route: '#',
      name: 'Breadcrumb1'
    }, {
      route: '#',
      name: 'Breadcrumb2'
    }, {
      route: '#',
      name: 'Breadcrumb3'
    }, {
      route: '#',
      name: 'Breadcrumb4'
    }, {
      route: '#',
      name: 'Breadcrumb5'
    }]
  }
}`,...(C=(v=u.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var T,y,_;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <div data-theme="dark" style={{
    padding: '24px',
    background: '#0a0b2e',
    borderRadius: '8px'
  }}>
      <Breadcrumb {...args} />
    </div>,
  args: {
    routeToNameList: [{
      href: 'https://google.com',
      name: 'Home'
    }, {
      route: '#',
      name: 'Section'
    }, {
      name: 'Current page'
    }]
  }
}`,...(_=(y=i.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};const W=["BreadcrumbGroup","BreadcrumbWithOverflow","BreadcrumbDarkTheme"];export{i as BreadcrumbDarkTheme,d as BreadcrumbGroup,u as BreadcrumbWithOverflow,W as __namedExportsOrder,G as default};
