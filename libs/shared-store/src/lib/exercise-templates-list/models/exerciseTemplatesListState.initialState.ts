import { ExerciseTemplatesListState } from "./exerciseTemplatesListState.model";

export const exerciseTemplatesListInitialState: ExerciseTemplatesListState =  {
    list: [],
    filtered: [],
    query: {
        filters: {
            byName: '',
            byMuscles: []
        }
    }
}