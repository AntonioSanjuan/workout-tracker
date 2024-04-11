import { createReducer, on } from "@ngrx/store"
import { trainingsListInitialState } from "./models/trainingsListState.initialState";
import { TrainingsListState } from "./models/trainingsListState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { updateAnonymousUserTrainingListRequestSuccess, updateAuthenticatedUserTrainingListRequestSuccess, clearTrainingListQueryFilter, getAnonymousUserTrainingsListRequestSuccess, getAuthenticatedUserTrainingsListRequestSuccess, setTrainingListQueryFilter, addAuthenticatedUserTrainingListRequestSuccess, addAnonymousUserTrainingListRequestSuccess } from "./trainings-list.actions";

export const TRAININGS_LIST_FEATURE_KEY = 'trainings-list'; 

export const trainingsListReducer = createReducer(
    trainingsListInitialState,
    on(
        setAnonymousUser, 
        setAuthenticatedUser,
        (state: TrainingsListState) => {
        //clear exercises if user is setted
        return {
            ...trainingsListInitialState
        }
    }),
    on(
        getAuthenticatedUserTrainingsListRequestSuccess, (state: TrainingsListState, { trainings }) => {
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
        getAnonymousUserTrainingsListRequestSuccess, (state: TrainingsListState, { trainings }) => {
        return {
            ...state, 
            list: [...trainings ],
            query: {
                ...state.query,
                pagination: {
                    ...state.query.pagination,
                    moreElements: false,
                    lastElement: undefined
                }
            }
        }
    }),
    on(
        setTrainingListQueryFilter, (state: TrainingsListState, { filters }) => {
        return {
            ...state, 
            list: [],
            query: {
                ...state.query,
                pagination: {
                    ...trainingsListInitialState.query.pagination
                },
                filters: {
                    ...state.query.filters,
                    ...filters
                }
            }
        }
    }),
    on(
        addAuthenticatedUserTrainingListRequestSuccess,
        addAnonymousUserTrainingListRequestSuccess, (state: TrainingsListState, { training }) => {
        return {
            ...state, 
            list: [training, ...state.list ],
        }
    }),

    on(
        updateAuthenticatedUserTrainingListRequestSuccess,
        updateAnonymousUserTrainingListRequestSuccess, (state: TrainingsListState, { training }) => {
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
    on(clearTrainingListQueryFilter, (state: TrainingsListState) => {
        return {
            ...state, 
            list: [],
            query: {
                ...state.query,
                filters: trainingsListInitialState.query.filters,
                pagination: {
                    ...trainingsListInitialState.query.pagination
                },
            },

        }
    }),
)