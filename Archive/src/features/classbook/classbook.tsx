import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect, useState } from 'react'
import { getAllStudents } from '../students/students.slice'
import { getLessons } from './classbook.slice'
import styles from './classbook.module.css'
import { AddLesson } from '../../utils/add-lesson'
import { RateStudent } from '../../utils/rate-student'
import { IStudent } from '../students/types'
import { AddStudent } from '../../utils/add-student'
import { Button } from '@mui/material'

export const ClassBook = () => {
    const students = useAppSelector(state => state.students.list)
    const lessons = useAppSelector(state => state.classbook.lessons)
    const dispatch = useAppDispatch()

    const [openRate, setOpenRate] = useState(false)
    const [openStud, setOpenStud] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null)
    const [selectedLessonId, setSelectedLessonId] = useState<string>('')

    const empty = new Array(16 - lessons.length).fill(null)

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getLessons())
    }, [dispatch])

    const handleRate = (student: IStudent, lessonId: string) => {
        const lesson = lessons.find(l => l.id === lessonId)
        const ratingExists = lesson?.ratings.some(r => r.student === student.id)

        if (!ratingExists) {
            setSelectedStudent(student)
            setSelectedLessonId(lessonId)
            setOpenRate(true)
        }
    }

    const handleCloseRate = () => {
        setOpenRate(false)
        setSelectedStudent(null)
        setSelectedLessonId('')
    }
    const handleCloseStud = () => {
        setOpenStud(false)
    }

    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.heading}>Classbook</h3>
                <div className={styles.headerActions}>
                    <Link to={'/students'} className={styles.link}>Students</Link>
                    <Button
                        onClick={() => setOpenStud(true)}
                        className={styles.addStudentButton}
                    >
                        <img
                            src="https://static.thenounproject.com/png/2960708-200.png"
                            alt="Add student"
                            className={styles.addStudentImage}
                        />
                    </Button>
                </div>
            </div>
            <AddLesson />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th rowSpan={2}>student</th>
                        <th colSpan={16}>lessons</th>
                    </tr>
                    <tr>
                        {
                            lessons.map(lesson =>
                                <td className={styles.vertical} key={lesson.id}>{lesson.title}</td>
                            )
                        }
                        {
                            empty.map((_, index) =>
                                <th key={index}></th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student =>
                            <tr key={student.id}>
                                <td>{student.name} {student.surname}</td>
                                {
                                    lessons.map(lesson => {
                                        const found = lesson.ratings.find(r => r.student === student.id)
                                        return (
                                            <td
                                                key={lesson.id}
                                                onClick={() => handleRate(student, lesson.id)}
                                            >
                                                {found?.rate}
                                            </td>
                                        )
                                    })
                                }
                                {
                                    empty.map((_, index) => <td key={index}></td>)
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <AddStudent
                open={openStud}
                onClose={handleCloseStud}
            />

            <RateStudent
                open={openRate}
                onClose={handleCloseRate}
                student={selectedStudent}
                lessonId={selectedLessonId}
            />
        </>
    )
}
