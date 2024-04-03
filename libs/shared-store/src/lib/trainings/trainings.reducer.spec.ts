import { Training, TrainingExercise, TrainingQueryFilters } from "@workout-tracker/models";
import { trainingsReducer } from "./trainings.reducer";
import { trainingsInitialState } from "./models/trainingsState.initialState";
import { setAnonymousUser } from "../user";
import { TrainingsState } from "./models/trainingsState.model";
import { addAnonymousUserTrainingRequestSuccess, addAuthenticatedUserTrainingRequestSuccess, clearTrainingQueryFilter, getAnonymousUserTrainingsRequestSuccess, getAuthenticatedUserTrainingsRequestSuccess, setTrainingQueryFilter, updateAuthenticatedUserTrainingRequest } from "./trainings.actions";

describe('trainingsReducer', () => {
    const trainingInitialStateListMock = [ 
        { id: 'testId', trainingExercises: [{ exerciseTemplate: {name: '1'}} as TrainingExercise] } as Training,
        { id: 'testId1', trainingExercises: [] as TrainingExercise[] } as Training,
        { id: 'testId2', trainingExercises: [{exerciseTemplate: {name: '2'}} as TrainingExercise] } as Training,
        { id: 'testId3', trainingExercises: [] as TrainingExercise[] } as Training,
    ]

    describe('setAnonymousUser action', () => {
        //clear trainings if anonymous user is setted
        const trainingInitialStateMock = {
            ...trainingsInitialState,
            list: trainingInitialStateListMock
        } as TrainingsState
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = trainingsReducer(trainingInitialStateMock, action)

            expect(state).toEqual(trainingsInitialState)
        })
    })

    describe('setAuthenticatedUser action', () => {
        //clear training if auth user is setted
        const trainingInitialStateMock = {
            ...trainingsInitialState,
            list: trainingInitialStateListMock
        } as TrainingsState
        it('should handle setAuthenticatedUser action', () => {
            const action = setAnonymousUser()
            const state = trainingsReducer(trainingInitialStateMock, action)

            expect(state).toEqual(trainingsInitialState)
        })
    })

    describe('getAnonymousUserTrainingsRequestSuccess action', () => {
        it('should handle getAnonymousUserTrainingsRequestSuccess action', () => {
            const trainingSut = [ { id: 'testId' } as Training]
            const action = getAnonymousUserTrainingsRequestSuccess({ trainings: trainingSut })
            const state = trainingsReducer(trainingsInitialState, action)

            expect(state.list).toEqual(trainingSut)
        })
    })

    describe('getAuthenticatedUserTrainingsRequestSuccess action', () => {
        it('should handle getAuthenticatedUserTrainingsRequestSuccess action', () => {
            const trainingSut = [ { id: 'testId' } as Training]
            const action = getAuthenticatedUserTrainingsRequestSuccess({ trainings: trainingSut })
            const state = trainingsReducer(trainingsInitialState, action)

            expect(state.list).toEqual(trainingSut)
        })
    })

    describe('clearTrainingQueryFilter action', () => {
        it('should handle clearTrainingQueryFilter action', () => {
            const trainingInitialStateMock = {
                ...trainingsInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsInitialState.query,
                    filters: {
                        ...trainingsInitialState.query.filters,
                    }
                }
            } as TrainingsState

            const action = clearTrainingQueryFilter()
            const state = trainingsReducer(trainingInitialStateMock, action)

            expect(state.list).toEqual(trainingInitialStateMock.list)
            expect(state.query.filters).toEqual(trainingsInitialState.query.filters)
        })
    })
    
    describe('setTrainingQueryFilter action', () => {
        it('should handle setTrainingQueryFilter action', () => {
            const filtersSut: TrainingQueryFilters = {
                betweenDates: {
                    fromDate: new Date(),
                    toDate: new Date()
                },
                muscleGroups: []
            }
            const trainingInitialStateMock = {
                ...trainingsInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsInitialState.query,
                    filters: {
                        ...trainingsInitialState.query.filters,
                    }
                }
            } as TrainingsState

            const action = setTrainingQueryFilter({ filters: filtersSut})
            const state = trainingsReducer(trainingInitialStateMock, action)

            expect(state.query.filters).toEqual(filtersSut)
            expect(state.list).toEqual([])
        })
    })

    describe('addAuthenticatedUserTrainingRequestSuccess action', () => {
        it('should handle addAuthenticatedUserTrainingRequestSuccess action adding new training', () => {
            const trainingInitialStateMock = {
                ...trainingsInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsInitialState.query,
                    filters: {
                        ...trainingsInitialState.query.filters,
                    }
                }
            } as TrainingsState

            const trainingSut = { id: 'training id (add)'} as Training
            
            const action = addAuthenticatedUserTrainingRequestSuccess({ training: trainingSut })
            const state = trainingsReducer(trainingInitialStateMock, action)

            expect(state.list).toEqual([trainingSut, ...trainingInitialStateMock.list])
        })
    })

    describe('addAnonymousUserTrainingRequestSuccess action', () => {
        it('should handle addAnonymousUserTrainingRequestSuccess action adding new training', () => {
            const trainingInitialStateMock = {
                ...trainingsInitialState,
                list: trainingInitialStateListMock,
                query: {
                    ...trainingsInitialState.query,
                    filters: {
                        ...trainingsInitialState.query.filters,
                    }
                }
            } as TrainingsState

            const trainingSut = { id: 'training id (add)'} as Training

            
            const action = addAnonymousUserTrainingRequestSuccess({ training: trainingSut })
            const state = trainingsReducer(trainingInitialStateMock, action)

            expect(state.list).toEqual([trainingSut, ...trainingInitialStateMock.list])
            
        })
    })
    
    describe('updateAuthenticatedUserTrainingRequest action', () => {
        describe('if updated training is listed', () => {
            it('should handle updateAuthenticatedUserTrainingRequest action replacing training', () => {
                const updatedTrainingIndex = 0;
                const updatedTraining = trainingInitialStateListMock[updatedTrainingIndex]

                const trainingInitialStateMock = {
                    ...trainingsInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsInitialState.query,
                        filters: {
                            ...trainingsInitialState.query.filters,
                        }
                    }
                } as TrainingsState
    
                const trainingSut = { ...updatedTraining, finishDate: new Date() } as Training
                const newList = [...trainingInitialStateListMock]
                newList.splice(updatedTrainingIndex, 1, {...updatedTraining})

                const action = updateAuthenticatedUserTrainingRequest({ training: trainingSut })
                const state = trainingsReducer(trainingInitialStateMock, action)
    
    
                expect(state.list).toEqual(newList)
            })
         })
        describe('if updated training is not listed', () => { 
            it('should handle updateAuthenticatedUserTrainingRequest action not modifing trainings listed', () => {
                const updatedTraining = {id: 'not apear training into list'} as Training

                const trainingInitialStateMock = {
                    ...trainingsInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsInitialState.query,
                        filters: {
                            ...trainingsInitialState.query.filters,
                        }
                    }
                } as TrainingsState
    
                const trainingSut = { ...updatedTraining, finishDate: new Date() } as Training
                
                const action = updateAuthenticatedUserTrainingRequest({ training: trainingSut })
                const state = trainingsReducer(trainingInitialStateMock, action)
    
    
                expect(state.list).toEqual([...state.list])
            })
        })
    })

    describe('addAnonymousUserTrainingRequestSuccess action', () => {
        describe('if updated training is listed', () => {
            it('should handle updateAuthenticatedUserTrainingRequest action replacing training', () => {
                const updatedTrainingIndex = 0;
                const updatedTraining = trainingInitialStateListMock[updatedTrainingIndex]

                const trainingInitialStateMock = {
                    ...trainingsInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsInitialState.query,
                        filters: {
                            ...trainingsInitialState.query.filters,
                        }
                    }
                } as TrainingsState
    
                const trainingSut = { ...updatedTraining } as Training
                const newList = [...trainingInitialStateListMock]
                newList.splice(updatedTrainingIndex, 1, {...updatedTraining})
                
                const action = updateAuthenticatedUserTrainingRequest({ training: trainingSut })
                const state = trainingsReducer(trainingInitialStateMock, action)
    
                expect(state.list).toEqual(newList)
            })
         })
        describe('if updated training is not listed', () => { 
            it('should handle updateAuthenticatedUserTrainingRequest action not modifing trainings listed', () => {
                const updatedTraining = {id: 'not apear training into list'} as Training

                const trainingInitialStateMock = {
                    ...trainingsInitialState,
                    list: trainingInitialStateListMock,
                    query: {
                        ...trainingsInitialState.query,
                        filters: {
                            ...trainingsInitialState.query.filters,
                        }
                    }
                } as TrainingsState
    
                const trainingSut = { ...updatedTraining, finishDate: new Date() } as Training
                
                const action = updateAuthenticatedUserTrainingRequest({ training: trainingSut })
                const state = trainingsReducer(trainingInitialStateMock, action)
    
    
                expect(state.list).toEqual([...trainingInitialStateListMock])
            })
        })
    })
})