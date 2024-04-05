import { createReducer, on } from "@ngrx/store"
import { exerciseTemplatesInitialState } from "./models/exerciseTemplatesState.initialState";
import { addAnonymousUserExerciseTemplateRequestSuccess, addAuthenticatedUserExerciseTemplateRequestSuccess, clearExerciseTemplateQueryFilter, getAnonymousUserExerciseTemplatesRequestSuccess, getAuthenticatedUserExerciseTemplatesRequestSuccess, setExerciseTemplateNameQueryFilter, setExerciseTemplateMuscleInvolvedQueryFilter } from "./exercise-templates.actions";
import { ExerciseTemplatesState } from "./models/exerciseTemplatesState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { ExerciseTemplate, ExerciseTemplateQueryFilters, MusclesInvolved } from "@workout-tracker/models";

export const EXERCISE_TEMPLATES_FEATURE_KEY = 'exercise-templates'; 

export const exerciseTemplatesReducer = createReducer(
    exerciseTemplatesInitialState,
    on(
        setAnonymousUser, 
        setAuthenticatedUser,
        (state: ExerciseTemplatesState) => {
        //clear exercises if user is setted
        return {
            ...exerciseTemplatesInitialState
        }
    }),
    on(
        getAnonymousUserExerciseTemplatesRequestSuccess,
        getAuthenticatedUserExerciseTemplatesRequestSuccess, (state: ExerciseTemplatesState, { exercises }) => {
        return {
            ...state, 
            list: exercises,
            filtered: exercises
        }
    }),
    on(setExerciseTemplateMuscleInvolvedQueryFilter, (state: ExerciseTemplatesState, { muscleInvolved: muscleInvolved }) => {
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
    on(setExerciseTemplateNameQueryFilter, (state: ExerciseTemplatesState, { exerciseName }) => {
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
        addAuthenticatedUserExerciseTemplateRequestSuccess,
        addAnonymousUserExerciseTemplateRequestSuccess, (state: ExerciseTemplatesState, { exercise }) => {
        return {
            ...state, 
            list: [...state.list, exercise],
            filtered: filterExercises([...state.list, exercise], exerciseTemplatesInitialState.query.filters)
        }
    }),

    on(clearExerciseTemplateQueryFilter, (state: ExerciseTemplatesState) => {
        return {
            ...state, 
            query: {
                ...state.query,
                filters: exerciseTemplatesInitialState.query.filters
            },
            filtered: filterExercises(state.list, exerciseTemplatesInitialState.query.filters)
        }
    }),
)

const filterExercises = (exercises: ExerciseTemplate[], filters: ExerciseTemplateQueryFilters): ExerciseTemplate[] => {
    let filteredExercises: ExerciseTemplate[] = []

    //filter by name
    filteredExercises =  exercises.filter((exercise) => exercise.name.includes(filters.byName))

    //filter by type
    if(filters.byMuscles.length > 0) {
        filteredExercises = filteredExercises.filter((exercise) => filters.byMuscles.some((muscleInvolved: MusclesInvolved) => exercise.musclesInvolved.includes(muscleInvolved)))
    }

    return filteredExercises;
}