import { createReducer, on } from "@ngrx/store"
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { addAnonymousUserExerciseRequestSuccess, addAuthenticatedUserExerciseRequestSuccess, clearExerciseQueryFilter, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequestSuccess, setExerciseNameQueryFilter, setExerciseTypeQueryFilter } from "./exercises.actions";
import { ExercisesState } from "./models/exercisesState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { Exercise, ExerciseQueryFilters, ExerciseType } from "@workout-tracker/models";

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
    on(setExerciseTypeQueryFilter, (state: ExercisesState, { exerciseType }) => {
        const newFilters = {
            ...state.query.filters,
            byTypes: state.query.filters.byTypes.includes(exerciseType) ? state.query.filters.byTypes.filter((byType) => byType !== exerciseType) : [...state.query.filters.byTypes, exerciseType]
        }
        return {
            ...state, 
            query: {
                ...state.query,
                filters: {...newFilters}
            },
            filtered: filterExercises(state.list, newFilters)
        }
    }),
    on(setExerciseNameQueryFilter, (state: ExercisesState, { exerciseName }) => {
        const newFilters = {
            ...state.query.filters,
            byName: exerciseName
        }
        return {
            ...state, 
            query: {
                ...state.query,
                filters: {...newFilters}
            },
            filtered: filterExercises(state.list, newFilters)
        }
    }),
    on(
        addAuthenticatedUserExerciseRequestSuccess,
        addAnonymousUserExerciseRequestSuccess, (state: ExercisesState, { exercise }) => {
        return {
            ...state, 
            list: [...state.list, exercise],
            filtered: filterExercises([...state.list, exercise], exercisesInitialState.query.filters)
        }
    }),

    on(clearExerciseQueryFilter, (state: ExercisesState) => {
        return {
            ...state, 
            query: {
                ...state.query,
                filters: exercisesInitialState.query.filters
            },
            filtered: filterExercises(state.list, exercisesInitialState.query.filters)
        }
    }),
)

const filterExercises = (exercises: Exercise[], filters: ExerciseQueryFilters): Exercise[] => {
    let filteredExercises: Exercise[] = []

    //filter by name
    filteredExercises =  exercises.filter((exercise) => exercise.name.includes(filters.byName))

    //filter by type
    if(filters.byTypes.length > 0) {
        filteredExercises = filteredExercises.filter((exercise) => filters.byTypes.some((type: ExerciseType) => exercise.types.includes(type)))
    }

    return filteredExercises;
}