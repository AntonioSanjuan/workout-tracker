import { Training, TrainingExercise, TrainingExerciseSerie } from "@workout-tracker/models";
import { initialWorkoutTrainingExerciseState, workoutTrainingExerciseReducer } from "./workout-training-exercise.reducer";
import { addAnonymousUserTrainingExerciseSerieRequestSuccess, addAuthenticatedUserTrainingExerciseSerieRequestSuccess, getAnonymousUserTrainingExerciseRequestSuccess, getAuthenticatedUserTrainingExerciseRequestSuccess, getUserTrainingExerciseRequest } from "./workout-training-exercise.actions";

describe('workoutTrainingExerciseReducer', () => {
    describe('getUserTrainingExerciseRequest action', () => {
        const trainingIdSut = "trainingIdTest";
        const trainingExerciseIDSut = "trainingExerciseIdTest";
        it('should handle getUserTrainingExerciseRequest action', () => {
            const action = getUserTrainingExerciseRequest({ trainingId: trainingIdSut, trainingExerciseId: trainingExerciseIDSut })
            const state = workoutTrainingExerciseReducer(initialWorkoutTrainingExerciseState, action)

            expect(state).toEqual(initialWorkoutTrainingExerciseState)
        })
    })
    describe('getAuthenticatedUserTrainingDetailsRequestSuccess action', () => {
        const trainingIdSut = "trainingIdTest";
        const trainingExerciseSut = { id: 'idTest' } as TrainingExercise;
        it('should handle getAuthenticatedUserTrainingExerciseRequestSuccess action', () => {
            const action = getAuthenticatedUserTrainingExerciseRequestSuccess({ trainingId: trainingIdSut, trainingExercise: trainingExerciseSut })
            const state = workoutTrainingExerciseReducer(initialWorkoutTrainingExerciseState, action)

            expect(state.trainingId).toEqual(trainingIdSut)
            expect(state.trainingExercise).toEqual(trainingExerciseSut)
        })
    })

    describe('getAnonymousUserTrainingDetailsRequestSuccess action', () => {
        const trainingIdSut = "trainingIdTest";
        const trainingExerciseSut = { id: 'idTest' } as TrainingExercise;
        it('should handle getAnonymousUserTrainingExerciseRequestSuccess action', () => {
            const action = getAnonymousUserTrainingExerciseRequestSuccess({ trainingId: trainingIdSut, trainingExercise: trainingExerciseSut })
            const state = workoutTrainingExerciseReducer(initialWorkoutTrainingExerciseState, action)

            expect(state.trainingId).toEqual(trainingIdSut)
            expect(state.trainingExercise).toEqual(trainingExerciseSut)
        })
    })
    describe('addAuthenticatedUserTrainingExerciseSerieRequestSuccess action', () => {
        const trainingExerciseSerieSut = { id: 'idTest' } as TrainingExerciseSerie;
        it('should handle addAuthenticatedUserTrainingExerciseSerieRequestSuccess action', () => {
            const action = addAuthenticatedUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerieSut })
            const state = workoutTrainingExerciseReducer(initialWorkoutTrainingExerciseState, action)

            expect(state.trainingId).toEqual(state.trainingId)
            expect(state.trainingExercise?.series).toEqual([trainingExerciseSerieSut])
        })
    })
    describe('addAnonymousUserTrainingExerciseSerieRequestSuccess action', () => {
        const trainingExerciseSerieSut = { id: 'idTest' } as TrainingExerciseSerie;
        it('should handle addAnonymousUserTrainingExerciseSerieRequestSuccess action', () => {
            const action = addAnonymousUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerieSut })
            const state = workoutTrainingExerciseReducer(initialWorkoutTrainingExerciseState, action)

            expect(state.trainingId).toEqual(state.trainingId)
            expect(state.trainingExercise?.series).toEqual([trainingExerciseSerieSut])
        })
    })
})