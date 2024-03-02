import { MusclesInvolved } from "./musclesInvolved.model"

export interface ExerciseQuery {
    filters: ExerciseQueryFilters
}

export interface ExerciseQueryFilters {
    byName: string
    byMuscles: MusclesInvolved[]
}