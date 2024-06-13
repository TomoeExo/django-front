import * as React from 'react'

import { cn } from '@/lib/utils'

export type TypeInput = React.InputHTMLAttributes<HTMLInputElement> & {
	isNumber?: boolean
}

const Input = React.forwardRef<HTMLInputElement, TypeInput>(
	({ className, type, isNumber, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-12 w-full rounded-md border border-COLORS-stroke outline-none bg-COLORS-bg_input px-3 py-2 text-sm focus:ring-2 focus:ring-[#BECE4E]  focus:ring-opacity-50  file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
				onKeyDown={event => {
					if (
						isNumber &&
						!/[0-9]/.test(event.key) &&
						event.key !== 'Backspace' &&
						event.key !== 'Tab' &&
						event.key !== 'Enter' &&
						event.key !== 'ArrowLeft' &&
						event.key !== 'ArrowRight'
					) {
						event.preventDefault()
					}
				}}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
