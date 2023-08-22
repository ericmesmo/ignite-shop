'use client'

import * as Dialog from '@radix-ui/react-dialog'

import React from 'react'

interface TriggerProps extends Dialog.DialogTriggerProps {
  children: React.ReactNode
}

export function Trigger({ children }: TriggerProps) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>
}
