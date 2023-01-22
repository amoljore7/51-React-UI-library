import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import VerticalTabs from './verticaltabs';

export default {
  title: 'design-components/VerticalTabs',
  component: VerticalTabs,
};

export const TabsWithManyItems = () => {
  const [value, setValue] = useState(0);

  const handleChange = (index) => {
    setValue(index);
  };

  const items = [
    { title: 'Page One ' },
    { title: 'Page Two' },
    { title: 'Page Three' },
    { title: 'Page Four' },
  ];

  const TabPanel = (props) => {
    const { value, index } = props;
    return value === index && <div>{props.children}</div>;
  };

  return (
    <div style={{ display: 'flex' }}>
      <VerticalTabs
        value={value}
        handleChange={handleChange}
        items={items}
        width="200px"
        topPadding="32px"
      />
      <div style={{ marginLeft: '20px', paddingTop: '32px' }}>
        <TabPanel value={value} index={0}>
          <h1 style={{ margin: 0 }}>Item One</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1 style={{ margin: 0 }}>Item Two</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 style={{ margin: 0 }}>Item Three</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1 style={{ margin: 0 }}>Item Four</h1>
        </TabPanel>
      </div>
    </div>
  );
};

export const WithIconAndEllipsis = () => {
  const [value, setValue] = useState(0);

  const handleChange = (index) => {
    setValue(index);
  };

  const TabPanel = (props) => {
    const { value, index } = props;
    return value === index && <div>{props.children}</div>;
  };

  const items = [
    { title: 'Page One ', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Two', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Three', icon: <FiUser size="24" />, iconPosition: 'start' },
    {
      title: 'Page Four with its details',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <VerticalTabs
        value={value}
        handleChange={handleChange}
        items={items}
        width="200px"
        topPadding="48px"
      />
      <div style={{ marginLeft: '20px', paddingTop: '48px' }}>
        <TabPanel value={value} index={0}>
          <h1 style={{ margin: 0 }}>Item One</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1 style={{ margin: 0 }}>Item Two</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 style={{ margin: 0 }}>Item Three</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1 style={{ margin: 0 }}>Item Four</h1>
        </TabPanel>
      </div>
    </div>
  );
};

export const WithOverflow = () => {
  const [value, setValue] = useState(0);

  const handleChange = (index) => {
    setValue(index);
  };

  const TabPanel = (props) => {
    const { value, index } = props;
    return value === index && <div>{props.children}</div>;
  };

  const items = [
    { title: 'Page One ', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Two', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Three', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Four', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Five', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Six', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Seven', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Eight', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Nine', icon: <FiUser size="24" />, iconPosition: 'start' },
    { title: 'Page Ten', icon: <FiUser size="24" />, iconPosition: 'start' },
    {
      title: 'Page Eleven',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Twelve',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Thirteen',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Fourteen',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Fifteen',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Sixteen',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Seventeen',
      icon: <FiUser size="24" />,
      iconPosition: 'start',
    },
  ];

  return (
    <div style={{ display: 'flex', height: '500px' }}>
      <VerticalTabs value={value} handleChange={handleChange} items={items} width="200px" />
      <div style={{ marginLeft: '20px' }}>
        <TabPanel value={value} index={0}>
          <h1 style={{ margin: 0 }}>Item One</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1 style={{ margin: 0 }}>Item Two</h1>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1 style={{ margin: 0 }}>Item Three</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1 style={{ margin: 0 }}>Item Four</h1>
        </TabPanel>
      </div>
    </div>
  );
};
