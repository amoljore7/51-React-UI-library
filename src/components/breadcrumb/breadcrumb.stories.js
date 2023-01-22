import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import Breadcrumb from './breadcrumb';

export default {
  title: 'design-components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    routeToNameList: [],
  },
};

const BreadcrumbTemplate = (args) => <Breadcrumb {...args} />;
export const BreadcrumbGroup = BreadcrumbTemplate.bind({});
BreadcrumbGroup.args = {
  routeToNameList: [
    {
      href: 'https://google.com',
      name: 'Breadcrumb1',
    },
    {
      route: 'https://google.com',
      name: 'Breadcrumb2',
    },
    {
      name: 'Breadcrumb3',
    },
  ],
};

export const BreadcrumbWithOverflow = BreadcrumbTemplate.bind({});
BreadcrumbWithOverflow.args = {
  routeToNameList: [
    {
      route: '#',
      name: 'Breadcrumb1',
    },
    {
      route: '#',
      name: 'Breadcrumb2',
    },
    {
      route: '#',
      name: 'Breadcrumb3',
    },
    {
      route: '#',
      name: 'Breadcrumb4',
    },
    {
      route: '#',
      name: 'Breadcrumb5',
    },
  ],
};

export const BreadcrumbIntegrationWithReactRouter = () => {
  // use the withRouter HOC and wrap it around breadcrumb
  const BreadcrumbWithRouter = withRouter(Breadcrumb);
  const Home = () => {
    return <div> Welcome to home page.</div>;
  };

  const Dashboard = () => {
    return (
      <div>
        <div>
          <BreadcrumbWithRouter
            routeToNameList={[
              {
                route: '/home',
                name: 'home',
              },
              {
                route: '/dashboard',
                name: 'dashboard',
              },
            ]}
          />
        </div>
        This is the Dashboard page.
      </div>
    );
  };

  const MgmtConsole = () => {
    return (
      <div>
        <div>
          <BreadcrumbWithRouter
            routeToNameList={[
              {
                route: '/home',
                name: 'home',
              },
              {
                route: '/dashboard',
                name: 'dashboard',
              },
              {
                route: '/dashboard/console',
                name: 'console',
              },
            ]}
          />
        </div>
        <p>This is the Management console !!</p>
      </div>
    );
  };
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/console">Console</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/console">
              <MgmtConsole />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
