import React from 'react'

import { cn } from '@/lib/utils'

export type TypeWorkoutField = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string
	id: string
	placeholder?: string
}

const WorkoutField = React.forwardRef<HTMLInputElement, TypeWorkoutField>(
	({ className, label, id, placeholder, ...props }, ref) => {
		return (
			<div className='grid w-full max-w-2xl items-center gap-2'>
				<label
					className='text-white/80 text-xl'
					htmlFor={id}
				>
					{label}
				</label>

				<input
					className={cn(
						'bg-white text-lg text-COLORS-bg_color_app font-medium h-14 px-6 rounded-xl',
						className
					)}
					type='text'
					id={id}
					placeholder={placeholder}
					ref={ref}
					{...props}
				/>
			</div>
		)
	}
)

WorkoutField.displayName = 'WorkoutField'
export { WorkoutField }
