import { Box, Button, Modal } from "@mui/material"
import styles from './Design/add-student.module.css'
import { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { addStudent } from "../features/students/students.slice"

interface StudentProps {
    open: boolean
    onClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: '#fffbe6',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    p: 4,
    borderRadius: '10px',
}

export const AddStudent = ({ open, onClose }: StudentProps) => {
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addStudent({ name, surname }))
            .unwrap()
            .then(() => {
                setName('')
                setSurname('')
                onClose()
            })
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-student-modal-title"
            aria-describedby="add-student-modal-description"
        >
            <Box sx={style}>
                <div className={styles.inputContainer}>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={styles.inputField}
                            required
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter name"
                        />
                        <input
                            className={styles.inputField}
                            required
                            type="text"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            placeholder="Enter surname"
                        />
                        <div className={styles.buttonContainer}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={styles.submitButton}
                            >
                                Add Student
                            </Button>
                            <Button
                                onClick={onClose}
                                variant="outlined"
                                color="secondary"
                                className={styles.cancelButton}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}
