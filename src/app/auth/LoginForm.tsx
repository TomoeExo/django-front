'use client'

import { useMutation } from '@tanstack/react-query'
import { LockKeyhole, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { IAuthForm } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

export function LoginForm() {
	const { toast } = useToast()
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
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

			push('/i')
			reset()
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<form
			className='max-w-md m-auto'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col gap-6'>
				<h1 className='text-4xl sm:text-2xl'>Let's get training!</h1>

				<h2 className='text-lg font-medium mb-10 sm:text-base sm:mb-5'>
					Log in to Train well to start training well.
				</h2>

				<div className='grid w-full max-w-md items-center gap-4 text-COLORS-placeholder relative'>
					<Input
						className='px-[52px]'
						type='email'
						id='email'
						placeholder='Email'
						{...register('email', {
							required: 'Email is required'
						})}
					/>
					<span className='absolute left-4'>
						<Mail className='stroke-1' />
					</span>
				</div>
				<div className='grid w-full max-w-md items-center gap-4 text-COLORS-placeholder relative'>
					<Input
						className='px-[52px]'
						type='password'
						id='password'
						placeholder='Password'
						{...register('password', {
							required: 'Password is required'
						})}
					/>
					<span className='absolute left-4'>
						<LockKeyhole className='stroke-1' />
					</span>
				</div>
				<div className='flex items-center w-full justify-between'>
					<div className='flex items-center space-x-2 mb-4 mt-4'>
						<Checkbox id='remember' />
						<label
							htmlFor='remember'
							className='text-sm font-medium leading-none text-white/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Remember me
						</label>
					</div>
					<Link
						className='font-bold text-base bg-gradient-to-r from-[#BECE4E]  to-[#569C49] bg-clip-text text-transparent'
						href='/'
					>
						Forgot Password?
					</Link>
				</div>
				<Button onClick={() => setIsLoginForm(true)}>Log in</Button>
			</div>
		</form>
	)
}
