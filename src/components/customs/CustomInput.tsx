'use client'
import IconEye from '@/assets/svg/IconEye'
import IconEyeClosed from '@/assets/svg/IconEyeClosed'
import { useState } from 'react'

export default function CustomInput({
  label,
  id,
  type = 'text',
  disabled = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  type?: 'text' | 'password' | 'email'
  disabled?: boolean
}) {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  return (
    <div className={`relative ${disabled && 'opacity-50'}`}>
      <label
        htmlFor={id}
        className='absolute left-3 top-3 text-xs text-white/40'
      >
        {label}
      </label>
      <input
        className='bg-night-700 block w-full px-3 pt-8 pb-3 text-sm outline-none rounded-lg border border-white/40 focus:border-white/80 transition-colors duration-300'
        id={id}
        name={id}
        autoComplete='off'
        type={isShowingPassword ? 'text' : type}
        disabled={disabled}
        {...props}
      />
      {type === 'password' && (
        <button
          className='absolute right-3 top-1/2 -translate-y-1/2 [&>*]:pointer-events-none'
          onClick={() => setIsShowingPassword(!isShowingPassword)}
          type='button'
        >
          {isShowingPassword ? <IconEyeClosed /> : <IconEye />}
        </button>
      )}
    </div>
  )
}
