import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TRAININGS_LIST_FEATURE_KEY } from './trainings-list.reducer'
import { TrainingsListState } from './models/trainingsListState.model'
import { WorkoutTrainingState, selectWorkoutTrainingFeature } from '../workout-training'

export const getTrainingsListState = createSelector(
    selectWorkoutTrainingFeature,
    (state: WorkoutTrainingState) => state[TRAININGS_LIST_FEATURE_KEY]
)
// export const getTrainingsState = createFeatureSelector<TrainingsState>(TRAININGS_FEATURE_KEY)
export const getTrainingsList = createSelector(getTrainingsListState, (state: TrainingsListState) => state.list)
export const getTrainingsListQuery = createSelector(getTrainingsListState, (state: TrainingsListState) => state.query)
export const getTrainingsListFilters = createSelector(getTrainingsListState, (state: TrainingsListState) => state.query.filters)
export const getTrainingsListPagination = createSelector(getTrainingsListState, (state: TrainingsListState) => state.query.pagination)

export const getTrainingListOngoing = createSelector(getTrainingsListState, (state: TrainingsListState) => state.list.find((training) => !training.finishDate))

//exerciseDetails
export const getTrainingById = (trainingId: string) => createSelector(getTrainingsListState, (state: TrainingsListState) => state.list.find((training) => training.id === trainingId));
