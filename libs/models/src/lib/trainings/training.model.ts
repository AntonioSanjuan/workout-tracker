import { ExerciseTemplate, MuscleGroups } from "../exercise-templates"

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

    exerciseTemplate: ExerciseTemplate
    series: TrainingExerciseSerie[]

    creationDate: Date
}

export interface TrainingExerciseSerie {
    id: string
 
    data: TrainingExerciseSerieData
    observations?: string,

    creationDate: Date
}

export type TrainingExerciseSerieData = StrengthTypeData | CardiovascularTypeData

export interface StrengthTypeData {
    weight: number,
    repetitions: number,
}

export interface CardiovascularTypeData {
    speed: number,
    duration: number,
}