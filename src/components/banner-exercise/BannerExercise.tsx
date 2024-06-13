import styles from './BannerExercise.module.scss'
import { BannerExerciseContent } from './BannerExerciseContent'

export function BannerExercise() {
	return (
		<div className={styles.bg_banner}>
			<BannerExerciseContent />
		</div>
	)
}
