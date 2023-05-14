import {FC} from "react";
import styles from './Preloader.module.scss'

const Preloader: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.centeredCircle}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Preloader