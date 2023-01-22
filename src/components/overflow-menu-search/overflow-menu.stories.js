import React, { useEffect, useState } from 'react';
import OverflowMenuSearch from './overflow-menu-search';
import Pill from '../pill';
import AWS_Icon from '../../assets/icons/aws.svg';
import AZURE_Icon from '../../assets/icons/azure.svg';
import GCP_Icon from '../../assets/icons/gcp.svg';
import SALESFORCE_Icon from '../../assets/icons/salesforce.svg';
import { FiChevronDown } from 'react-icons/fi';

export default {
  title: 'design-components/OverflowMenuSearch',
  component: OverflowMenuSearch,
};

export const Default = () => {
  const [options, setOptions] = useState([
    { id: 1, checked: false, value: 'AWS', icon: AWS_Icon },
    { id: 2, checked: false, value: 'Azure', icon: AZURE_Icon },
    { id: 3, checked: true, value: 'Salesforce', icon: GCP_Icon },
    { id: 4, checked: false, value: 'GCP', icon: SALESFORCE_Icon },
  ]);

  useEffect(() => {
    console.log(options.filter((item) => item.checked === true));
  }, [options]);

  const handleChange = (value) => {
    setOptions(value);
  };

  const props = {
    options: options,
    icon: <FiChevronDown size={24} />,
    onChange: handleChange,
    getOptionId: (option) => {
      return option?.id;
    },
    getOptionLabel: (option) => {
      return option?.value;
    },
    getOptionIcon: (option) => {
      return option?.icon;
    },
  };

  return (
    <>
      <OverflowMenuSearch {...props} />
    </>
  );
};

//**** Implemented Example with UI **** Note: Make sure to Pass a unique #ID for an objects. ****/
export const ExampleWithUI = () => {
  const [options, setOptions] = useState([
    { obj_id: 1, checked: false, name: 'AWS', option_icon: AWS_Icon },
    { obj_id: 2, checked: false, name: 'Azure', option_icon: AZURE_Icon },
    { obj_id: 3, checked: true, name: 'Salesforce ', option_icon: GCP_Icon },
    { obj_id: 4, checked: false, name: 'GCP', option_icon: SALESFORCE_Icon },
  ]);

  const tableStyle = {
    fontFamily: 'arial, sans-serif',
    borderCollapse: 'collapse',
    width: '100%',
  };
  const tdThStyle = {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'center',
  };
  const iconStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    cursor: 'pointer',
  };

  const handleChange = (value) => {
    setOptions(value);
  };

  const deleteSelectedPill = (id) => {
    const newState = options.map((obj) => {
      if (obj.obj_id === id) {
        return { ...obj, checked: false };
      }
      return obj;
    });
    setOptions(newState);
  };

  const props = {
    options: options,
    onChange: handleChange,
    getOptionId: (option) => {
      return option?.obj_id;
    },
    getOptionLabel: (option) => {
      return option?.name;
    },
    getOptionIcon: (option) => {
      return option?.option_icon;
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '5px', marginLeft: '80px' }}>
        {options &&
          options
            .filter((item) => item.checked === true)
            .map((item) => {
              return (
                <Pill
                  readOnly={false}
                  key={item.obj_id}
                  label={item.name}
                  onDelete={() => deleteSelectedPill(item.obj_id)}
                />
              );
            })}
      </div>

      <div style={{ margin: '20px 80px 10px 80px', height: '100vh' }}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={tdThStyle}>
                <div style={iconStyle}>Profile Name</div>
              </th>
              <th style={tdThStyle}>
                <div style={iconStyle}>
                  Application
                  <OverflowMenuSearch {...props} />
                </div>
              </th>
            </tr>
            <tr>
              <td style={tdThStyle}>AWS Profile</td>
              <td style={tdThStyle}>AWS</td>
            </tr>
            <tr>
              <td style={tdThStyle}>Azure Profile</td>
              <td style={tdThStyle}>Azure</td>
            </tr>
            <tr>
              <td style={tdThStyle}>Salesforce Profile</td>
              <td style={tdThStyle}>Salesforce</td>
            </tr>
            <tr>
              <td style={tdThStyle}>GCP Profile</td>
              <td style={tdThStyle}>GCP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
