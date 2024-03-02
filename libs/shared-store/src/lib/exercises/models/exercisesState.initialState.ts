import { ExercisesState } from "./exercisesState.model";

export const exercisesInitialState: ExercisesState =  {
    list: [],
    filtered: [],
    query: {
        filters: {
            byName: '',
            byMuscles: []
        }
    }
}