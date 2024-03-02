import { Exercise, MusclesInvolved } from "@workout-tracker/models";
import { addAnonymousUserExerciseRequestSuccess, addAuthenticatedUserExerciseRequestSuccess, clearExerciseQueryFilter, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequestSuccess, setExerciseNameQueryFilter, setExerciseMuscleInvolvedQueryFilter } from "./exercises.actions";
import { exercisesReducer } from "./exercises.reducer";
import { exercisesInitialState } from "./models/exercisesState.initialState";
import { ExercisesState } from "./models/exercisesState.model";
import { setAnonymousUser } from "../user";

describe('exercisesReducer', () => {
    const exerciseInitialStateListMock = [ 
        { name: 'testName',musclesInvolved: [MusclesInvolved.Biceps] } as Exercise,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Abdominals] } as Exercise,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Chest] } as Exercise,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Chest] } as Exercise,
    ]

    describe('setAnonymousUser action', () => {
        //clear exercises if anonymous user is setted
        const exerciseInitialStateMock = {
            ...exercisesInitialState,
            list: exerciseInitialStateListMock
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
            list: exerciseInitialStateListMock
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
                list: exerciseInitialStateListMock,
                query: {
                    ...exercisesInitialState.query,
                    filters: {
                        ...exercisesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExercisesState

            const action = clearExerciseQueryFilter()
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual(exerciseInitialStateMock.list)
            expect(state.query.filters).toEqual(exercisesInitialState.query.filters)
        })
    })


    describe('setExerciseMuscleInvolvedQueryFilter action', () => {
        it('should handle setExerciseMuscleInvolvedQueryFilter action adding new one MuscleInvolved', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: exerciseInitialStateListMock
            } as ExercisesState

            const muscleInvolvedSut = MusclesInvolved.Chest
            
            const action = setExerciseMuscleInvolvedQueryFilter({ muscleInvolved: muscleInvolvedSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            const expectedByMuscles = [muscleInvolvedSut]
            expect(state.query.filters.byMuscles).toEqual(expectedByMuscles)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.musclesInvolved.some((muscleInvolved) => expectedByMuscles.includes(muscleInvolved))))
        })

        
        it('should handle setExerciseMuscleInvolvedQueryFilter action adding new MuscleInvolved to existing byMuscles filters', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exercisesInitialState.query,
                    filters: {
                        ...exercisesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExercisesState

            const muscleInvolvedSut = MusclesInvolved.Chest

            
            const action = setExerciseMuscleInvolvedQueryFilter({ muscleInvolved: muscleInvolvedSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            const expectedByMuscles = [...exerciseInitialStateMock.query.filters.byMuscles, muscleInvolvedSut]
            expect(state.query.filters.byMuscles).toEqual(expectedByMuscles)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>             
                exerciseListInitial.musclesInvolved.some((muscleInvolved) => expectedByMuscles.includes(muscleInvolved))))

        })
    })

    describe('setExerciseNameQueryFilter action', () => {
        it('should handle setExerciseNameQueryFilter action setting exerciseName', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: exerciseInitialStateListMock
            } as ExercisesState

            const exerciseNameSut = 'exerciseName test'
            
            const action = setExerciseNameQueryFilter({ exerciseName: exerciseNameSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.query.filters.byName).toEqual(exerciseNameSut)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.name.includes(exerciseNameSut)))
        })
    })

    describe('addAuthenticatedUserExerciseRequestSuccess action', () => {
        it('should handle addAuthenticatedUserExerciseRequestSuccess action adding new exercise', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exercisesInitialState.query,
                    filters: {
                        ...exercisesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExercisesState

            const exerciseSut = { name: 'exercise name (add)'} as Exercise

            
            const action = addAuthenticatedUserExerciseRequestSuccess({ exercise: exerciseSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual([...exerciseInitialStateMock.list, exerciseSut])
            
        })
    })

    describe('addAnonymousUserExerciseRequestSuccess action', () => {
        it('should handle addAnonymousUserExerciseRequestSuccess action adding new exercise', () => {
            const exerciseInitialStateMock = {
                ...exercisesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exercisesInitialState.query,
                    filters: {
                        ...exercisesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExercisesState

            const exerciseSut = { name: 'exercise name (add)'} as Exercise

            
            const action = addAnonymousUserExerciseRequestSuccess({ exercise: exerciseSut })
            const state = exercisesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual([...exerciseInitialStateMock.list, exerciseSut])
            
        })
    })
})