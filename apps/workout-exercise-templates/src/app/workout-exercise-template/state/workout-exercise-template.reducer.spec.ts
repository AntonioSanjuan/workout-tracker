import { ExerciseTemplate } from "@workout-tracker/models";
import { initialWorkoutExerciseTemplateDetailsState, workoutExerciseTemplateDetailsReducer } from "./workout-exercise-template.reducer";
import { getAnonymousUserExerciseTemplateDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateDetailsRequestSuccess } from "./workout-exercise-template.actions";

describe('workoutExerciseDetailsReducer', () => {
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
})