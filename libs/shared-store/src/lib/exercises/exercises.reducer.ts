import { createReducer, on } from "@ngrx/store"
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { ExercisesState } from "./models/exercisesState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";

export const EXERCISES_FEATURE_KEY = 'exercises'; 

export const exercisesReducer = createReducer(
    exercisesInitialState,
    on(
        setAnonymousUser, 
        setAuthenticatedUser,
        (state: ExercisesState) => {
        //clear exercises if user is setted
        return {
            ...exercisesInitialState
        }
    }),
    on(
        getAnonymousUserExercisesRequestSuccess,
        getAuthenticatedUserExercisesRequestSuccess, (state: ExercisesState, { exercises }) => {
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