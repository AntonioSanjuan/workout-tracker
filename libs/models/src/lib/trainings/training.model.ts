import { Exercise, MuscleGroups } from "../exercises"

export interface Training {
    id: string
    observations?: string,
    muscleGroups: MuscleGroups[]

    trainingExercises?: TrainingExercise[]
    creationDate: Date
    finishDate?: Date
}

export interface TrainingExercise {
    id: string

    exerciseTemplate: Exercise
    series: TrainingExerciseSerie[]
}

export interface TrainingExerciseSerie {
    id: string
    weight: number,
    repetitions: number,
    observations?: string
}