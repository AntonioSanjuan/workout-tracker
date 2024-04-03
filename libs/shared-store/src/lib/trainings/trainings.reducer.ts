import { createReducer, on } from "@ngrx/store"
import { trainingsInitialState } from "./models/trainingsState.initialState";
import { TrainingsState } from "./models/trainingsState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { updateAnonymousUserTrainingRequestSuccess, updateAuthenticatedUserTrainingRequestSuccess, clearTrainingQueryFilter, getAnonymousUserTrainingsRequestSuccess, getAuthenticatedUserTrainingsRequestSuccess, setTrainingQueryFilter, addAuthenticatedUserTrainingRequestSuccess, addAnonymousUserTrainingRequestSuccess } from "./trainings.actions";

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
            list: [...state.list, ...trainings ],
            query: {
                ...state.query,
                pagination: {
                    ...state.query.pagination,
                    moreElements: trainings.length === state.query.pagination.pageElements,
                    lastElement: trainings[trainings.length - 1]
                }
            }
        }
    }),
    on(
        setTrainingQueryFilter, (state: TrainingsState, { filters }) => {
        return {
            ...state, 
            list: [],
            query: {
                ...state.query,
                pagination: {
                    ...trainingsInitialState.query.pagination
                },
                filters: {
                    ...state.query.filters,
                    ...filters
                }
            }
        }
    }),
    on(
        addAuthenticatedUserTrainingRequestSuccess,
        addAnonymousUserTrainingRequestSuccess, (state: TrainingsState, { training }) => {
        return {
            ...state, 
            list: [training, ...state.list ],
        }
    }),

    on(
        updateAuthenticatedUserTrainingRequestSuccess,
        updateAnonymousUserTrainingRequestSuccess, (state: TrainingsState, { training }) => {
        const replaceElIndex = [...state.list].findIndex((trainingListEl) => trainingListEl.id === training.id)
        const newList = [...state.list];

        if(replaceElIndex !== -1) {
            newList.splice(replaceElIndex, 1, {...training})
        }
        return {
            ...state, 
            list: [...newList],
        }
    }),
    on(clearTrainingQueryFilter, (state: TrainingsState) => {
        return {
            ...state, 
            query: {
                ...state.query,
                filters: trainingsInitialState.query.filters
            },
        }
    }),
)