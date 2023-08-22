import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button
      className="mt-auto cursor-pointer rounded-lg bg-principal p-5 text-lg font-bold text-white enabled:hover:bg-light disabled:cursor-not-allowed disabled:opacity-60"
      {...props}
    />
  )
}
