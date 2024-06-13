import styles from './Banner.module.scss'
import { BannerContent } from './BannerContent'

export function Banner() {
	return (
		<div className={styles.bg_banner}>
			<BannerContent />
		</div>
	)
}
