import { createReducer, on } from "@ngrx/store"
import { exerciseTemplatesListInitialState } from "./models/exerciseTemplatesListState.initialState";
import { addAnonymousUserExerciseTemplateListRequestSuccess, addAuthenticatedUserExerciseTemplateListRequestSuccess, clearExerciseTemplateListQueryFilter, getAnonymousUserExerciseTemplatesListRequestSuccess, getAuthenticatedUserExerciseTemplatesListRequestSuccess, setExerciseTemplateListNameQueryFilter, setExerciseTemplateListMuscleInvolvedQueryFilter, getUserExerciseTemplatesListRequest } from "./exercise-templates-list.actions";
import { ExerciseTemplatesListState } from "./models/exerciseTemplatesListState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { ExerciseTemplate, ExerciseTemplateQueryFilters, MusclesInvolved } from "@workout-tracker/models";

export const EXERCISE_TEMPLATES_LIST_FEATURE_KEY = 'exercise-templates-list'; 

export const exerciseTemplatesListReducer = createReducer(
    exerciseTemplatesListInitialState,
    on(
        setAnonymousUser, 
        setAuthenticatedUser,
        getUserExerciseTemplatesListRequest,
        (state: ExerciseTemplatesListState) => {
        //clear exercises if user is setted
        return {
            ...exerciseTemplatesListInitialState
        }
    }),
    on(
        getAnonymousUserExerciseTemplatesListRequestSuccess,
        getAuthenticatedUserExerciseTemplatesListRequestSuccess, (state: ExerciseTemplatesListState, { exercises }) => {
        return {
            ...state, 
            list: exercises,
            filtered: exercises
        }
    }),
    on(setExerciseTemplateListMuscleInvolvedQueryFilter, (state: ExerciseTemplatesListState, { muscleInvolved: muscleInvolved }) => {
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
    on(setExerciseTemplateListNameQueryFilter, (state: ExerciseTemplatesListState, { exerciseName }) => {
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
        addAuthenticatedUserExerciseTemplateListRequestSuccess,
        addAnonymousUserExerciseTemplateListRequestSuccess, (state: ExerciseTemplatesListState, { exercise }) => {
        return {
            ...state, 
            list: [...state.list, exercise],
            filtered: filterExercises([...state.list, exercise], exerciseTemplatesListInitialState.query.filters)
        }
    }),

    on(clearExerciseTemplateListQueryFilter, (state: ExerciseTemplatesListState) => {
        return {
            ...state, 
            query: {
                ...state.query,
                filters: exerciseTemplatesListInitialState.query.filters
            },
            filtered: filterExercises(state.list, exerciseTemplatesListInitialState.query.filters)
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