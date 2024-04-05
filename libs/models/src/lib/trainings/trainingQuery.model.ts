import { MuscleGroups } from "../exercise-templates"
import { Pagination } from "../pagination/pagination.model"
import { Training } from "./training.model"

export interface TrainingQuery {
    filters: TrainingQueryFilters,
    pagination: Pagination<Training>
}

export interface TrainingQueryFilters {
    betweenDates?: TrainingQueryFilterBetweenDates
    muscleGroups: MuscleGroups[]
}

export interface TrainingQueryFilterBetweenDates {
    fromDate: Date,
    toDate: Date
}