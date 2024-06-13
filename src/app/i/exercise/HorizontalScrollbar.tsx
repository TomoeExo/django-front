import React from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { BodyPart } from './BodyPart'

export const HorizontalScrollbar: React.FC<any> = ({
	data,
	bodyPart,
	setBodyPart,
	isBodyParts
}) => {
	return (
		<ScrollMenu>
			{data.map((item: any) => (
				<div
					key={item}
					id={item}
					title={item}
				>
					{isBodyParts && (
						<BodyPart
							item={item}
							bodyPart={bodyPart}
							setBodyPart={setBodyPart}
						/>
					)}
				</div>
			))}
		</ScrollMenu>
	)
}
