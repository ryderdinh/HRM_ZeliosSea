import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import ButtonDanger from 'components/Button/ButtonDanger'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import Input from 'components/Form/Input'
import Textarea from 'components/Form/Textarea'
import FlagButton from 'components/Todo/FlagButton'
import { useInput } from 'hooks'
import useTodo from 'hooks/useTodo'
import { Fragment, useEffect, useState } from 'react'
import { errorToast, successToast } from 'utilities/toast'

const statusList = ['todo', 'doing', 'completed']

export default function TodoDetail({
  closeModal,
  data: { _id, title, description, status, pin, onClose }
}) {
  const [updating, setUpdating] = useState(false)
  const [statusSelected, setStatusSelected] = useState(status)
  const [pinValue, setPinValue] = useState(pin)

  const titleInput = useInput(title)
  const descriptionInput = useInput(description)
  const { updateTodo, deleteTodo } = useTodo()

  const onUpdate = () => {
    const onPending = () => {
      setUpdating(true)
    }

    const onSuccess = () => {
      setUpdating(false)
      successToast('Updated')
    }

    const onError = (err) => {
      setUpdating(false)
      errorToast(err.message, 'update-todo')
    }

    updateTodo(
      status,
      _id,
      {
        title: titleInput.value,
        description: descriptionInput.value,
        status: statusSelected,
        pin: pinValue
      },
      onPending,
      onSuccess,
      onError
    )
  }

  const onDelete = () => {
    setUpdating(true)

    const onSuccess = () => {
      setUpdating(false)
      successToast(`Removed! You won't find it anymore`)
      closeModal()
    }

    const onError = (err) => {
      setUpdating(false)
      errorToast(err.message, 'update-todo')
    }

    deleteTodo(status, _id, onSuccess, onError)
  }

  useEffect(() => {
    setStatusSelected(status)
  }, [status])

  useEffect(() => {
    setPinValue(pin)
  }, [pin])

  return (
    <div className='min-h-screen px-4 text-center'>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Dialog.Overlay className='fixed inset-0' />
      </Transition.Child>

      <span className='inline-block h-screen align-middle' aria-hidden='true'>
        &#8203;
      </span>

      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <div
          className='my-8 inline-block w-full max-w-md transform
          rounded-md border border-neutral-800 bg-[#232323] p-6 text-left 
          align-middle shadow-xl transition-all'
        >
          <Dialog.Title
            as='h3'
            className='text-center text-lg font-bold leading-6 text-neutral-200'
          >
            Todo Detail
          </Dialog.Title>

          <div className='mt-5'>
            <div className='grid grid-cols-6 gap-5'>
              <div className='col-span-6'>
                <Input
                  label='ID'
                  value={_id}
                  readOnly
                  copy
                  onChange={() => {}}
                />
              </div>
              <div className='col-span-6'>
                <Input label='Title' {...titleInput.bind} />
              </div>
              <div className='col-span-6'>
                <Textarea
                  label='Description'
                  rows={5}
                  className='resize-none'
                  {...descriptionInput.bind}
                />
              </div>
              <div className='col-span-4'>
                <RadioGroup
                  value={statusSelected}
                  onChange={(e) => {
                    setStatusSelected(e)
                  }}
                >
                  <RadioGroup.Label className='mb-1 block text-sm font-medium text-gray-50'>
                    Status
                  </RadioGroup.Label>
                  <div
                    className='flex items-center 
                    overflow-hidden rounded-5 border border-gray-500 bg-gray-800'
                  >
                    {statusList.map((opt, idx) => (
                      <RadioGroup.Option
                        key={opt}
                        value={opt}
                        className={({ checked }) => `relative flex
                        cursor-pointer select-none items-center justify-center 
                        border-transparent p-2 text-2xs text-white ${
                          idx > 0 ? '!border-l !border-l-gray-500' : ''
                        }
                        ${
                          checked
                            ? 'bg-emerald-400/10 text-emerald-300 ring-[2px] ring-inset !ring-emerald-500'
                            : ''
                        }`}
                        style={{
                          width: `${100 / statusList.length}%`
                        }}
                      >
                        {opt}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className='col-span-2'>
                <div className='mb-1 block text-sm font-medium text-gray-50'>
                  Flag
                </div>
                <div className=''>
                  <FlagButton
                    className='py-[10.5px]'
                    isFlag={pinValue}
                    onClick={() => setPinValue(!pinValue)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <ButtonSuccess
              size='mid'
              disabled={updating}
              className='w-24'
              onClick={onUpdate}
            >
              Update
            </ButtonSuccess>
            <ButtonDanger
              size='mid'
              disabled={updating}
              className='w-24'
              onClick={onDelete}
            >
              Remove
            </ButtonDanger>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}
