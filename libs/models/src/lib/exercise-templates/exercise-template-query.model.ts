import { MusclesInvolved } from "./muscles-involved.model"

export interface ExerciseTemplateQuery {
    filters: ExerciseTemplateQueryFilters
}

export interface ExerciseTemplateQueryFilters {
    byName: string
    byMuscles: MusclesInvolved[]
}