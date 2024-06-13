import { ImageUp } from 'lucide-react'
import * as React from 'react'

import { useUpload } from './useUpload'
import { cn } from '@/lib/utils'

export interface IUploadField {
	folder?: string
	image?: string
	onChange: (...event: any) => void
	isNoImage?: boolean
}

export type TypeInputUpload = React.InputHTMLAttributes<HTMLInputElement> & {
	folder?: string
	image?: string
	onChange: (...event: any) => void
	isNoImage?: boolean
}

const ImageUpload = React.forwardRef<HTMLInputElement, TypeInputUpload>(
	({ className, type, folder, image, onChange, isNoImage, ...props }, ref) => {
		const { uploadImage, isLoading } = useUpload(onChange, folder)
		const [previewImage, setPreviewImage] = React.useState<string | null>(null)

		const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0]
			if (file) {
				const reader = new FileReader()
				reader.onloadend = () => {
					setPreviewImage(reader.result as string)
				}
				reader.readAsDataURL(file)
			} else {
				setPreviewImage(null)
			}
			uploadImage(e)
		}

		const getImageSrc = () => {
			if (previewImage) {
				return previewImage
			}
			if (image) {
				return image
			}
			return null
		}

		const imageSrc = getImageSrc()

		return (
			<div className='flex items-start gap-4'>
				{imageSrc ? (
					<img
						src={imageSrc}
						alt='Avatar'
						className='w-64 h-64 rounded-2xl outline outline-2 outline-COLORS-stroke_main sm:w-52 sm:h-52'
					/>
				) : (
					<div
						className={cn(
							'w-64 h-64 rounded-2xl outline outline-2 outline-COLORS-stroke_main flex items-center justify-center ',
							className
						)}
					>
						<div className='flex flex-col capitalize flex-wrap text-center font-medium justify-center items-center ml-16 gap-3 text-white/80'>
							<ImageUp className='w-10 h-10' />
							upload image<br></br>
							for profile
						</div>
						<ImageUp className='w-16 h-16 text-COLORS-bg_color_app' />
					</div>
				)}
				<label
					htmlFor='avatar'
					className='text-white/80 font-medium focus:ring-0 border-none cursor-pointer'
				>
					<ImageUp className='cursor-pointer' />
					<input
						ref={ref}
						type={type}
						{...props}
						name='file'
						id='avatar'
						accept='image/*'
						onChange={handleImageChange}
						className='hidden'
					/>
				</label>
			</div>
		)
	}
)
ImageUpload.displayName = 'ImageUpload'

export { ImageUpload }
