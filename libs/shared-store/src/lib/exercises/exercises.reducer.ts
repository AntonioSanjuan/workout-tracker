import { createReducer, on } from "@ngrx/store"
import { exerciseInitialState } from "./models/exerciseState.initialState";
import { getExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { ExerciseState } from "./models/exerciseState.model";

export const EXERCISES_FEATURE_KEY = 'exercises'; 

export const exercisesReducer = createReducer(
    exerciseInitialState,
    on(getExercisesRequestSuccess, (state: ExerciseState, { exercises }) => {
        return {
            ...state, 
            list: exercises,
            filtered: exercises
        }
    }),
    on(updateExercisesQueryFilters, (state: ExerciseState, { filters }) => {
        return {
            ...state, 
            query: {
                filters: filters
            },
            filtered: state.list.filter((exercise) => filters.byTypes.includes(exercise.type))
        }
    }),
)