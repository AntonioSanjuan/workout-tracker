import { ExerciseTemplate, Training } from "@workout-tracker/models";
import { initialWorkoutExerciseTemplateDetailsState, workoutExerciseTemplateDetailsReducer } from "./workout-exercise-template.reducer";
import { getAnonymousUserExerciseTemplateDetailsRequestSuccess, getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess, getUserExerciseTemplateDetailsRequest } from "./workout-exercise-template.actions";

describe('workoutExerciseDetailsReducer', () => {

    describe('getUserExerciseTemplateDetailsRequest action', () => {
        it('should handle getUserExerciseTemplateDetailsRequest action', () => {
            const action = getUserExerciseTemplateDetailsRequest({ exerciseId: ''})
            const state = workoutExerciseTemplateDetailsReducer(initialWorkoutExerciseTemplateDetailsState, action)

            expect(state.details).toEqual(initialWorkoutExerciseTemplateDetailsState.details)
        })
    })
    describe('getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as ExerciseTemplate;
        it('should handle getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
            const action = getAuthenticatedUserExerciseTemplateDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutExerciseTemplateDetailsReducer(initialWorkoutExerciseTemplateDetailsState, action)

            expect(state.details.exercise).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as ExerciseTemplate;
        it('should handle getAnonymousUserExerciseDetailsRequestSuccess action', () => {
            const action = getAnonymousUserExerciseTemplateDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutExerciseTemplateDetailsReducer(initialWorkoutExerciseTemplateDetailsState, action)

            expect(state.details.exercise).toEqual(exerciseSut)
        })
    })

    describe('getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess action', () => {
        const trainingsSut = [{ id: 'trainingTest' }] as Training[];
        it('should handle getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess action', () => {
            const action = getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess({ trainings: trainingsSut})
            const state = workoutExerciseTemplateDetailsReducer(initialWorkoutExerciseTemplateDetailsState, action)

            expect(state.details.trainings).toEqual(trainingsSut)
        })
    })

    describe('getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess action', () => {
        const trainingsSut = [{ id: 'trainingTest' }] as Training[];
        it('should handle getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess action', () => {
            const action = getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess({ trainings: trainingsSut})
            const state = workoutExerciseTemplateDetailsReducer(initialWorkoutExerciseTemplateDetailsState, action)

            expect(state.details.trainings).toEqual(trainingsSut)
        })
    })
})