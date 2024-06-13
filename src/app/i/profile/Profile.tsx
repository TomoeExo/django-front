'use client'

import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DashboardHeader } from '@/components/dashboard-layout/header/DashboardHeader'
import { Heading } from '@/components/dashboard-layout/header/Heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { TypeUserForm } from '@/types/auth.types'

import { ImageUpload } from './ImageUpload'
import { useInitialData } from './useInitialData'
import { useUpdateProfile } from './useUpdateProfile'
import { FileService } from '@/services/file.service'

export function Profile() {
	const { register, handleSubmit, reset, control } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	const { data: profileData } = useInitialData(reset)

	const { mutate, isPending } = useUpdateProfile()
	const [avatar, setAvatar] = useState<{ file: File; folder: string } | null>(
		null
	)
	const [previewImage, setPreviewImage] = useState<string | null>(null)

	const handleImageChange = (e: any) => {
		const file = e.target.files[0]
		const folder = e.currentTarget.dataset.folder
		setAvatar({ file, folder })

		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreviewImage(reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setPreviewImage(null)
		}
	}
	const handleUpload = async () => {
		if (!avatar || !avatar.file) {
			console.error('Изображение не выбрано')
			return
		}

		const { file, folder } = avatar

		const formData = new FormData()
		formData.append('file', file)
		// Добавляем также папку
		formData.append('folder', folder)

		try {
			await FileService.upload(formData)
			// Обработка ответа...
		} catch (error) {
			console.error('Ошибка загрузки изображения:', error)
		}
	}

	const onSubmit: SubmitHandler<TypeUserForm> = async data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			details: {
				age: data.details?.age,
				gender: data.details?.gender,
				height: data.details?.height,
				weight: data.details?.weight
			},
			password: password || undefined
		})
	}
	return (
		<>
			<DashboardHeader
				title='Profile'
				description='Welcome to profile page'
			/>
			<Heading title='Personal info' />
			<form
				className='ml-10 flex flex-col gap-4 items-start sm:m-4 sm:items-center'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4  sm:items-center'>
					<Controller
						control={control}
						name='avatarImg'
						render={({ field: { onChange } }) => (
							<ImageUpload
								type='file'
								folder='avatars'
								image={profileData?.user.avatarImg}
								onChange={onChange}
							/>
						)}
					/>

					<div className='grid w-full max-w-xs items-center gap-2   sm:justify-center'>
						<Label
							className='text-COLORS-placeholder'
							htmlFor='username'
						>
							Username
						</Label>
						<Input
							className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
							type='text'
							id='username'
							placeholder='Username'
							{...register('name')}
						/>
					</div>
					<div className='grid w-full max-w-xs items-center gap-2  sm:justify-center'>
						<Label
							className='text-COLORS-placeholder'
							htmlFor='email'
						>
							Email
						</Label>
						<Input
							className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
							type='email'
							id='email'
							placeholder='Email'
							{...register('email', {
								required: 'Email is required'
							})}
						/>
					</div>
					<div className='grid w-full max-w-xs items-center gap-2  sm:justify-center'>
						<Label
							className='text-COLORS-placeholder'
							htmlFor='password'
						>
							Password
						</Label>
						<Input
							className='bg-transparent focus:ring-0 border-none  h-auto text-2xl p-0'
							type='password'
							id='password'
							placeholder='*****'
							{...register('password')}
						/>
					</div>
					<div className='flex w-full max-w-md items-center gap-4 sm:flex-wrap sm:justify-center sm:max-w-60'>
						<div className='grid w-full max-w-24 items-center gap-2'>
							<Label
								className='text-COLORS-placeholder'
								htmlFor='age'
							>
								Age
							</Label>
							<Input
								className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
								type='number'
								id='age'
								isNumber
								placeholder='Age'
								{...register('details.age', {
									valueAsNumber: true
								})}
							/>
						</div>
						<div className='grid w-full max-w-28 items-center gap-2'>
							<Label
								className='text-COLORS-placeholder'
								htmlFor='gender'
							>
								Gender
							</Label>
							<Select {...register('details.gender')}>
								<SelectTrigger className='border-none focus:ring-0 active:outline-0 ring-0 outline-0 active:ring-0 active:border-none text-2xl  bg-transparent focus:ring-offset-transparent p-0 h-auto '>
									<SelectValue
										placeholder={profileData?.user.details?.gender || 'Gender'}
									/>
								</SelectTrigger>
								<SelectContent className='text-COLORS-bg_color_app cursor-pointer'>
									<SelectGroup>
										<SelectItem
											className='cursor-pointer '
											value='man'
										>
											Man
										</SelectItem>
										<SelectItem
											className='cursor-pointer'
											value='woman'
										>
											Woman
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className='grid w-full max-w-24 items-center gap-2'>
							<Label
								className='text-COLORS-placeholder'
								htmlFor='heigh'
							>
								Heigh
							</Label>
							<Input
								className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
								type='number'
								id='heigh'
								isNumber
								placeholder='Heigh'
								{...register('details.height', {
									valueAsNumber: true
								})}
							/>
						</div>
						<div className='grid w-full max-w-28 items-center gap-2'>
							<Label
								className='text-COLORS-placeholder'
								htmlFor='weight'
							>
								Weight
							</Label>
							<Input
								className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
								type='number'
								id='weight'
								isNumber
								placeholder='Weight'
								{...register('details.weight', {
									valueAsNumber: true
								})}
							/>
						</div>
					</div>
				</div>
				<Button
					className='px-7  '
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</>
	)
}
