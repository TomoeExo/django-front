import React from 'react'

import { cn } from '@/lib/utils'

export type TypeWorkoutTextarea =
	React.InputHTMLAttributes<HTMLTextAreaElement> & {
		label?: string
		id: string
		placeholder?: string
	}

const WorkoutTextarea = React.forwardRef<
	HTMLTextAreaElement,
	TypeWorkoutTextarea
>(({ className, label, id, placeholder, ...props }, ref) => {
	return (
		<div className='grid w-full max-w-2xl items-center gap-2'>
			<label
				className={cn('text-white/80 text-xl', className)}
				htmlFor={id}
			>
				{label}
			</label>
			<textarea
				className='bg-white text-lg text-COLORS-bg_color_app font-medium h-14  px-6 rounded-xl flex min-h-14 w-full py-3 disabled:cursor-not-allowed '
				id={id}
				placeholder={placeholder}
				ref={ref}
				{...props}
			/>
		</div>
	)
})

WorkoutTextarea.displayName = 'WorkoutField'
export { WorkoutTextarea }
