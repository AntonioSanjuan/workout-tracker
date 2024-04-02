import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TRAININGS_FEATURE_KEY } from './trainings.reducer'
import { TrainingsState } from './models/trainingsState.model'


export const getTrainingsState = createFeatureSelector<TrainingsState>(TRAININGS_FEATURE_KEY)
export const getTrainingsList = createSelector(getTrainingsState, (state: TrainingsState) => state.list)
export const getTrainingsFiltered = createSelector(getTrainingsState, (state: TrainingsState) => state.filtered)
export const getTrainingsQuery = createSelector(getTrainingsState, (state: TrainingsState) => state.query)
export const getTrainingsFilters = createSelector(getTrainingsState, (state: TrainingsState) => state.query.filters)
export const getTrainingsPagination = createSelector(getTrainingsState, (state: TrainingsState) => state.query.pagination)

export const getTrainingOngoing = createSelector(getTrainingsState, (state: TrainingsState) => state.list.find((training) => !training.finishDate))

//exerciseDetails
export const getTrainingById = (trainingId: string) => createSelector(getTrainingsState, (state: TrainingsState) => state.list.find((training) => training.id === trainingId));
