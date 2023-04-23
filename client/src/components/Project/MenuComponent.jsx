import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'

export default function MenuComponent({ children }) {
  return (
    <Menu as='div' className='relative z-10 inline-block text-left'>
      <div className='flex justify-end'>
        <Menu.Button
          className='panel rounded-md inline-flex h-9 w-max 
          items-center justify-center bg-opacity-20 py-2 px-4 text-sm
          font-medium text-white hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75'
        >
          <ChevronDownIcon
            className='h-5 w-5 text-neutral-200 hover:text-neutral-100'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className='rounded-md absolute right-0 mt-2 w-56 origin-top-right divide-y
          divide-neutral-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
