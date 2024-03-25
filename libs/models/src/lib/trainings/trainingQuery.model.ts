export interface TrainingQuery {
    filters: TrainingQueryFilters
}

export interface TrainingQueryFilters {
    byTemplateName: string
}