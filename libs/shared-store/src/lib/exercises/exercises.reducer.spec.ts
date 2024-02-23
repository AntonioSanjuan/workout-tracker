import { Exercise, ExerciseQueryFilters, ExerciseType } from "@workout-tracker/models";
import { getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { exercisesReducer } from "./exercises.reducer";
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { ExercisesState } from "./models/exercisesState.model";
import { setAnonymousUser } from "../user";

describe('exercisesReducer', () => {

    describe('setAnonymousUser action', () => {
        //clear exercises if anonymous user is setted
        const exerciseInitialStateMock = {
            ...exercisesInitialState,
            list: [ 
                { name: 'testName', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Leg } as Exercise,
                { name: 'testName1', type: ExerciseType.Chest } as Exercise,
            ]
        } as ExercisesState
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state).toEqual(exercisesInitialState)
        })
    })

    describe('setAuthenticatedUser action', () => {
        //clear exercises if auth user is setted
        const exerciseInitialStateMock = {
            ...exercisesInitialState,
            list: [ 
                { name: 'testName', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                { name: 'testName1', type: ExerciseType.Leg } as Exercise,
                { name: 'testName1', type: ExerciseType.Chest } as Exercise,
            ]
        } as ExercisesState
        it('should handle setAuthenticatedUser action', () => {
            const action = setAnonymousUser()
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state).toEqual(exercisesInitialState)
        })
    })

    describe('getAuthenticatedUserExercisesRequestSuccess action', () => {
        it('should handle getAuthenticatedUserExercisesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as Exercise]
            const action = getAuthenticatedUserExercisesRequestSuccess({ exercises: exerciseSut })
            const state = exercisesReducer(exercisesInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExercisesRequestSuccess action', () => {
        it('should handle getAnonymousUserExercisesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as Exercise]
            const action = getAnonymousUserExercisesRequestSuccess({ exercises: exerciseSut })
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