import { ExerciseTemplatesState } from "./exerciseTemplatesState.model";

export const exerciseTemplatesInitialState: ExerciseTemplatesState =  {
    list: [],
    filtered: [],
    query: {
        filters: {
            byName: '',
            byMuscles: []
        }
    }
}