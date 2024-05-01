import { Training } from "@workout-tracker/models";
import { initialWorkoutTrainingState, workoutTrainingReducer } from "./workout-training.reducer";
import { getAnonymousUserTrainingRequestSuccess, getAuthenticatedUserTrainingRequestSuccess, getUserTrainingRequest } from "./workout-training.actions";

describe('workoutTrainingReducer', () => {
    describe('getUserTrainingRequest action', () => {
        const trainingIdSut ='idTest'
        it('should handle getUserTrainingRequest action', () => {
            const action = getUserTrainingRequest({ trainingId: trainingIdSut})
            const state = workoutTrainingReducer(initialWorkoutTrainingState, action)

            expect(state).toEqual(initialWorkoutTrainingState)
        })
    })

    describe('getAuthenticatedUserTrainingRequestSuccess action', () => {
        const trainingSut = { id: 'idTest' } as Training;
        it('should handle getAuthenticatedUserTrainingRequestSuccess action', () => {
            const action = getAuthenticatedUserTrainingRequestSuccess({ training: trainingSut})
            const state = workoutTrainingReducer(initialWorkoutTrainingState, action)

            expect(state.training).toEqual(trainingSut)
        })
    })

    describe('getAnonymousUserTrainingRequestSuccess action', () => {
        const trainingSut = { id: 'idTest' } as Training;
        it('should handle getAnonymousUserTrainingRequestSuccess action', () => {
            const action = getAnonymousUserTrainingRequestSuccess({ training: trainingSut})
            const state = workoutTrainingReducer(initialWorkoutTrainingState, action)

            expect(state.training).toEqual(trainingSut)
        })
    })
})