"use client"

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { omit } from 'lodash';
import { User } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';

import { editUserById } from '@/api/edit-user';
import { addNewUser } from '@/api/add-new-user';

import validatorScheme from './validation';
import Button from '@/components/button';

type DialogUserData = Omit<User, 'avatar' | 'id'>;

export type EditUserDialogProps = {
  editMode: true;
  userData: User;
  onClose: () => void;
};

export type AddUserDialogProps = {
  editMode: false;
  onClose: () => void;
  userData?: never
};

type UserDialogProps = EditUserDialogProps | AddUserDialogProps;

const EMPTY_STATE: DialogUserData = {
  address: '',
  company: '',
  email: '',
  name: '',
  phone: 0,
  username: '',
}

function UserDialog({ onClose, editMode, userData }: UserDialogProps) {

  const defaultValues = editMode ? omit(userData, ['avatar', 'id']) : EMPTY_STATE;

  const form = useForm<DialogUserData>({
    defaultValues,
    resolver: yupResolver(validatorScheme),
    mode: 'onChange',
  });

  const { register, formState: { errors }, handleSubmit } = form;

  const onSubmit = (values: DialogUserData) => {
    if (editMode) {
      editUserById(userData.id, { ...userData, ...values });
    } else {
      addNewUser(values);
    }
    onClose()
  }

  return (
    <Dialog.Root open onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] dark:bg-slate-800 bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="dark:text-white text-mauve12 m-0 text-[17px] font-medium">
            {editMode ? 'Edit user' : 'Add user'}
          </Dialog.Title>
          <Dialog.Description className="dark:text-gray-200 text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {editMode ? 'Make changes to user profile here. Click save when you are done.' : 'After adding all fields press save'}
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-[15px]'>
              <fieldset className=" flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                  Name
                </label>
                <input
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="name"
                  {...register('name')}
                />
              </fieldset>
              {errors.name?.message && <span className='block text-sm text-center mt-1 text-red-500'>{errors.name?.message}</span>}
            </div>


            <div className='mb-[15px]'>
              <fieldset className="flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
                  Username
                </label>
                <input
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="username"
                  {...register('username')}
                />
              </fieldset>
              {errors.username?.message && <span className='block text-sm text-center mt-1 text-red-500'>{errors.username?.message}</span>}
            </div>

            <div className='mb-[15px]'>
              <fieldset className=" flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
                  Email
                </label>
                <input
                  type='email'
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="email"
                  {...register('email')}
                />
              </fieldset>
              {errors.email?.message && <span className='block text-sm text-center mt-1 text-red-500'>{errors.email?.message}</span>}
            </div>

            <div className='mb-[15px]'>
              <fieldset className="flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="address">
                  Address
                </label>
                <input
                  type='text'
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="address"
                  {...register('address')}
                />
              </fieldset>
              {errors.address?.message && <span className='block text-sm text-center mt-1 text-red-500'>{errors.address?.message}</span>}
            </div>


            <div className='mb-[15px] '>
              <fieldset className="flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="phone">
                  Phone
                </label>
                <input
                  type='number'
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="phone"
                  {...register('phone')}
                />
              </fieldset>
              {errors.phone?.message && <span className='block text-sm text-center mt-1 text-red-500'>{errors.phone?.message}</span>}
            </div>

            <div className='mb-[15px]'>
              <fieldset className=" flex items-center gap-5">
                <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="company">
                  Company
                </label>
                <input
                  type='text'
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="company"
                  {...register('company')}
                />
              </fieldset>
              {errors.company?.message && <span className='block text-sm text-center mt-1 text-red-500'>{errors.company?.message}</span>}
            </div>

            <div className="mt-[25px] flex justify-end">
              <Button onClick={handleSubmit(onSubmit)} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Save
              </Button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 dark:hover:bg-transparent focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <XCircle />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default UserDialog;