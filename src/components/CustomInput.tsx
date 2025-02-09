'use client'
import IconEye from '@/assets/svg/IconEye'
import IconEyeClosed from '@/assets/svg/IconEyeClosed'
import { useState } from 'react'

export default function CustomInput({
  label,
  id,
  type = 'text'
}: {
  label: string
  id: string
  type?: 'text' | 'password' | 'email'
}) {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  return (
    <div className='relative'>
      <label
        htmlFor={id}
        className='absolute left-3 top-3 text-xs text-white/40'
      >
        {label}
      </label>
      <input
        className='bg-night-700 block w-full px-3 pt-8 pb-3 text-sm outline-none rounded-lg border border-white/40 focus:border-white/80'
        id={id}
        name={id}
        autoComplete='off'
        type={isShowingPassword ? 'text' : type}
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
