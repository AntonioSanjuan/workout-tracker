import { createReducer, on } from "@ngrx/store"
import { trainingsInitialState } from "./models/trainingsState.initialState";
import { TrainingsState } from "./models/trainingsState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { Training, TrainingQueryFilters } from "@workout-tracker/models";
import { addAnonymousUserTrainingRequestSuccess, addAuthenticatedUserTrainingRequestSuccess, clearTrainingQueryFilter, getAnonymousUserTrainingsRequestSuccess, getAuthenticatedUserTrainingsRequestSuccess, setTrainingExerciseTemplateNameQueryFilter } from "./trainings.actions";

export const TRAININGS_FEATURE_KEY = 'trainings'; 

export const trainingsReducer = createReducer(
    trainingsInitialState,
    on(
        setAnonymousUser, 
        setAuthenticatedUser,
        (state: TrainingsState) => {
        //clear exercises if user is setted
        return {
            ...trainingsInitialState
        }
    }),
    on(
        getAnonymousUserTrainingsRequestSuccess,
        getAuthenticatedUserTrainingsRequestSuccess, (state: TrainingsState, { trainings }) => {
        return {
            ...state, 
            list: trainings,
            filtered: trainings
        }
    }),
    on(setTrainingExerciseTemplateNameQueryFilter, (state: TrainingsState, { trainingExerciseTemplateName: trainingName }) => {
        const newFilters = {
            ...state.query.filters,
            byTemplateName: trainingName
        }
        return {
            ...state, 
            query: {
                ...state.query,
                filters: {...newFilters}
            },
            filtered: filterTrainings(state.list, newFilters)
        }
    }),
    on(
        addAuthenticatedUserTrainingRequestSuccess,
        addAnonymousUserTrainingRequestSuccess, (state: TrainingsState, { training }) => {
        return {
            ...state, 
            list: [...state.list, training],
            filtered: filterTrainings([...state.list, training], trainingsInitialState.query.filters)
        }
    }),

    on(clearTrainingQueryFilter, (state: TrainingsState) => {
        return {
            ...state, 
            query: {
                ...state.query,
                filters: trainingsInitialState.query.filters
            },
            filtered: filterTrainings(state.list, trainingsInitialState.query.filters)
        }
    }),
)

const filterTrainings = (trainings: Training[], filters: TrainingQueryFilters): Training[] => {
    let filteredTrainings: Training[] = []

    // filter by template name
    filteredTrainings =  trainings.filter((exercise) => exercise.trainingExercises?.map((trainingExercise) => trainingExercise.exerciseTemplate.name).includes(filters.byTemplateName))

    return [...filteredTrainings];
}