import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Button from '../button/button.jsx';
import Sidebar from './sidebar';
import { sidebarData } from './mock-data';

export default {
  title: 'design-components/Sidebar',
  component: Sidebar,
};
const SidebarTemplate = (args) => <Sidebar {...args} />;
export const menu = SidebarTemplate.bind({});
menu.args = {
  open: true,
  sidebarData: sidebarData,
  menuTitle: 'Secrets Manager',
  title: 'SM',
};

export const Demo = () => {
  const [isOpen, setIsOpen] = useState(true);

  const drawerToggleClickHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => drawerToggleClickHandler()}>
          {isOpen ? 'Close Drawer' : 'Open Drawer'}
        </Button>
      </div>
      <Sidebar sidebarData={sidebarData} open={isOpen} menuTitle="Secrets Manager" title={'SM'} />
    </>
  );
};

export const App = () => {
  const SidebarWithRouter = withRouter(Sidebar);
  const [isOpen, setIsOpen] = useState(true);

  const drawerToggleClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => drawerToggleClickHandler()}>
          {isOpen ? 'Close Drawer' : 'Open Drawer'}
        </Button>
      </div>
      <div style={divContainer}>
        <Router>
          <SidebarWithRouter
            sidebarData={sidebarData}
            open={isOpen}
            menuTitle="Secrets Manager"
            onClose={closeHandler}
            title={'SM'}
          />
          <Switch>
            <Route path="/" exact component={BritiveVault} />
            <Route path="/approvals" component={Approvals} />
            <Route path="/secret-governance" component={SecretGovernance} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

const BritiveVault = () => {
  return (
    <div className="BritiveVault" style={styleContainer}>
      <h5>Britive Vault</h5>
    </div>
  );
};
const Approvals = () => {
  return (
    <div className="Approvals" style={styleContainer}>
      <h5>Approvals</h5>
    </div>
  );
};
const SecretGovernance = () => {
  return (
    <div className="SecretGovernance" style={styleContainer}>
      <h5>Secret Governance</h5>
    </div>
  );
};

const divContainer = {
  display: 'flex',
};

const styleContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3rem',
  margin: 'auto',
};
