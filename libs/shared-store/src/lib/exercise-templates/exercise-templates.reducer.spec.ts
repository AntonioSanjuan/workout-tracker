import { ExerciseTemplate, MusclesInvolved } from "@workout-tracker/models";
import { addAnonymousUserExerciseTemplateRequestSuccess, addAuthenticatedUserExerciseTemplateRequestSuccess, clearExerciseTemplateQueryFilter, getAnonymousUserExerciseTemplatesRequestSuccess, getAuthenticatedUserExerciseTemplatesRequestSuccess, setExerciseTemplateNameQueryFilter, setExerciseTemplateMuscleInvolvedQueryFilter } from "./exercise-templates.actions";
import { exerciseTemplatesReducer } from "./exercise-templates.reducer";
import { exerciseTemplatesInitialState } from "./models/exerciseTemplatesState.initialState";
import { ExerciseTemplatesState } from "./models/exerciseTemplatesState.model";
import { setAnonymousUser } from "../user";

describe('exercisesReducer', () => {
    const exerciseInitialStateListMock = [ 
        { name: 'testName',musclesInvolved: [MusclesInvolved.Biceps] } as ExerciseTemplate,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Abdominals] } as ExerciseTemplate,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Chest] } as ExerciseTemplate,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Chest] } as ExerciseTemplate,
    ]

    describe('setAnonymousUser action', () => {
        //clear exercises if anonymous user is setted
        const exerciseInitialStateMock = {
            ...exerciseTemplatesInitialState,
            list: exerciseInitialStateListMock
        } as ExerciseTemplatesState
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            expect(state).toEqual(exerciseTemplatesInitialState)
        })
    })

    describe('setAuthenticatedUser action', () => {
        //clear exercises if auth user is setted
        const exerciseInitialStateMock = {
            ...exerciseTemplatesInitialState,
            list: exerciseInitialStateListMock
        } as ExerciseTemplatesState
        it('should handle setAuthenticatedUser action', () => {
            const action = setAnonymousUser()
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            expect(state).toEqual(exerciseTemplatesInitialState)
        })
    })

    describe('getAuthenticatedUserExerciseTemplatesRequestSuccess action', () => {
        it('should handle getAuthenticatedUserExerciseTemplatesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as ExerciseTemplate]
            const action = getAuthenticatedUserExerciseTemplatesRequestSuccess({ exercises: exerciseSut })
            const state = exerciseTemplatesReducer(exerciseTemplatesInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExerciseTemplatesRequestSuccess action', () => {
        it('should handle getAnonymousUserExerciseTemplatesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as ExerciseTemplate]
            const action = getAnonymousUserExerciseTemplatesRequestSuccess({ exercises: exerciseSut })
            const state = exerciseTemplatesReducer(exerciseTemplatesInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('clearExerciseTemplateQueryFilter action', () => {
        it('should handle clearExerciseTemplateQueryFilter action', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesInitialState.query,
                    filters: {
                        ...exerciseTemplatesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesState

            const action = clearExerciseTemplateQueryFilter()
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual(exerciseInitialStateMock.list)
            expect(state.query.filters).toEqual(exerciseTemplatesInitialState.query.filters)
        })
    })


    describe('setExerciseTemplateMuscleInvolvedQueryFilter action', () => {
        it('should handle setExerciseTemplateMuscleInvolvedQueryFilter action adding new one MuscleInvolved', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesInitialState,
                list: exerciseInitialStateListMock
            } as ExerciseTemplatesState

            const muscleInvolvedSut = MusclesInvolved.Chest
            
            const action = setExerciseTemplateMuscleInvolvedQueryFilter({ muscleInvolved: muscleInvolvedSut })
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            const expectedByMuscles = [muscleInvolvedSut]
            expect(state.query.filters.byMuscles).toEqual(expectedByMuscles)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.musclesInvolved.some((muscleInvolved) => expectedByMuscles.includes(muscleInvolved))))
        })

        
        it('should handle setExerciseTemplateMuscleInvolvedQueryFilter action adding new MuscleInvolved to existing byMuscles filters', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesInitialState.query,
                    filters: {
                        ...exerciseTemplatesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesState

            const muscleInvolvedSut = MusclesInvolved.Chest

            
            const action = setExerciseTemplateMuscleInvolvedQueryFilter({ muscleInvolved: muscleInvolvedSut })
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            const expectedByMuscles = [...exerciseInitialStateMock.query.filters.byMuscles, muscleInvolvedSut]
            expect(state.query.filters.byMuscles).toEqual(expectedByMuscles)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>             
                exerciseListInitial.musclesInvolved.some((muscleInvolved) => expectedByMuscles.includes(muscleInvolved))))

        })
    })

    describe('setExerciseTemplateNameQueryFilter action', () => {
        it('should handle setExerciseTemplateNameQueryFilter action setting exerciseName', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesInitialState,
                list: exerciseInitialStateListMock
            } as ExerciseTemplatesState

            const exerciseNameSut = 'exerciseName test'
            
            const action = setExerciseTemplateNameQueryFilter({ exerciseName: exerciseNameSut })
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            expect(state.query.filters.byName).toEqual(exerciseNameSut)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.name.includes(exerciseNameSut)))
        })
    })

    describe('addAuthenticatedUserExerciseTemplateRequestSuccess action', () => {
        it('should handle addAuthenticatedUserExerciseTemplateRequestSuccess action adding new exercise', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesInitialState.query,
                    filters: {
                        ...exerciseTemplatesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesState

            const exerciseSut = { name: 'exercise name (add)'} as ExerciseTemplate

            
            const action = addAuthenticatedUserExerciseTemplateRequestSuccess({ exercise: exerciseSut })
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual([...exerciseInitialStateMock.list, exerciseSut])
            
        })
    })

    describe('addAnonymousUserExerciseTemplateRequestSuccess action', () => {
        it('should handle addAnonymousUserExerciseTemplateRequestSuccess action adding new exercise', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesInitialState.query,
                    filters: {
                        ...exerciseTemplatesInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesState

            const exerciseSut = { name: 'exercise name (add)'} as ExerciseTemplate

            
            const action = addAnonymousUserExerciseTemplateRequestSuccess({ exercise: exerciseSut })
            const state = exerciseTemplatesReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual([...exerciseInitialStateMock.list, exerciseSut])
            
        })
    })
})