"use client";

import React, { useEffect, useState } from "react";

import { closeDialog, useGlobalDialogs } from "@/atoms/global-dialogs";

export default function RootDialog() {
  const [mounted, setMounted] = useState(false);

  const { globalDialogsMap } = useGlobalDialogs();

  useEffect(() => setMounted(true), []);

  return mounted && (
    globalDialogsMap.map(({ Component, props }) => (
      <Component key={Component.name} {...props} onClose={() => closeDialog(Component)} />
    ))
  )
}