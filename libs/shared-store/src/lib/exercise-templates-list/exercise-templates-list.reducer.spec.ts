import { ExerciseEquipment, ExerciseTemplate, MusclesInvolved } from "@workout-tracker/models";
import { addAnonymousUserExerciseTemplateListRequestSuccess, addAuthenticatedUserExerciseTemplateListRequestSuccess, clearExerciseTemplateListQueryFilter, getAnonymousUserExerciseTemplatesListRequestSuccess, getAuthenticatedUserExerciseTemplatesListRequestSuccess, setExerciseTemplateListNameQueryFilter, setExerciseTemplateListMuscleInvolvedQueryFilter, getUserExerciseTemplatesListRequest, setExerciseTemplateListEquipmentQueryFilter } from "./exercise-templates-list.actions";
import { exerciseTemplatesListReducer } from "./exercise-templates-list.reducer";
import { exerciseTemplatesListInitialState } from "./models/exerciseTemplatesListState.initialState";
import { ExerciseTemplatesListState } from "./models/exerciseTemplatesListState.model";
import { setAnonymousUser, setAuthenticatedUser } from "../user";

describe('exercisesReducer', () => {
    const exerciseInitialStateListMock = [ 
        { name: 'testName',musclesInvolved: [MusclesInvolved.Biceps] } as ExerciseTemplate,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Abdominals] } as ExerciseTemplate,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Medial_deltoid] } as ExerciseTemplate,
        { name: 'testName1', musclesInvolved: [MusclesInvolved.Medial_deltoid] } as ExerciseTemplate,
    ]

    describe('setAnonymousUser action', () => {
        //clear exercises if anonymous user is setted
        const exerciseInitialStateMock = {
            ...exerciseTemplatesListInitialState,
            list: exerciseInitialStateListMock
        } as ExerciseTemplatesListState
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            expect(state).toEqual(exerciseTemplatesListInitialState)
        })
    })

    describe('setAuthenticatedUser action', () => {
        const user = {} as firebase.default.User
        //clear exercises if auth user is setted
        const exerciseInitialStateMock = {
            ...exerciseTemplatesListInitialState,
            list: exerciseInitialStateListMock
        } as ExerciseTemplatesListState
        it('should handle setAuthenticatedUser action', () => {
            const action = setAuthenticatedUser({ user: user})
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            expect(state).toEqual(exerciseTemplatesListInitialState)
        })
    })

    describe('getAuthenticatedUserExerciseTemplatesRequestSuccess action', () => {
        it('should handle getAuthenticatedUserExerciseTemplatesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as ExerciseTemplate]
            const action = getAuthenticatedUserExerciseTemplatesListRequestSuccess({ exercises: exerciseSut })
            const state = exerciseTemplatesListReducer(exerciseTemplatesListInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.query).toEqual(exerciseTemplatesListInitialState.query)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('getAnonymousUserExerciseTemplatesRequestSuccess action', () => {
        it('should handle getAnonymousUserExerciseTemplatesRequestSuccess action', () => {
            const exerciseSut = [ { name: 'testName' } as ExerciseTemplate]
            const action = getAnonymousUserExerciseTemplatesListRequestSuccess({ exercises: exerciseSut })
            const state = exerciseTemplatesListReducer(exerciseTemplatesListInitialState, action)

            expect(state.list).toEqual(exerciseSut)
            expect(state.query).toEqual(exerciseTemplatesListInitialState.query)
            expect(state.filtered).toEqual(exerciseSut)
        })
    })

    describe('clearExerciseTemplateQueryFilter action', () => {
        it('should handle clearExerciseTemplateQueryFilter action', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesListInitialState.query,
                    filters: {
                        ...exerciseTemplatesListInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesListState

            const action = clearExerciseTemplateListQueryFilter()
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual(exerciseInitialStateMock.list)
            expect(state.query.filters).toEqual(exerciseTemplatesListInitialState.query.filters)
        })
    })


    describe('setExerciseTemplateMuscleInvolvedQueryFilter action', () => {
        it('should handle setExerciseTemplateMuscleInvolvedQueryFilter action adding new one MuscleInvolved', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock
            } as ExerciseTemplatesListState

            const muscleInvolvedSut = MusclesInvolved.Medial_deltoid
            
            const action = setExerciseTemplateListMuscleInvolvedQueryFilter({ muscleInvolved: muscleInvolvedSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            const expectedByMuscles = [muscleInvolvedSut]
            expect(state.query.filters.byMuscles).toEqual(expectedByMuscles)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.musclesInvolved.some((muscleInvolved) => expectedByMuscles.includes(muscleInvolved))))
        })

        
        it('should handle setExerciseTemplateMuscleInvolvedQueryFilter action adding new MuscleInvolved to existing byMuscles filters', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesListInitialState.query,
                    filters: {
                        ...exerciseTemplatesListInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesListState

            const muscleInvolvedSut = MusclesInvolved.Medial_deltoid

            
            const action = setExerciseTemplateListMuscleInvolvedQueryFilter({ muscleInvolved: muscleInvolvedSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            const expectedByMuscles = [...exerciseInitialStateMock.query.filters.byMuscles, muscleInvolvedSut]
            expect(state.query.filters.byMuscles).toEqual(expectedByMuscles)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>             
                exerciseListInitial.musclesInvolved.some((muscleInvolved) => expectedByMuscles.includes(muscleInvolved))))

        })
    })

    describe('setExerciseTemplateListEquipmentQueryFilter action', () => {
        it('should handle setExerciseTemplateListEquipmentQueryFilter action adding new one MuscleInvolved', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock
            } as ExerciseTemplatesListState

            const equipmentSut = ExerciseEquipment.Barbel
            
            const action = setExerciseTemplateListEquipmentQueryFilter({ equipment: equipmentSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            const expectedEquipment = [equipmentSut]
            expect(state.query.filters.byEquipment).toEqual(expectedEquipment)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.equipment === equipmentSut))
        })

        
        it('should handle setExerciseTemplateListEquipmentQueryFilter action adding new MuscleInvolved to existing byMuscles filters', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesListInitialState.query,
                    filters: {
                        ...exerciseTemplatesListInitialState.query.filters,
                        byEquipment: [ExerciseEquipment.Barbel]
                    }
                }
            } as ExerciseTemplatesListState

            const equipmentSut = ExerciseEquipment.AbWWheel

            
            const action = setExerciseTemplateListEquipmentQueryFilter({ equipment: equipmentSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            const expectedByEquipment = [...exerciseInitialStateMock.query.filters.byEquipment, equipmentSut]
            expect(state.query.filters.byEquipment).toEqual(expectedByEquipment)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.equipment === equipmentSut))

        })
    })

    describe('setExerciseTemplateNameQueryFilter action', () => {
        it('should handle setExerciseTemplateNameQueryFilter action setting exerciseName', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock
            } as ExerciseTemplatesListState

            const exerciseNameSut = 'exerciseName test'
            
            const action = setExerciseTemplateListNameQueryFilter({ exerciseName: exerciseNameSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            expect(state.query.filters.byName).toEqual(exerciseNameSut)
            expect(state.filtered).toEqual(exerciseInitialStateMock.list.filter((exerciseListInitial) =>
                exerciseListInitial.name.includes(exerciseNameSut)))
        })
    })

    describe('addAuthenticatedUserExerciseTemplateRequestSuccess action', () => {
        it('should handle addAuthenticatedUserExerciseTemplateRequestSuccess action adding new exercise', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesListInitialState.query,
                    filters: {
                        ...exerciseTemplatesListInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesListState

            const exerciseSut = { name: 'exercise name (add)'} as ExerciseTemplate

            
            const action = addAuthenticatedUserExerciseTemplateListRequestSuccess({ exercise: exerciseSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual([...exerciseInitialStateMock.list, exerciseSut])
            
        })
    })

    describe('addAnonymousUserExerciseTemplateRequestSuccess action', () => {
        it('should handle addAnonymousUserExerciseTemplateRequestSuccess action adding new exercise', () => {
            const exerciseInitialStateMock = {
                ...exerciseTemplatesListInitialState,
                list: exerciseInitialStateListMock,
                query: {
                    ...exerciseTemplatesListInitialState.query,
                    filters: {
                        ...exerciseTemplatesListInitialState.query.filters,
                        byMuscles: [MusclesInvolved.Abdominals]
                    }
                }
            } as ExerciseTemplatesListState

            const exerciseSut = { name: 'exercise name (add)'} as ExerciseTemplate

            
            const action = addAnonymousUserExerciseTemplateListRequestSuccess({ exercise: exerciseSut })
            const state = exerciseTemplatesListReducer(exerciseInitialStateMock, action)

            expect(state.list).toEqual([...exerciseInitialStateMock.list, exerciseSut])
            
        })
    })
})