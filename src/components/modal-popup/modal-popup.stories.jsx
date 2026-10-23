import { useState } from 'react'
import ModalPopup from './modal-popup'
import TextField from '../textfield'
import { DarkStoryDocument, DarkStorySurface } from '../../story-assets/story-theme'

export default {
  title: 'design-components/ModalPopup',
  component: ModalPopup,
}

export const ModalPopupDemo = () => {
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState({ value: '' })

  const modalOpenHandler = () => {
    setOpenModal(true)
  }

  const okHandler = () => {
    console.log(data)
    setOpenModal(false)
  }

  const cancelHandler = () => {
    setOpenModal(false)
  }

  const changeHandler = e => {
    console.log(e.target.value)
    setData({ ...data, value: e.target.value })
  }

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
  ]

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
  )
}

export const WithoutActionButtons = () => {
  const [openModal, setOpenModal] = useState(false)

  const modalOpenHandler = () => {
    setOpenModal(true)
  }

  const cancelHandler = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <button type='button' onClick={modalOpenHandler}>
        Open Dialog
      </button>
      {openModal && (
        <ModalPopup width={464} title={'Permission Details'} onCancel={cancelHandler} classNamePrefix="without-action-buttons">
          <p>This row data contains details about Vault Permission</p>
        </ModalPopup>
      )}
    </div>
  )
}

export const DarkTheme = () => {
  const noop = () => {}
  return (
    <DarkStoryDocument>
      <DarkStorySurface style={{ minHeight: 120, color: '#e6e6e9' }}>
        <p style={{ marginBottom: 16 }}>
          Modal is portaled to document; html data-theme is set to dark for
          this story.
        </p>
        <ModalPopup
          width={464}
          title="Modal on dark theme"
          onCancel={noop}
          buttons={[
            { text: 'OK', variant: 'primary', onClick: noop, size: 'large' },
            { text: 'Cancel', variant: 'secondary', onClick: noop, size: 'large' },
          ]}
        >
          <p>Example content inside the modal.</p>
        </ModalPopup>
      </DarkStorySurface>
    </DarkStoryDocument>
  )
}

DarkTheme.storyName = 'Dark theme'
