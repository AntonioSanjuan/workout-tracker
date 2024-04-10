import { ExerciseTemplate, ExerciseTemplateQuery } from "@workout-tracker/models";

export interface ExerciseTemplatesListState {
    list: ExerciseTemplate[],
    filtered: ExerciseTemplate[]
    query: ExerciseTemplateQuery,
}