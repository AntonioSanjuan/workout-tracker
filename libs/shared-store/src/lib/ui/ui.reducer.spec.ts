import { uiReducer } from "./ui.reducer"
import { uiInitialState } from "./models/uiState.initialState";
import { UiState } from "./models/uiState.model";
import { AppInit } from "./models/app-init-enum";
import { endRequest, loadedApp, startRequest, unloadedApp, initializeLoadedApps } from './ui.actions'
describe('uiReducer', () => {
    describe('loadedApp action', () => {
        describe('should handle loadedApp action', () => {
            it('if initialized app was previously loaded', () => {
                const prevLoadedApp = AppInit.ACCOUNT
                const initStateMock: UiState = {
                    ...uiInitialState, 
                    loadedApps: [prevLoadedApp]
                }
                const action = loadedApp({ initialized: prevLoadedApp})
                const state = uiReducer(initStateMock, action)
    
                expect(state.loadedApps).toEqual([prevLoadedApp])
            })

            it('if initialized app wasnt previously loaded', () => {
                const prevLoadedApp = AppInit.ACCOUNT
                const initialized = AppInit.UI
                const initStateMock: UiState = {
                    ...uiInitialState, 
                    loadedApps: [prevLoadedApp]
                }
                const action = loadedApp({ initialized: initialized})
                const state = uiReducer(initStateMock, action)
    
                expect(state.loadedApps).toEqual([prevLoadedApp, initialized])
            })
        })
    })

    describe('unloadedApp action', () => {
        describe('should handle unloadedApp action', () => {
            it('if uninitialized app was previously loaded', () => {
                const prevLoadedApp = AppInit.ACCOUNT
                const initStateMock: UiState = {
                    ...uiInitialState, 
                    loadedApps: [prevLoadedApp]
                }
                const action = unloadedApp({ uninitialized: prevLoadedApp})
                const state = uiReducer(initStateMock, action)
    
                expect(state.loadedApps).toEqual([])
            })

            it('if uninitialized app wasnt previously loaded', () => {
                const prevLoadedApp = AppInit.ACCOUNT
                const uninitializedApp = AppInit.UI
                const initStateMock: UiState = {
                    ...uiInitialState, 
                    loadedApps: [prevLoadedApp]
                }
                const action = unloadedApp({ uninitialized: uninitializedApp})
                const state = uiReducer(initStateMock, action)
    
                expect(state.loadedApps).toEqual([prevLoadedApp])
            })
        })
    })

    describe('initializeLoadedApps action', () => {
        describe('should handle initializeLoadedApps action', () => {
            it('should restore loadedApps', () => {
                const initStateMock: UiState = {
                    ...uiInitialState, 
                    loadedApps: [AppInit.ACCOUNT, AppInit.UI]
                }
                const action = initializeLoadedApps()
                const state = uiReducer(initStateMock, action)
    
                expect(state.loadedApps).toEqual([AppInit.ACCOUNT])
            })
        })
    })

    describe('startRequest action', () => {
        it('should handle startRequest action', () => {
            const initStateMock: UiState = {
                ...uiInitialState, 
            }
            const action = startRequest()
            const state = uiReducer(initStateMock, action)

            expect(state.actionOngoing).toBeTruthy()
            expect(state.blockByRequest).toBeTruthy()
            expect(state.requestCounter).toEqual(initStateMock.requestCounter + 1)
        })
    })

    describe('endRequest action', () => {
        describe('should handle endRequest action', () => {
            it('if prev actionOngoing', () => {
                const initStateMock: UiState = {
                    ...uiInitialState, 
                    actionOngoing: true,
                    blockByRequest: true,
                    requestCounter: 3
                }
                const action = endRequest()
                const state = uiReducer(initStateMock, action)
    
                expect(state.actionOngoing).toBeFalsy()
                expect(state.blockByRequest).toEqual(initStateMock.blockByRequest)
                expect(state.requestCounter).toEqual(initStateMock.requestCounter - 1)
            })

            it('if no prev actionOngoing', () => {
                const initStateMock: UiState = {
                    ...uiInitialState
                }
                const action = endRequest()
                const state = uiReducer(initStateMock, action)
    
                expect(state.actionOngoing).toBeFalsy()
                expect(state.blockByRequest).toBeFalsy()
                expect(state.requestCounter).toEqual(initStateMock.requestCounter - 1)
            })
        })
    })
})