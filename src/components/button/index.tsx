"use client"

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge';

const Button = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren >((props, ref) => (
  <button 
    ref={ref} 
    className={twMerge("text-violet11 dark:text-white dark:bg-slate-700 shadow-md dark:shadow-blackA4 dark:hover:bg-slate-600 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none dark:shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none", props.className)}
    {...props}
  >
    {props.children}
  </button>
));

Button.displayName = 'Button'

export default Button