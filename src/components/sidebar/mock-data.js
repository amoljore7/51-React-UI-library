import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const sidebarData = [
  {
    GroupHeader: 'My Vault',
    items: [
      {
        title: 'My Vault',
        route: '/',
        icon: <AiIcons.AiFillHome />,
      },
      {
        title: 'Approvals',
        route: '/approvals',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    GroupHeader: 'Governance',
    items: [
      {
        title: 'Secret Governance',
        route: '/secret-governance',
        icon: <FaIcons.FaCartPlus />,
      },
    ],
  },
  {
    GroupHeader: 'Configuration',
    items: [
      {
        title: 'Static Secret Template',
        route: '/static-Secret-template',
        icon: <IoIcons.IoMdPeople />,
      },
      {
        title: 'My Vault Details',
        route: '/my-vault-details',
        icon: <FaIcons.FaEnvelopeOpenText />,
      },
      {
        title: 'Dynamic Secret',
        route: '/dynamic-secret',
        icon: <IoIcons.IoMdHelpCircle />,
      },
      {
        title: '3rd Party Vaults',
        route: '/3rd-party-vaults',
        icon: <IoIcons.IoMdPeople />,
      }
    ],
  },
];
