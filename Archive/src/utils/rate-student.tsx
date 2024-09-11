import { Modal, Box, Typography, Button, TextField } from '@mui/material'
import { IStudent } from '../features/students/types'
import { useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { addRate } from '../features/classbook/classbook.slice'

interface RateStudentProps {
    open: boolean
    onClose: () => void
    student: IStudent | null
    lessonId: string
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

export const RateStudent = ({ open, onClose, student, lessonId }: RateStudentProps) => {
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleSave = () => {
        if (student && text) {
            dispatch(addRate({ lessonId, rating: { id: `${Date.now()}`, student: student.id, rate: parseInt(text, 10) } }))
        }
        onClose()
        setText('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const numberValue = Number(value)

        if (value === '' || (numberValue >= 0 && numberValue <= 10)) {
            setText(value)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="rate-student-modal-title"
            aria-describedby="rate-student-modal-description"
        >
            <Box sx={style}>
                <Typography id="rate-student-modal-title" variant="h6" component="h2" style={{ color: '#5b4636' }}>
                    Rate Student
                </Typography>
                <div id="rate-student-modal-description" style={{ marginTop: '16px' }}>
                    {student ? (
                        <Typography variant="body1" style={{ marginBottom: '16px' }}>
                            Student: {student.name} {student.surname}
                        </Typography>
                    ) : (
                        <Typography variant="body1" style={{ marginBottom: '16px' }}>
                            No student selected
                        </Typography>
                    )}
                    <TextField
                        placeholder="Rate (0-10)"
                        required
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        value={text}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '16px' }}
                    />
                    <div>
                        <h5
                            style={{
                                color: (
                                    +text < 4 ? '#ff0000' :
                                        +text >= 4 && +text < 7 ? '#ffcc00' :
                                            +text >= 7 && +text <= 8 ? '#66cc66' :
                                                +text > 8 ? '#0066cc' :
                                                    '#5b4636'
                                ),
                                fontSize: '16px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}>
                            {
                                +text < 4 ?
                                    "Անբավարար" :
                                    +text >= 4 && +text < 7 ?
                                        "բավարար" :
                                        +text >= 7 && +text <= 8 ?
                                            "լավ" :
                                            "գերազանց"
                            }
                        </h5>
                    </div>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: '#ff8c00', color: '#fff' }}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
