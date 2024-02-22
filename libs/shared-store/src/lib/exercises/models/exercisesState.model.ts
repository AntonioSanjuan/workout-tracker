import { Exercise, ExerciseQuery } from "@workout-tracker/models";

export interface ExercisesState {
    list: Exercise[],
    filtered: Exercise[]
    query: ExerciseQuery,
}