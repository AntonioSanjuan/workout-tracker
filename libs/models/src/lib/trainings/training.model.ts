import { Exercise } from "../exercises"

export interface Training {
    id: string
    observations?: string
    trainingExercises?: TrainingExercise[]

    creationDate: Date
    finishDate?: Date
}

export interface TrainingExercise {
    id: string
    exercise: Exercise
    series: TrainingExerciseSerie[]
}

export interface TrainingExerciseSerie {
    id: string
    weight: number,
    repetitions: number,
    observations?: string
}