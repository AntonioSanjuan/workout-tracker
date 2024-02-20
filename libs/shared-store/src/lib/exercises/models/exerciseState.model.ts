import { Exercise, ExerciseQuery } from "@workout-tracker/models";

export interface ExerciseState {
    list: Exercise[],
    filtered: Exercise[]
    query: ExerciseQuery,
}