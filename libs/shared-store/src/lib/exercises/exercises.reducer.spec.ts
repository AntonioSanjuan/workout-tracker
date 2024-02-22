import { Exercise, ExerciseQuery, ExerciseQueryFilters, ExerciseType } from "@workout-tracker/models";
import { getExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { exercisesReducer } from "./exercises.reducer";
import { exerciseInitialState } from "./models/exerciseState.initialState";
import { ExerciseState } from "./models/exerciseState.model";

describe('exercisesReducer', () => {
    describe('getExercisesRequestSuccess action', () => {
        it('should handle getExercisesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as Exercise]
            const action = getExercisesRequestSuccess({ exercises: exerciseSut })
            const state = exercisesReducer(exerciseInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('updateExercisesQueryFilters action', () => {
        const exerciseInitialStateMock = {
            ...exerciseInitialState,
            list: [ 
                { name: 'testName', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Leg } as Exercise,
                { name: 'testName1', type: ExerciseType.Chest } as Exercise,
            ]
        } as ExerciseState

        it('should handle updateExercisesQueryFilters action with one ExerciseType', () => {
            const exerciseQueryFilterSut = {
                byTypes: [ ExerciseType.Arms ]
            } as ExerciseQueryFilters
            
            const action = updateExercisesQueryFilters({ filters: exerciseQueryFilterSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.query.filters).toEqual(exerciseQueryFilterSut)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) => exerciseQueryFilterSut.byTypes.includes(exerciseListInitial.type)))
        })

        
        it('should handle updateExercisesQueryFilters action with one ExerciseType', () => {
            const exerciseQueryFilterSut = {
                byTypes: [ ExerciseType.Arms, ExerciseType.Chest ]
            } as ExerciseQueryFilters
            
            const action = updateExercisesQueryFilters({ filters: exerciseQueryFilterSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.query.filters).toEqual(exerciseQueryFilterSut)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) => exerciseQueryFilterSut.byTypes.includes(exerciseListInitial.type)))
        })
    })
})