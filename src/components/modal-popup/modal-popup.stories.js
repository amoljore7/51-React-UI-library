import { useState } from 'react';
import ModalPopup from './modal-popup';
import TextField from '../textfield';

export default {
  title: 'design-components/ModalPopup',
  component: ModalPopup,
};

export const ModalPopupDemo = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({ value: '' });

  const modalOpenHandler = () => {
    setOpenModal(true);
  };

  const okHandler = () => {
    console.log(data);
    setOpenModal(false);
  };

  const cancelHandler = () => {
    setOpenModal(false);
  };

  const changeHandler = (e) => {
    console.log(e.target.value);
    setData({ ...data, value: e.target.value });
  };

  const buttons = [
    {
      text: 'Ok',
      variant: 'primary',
      onClick: okHandler,
      size: 'large',
    },
    {
      text: 'Cancel',
      variant: 'secondary',
      onClick: cancelHandler,
      size: 'large',
    },
    {
      text: 'Cancel',
      variant: 'secondary',
      onClick: cancelHandler,
      size: 'large',
    },
    {
      text: 'Cancel',
      variant: 'secondary',
      onClick: cancelHandler,
      size: 'large',
    },
    {
      text: 'Cancel',
      type: 'secondary',
      onClick: cancelHandler,
      size: 'large',
    },
  ];

  return (
    <div>
      <button type='button' onClick={modalOpenHandler}>
        Open Dialog
      </button>
      {openModal && (
        <ModalPopup width={464} title={'Add Permission'} buttons={buttons} onCancel={cancelHandler}>
          <TextField value={data.value} onChange={changeHandler} placeholder='Enter Name' />
        </ModalPopup>
      )}
    </div>
  );
};

export const WithoutActionButtons = () => {
  const [openModal, setOpenModal] = useState(false);

  const modalOpenHandler = () => {
    setOpenModal(true);
  };

  const cancelHandler = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <button type='button' onClick={modalOpenHandler}>
        Open Dialog
      </button>
      {openModal && (
        <ModalPopup width={464} title={'Permission Details'} onCancel={cancelHandler}>
          <p>This row data contains details about Vault Permission</p>
        </ModalPopup>
      )}
    </div>
  );
};
