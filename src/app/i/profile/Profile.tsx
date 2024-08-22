'use client'

import { ImageUp } from 'lucide-react'
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

import { TypeUserFormWithFile } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateProfile } from './useUpdateProfile'

export function Profile() {
	const { register, handleSubmit, reset, control } =
		useForm<TypeUserFormWithFile>({
			mode: 'onChange'
		})

	const { data: profileData } = useInitialData(reset)
	const { mutate, isPending } = useUpdateProfile()
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [avatarFile, setAvatarFile] = useState<File | null>(null)

	// Обработка выбора изображения
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setAvatarFile(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreviewImage(reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setAvatarFile(null)
			setPreviewImage(null)
		}
	}

	const onSubmit: SubmitHandler<TypeUserFormWithFile> = async data => {
		const { password, details, ...rest } = data
		const formData = new FormData()

		// Добавляем текстовые данные в FormData
		for (const [key, value] of Object.entries(rest)) {
			formData.append(key, value as string | Blob)
		}

		// Добавляем объект `details` как строку JSON, если он есть
		if (details && Object.keys(details).length > 0) {
			formData.append('details', JSON.stringify(details))
		}

		// Добавляем пароль, если он есть
		if (password) {
			formData.append('password', password)
		}

		// Добавляем файл изображения, если он выбран
		if (avatarFile) {
			formData.append('avatar_img', avatarFile)
		}
		// Вывод formData в консоль
		formData.forEach((value, key) => {
			console.log(`${key}:`, value)
		})

		try {
			mutate(formData) // Отправляем данные на сервер
		} catch (error) {
			console.error('Ошибка при обновлении профиля:', error)
		}
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
				<div className='flex flex-col gap-4 sm:items-center'>
					<div className='flex items-start gap-4'>
						{previewImage || profileData?.avatar_img ? (
							<div className='w-64 h-64 rounded-2xl outline outline-2 outline-COLORS-stroke_main sm:w-52 sm:h-52 overflow-hidden'>
								<img
									src={
										previewImage ||
										(profileData?.avatar_img as string | undefined) ||
										undefined
									}
									alt='Avatar'
									className='w-full h-full object-cover'
								/>
							</div>
						) : (
							<div className='w-64 h-64 rounded-2xl outline outline-2 outline-COLORS-stroke_main flex items-center justify-center sm:w-52 sm:h-52'>
								<div className='flex flex-col capitalize text-center font-medium justify-center items-center gap-3 text-white/80'>
									<ImageUp className='w-10 h-10' />
									Upload image
									<br />
									for profile
								</div>
							</div>
						)}

						<label
							htmlFor='avatar'
							className='text-white/80 font-medium cursor-pointer'
						>
							<ImageUp className='cursor-pointer' />
							<input
								type='file'
								id='avatar'
								accept='image/*'
								onChange={handleImageChange}
								className='hidden'
							/>
						</label>
					</div>

					<div className='grid w-full max-w-xs items-center gap-2 sm:justify-center'>
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
							{...register('username')}
						/>
					</div>
					<div className='grid w-full max-w-xs items-center gap-2 sm:justify-center'>
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
					<div className='grid w-full max-w-xs items-center gap-2 sm:justify-center'>
						<Label
							className='text-COLORS-placeholder'
							htmlFor='password'
						>
							Password
						</Label>
						<Input
							className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
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
							<Controller
								control={control}
								name='details.gender'
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger
											id='gender'
											className='border-none focus:ring-0 active:outline-0 ring-0 outline-0 active:ring-0 active:border-none text-2xl bg-transparent focus:ring-offset-transparent p-0 h-auto '
										>
											<SelectValue
												placeholder={profileData?.details?.gender || 'Gender'}
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
								)}
								defaultValue={profileData?.details?.gender}
							/>
						</div>
					</div>
					<div className='flex w-full max-w-md items-center gap-4 sm:flex-wrap sm:justify-center sm:max-w-60'>
						<div className='grid w-full max-w-24 items-center gap-2'>
							<Label
								className='text-COLORS-placeholder'
								htmlFor='height'
							>
								Height
							</Label>
							<Input
								className='bg-transparent focus:ring-0 border-none h-auto text-2xl p-0'
								type='number'
								id='height'
								placeholder='Height'
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
								placeholder='Weight'
								{...register('details.weight', {
									valueAsNumber: true
								})}
							/>
						</div>
					</div>
				</div>

				<Button
					type='submit'
					className='sm:max-w-xs sm:w-full bg-COLORS-stroke_main'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</>
	)
}
