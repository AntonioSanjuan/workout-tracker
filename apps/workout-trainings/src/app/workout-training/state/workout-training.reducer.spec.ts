import { Training } from "@workout-tracker/models";
import { initialWorkoutTrainingState, workoutTrainingReducer } from "./workout-training.reducer";
import { getAnonymousUserTrainingRequestSuccess, getAuthenticatedUserTrainingRequestSuccess } from "./workout-training.actions";

describe('workoutTrainingDetailsReducer', () => {
    describe('getAuthenticatedUserTrainingDetailsRequestSuccess action', () => {
        const trainingSut = { id: 'idTest' } as Training;
        it('should handle getAuthenticatedUserTrainingDetailsRequestSuccess action', () => {
            const action = getAuthenticatedUserTrainingRequestSuccess({ training: trainingSut})
            const state = workoutTrainingReducer(initialWorkoutTrainingState, action)

            expect(state.details.training).toEqual(trainingSut)
        })
    })

    describe('getAnonymousUserTrainingDetailsRequestSuccess action', () => {
        const trainingSut = { id: 'idTest' } as Training;
        it('should handle getAnonymousUserTrainingDetailsRequestSuccess action', () => {
            const action = getAnonymousUserTrainingRequestSuccess({ training: trainingSut})
            const state = workoutTrainingReducer(initialWorkoutTrainingState, action)

            expect(state.details.training).toEqual(trainingSut)
        })
    })
})