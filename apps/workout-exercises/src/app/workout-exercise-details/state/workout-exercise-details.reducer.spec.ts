import { Exercise } from "@workout-tracker/models";
import { initialWorkoutExerciseDetailsState, workoutExerciseDetailsReducer } from "./workout-exercise-details.reducer";
import { getAnonymousUserExerciseDetailsRequestSuccess, getAuthenticatedUserExerciseDetailsRequestSuccess } from "./workout-exercise-details.actions";

describe('workoutExerciseDetailsReducer', () => {
    describe('getAuthenticatedUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as Exercise;
        it('should handle getPokemonByNameRequestSuccess action', () => {
            const action = getAuthenticatedUserExerciseDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutExerciseDetailsReducer(initialWorkoutExerciseDetailsState, action)

            expect(state.details.exercise).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExerciseDetailsRequestSuccess action', () => {
        const exerciseSut = { name: 'nameTest' } as Exercise;
        it('should handle getPokemonByNameRequestSuccess action', () => {
            const action = getAnonymousUserExerciseDetailsRequestSuccess({ exercise: exerciseSut})
            const state = workoutExerciseDetailsReducer(initialWorkoutExerciseDetailsState, action)

            expect(state.details.exercise).toEqual(exerciseSut)
        })
    })
})