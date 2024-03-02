import { createReducer, on } from "@ngrx/store"
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { addAnonymousUserExerciseRequestSuccess, addAuthenticatedUserExerciseRequestSuccess, clearExerciseQueryFilter, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequestSuccess, setExerciseNameQueryFilter, setExerciseMuscleInvolvedQueryFilter } from "./exercises.actions";
import { ExercisesState } from "./models/exercisesState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { Exercise, ExerciseQueryFilters, MusclesInvolved } from "@workout-tracker/models";

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
    on(setExerciseMuscleInvolvedQueryFilter, (state: ExercisesState, { muscleInvolved: muscleInvolved }) => {
        const newFilters = {
            ...state.query.filters,
            byMuscles: state.query.filters.byMuscles.includes(muscleInvolved) ? state.query.filters.byMuscles.filter((byMuscles) => byMuscles !== muscleInvolved) : [...state.query.filters.byMuscles, muscleInvolved]
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
    if(filters.byMuscles.length > 0) {
        filteredExercises = filteredExercises.filter((exercise) => filters.byMuscles.some((muscleInvolved: MusclesInvolved) => exercise.musclesInvolved.includes(muscleInvolved)))
    }

    return filteredExercises;
}