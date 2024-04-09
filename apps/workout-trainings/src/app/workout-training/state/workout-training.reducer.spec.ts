import { ExerciseTemplate } from "@workout-tracker/models";
import { workoutTrainingDetailsReducer } from "./workout-training.reducer";

describe('workoutExerciseDetailsReducer', () => {
    describe('getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as ExerciseTemplate;
        it('should handle getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
            const action = getAuthenticatedUserExerciseDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutTrainingDetailsReducer(initialWorkoutExerciseDetailsState, action)

            expect(state.details.training).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as ExerciseTemplate;
        it('should handle getAnonymousUserExerciseDetailsRequestSuccess action', () => {
            const action = getAnonymousUserExerciseDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutTrainingDetailsReducer(initialWorkoutExerciseDetailsState, action)

            expect(state.details.training).toEqual(exerciseSut)
        })
    })
})