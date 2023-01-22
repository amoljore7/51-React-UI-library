import React, { useState } from 'react';
import {
  FiPhone,
  FiHeart,
  FiStar,
  FiShoppingCart,
  FiPaperclip,
  FiPauseCircle,
  FiOctagon,
  FiPackage,
} from 'react-icons/fi';
import Tabs from './tabs';

export default {
  title: 'design-components/Tabs',
  component: Tabs,
};

const TabPanel = (props) => {
  const { value, index } = props;
  return value === index && <div>{props.children}</div>;
};

export const AutoWidthLeftAligned = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { title: 'Page One ' },
    { title: 'Page Two' },
    { title: 'Page Three' },
    { title: 'Page Four' },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="auto"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>
  );
};

export const AutoScrollTabs = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { title: 'Page One', icon: <FiPhone size="24" />, iconPosition: 'start' },
    { title: 'Page Two', icon: <FiHeart size="24" />, iconPosition: 'start' },
    { title: 'Page Three', icon: <FiStar size="24" />, iconPosition: 'start' },
    {
      title: 'Page Four',
      icon: <FiShoppingCart size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Five',
      icon: <FiPauseCircle size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Six',
      icon: <FiPaperclip size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Seven',
      icon: <FiPackage size="24" />,
      iconPosition: 'start',
    },
    {
      title: 'Page Eighgt',
      icon: <FiOctagon size="24" />,
      iconPosition: 'start',
    },
    { title: 'Page Nine', icon: <FiPhone size="24" />, iconPosition: 'start' },
    { title: 'Page Ten', icon: <FiHeart size="24" />, iconPosition: 'start' },
    { title: 'Page Eleven', icon: <FiStar size="24" />, iconPosition: 'start' },
    {
      title: 'Page Twelve',
      icon: <FiShoppingCart size="24" />,
      iconPosition: 'start',
    },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="auto"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h1>Item Five</h1>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <h1>Item Six</h1>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <h1>Item Seven</h1>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <h1>Item Eight</h1>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <h1>Item Nine</h1>
      </TabPanel>
      <TabPanel value={value} index={9}>
        <h1>Item Ten</h1>
      </TabPanel>
      <TabPanel value={value} index={10}>
        <h1>Item Eleven</h1>
      </TabPanel>
      <TabPanel value={value} index={11}>
        <h1>Item Twelve</h1>
      </TabPanel>
    </div>
  );
};

export const FixedWidth = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { title: 'Page One' },
    { title: 'Page Two' },
    { title: 'Page Three' },
    { title: 'Page Four' },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="fixed"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>
  );
};

export const startIconTabs = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { title: 'Page One', icon: <FiPhone size="24" />, iconPosition: 'start' },
    { title: 'Page Two', icon: <FiHeart size="24" />, iconPosition: 'start' },
    { title: 'Page Three', icon: <FiStar size="24" />, iconPosition: 'start' },
    {
      title: 'Page Four',
      icon: <FiShoppingCart size="24" />,
      iconPosition: 'start',
    },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="fixed"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>
  );
};

export const EndIconTabs = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { title: 'Page One', icon: <FiPhone size="24" />, iconPosition: 'end' },
    { title: 'Page Two', icon: <FiHeart size="24" />, iconPosition: 'end' },
    { title: 'Page Three', icon: <FiStar size="24" />, iconPosition: 'end' },
    {
      title: 'Page Four',
      icon: <FiShoppingCart size="24" />,
      iconPosition: 'end',
    },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="fixed"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>
  );
};

export const TopIconTabs = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { title: 'Page One', icon: <FiPhone size="24" />, iconPosition: 'top' },
    { title: 'Page Two', icon: <FiHeart size="24" />, iconPosition: 'top' },
    { title: 'Page Three', icon: <FiStar size="24" />, iconPosition: 'top' },
    {
      title: 'Page Four',
      icon: <FiShoppingCart size="24" />,
      iconPosition: 'top',
    },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="fixed"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>
  );
};

export const IconTabs = () => {
  const [value, setvalue] = useState(0);

  const handleChange = (index) => {
    setvalue(index);
  };

  const initialTab = [
    { icon: <FiPhone size="24" />, iconPosition: 'top' },
    { icon: <FiHeart size="24" />, iconPosition: 'top' },
    { icon: <FiStar size="24" />, iconPosition: 'top' },
    { icon: <FiShoppingCart size="24" />, iconPosition: 'top' },
  ];

  return (
    <div>
      <Tabs
        value={value}
        handleChange={handleChange}
        items={initialTab}
        variant="fixed"
      />
      <TabPanel value={value} index={0}>
        <h1>Item One</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Item Two</h1>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Item Three</h1>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Item Four</h1>
      </TabPanel>
    </div>
  );
};
