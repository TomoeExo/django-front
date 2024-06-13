'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export function RegisterForm() {
	const { toast } = useToast()
	const { register, handleSubmit, reset, watch } = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const [isLoginForm, setIsLoginForm] = useState(false)
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast({
				description: 'Successfully login!'
			})
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		console.log('data form: ', data)

		mutate(data)
	}

	const repeatPassword = watch('repeat_password', '')

	const validatePasswordMatch = (value: string) => {
		return value === repeatPassword || 'Passwords do not match'
	}

	return (
		<form
			className='max-w-md m-auto'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-6 sm:mb-5'>
				<h1 className='mb-10 ml-auto mr-auto text-white/80 text-4xl sm:text-2xl sm:mb-5'>
					Sign Up
				</h1>

				<div className='grid w-full max-w-md items-center gap-4  text-COLORS-placeholder '>
					<Label htmlFor='username'>Username</Label>
					<Input
						type='text'
						id='username'
						placeholder='Username'
						{...register('name')}
					/>
				</div>
				<div className='grid w-full max-w-md items-center gap-4 text-COLORS-placeholder'>
					<Label htmlFor='email'>Email</Label>
					<Input
						type='email'
						id='email'
						placeholder='Email'
						{...register('email', {
							required: 'Email is required'
						})}
					/>
				</div>
				<div className='grid w-full max-w-md items-center gap-4 text-COLORS-placeholder'>
					<Label htmlFor='password'>Password</Label>
					<Input
						type='password'
						id='password'
						placeholder='Password'
						{...register('password', {
							required: 'Password is required'
						})}
					/>
				</div>
				<div className='grid w-full max-w-md items-center gap-4 text-COLORS-placeholder'>
					<Label htmlFor='repeat_password'>Repeat Password</Label>
					<Input
						type='password'
						id='repeat_password'
						placeholder='Repeat Password'
						{...register('repeat_password', {
							required: 'Password confirmation is required',
							validate: validatePasswordMatch
						})}
					/>
				</div>
				<div className='flex items-center space-x-2 mb-4 mt-4'>
					<Checkbox id='accept' />
					<label
						htmlFor='accept'
						className=' leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium text-base bg-gradient-to-r from-[#BECE4E]  to-[#569C49] bg-clip-text text-transparent'
					>
						Accept terms and conditions
					</label>
				</div>

				<Button onClick={() => setIsLoginForm(false)}>
					Create free account
				</Button>
			</div>
		</form>
	)
}
