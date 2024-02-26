import { ExerciseType } from "./exerciseTypes.model"

export interface ExerciseQuery {
    filters: ExerciseQueryFilters
}

export interface ExerciseQueryFilters {
    byName: string
    byTypes: ExerciseType[]
}