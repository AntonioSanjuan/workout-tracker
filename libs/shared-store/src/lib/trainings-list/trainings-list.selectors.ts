import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TRAININGS_LIST_FEATURE_KEY } from './trainings-list.reducer'
import { TrainingsListState } from './models/trainingsListState.model'

export const getTrainingsListState = createFeatureSelector<TrainingsListState>(TRAININGS_LIST_FEATURE_KEY)
export const getTrainingsList = createSelector(getTrainingsListState, (state: TrainingsListState) => state.list)
export const getTrainingsListQuery = createSelector(getTrainingsListState, (state: TrainingsListState) => state.query)
export const getTrainingsListFilters = createSelector(getTrainingsListState, (state: TrainingsListState) => state.query.filters)
export const getTrainingsListPagination = createSelector(getTrainingsListState, (state: TrainingsListState) => state.query.pagination)

export const getTrainingListOngoing = createSelector(getTrainingsListState, (state: TrainingsListState) => state.list.find((training) => !training.finishDate))

//exerciseDetails
export const getTrainingById = (trainingId: string) => createSelector(getTrainingsListState, (state: TrainingsListState) => state.list.find((training) => training.id === trainingId));
export const getTrainingsByExerciseTemplateId = (exerciseTemplateId: string) => createSelector(
    getTrainingsListState, 
    (state: TrainingsListState) => 
    state.list.filter((training) => 
        training.trainingExercises?.length && 
        training.trainingExercises.some((trainingExercise) => trainingExercise.exerciseTemplate.id === exerciseTemplateId)
    )
);
