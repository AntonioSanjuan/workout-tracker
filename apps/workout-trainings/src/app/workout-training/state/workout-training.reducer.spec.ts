import { Training } from "@workout-tracker/models";
import { initialWorkoutTrainingDetailsState, workoutTrainingDetailsReducer } from "./workout-training.reducer";
import { getAnonymousUserTrainingDetailsRequestSuccess, getAuthenticatedUserTrainingDetailsRequestSuccess } from "./workout-training.actions";

describe('workoutTrainingDetailsReducer', () => {
    describe('getAuthenticatedUserTrainingDetailsRequestSuccess action', () => {
        const trainingSut = { id: 'idTest' } as Training;
        it('should handle getAuthenticatedUserTrainingDetailsRequestSuccess action', () => {
            const action = getAuthenticatedUserTrainingDetailsRequestSuccess({ training: trainingSut})
            const state = workoutTrainingDetailsReducer(initialWorkoutTrainingDetailsState, action)

            expect(state.details.training).toEqual(trainingSut)
        })
    })

    describe('getAnonymousUserTrainingDetailsRequestSuccess action', () => {
        const trainingSut = { id: 'idTest' } as Training;
        it('should handle getAnonymousUserTrainingDetailsRequestSuccess action', () => {
            const action = getAnonymousUserTrainingDetailsRequestSuccess({ training: trainingSut})
            const state = workoutTrainingDetailsReducer(initialWorkoutTrainingDetailsState, action)

            expect(state.details.training).toEqual(trainingSut)
        })
    })
})