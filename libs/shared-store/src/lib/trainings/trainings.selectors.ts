import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TRAININGS_FEATURE_KEY } from './trainings.reducer'
import { TrainingsState } from './models/trainingsState.model'


export const getTrainingsState = createFeatureSelector<TrainingsState>(TRAININGS_FEATURE_KEY)
export const getTrainingsList = createSelector(getTrainingsState, (state: TrainingsState) => state.list)
export const getTrainingsFiltered = createSelector(getTrainingsState, (state: TrainingsState) => state.filtered)
export const getTrainingsFilters = createSelector(getTrainingsState, (state: TrainingsState) => state.query.filters)

//exerciseDetails
export const getTrainingById = (trainingId: string) => createSelector(getTrainingsState, (state: TrainingsState) => state.list.find((training) => training.id === trainingId));
