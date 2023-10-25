import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { getRecoil, setRecoil } from 'recoil-nexus'

export type GlobalDialog<T> = { 
  Component: React.FC<T>,
  props: Omit<T, 'onClose'>
}

export const globalDialogs = atom<Array<GlobalDialog<any>>>({
  key: 'globalDialogs',
  default: [], 
});

export const registerDialog = <T>(data: GlobalDialog<T>) => {
  const currentDialogs = getRecoil(globalDialogs);

  const isRegistered = currentDialogs.find(dialog => dialog.Component === data.Component);

  !isRegistered && setRecoil(globalDialogs, [...currentDialogs, data])
} 

export const closeDialog = (component: React.FC) => {
  const currentDialogs = getRecoil(globalDialogs);

  setRecoil(globalDialogs, currentDialogs.filter(dialog => dialog.Component !== component))
}

export function useGlobalDialogs() {
  const [globalDialogsMap] = useRecoilState(globalDialogs);


  return { globalDialogsMap, registerDialog, closeDialog };
}