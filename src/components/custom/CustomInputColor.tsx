import { useRef } from 'react'
import CustomInput from './CustomInput'

export default function CustomInputColor({
  label,
  id,
  children,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  id: string
  children?: React.ReactNode
}) {
  const DEFAULT_COLOR =
    typeof props.defaultValue === 'string' &&
    props.defaultValue.trim().length > 0
      ? props.defaultValue
      : '#000000'
  const textInputReference = useRef<HTMLInputElement>(null)
  const colorInputReference = useRef<HTMLInputElement>(null)
  return (
    <CustomInput
      label={label}
      id={id}
      type='text'
      defaultValue={DEFAULT_COLOR}
      inputReference={textInputReference}
      onClick={() => {
        if (colorInputReference.current) {
          colorInputReference.current.click()
        }
      }}
      labelClassName='left-[60px]'
      style={{
        paddingLeft: '60px'
      }}
      disabled={props?.disabled}
      readOnly
    >
      <input
        className='absolute top-1/2 -translate-y-1/2 left-3 w-10 h-12 cursor-pointer'
        type='color'
        name='color'
        id='color'
        defaultValue={DEFAULT_COLOR}
        ref={colorInputReference}
        onChange={(e) => {
          if (textInputReference.current) {
            textInputReference.current.value = e.target.value
          }
          props?.onChange?.(e)
        }}
        {...props}
      />
      {children}
    </CustomInput>
  )
}
