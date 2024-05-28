import { Training, TrainingExercise, TrainingQueryFilters } from "@workout-tracker/models";
import { trainingsListReducer } from "./trainings-list.reducer";
import { trainingsListInitialState } from "./models/trainingsListState.initialState";
import { setAnonymousUser, setAuthenticatedUser } from "../user";
import { TrainingsListState } from "./models/trainingsListState.model";
import { addAnonymousUserTrainingListRequestSuccess, addAuthenticatedUserTrainingListRequestSuccess, clearTrainingListQueryFilter, getAnonymousUserTrainingsListRequestSuccess, getAuthenticatedUserTrainingsListRequestSuccess, setTrainingListQueryFilter, updateAuthenticatedUserTrainingListRequest } from "./trainings-list.actions";

describe('trainingsListReducer', () => {
    const trainingInitialStateListMock = [ 
        { id: 'testId', trainingExercises: [{ exerciseTemplate: {name: '1'}} as TrainingExercise] } as Training,
        { id: 'testId1', trainingExercises: [] as TrainingExercise[] } as Training,
        { id: 'testId2', trainingExercises: [{exerciseTemplate: {name: '2'}} as TrainingExercise] } as Training,
        { id: 'testId3', trainingExercises: [] as TrainingExercise[] } as Training,
    ]

    describe('setAnonymousUser action', () => {
        //clear trainings if anonymous user is setted
        const trainingInitialStateMock = {
            ...trainingsListInitialState,
            list: trainingInitialStateListMock
        } as TrainingsListState
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = trainingsListReducer(trainingInitialStateMock, action)

            expect(state).toEqual(trainingsListInitialState)
        })
    })

    describe('setAuthenticatedUser action', () => {
        //clear training if auth user is setted
        const trainingInitialStateMock = {
            ...trainingsListInitialState,
            list: trainingInitialStateListMock
        } as TrainingsListState
        const user = {} as firebase.default.User
        it('should handle setAuthenticatedUser action', () => {
            const action = setAuthenticatedUser({ user: user})
            const state = trainingsListReducer(trainingInitialStateMock, action)

            expect(state).toEqual(trainingsListInitialState)
        })
    })

    describe('getAnonymousUserTrainingsListRequestSuccess action', () => {
        it('should handle getAnonymousUserTrainingsListRequestSuccess action', () => {
            const trainingSut = [ { id: 'testId' } as Training]
            const action = getAnonymousUserTrainingsListRequestSuccess({ trainings: trainingSut })
            const state = trainingsListReducer(trainingsListInitialState, action)

            expect(state.list).toEqual(trainingSut)
        })
    })

    describe('getAuthenticatedUserTrainingsListRequestSuccess action', () => {
        it('should handle getAuthenticatedUserTrainingsListRequestSuccess action', () => {
            const trainingSut = [ { id: 'testId' } as Training]
            const action = getAuthenticatedUserTrainingsListRequestSuccess({ trainings: trainingSut })
            const state = trainingsListReducer(trainingsListInitialState, action)

            expect(state.list).toEqual(trainingSut)
        })
    })

    describe('clearTrainingListQueryFilter action', () => {
        it('should handle clearTrainingListQueryFilter action', () => {
            const trainingInitialStateMock = {
                ...trainingsListInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsListInitialState.query,
                    filters: {
                        ...trainingsListInitialState.query.filters,
                    },
                }
            } as TrainingsListState

            const action = clearTrainingListQueryFilter()
            const state = trainingsListReducer(trainingInitialStateMock, action)

            expect(state.list).toEqual([])
            expect(state.query.filters).toEqual(trainingsListInitialState.query.filters)
            expect(state.query.pagination).toEqual(trainingsListInitialState.query.pagination)
        })
    })
    
    describe('setTrainingListQueryFilter action', () => {
        it('should handle setTrainingListQueryFilter action', () => {
            const filtersSut: TrainingQueryFilters = {
                betweenDates: {
                    fromDate: new Date(),
                    toDate: new Date()
                },
                muscleGroups: []
            }
            const trainingInitialStateMock = {
                ...trainingsListInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsListInitialState.query,
                    filters: {
                        ...trainingsListInitialState.query.filters,
                    }
                }
            } as TrainingsListState

            const action = setTrainingListQueryFilter({ filters: filtersSut})
            const state = trainingsListReducer(trainingInitialStateMock, action)

            expect(state.query.filters).toEqual(filtersSut)
            expect(state.list).toEqual([])
        })
    })

    describe('addAuthenticatedUserTrainingListRequestSuccess action', () => {
        it('should handle addAuthenticatedUserTrainingListRequestSuccess action adding new training', () => {
            const trainingInitialStateMock = {
                ...trainingsListInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsListInitialState.query,
                    filters: {
                        ...trainingsListInitialState.query.filters,
                    }
                }
            } as TrainingsListState

            const trainingSut = { id: 'training id (add)'} as Training
            
            const action = addAuthenticatedUserTrainingListRequestSuccess({ training: trainingSut })
            const state = trainingsListReducer(trainingInitialStateMock, action)

            expect(state.list).toEqual([trainingSut, ...trainingInitialStateMock.list])
        })
    })

    describe('addAnonymousUserTrainingListRequestSuccess action', () => {
        it('should handle addAnonymousUserTrainingListRequestSuccess action adding new training', () => {
            const trainingInitialStateMock = {
                ...trainingsListInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsListInitialState.query,
                    filters: {
                        ...trainingsListInitialState.query.filters,
                    }
                }
            } as TrainingsListState

            const trainingSut = { id: 'training id (add)'} as Training

            
            const action = addAnonymousUserTrainingListRequestSuccess({ training: trainingSut })
            const state = trainingsListReducer(trainingInitialStateMock, action)

            expect(state.list).toEqual([trainingSut, ...trainingInitialStateMock.list])
            
        })
    })
    
    describe('updateAuthenticatedUserTrainingListRequest action', () => {
        describe('if updated training is listed', () => {
            it('should handle updateAuthenticatedUserTrainingListRequest action replacing training', () => {
                const updatedTrainingIndex = 0;
                const updatedTraining = trainingInitialStateListMock[updatedTrainingIndex]

                const trainingInitialStateMock = {
                    ...trainingsListInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsListInitialState.query,
                        filters: {
                            ...trainingsListInitialState.query.filters,
                        }
                    }
                } as TrainingsListState
    
                const trainingSut = { ...updatedTraining, finishDate: new Date() } as Training
                const newList = [...trainingInitialStateListMock]
                newList.splice(updatedTrainingIndex, 1, {...updatedTraining})

                const action = updateAuthenticatedUserTrainingListRequest({ training: trainingSut })
                const state = trainingsListReducer(trainingInitialStateMock, action)
    
    
                expect(state.list).toEqual(newList)
            })
         })
        describe('if updated training is not listed', () => { 
            it('should handle updateAuthenticatedUserTrainingListRequest action not modifing trainings listed', () => {
                const updatedTraining = {id: 'not apear training into list'} as Training

                const trainingInitialStateMock = {
                    ...trainingsListInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsListInitialState.query,
                        filters: {
                            ...trainingsListInitialState.query.filters,
                        }
                    }
                } as TrainingsListState
    
                const trainingSut = { ...updatedTraining, finishDate: new Date() } as Training
                
                const action = updateAuthenticatedUserTrainingListRequest({ training: trainingSut })
                const state = trainingsListReducer(trainingInitialStateMock, action)
    
    
                expect(state.list).toEqual([...state.list])
            })
        })
    })

    describe('updateAuthenticatedUserTrainingListRequest action', () => {
        describe('if updated training is listed', () => {
            it('should handle updateAuthenticatedUserTrainingListRequest action replacing training', () => {
                const updatedTrainingIndex = 0;
                const updatedTraining = trainingInitialStateListMock[updatedTrainingIndex]

                const trainingInitialStateMock = {
                    ...trainingsListInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsListInitialState.query,
                        filters: {
                            ...trainingsListInitialState.query.filters,
                        }
                    }
                } as TrainingsListState
    
                const trainingSut = { ...updatedTraining } as Training
                const newList = [...trainingInitialStateListMock]
                newList.splice(updatedTrainingIndex, 1, {...updatedTraining})
                
                const action = updateAuthenticatedUserTrainingListRequest({ training: trainingSut })
                const state = trainingsListReducer(trainingInitialStateMock, action)
    
                expect(state.list).toEqual(newList)
            })
         })
        describe('if updated training is not listed', () => { 
            it('should handle updateAuthenticatedUserTrainingListRequest action not modifing trainings listed', () => {
                const updatedTraining = {id: 'not apear training into list'} as Training

                const trainingInitialStateMock = {
                    ...trainingsListInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsListInitialState.query,
                        filters: {
                            ...trainingsListInitialState.query.filters,
                        }
                    }
                } as TrainingsListState
    
                const trainingSut = { ...updatedTraining, finishDate: new Date() } as Training
                
                const action = updateAuthenticatedUserTrainingListRequest({ training: trainingSut })
                const state = trainingsListReducer(trainingInitialStateMock, action)
    
    
                expect(state.list).toEqual([...trainingInitialStateListMock])
            })
        })
    })
})