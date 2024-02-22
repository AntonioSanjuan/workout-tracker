import { Exercise, ExerciseQuery, ExerciseQueryFilters, ExerciseType } from "@workout-tracker/models";
import { getExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { exercisesReducer } from "./exercises.reducer";
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { ExercisesState } from "./models/exercisesState.model";

describe('exercisesReducer', () => {
    describe('getExercisesRequestSuccess action', () => {
        it('should handle getExercisesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as Exercise]
            const action = getExercisesRequestSuccess({ exercises: exerciseSut })
            const state = exercisesReducer(exercisesInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('updateExercisesQueryFilters action', () => {
        const exerciseInitialStateMock = {
            ...exercisesInitialState,
            list: [ 
                { name: 'testName', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Leg } as Exercise,
                { name: 'testName1', type: ExerciseType.Chest } as Exercise,
            ]
        } as ExercisesState

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