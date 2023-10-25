"use client"

import React, { useEffect, useState } from 'react'
import Button from '../button'
import { registerDialog } from '@/atoms/global-dialogs'
import UserDialog from '@/dialogs/user-dialog'
import { Moon, RotateCcw, SunMoon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ToolbarActions = () => {
  const router = useRouter()

  const [colorScheme, setColorScheme] = useState<"dark" | "light">("light");

  const handleAddUser = () => {
    registerDialog({
      Component: UserDialog,
      props: { editMode: false }
    })
  }

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    setColorScheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className='flex items-center justify-between gap-4'>
      <Button onClick={handleAddUser}>Add new user</Button>
      <Button title='Refresh' onClick={() => router.refresh()}><RotateCcw /></Button>
      <Button onClick={toggleTheme}>{colorScheme === "dark" ? <Moon /> : <SunMoon />}</Button>
    </div>

  )
}

export default ToolbarActions