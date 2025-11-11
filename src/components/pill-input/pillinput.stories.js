import React, { useEffect, useState } from 'react';
import PillInput from './PillInput';
import { validationRule } from './constants';

export default {
  title: 'design-components/PillInput',
  component: PillInput,
};

export const ManagePill = () => {
  const pillList = ['US', 'KR'];
  const [pillListData, setPillListData] = useState([]);

  useEffect(() => {
    setPillListData(pillList);
  }, []);

  const handleEditPillData = (value) => {
    if (value) {
      const pillValues = [...pillListData];
      pillValues.push(value);
      setPillListData(pillValues);
    }
  };

  const handleDeletePillData = (pill) => {
    if (pill) {
      let pillValues = [...pillListData];
      pillValues = pillValues.filter(e => e !== pill);
      setPillListData(pillValues);
    }
  };

  return (
    <PillInput
      pillListData={pillListData}
      handleUpdatePillList={handleEditPillData}
      handleDeletePill={handleDeletePillData}
      error = {false}
      errorMsg = 'Error Message Here'
      placeholder='Type something and press Enter'
    />
  )
};

export const InvalidIPPill = () => {
  const pillList = ['255.255.255.255'];
  const [pillListData, setPillListData] = useState([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    setPillListData(pillList);
  }, []);

  const handleEditPillData = (value) => {
    setError(false);
    setPillListData(prevData => [...prevData, value]);
  };

  const handleDeletePillData = (pill) => {
    setPillListData(prevData => prevData.filter(item => item !== pill));
  };
  const validateInput = (value) => {
    return validationRule.test(value);
  };
  const isValid = (value) => {
    if(value === '') return true
    setError(!validateInput(value))
    return validateInput(value);
  };

  return (
    <PillInput
      pillListData={pillListData}
      handleUpdatePillList={handleEditPillData}
      handleDeletePill={handleDeletePillData}
      error = {error}
      errorMsg = 'Invalid Ip address in Value'
      isValid= {isValid}
      setError={setError}
      placeholder='Type something and press Enter'
    />  
  )
};

export const Default = () => {
  const [pillListData, setPillListData] = useState([]);

  const handleEditPillData = (value) => {
    if (value) {
      const pillValues = [...pillListData];
      pillValues.push(value);
      setPillListData(pillValues);
    }
  };

    const handleDeletePillData = (pill) => {
    if (pill) {
      let pillValues = [...pillListData];
      pillValues = pillValues.filter(e => e !== pill);
      setPillListData(pillValues);
    }
  };

  return (
    <PillInput
      pillListData={pillListData}
      handleUpdatePillList={handleEditPillData}
      handleDeletePill={handleDeletePillData}
    />  
  )
};

export const Disabled = () => {
  const pillList = ['255.255.255.255'];

  return (
    <PillInput
      pillListData={pillList}
      disabled={true}
    />  
  )
};