import { ExerciseTemplate, ExerciseTemplateQuery } from "@workout-tracker/models";

export interface ExerciseTemplatesState {
    list: ExerciseTemplate[],
    filtered: ExerciseTemplate[]
    query: ExerciseTemplateQuery,
}