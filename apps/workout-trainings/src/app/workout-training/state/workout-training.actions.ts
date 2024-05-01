import { createAction, props } from '@ngrx/store';
import { Training, TrainingExercise } from '@workout-tracker/models';

export const GET_USER_TRAINING_REQUEST = 'GET USER TRAINING'
export const getUserTrainingRequest = createAction(GET_USER_TRAINING_REQUEST, props<{ trainingId: string}>())
export const GET_AUTHENTICATED_USER_TRAINING_REQUEST = 'GET AUTHENTICATED USER TRAINING Request'
export const getAuthenticatedUserTrainingRequest = createAction(GET_AUTHENTICATED_USER_TRAINING_REQUEST, props<{ trainingId: string}>())
export const GET_AUTHENTICATED_USER_TRAINING_SUCCESS = 'GET AUTHENTICATED USER TRAINING Success'
export const getAuthenticatedUserTrainingRequestSuccess = createAction(GET_AUTHENTICATED_USER_TRAINING_SUCCESS, props<{ training: Training}>())
export const GET_AUTHENTICATED_USER_TRAINING_ERROR   = 'GET AUTHENTICATED USER TRAINING Error'
export const getAuthenticatedUserTrainingRequestError = createAction(GET_AUTHENTICATED_USER_TRAINING_ERROR, props<{ trainingId: string}>())
export const GET_ANONYMOUS_USER_TRAINING_REQUEST = 'GET ANONYMOUS USER TRAINING Request'
export const getAnonymousUserTrainingRequest = createAction(GET_ANONYMOUS_USER_TRAINING_REQUEST, props<{ trainingId: string}>())
export const GET_ANONYMOUS_USER_TRAINING_SUCCESS = 'GET ANONYMOUS USER TRAINING Success'
export const getAnonymousUserTrainingRequestSuccess = createAction(GET_ANONYMOUS_USER_TRAINING_SUCCESS, props<{ training: Training}>())
export const GET_ANONYMOUS_USER_TRAINING_ERROR   = 'GET ANONYMOUS USER TRAINING Error'
export const getAnonymousUserTrainingRequestError = createAction(GET_ANONYMOUS_USER_TRAINING_ERROR, props<{ trainingId: string}>())

export const ADD_USER_TRAINING_EXERCISE_REQUEST = 'ADD USER TRAINING EXERCISE'
export const addUserTrainingExerciseRequest = createAction(ADD_USER_TRAINING_EXERCISE_REQUEST, props<{ trainingExercise: TrainingExercise }>())
export const ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_REQUEST = 'ADD AUTHENTICATED USER TRAINING EXERCISE Request'
export const addAuthenticatedUserTrainingExerciseRequest = createAction(ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_REQUEST, props<{ trainingExercise: TrainingExercise }>())
export const ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SUCCESS = 'ADD AUTHENTICATED USER TRAINING EXERCISE Success'
export const addAuthenticatedUserTrainingExerciseRequestSuccess = createAction(ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SUCCESS, props<{ trainingExercise: TrainingExercise }>())
export const ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_ERROR   = 'ADD AUTHENTICATED USER TRAINING EXERCISE Error'
export const addAuthenticatedUserTrainingExerciseRequestError = createAction(ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_ERROR)
export const ADD_ANONYMOUS_USER_TRAINING_EXERCISE_REQUEST = 'ADD ANONYMOUS USER TRAINING EXERCISE Request'
export const addAnonymousUserTrainingExerciseRequest = createAction(ADD_ANONYMOUS_USER_TRAINING_EXERCISE_REQUEST, props<{ trainingExercise: TrainingExercise }>())
export const ADD_ANONYMOUS_USER_TRAINING_EXERCISE_SUCCESS = 'ADD ANONYMOUS USER TRAINING EXERCISE Success'
export const addAnonymousUserTrainingExerciseRequestSuccess = createAction(ADD_ANONYMOUS_USER_TRAINING_EXERCISE_SUCCESS, props<{ trainingExercise: TrainingExercise }>())
export const ADD_ANONYMOUS_USER_TRAINING_EXERCISE_ERROR   = 'ADD ANONYMOUS USER TRAINING EXERCISE Error'
export const addAnonymousUserTrainingExerciseRequestError = createAction(ADD_ANONYMOUS_USER_TRAINING_EXERCISE_ERROR)