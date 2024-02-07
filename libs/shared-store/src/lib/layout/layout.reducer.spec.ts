import { switchNavBar } from "./layout.actions"
import { layoutReducer } from "./layout.reducer"
import { layoutInitialState } from "./models/layoutState.initialState";
import { LayoutState } from "./models/layoutState.model";

describe('layoutReducer', () => {
    beforeEach(() => {

    })
    describe('switchNavBar action', () => {
        describe('should handle switchNavBar action', () => {
            it('if initially isOpened is true', () => {
                const initialIsOpened = true
                const initStateMock: LayoutState = {
                    ...layoutInitialState, 
                    menu: {
                        ...layoutInitialState.menu,
                        navBar: {
                            ...layoutInitialState.menu.navBar,
                            isOpened: initialIsOpened
                        }
                    }
                }
                const action = switchNavBar()
                const state = layoutReducer(initStateMock, action)
    
                expect(state.menu.navBar.isOpened).toEqual(!initialIsOpened)
            })

            it('if initially isOpened is false', () => {
                const initialIsOpened = false
                const action = switchNavBar()
                const state = layoutReducer(layoutInitialState, action)
    
                expect(state.menu.navBar.isOpened).toEqual(!initialIsOpened)
            })
        })
    })
    describe('closeNavBar action', () => {
        describe('should handle closeNavBar action', () => {
            it('if initially isOpened is true', () => {
                const initialIsOpened = true
                const initStateMock: LayoutState = {
                    ...layoutInitialState, 
                    menu: {
                        ...layoutInitialState.menu,
                        navBar: {
                            ...layoutInitialState.menu.navBar,
                            isOpened: initialIsOpened
                        }
                    }
                }
                const action = switchNavBar()
                const state = layoutReducer(initStateMock, action)
    
                expect(state.menu.navBar.isOpened).toEqual(!initialIsOpened)
            })

            it('if initially isOpened is false', () => {
                
                const action = switchNavBar()
                const state = layoutReducer(layoutInitialState, action)
    
                expect(state.menu.navBar.isOpened).toEqual(!layoutInitialState.menu.navBar.isOpened)
            })
        })
    })
})