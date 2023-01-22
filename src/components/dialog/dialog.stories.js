import { useState } from 'react';
import DialogPopup from './dialog';
import TextField from '../textfield';

export default {
  title: 'design-components/DialogPopup',
  component: DialogPopup,
  argTypes: {
    type: {
      options: ['general', 'alert', 'error'],
      control: { type: 'radio' },
    },
  },
};

const GeneralDialogTemplate = (args) => <DialogPopup {...args} />;
export const GeneralDialog = GeneralDialogTemplate.bind({});
GeneralDialog.args = {
  type: 'general',
  title: 'Title',
  message: 'Message here',
};

const AlertDialogTemplate = (args) => <DialogPopup {...args} />;
export const AlertDialog = AlertDialogTemplate.bind({});
AlertDialog.args = {
  type: 'alert',
  title: 'Title',
  message: 'Message here',
};

const ErrorDialogTemplate = (args) => <DialogPopup {...args} />;
export const ErrorDialog = ErrorDialogTemplate.bind({});
ErrorDialog.args = {
  type: 'error',
  title: 'Title',
  message: 'Message here',
};

export const DialogPopupDemo = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const onOk = () => {
    console.log('onOK clicked');
    setOpenDialog(false);
  };

  const onCancel = () => {
    console.log('onCancel clicked');
    setOpenDialog(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      {openDialog && (
        <DialogPopup
          width={464}
          height={278}
          type={'general'}
          title={'Title'}
          message={'Message here'}
          primaryButtonText={'OK'}
          secondaryButtonText={'Cancel'}
          onSubmit={onOk}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export const DialogWithSingleInputFieldDemo = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({ value: '' });

  const changeHandler = (e) => {
    setData({ ...data, value: e.target.value });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const onOk = () => {
    setOpenDialog(false);
  };

  const onCancel = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      {openDialog && (
        <DialogPopup
          width={464}
          height={345}
          type={'general'}
          title={'Delete Vault?'}
          message={
            'This will remove all secrets from the vault. The vault will no longer will accessible.'
          }
          primaryButtonText={'OK'}
          secondaryButtonText={'Cancel'}
          onSubmit={onOk}
          onCancel={onCancel}
          primaryButtonDisabled={data.value.trim() !== 'DELETE'}
        >
          <TextField
            label="Please type 'DELETE' to confirm"
            value={data.value}
            onChange={changeHandler}
          />
        </DialogPopup>
      )}
    </div>
  );
};

export const DialogWithMultipleInputFieldDemo = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({ value: '' });

  const changeHandler = (e) => {
    setData({ ...data, value: e.target.value });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const onOk = () => {
    setOpenDialog(false);
  };

  const onCancel = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      {openDialog && (
        <DialogPopup
          width={464}
          height={445}
          type={'general'}
          title={'Title'}
          message={'Message here.'}
          primaryButtonText={'OK'}
          secondaryButtonText={'Cancel'}
          onSubmit={onOk}
          onCancel={onCancel}
        >
          <TextField label="Label" value={data.value} onChange={changeHandler} />
          <div style={{ marginTop: '32px' }}>
            <TextField label="Label" value={data.value} onChange={changeHandler} />
          </div>
        </DialogPopup>
      )}
    </div>
  );
};
