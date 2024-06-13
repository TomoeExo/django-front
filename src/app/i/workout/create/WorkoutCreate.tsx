'use client'

import { Trash2 } from 'lucide-react'
import {
	Controller,
	SubmitHandler,
	useFieldArray,
	useForm
} from 'react-hook-form'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { TypeWorkoutFormState } from '@/types/workout.types'

import { ImageUpload } from '../../profile/ImageUpload'
import { WorkoutField } from '../WorkoutField'
import { WorkoutTextarea } from '../WorkoutTextarea'
import { useCreateWorkout } from '../hooks/useCreateWorkout'

export function WorkoutCreate() {
	const { register, handleSubmit, control, reset } =
		useForm<TypeWorkoutFormState>({
			defaultValues: {
				title: '',
				description: '',
				level: '',
				type: [],
				duration: undefined,
				tags: [],
				completed: false,
				exercises: [{ title: '', sets: undefined, reps: undefined }]
			}
		})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'exercises'
	})

	const { createWorkout } = useCreateWorkout()

	const onSubmit: SubmitHandler<TypeWorkoutFormState> = async (data: any) => {
		try {
			const newData: TypeWorkoutFormState = {
				...data,
				exercises: data.exercises?.map((exercise: any) => ({
					...exercise,
					sets: parseInt(exercise.sets),
					reps: parseInt(exercise.reps)
				})),
				duration: parseInt(data.duration),
				tags:
					typeof data.tags === 'string' && data.tags.length > 0
						? data.tags.split(',').map((tag: any) => tag.trim())
						: [],
				type: Array.isArray(data.type) ? data.type : [data.type].filter(Boolean)
			}

			createWorkout(newData)
			reset()
		} catch (error) {
			console.error('Error creating workout:', error)
		}
	}

	return (
		<>
			<DashboardHeader
				title='Workout'
				description='Welcome to workout page'
			/>

			<div>
				<h1 className='text-4xl font-bold my-12 text-center'>Create workout</h1>
			</div>
			<div className='mb-12'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-row gap-16 justify-center xl:flex-col xl:items-center sm:ml-2'
				>
					<div className='flex flex-col max-w-2xl w-full gap-4'>
						<WorkoutField
							type='text'
							label='Title'
							id='workoutTitle'
							placeholder='Workout Title'
							{...register('title', { required: true })}
						/>

						<WorkoutTextarea
							type='text'
							label='Description'
							id='workoutDescription'
							placeholder='Enter Your Description'
							{...register('description')}
						/>

						{fields.map((field, index) => (
							<div
								key={field.id}
								className='flex gap-4 w-full max-w-2xl sm:flex-col sm:items-start md:ml-8'
							>
								<div className='max-w-xl relative w-full flex items-center   ml-8 xl:ml-0 pr-8'>
									<Button
										className='absolute -left-8 bottom-4'
										variant='trash'
										size='trash'
										onClick={() => remove(index)}
									>
										<Trash2 />
									</Button>
									<WorkoutField
										type='text'
										label='Exercise'
										id={`exercises.${index}.title`}
										placeholder='Workout Exercise'
										{...register(`exercises.${index}.title`, {
											required: true
										})}
									/>
								</div>
								<div className='flex gap-4 '>
									<WorkoutField
										className='max-w-20'
										type='number'
										label='Sets'
										id={`exercises.${index}.sets`}
										{...register(`exercises.${index}.sets`)}
									/>
									<WorkoutField
										className='max-w-20'
										type='number'
										label='Reps'
										id={`exercises.${index}.reps`}
										{...register(`exercises.${index}.reps`)}
									/>
								</div>
							</div>
						))}
						<Button
							onClick={() =>
								append({
									title: '',
									sets: 0,
									reps: 0
								})
							}
							variant='textVar'
						>
							Add Exercise...
						</Button>

						<div className='flex gap-8 sm:flex-col sm:gap-4'>
							<div className='grid w-full items-center gap-2 max-w-36'>
								<Label
									className='text-white/80 text-xl'
									htmlFor='level'
								>
									Level
								</Label>
								<Controller
									name='level'
									control={control}
									render={({ field }) => (
										<Select
											name='level'
											onValueChange={value => field.onChange(value)}
											value={field.value || ''}
										>
											<SelectTrigger
												id='level'
												className='border-none focus:ring-0 w-36 active:outline-0 ring-0 outline-0 active:ring-0 active:border-none bg-transparent focus:ring-offset-transparent p-0 bg-white text-lg text-COLORS-bg_color_app font-medium h-14 pr-4 pl-6 rounded-xl'
											>
												<SelectValue placeholder={'Level'} />
											</SelectTrigger>
											<SelectContent className='text-COLORS-bg_color_app cursor-pointer'>
												<SelectGroup>
													<SelectItem
														className='cursor-pointer'
														value='low'
													>
														Low
													</SelectItem>
													<SelectItem
														className='cursor-pointer'
														value='medium'
													>
														Medium
													</SelectItem>
													<SelectItem
														className='cursor-pointer'
														value='high'
													>
														High
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</div>

							<div className='grid w-full items-center gap-2 max-w-36'>
								<Label
									className='text-white/80 text-xl'
									htmlFor='type'
								>
									Type
								</Label>
								<Controller
									name='type'
									control={control}
									render={({ field }) => (
										<Select
											name='type'
											onValueChange={value => field.onChange([value])}
											value={field.value?.[0] || ''}
										>
											<SelectTrigger
												id='type'
												className='border-none focus:ring-0 w-36 active:outline-0 ring-0 outline-0 active:ring-0 active:border-none bg-transparent focus:ring-offset-transparent p-0 bg-white text-lg text-COLORS-bg_color_app font-medium h-14 pr-4 pl-6 rounded-xl'
											>
												<SelectValue placeholder={'Type'} />
											</SelectTrigger>
											<SelectContent className='text-COLORS-bg_color_app cursor-pointer'>
												<SelectGroup>
													<SelectItem
														className='cursor-pointer'
														value='cardio'
													>
														Cardio
													</SelectItem>
													<SelectItem
														className='cursor-pointer'
														value='CrossFit'
													>
														CrossFit
													</SelectItem>
													<SelectItem
														className='cursor-pointer'
														value='Yoga'
													>
														Yoga
													</SelectItem>
													<SelectItem
														className='cursor-pointer'
														value='Strength'
													>
														Strength
													</SelectItem>
													<SelectItem
														className='cursor-pointer'
														value='Interval'
													>
														Interval
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
							<div>
								<WorkoutField
									className='max-w-28'
									type='number'
									label='Time (min)'
									id='duration'
									placeholder='45'
									{...register('duration')}
								/>
							</div>
						</div>

						<WorkoutField
							type='text'
							label='Tags'
							id='tags'
							placeholder='Workout Tags'
							{...register('tags')}
						/>
						<Button
							className='text-lg text-COLORS-bg_color_app font-medium h-12 px-6 rounded-xl w-full max-w-2xl'
							type='submit'
						>
							Create
						</Button>
					</div>
					<div className=' xl:-order-1'>
						<ImageUpload
							className='w-96 h-72 mt-8 bg-white text-COLORS-bg_color_app'
							type='file'
							folder='workouts'
							image={'Image'}
							onChange={() => '1'}
						/>
					</div>
				</form>
			</div>
		</>
	)
}
