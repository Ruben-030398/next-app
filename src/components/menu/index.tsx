"use-client"

import React from 'react'
import { MoreVertical } from 'lucide-react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { twMerge } from '../../../utils';

export type MenuAction = {
  onClick: () => void;
  className?: string;
  text: React.ReactNode;
}

export type MenuProps = {
  actions: Array<MenuAction>,
  className?: string,
}

const MenuItem: React.FC<MenuAction> = ({ className, text, onClick }) => {
  return (
    <DropdownMenu.Item onClick={onClick} className={twMerge("hover:text-white group text-[13px] leading-none text-violet11 gap-4 rounded-[3px] flex justify-between items-center h-[25px] relative px-[1rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1", className)}>
      {text}
    </DropdownMenu.Item>
  );
}

const Menu: React.FC<MenuProps> = ({ actions = [], className }) => {
  return (

    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="dark:bg-transparent dark:hover:bg-transparent rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          <MoreVertical />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align='end' sideOffset={5} className={twMerge('dark:bg-slate-800 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade', className)}>
          {
            actions.map((action, index) => (
              <MenuItem {...action} key={index} />
            ))
          }
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default Menu