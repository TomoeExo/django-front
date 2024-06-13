'use client'

import Link from 'next/link'
import { useState } from 'react'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(false)

	const toggleForm = () => {
		setIsLoginForm(prevState => !prevState)
	}
	return (
		<div className='bg-COLORS-bg_color_app flex min-h-screen'>
			<div
				className={`flex flex-col w-1/2 lg:w-full p-12 ${isLoginForm ? 'translate-x-full lg:translate-x-0' : ''} transition-transform max-h-screen overflow-y-auto sm:p-6`}
			>
				<div className='flex w-full justify-between'>
					<Link href='/'>
						<img
							src='/authImage/trainwell-color.svg'
							alt='Trainwell'
							className='w-12 h-12'
						/>
					</Link>
					<button
						className='flex items-center  font-bold text-[1.1rem] bg-gradient-to-r from-[#BECE4E]  to-[#569C49] bg-clip-text text-transparent'
						onClick={toggleForm}
					>
						{isLoginForm ? '' : 'Log In'}
					</button>
				</div>
				<div className='mt-auto mb-auto'>
					{isLoginForm ? (
						<>
							<LoginForm />{' '}
							<div className='flex justify-center gap-2 mt-6 '>
								Don’t have an account?
								<button
									className='flex items-center font-bold text-base bg-gradient-to-r from-[#BECE4E]  to-[#569C49] bg-clip-text text-transparent'
									onClick={toggleForm}
								>
									Sign Up
								</button>
							</div>
						</>
					) : (
						<RegisterForm />
					)}
				</div>
				<div className='flex w-full justify-between mt-auto text-white/80'>
					<div>Trainwell.app © 2024</div>
					<Link
						className='flex items-center'
						href='/'
					>
						Privacy Policy
					</Link>
				</div>
			</div>
			<div
				className={`w-1/2 lg:hidden ${isLoginForm ? '-translate-x-full ' : ''} transition-transform`}
			>
				<img
					className='w-full h-screen object-cover object-top'
					src={
						isLoginForm
							? '/authImage/image-login.png'
							: '/authImage/image-register.png'
					}
					alt={isLoginForm ? 'Log In' : 'Sign Up'}
				/>
			</div>
		</div>
	)
}
