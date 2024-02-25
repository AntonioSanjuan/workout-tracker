import { routerInitialState } from "./models/routerState.initialState";
import { RouterState } from "./models/routerState.model";
import { setCurrentRoute } from "./router.actions";
import { routerReducer } from "./router.reducer";

describe('routerReducer', () => {
    describe('setCurrentRoute action', () => {
        describe('should handle setCurrentRoute action', () => {
            it('should switch current route with new route', () => {
                const currentRouteSut = '/test/id'
                const newRouteSut = '/test/new/kjwe'
                const initStateMock: RouterState = {
                    ...routerInitialState, 
                    currentRoute: currentRouteSut,
                    prevRoute: undefined
                }
                const action = setCurrentRoute({currentRoute: newRouteSut})
                const state = routerReducer(initStateMock, action)
    
                expect(state.currentRoute).toEqual(newRouteSut)
                expect(state.prevRoute).toEqual(currentRouteSut)
            })
        })
    })
})