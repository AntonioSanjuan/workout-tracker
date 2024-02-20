import { ExerciseState } from "./exerciseState.model";

export const exerciseInitialState: ExerciseState =  {
    list: [],
    filtered: [],
    query: {
        filters: {
            byTypes: []
        }
    }
}