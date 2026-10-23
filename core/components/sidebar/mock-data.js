import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { jsx as _jsx } from "react/jsx-runtime";
export const sidebarData = [{
  GroupHeader: 'Britive Vault',
  items: [{
    title: 'Britive Vault',
    route: '/',
    icon: /*#__PURE__*/_jsx(AiIcons.AiFillHome, {})
  }, {
    title: 'Approvals',
    route: '/approvals',
    icon: /*#__PURE__*/_jsx(IoIcons.IoIosPaper, {})
  }]
}, {
  GroupHeader: 'Governance',
  items: [{
    title: 'Secret Governance',
    route: '/secret-governance',
    icon: /*#__PURE__*/_jsx(FaIcons.FaCartPlus, {})
  }]
}, {
  GroupHeader: 'Configuration',
  items: [{
    title: 'Static Secret Template',
    route: '/static-Secret-template',
    icon: /*#__PURE__*/_jsx(IoIcons.IoMdPeople, {})
  }, {
    title: 'Britive Vault Details',
    route: '/britive-vault-details',
    icon: /*#__PURE__*/_jsx(FaIcons.FaEnvelopeOpenText, {})
  }, {
    title: 'Dynamic Secret',
    route: '/dynamic-secret',
    icon: /*#__PURE__*/_jsx(IoIcons.IoMdHelpCircle, {})
  }, {
    title: '3rd Party Vaults',
    route: '/3rd-party-vaults',
    icon: /*#__PURE__*/_jsx(IoIcons.IoMdPeople, {})
  }]
}];