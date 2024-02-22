import { createReducer, on } from "@ngrx/store"
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { getExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { ExercisesState } from "./models/exercisesState.model";

export const EXERCISES_FEATURE_KEY = 'exercises'; 

export const exercisesReducer = createReducer(
    exercisesInitialState,
    on(getExercisesRequestSuccess, (state: ExercisesState, { exercises }) => {
        return {
            ...state, 
            list: exercises,
            filtered: exercises
        }
    }),
    on(updateExercisesQueryFilters, (state: ExercisesState, { filters }) => {
        return {
            ...state, 
            query: {
                filters: filters
            },
            filtered: state.list.filter((exercise) => filters.byTypes.includes(exercise.type))
        }
    }),
)