import { Exercise, ExerciseQueryFilters, ExerciseType } from "@workout-tracker/models";
import { clearExerciseQueryFilter, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequestSuccess, setExerciseTypeQueryFilter } from "./exercises.actions";
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
                { name: 'testName1', type: ExerciseType.Legs } as Exercise,
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
                { name: 'testName1', type: ExerciseType.Legs } as Exercise,
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

    describe('clearExerciseQueryFilter action', () => {
        it('should handle clearExerciseQueryFilter action', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: [ 
                    { name: 'testName', type: ExerciseType.Arms } as Exercise,
                    { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                    { name: 'testName1', type: ExerciseType.Legs } as Exercise,
                    { name: 'testName1', type: ExerciseType.Chest } as Exercise,
                ],
                query: {
                    ...exercisesInitialState.query,
                    filters: {
                        ...exercisesInitialState.query.filters,
                        byTypes: [ExerciseType.Arms]
                    }
                }
            } as ExercisesState

            const action = clearExerciseQueryFilter()
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual(exerciseInitialStateMock.list)
            expect(state.query.filters).toEqual(exercisesInitialState.query.filters)
        })
    })


    describe('setExerciseTypeQueryFilter action', () => {
        it('should handle setExerciseTypeQueryFilter action adding new one ExerciseType', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: [ 
                    { name: 'testName', type: ExerciseType.Arms } as Exercise,
                    { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                    { name: 'testName1', type: ExerciseType.Legs } as Exercise,
                    { name: 'testName1', type: ExerciseType.Chest } as Exercise,
                ]
            } as ExercisesState

            const exerciseTypeSut = ExerciseType.Arms
            
            const action = setExerciseTypeQueryFilter({ exerciseType: exerciseTypeSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            const expectedByTypes = [exerciseTypeSut]
            expect(state.query.filters.byTypes).toEqual(expectedByTypes)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) => [exerciseTypeSut].includes(exerciseListInitial.type)))
        })

        
        it('should handle updateExercisesQueryFilters action adding new ExerciseType to existing byType filters', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: [ 
                    { name: 'testName', type: ExerciseType.Arms } as Exercise,
                    { name: 'testName1', type: ExerciseType.Arms } as Exercise,
                    { name: 'testName1', type: ExerciseType.Legs } as Exercise,
                    { name: 'testName1', type: ExerciseType.Chest } as Exercise,
                ],
                query: {
                    ...exercisesInitialState.query,
                    filters: {
                        ...exercisesInitialState.query.filters,
                        byTypes: [ExerciseType.Arms]
                    }
                }
            } as ExercisesState

            const exerciseTypeSut = ExerciseType.Chest

            
            const action = setExerciseTypeQueryFilter({ exerciseType: exerciseTypeSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            const expectedByTypes = [...exerciseInitialStateMock.query.filters.byTypes, exerciseTypeSut]
            expect(state.query.filters.byTypes).toEqual(expectedByTypes)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) => expectedByTypes.includes(exerciseListInitial.type)))
        })
    })
})