import { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { addLesson } from "../features/classbook/classbook.slice"
import styles from './Design/add-lesson.module.css'

export const AddLesson = () => {
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        dispatch(addLesson({ title: text, ratings: [] }))
            .unwrap()
            .then(res => {
                setText('')
            })
    }

    return (
        <div className={styles.inputContainer}>
            <input
                className={styles.inputField}
                required
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter lesson title"
            />
        </div>
    )
}
