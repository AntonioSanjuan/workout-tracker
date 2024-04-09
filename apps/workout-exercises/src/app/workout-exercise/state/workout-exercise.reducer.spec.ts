import { ExerciseTemplate } from "@workout-tracker/models";
import { initialWorkoutExerciseDetailsState, workoutExerciseDetailsReducer } from "./workout-exercise.reducer";
import { getAnonymousUserExerciseDetailsRequestSuccess, getAuthenticatedUserExerciseDetailsRequestSuccess } from "./workout-exercise.actions";

describe('workoutExerciseDetailsReducer', () => {
    describe('getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as ExerciseTemplate;
        it('should handle getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
            const action = getAuthenticatedUserExerciseDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutExerciseDetailsReducer(initialWorkoutExerciseDetailsState, action)

            expect(state.details.exercise).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as ExerciseTemplate;
        it('should handle getAnonymousUserExerciseDetailsRequestSuccess action', () => {
            const action = getAnonymousUserExerciseDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutExerciseDetailsReducer(initialWorkoutExerciseDetailsState, action)

            expect(state.details.exercise).toEqual(exerciseSut)
        })
    })
})