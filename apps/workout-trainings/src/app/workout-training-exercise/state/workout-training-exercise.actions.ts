import { createAction, props } from '@ngrx/store';
import { Training, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';

export const GET_USER_TRAINING_EXERCISE_REQUEST = 'GET USER TRAINING EXERCISE'
export const getUserTrainingExerciseRequest = createAction(GET_USER_TRAINING_EXERCISE_REQUEST, props<{ trainingId: string, trainingExerciseId: string}>())
export const GET_AUTHENTICATED_USER_TRAINING_EXERCISE_REQUEST = 'GET AUTHENTICATED USER TRAINING EXERCISE Request'
export const getAuthenticatedUserTrainingExerciseRequest = createAction(GET_AUTHENTICATED_USER_TRAINING_EXERCISE_REQUEST, props<{ trainingId: string, trainingExerciseId: string}>())
export const GET_AUTHENTICATED_USER_TRAINING_EXERCISE_SUCCESS = 'GET AUTHENTICATED USER TRAINING EXERCISE Success'
export const getAuthenticatedUserTrainingExerciseRequestSuccess = createAction(GET_AUTHENTICATED_USER_TRAINING_EXERCISE_SUCCESS, props<{ trainingId: string, trainingExercise: TrainingExercise}>())
export const GET_AUTHENTICATED_USER_TRAINING_EXERCISE_ERROR   = 'GET AUTHENTICATED USER TRAINING EXERCISE Error'
export const getAuthenticatedUserTrainingExerciseRequestError = createAction(GET_AUTHENTICATED_USER_TRAINING_EXERCISE_ERROR, props<{ trainingExerciseId: string}>())
export const GET_ANONYMOUS_USER_TRAINING_EXERCISE_REQUEST = 'GET ANONYMOUS USER TRAINING EXERCISE Request'
export const getAnonymousUserTrainingExerciseRequest = createAction(GET_ANONYMOUS_USER_TRAINING_EXERCISE_REQUEST, props<{ trainingId: string, trainingExerciseId: string}>())
export const GET_ANONYMOUS_USER_TRAINING_EXERCISE_SUCCESS = 'GET ANONYMOUS USER TRAINING EXERCISE Success'
export const getAnonymousUserTrainingExerciseRequestSuccess = createAction(GET_ANONYMOUS_USER_TRAINING_EXERCISE_SUCCESS, props<{ trainingId: string, trainingExercise: TrainingExercise}>())
export const GET_ANONYMOUS_USER_TRAINING_EXERCISE_ERROR   = 'GET ANONYMOUS USER TRAINING EXERCISE Error'
export const getAnonymousUserTrainingExerciseRequestError = createAction(GET_ANONYMOUS_USER_TRAINING_EXERCISE_ERROR, props<{ trainingExerciseId: string}>())

export const ADD_USER_TRAINING_EXERCISE_SERIE_REQUEST = 'ADD USER TRAINING EXERCISE SERIE'
export const addUserTrainingExerciseSerieRequest = createAction(ADD_USER_TRAINING_EXERCISE_SERIE_REQUEST, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_REQUEST = 'ADD AUTHENTICATED USER TRAINING EXERCISE SERIE Request'
export const addAuthenticatedUserTrainingExerciseSerieRequest = createAction(ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_REQUEST, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_SUCCESS = 'ADD AUTHENTICATED USER TRAINING EXERCISE SERIE Success'
export const addAuthenticatedUserTrainingExerciseSerieRequestSuccess = createAction(ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_SUCCESS, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_ERROR   = 'ADD AUTHENTICATED USER TRAINING EXERCISE SERIE Error'
export const addAuthenticatedUserTrainingExerciseSerieRequestError = createAction(ADD_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_ERROR)
export const ADD_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_REQUEST = 'ADD ANONYMOUS USER TRAINING EXERCISE SERIE Request'
export const addAnonymousUserTrainingExerciseSerieRequest = createAction(ADD_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_REQUEST, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const ADD_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_SUCCESS = 'ADD ANONYMOUS USER TRAINING EXERCISE SERIE Success'
export const addAnonymousUserTrainingExerciseSerieRequestSuccess = createAction(ADD_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_SUCCESS, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
//
export const DELETE_USER_TRAINING_EXERCISE_SERIE_REQUEST = 'DELETE USER TRAINING EXERCISE SERIE'
export const deleteUserTrainingExerciseSerieRequest = createAction(DELETE_USER_TRAINING_EXERCISE_SERIE_REQUEST, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const DELETE_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_REQUEST = 'DELETE AUTHENTICATED USER TRAINING EXERCISE SERIE Request'
export const deleteAuthenticatedUserTrainingExerciseSerieRequest = createAction(DELETE_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_REQUEST, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const DELETE_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_SUCCESS = 'DELETE AUTHENTICATED USER TRAINING EXERCISE SERIE Success'
export const deleteAuthenticatedUserTrainingExerciseSerieRequestSuccess = createAction(DELETE_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_SUCCESS, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const DELETE_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_ERROR   = 'DELETE AUTHENTICATED USER TRAINING EXERCISE SERIE Error'
export const deleteAuthenticatedUserTrainingExerciseSerieRequestError = createAction(DELETE_AUTHENTICATED_USER_TRAINING_EXERCISE_SERIE_ERROR)
export const DELETE_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_REQUEST = 'DELETE ANONYMOUS USER TRAINING EXERCISE SERIE Request'
export const deleteAnonymousUserTrainingExerciseSerieRequest = createAction(DELETE_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_REQUEST, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())
export const DELETE_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_SUCCESS = 'DELETE ANONYMOUS USER TRAINING EXERCISE SERIE Success'
export const deleteAnonymousUserTrainingExerciseSerieRequestSuccess = createAction(DELETE_ANONYMOUS_USER_TRAINING_EXERCISE_SERIE_SUCCESS, props<{ trainingExerciseSerie: TrainingExerciseSerie }>())