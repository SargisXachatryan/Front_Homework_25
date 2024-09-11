import { Link } from "react-router-dom"
import styles from './students.module.css'


export const Students = () => {
    return (
        <>
            <h3 className={styles.heading}>Students</h3>
            <Link to={'/'} className={styles.link}>Classbook</Link>
        </>
    )
}
