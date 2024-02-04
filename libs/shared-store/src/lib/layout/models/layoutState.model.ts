
export interface LayoutState {
    menu: MenuLayoutState;
}

export interface MenuLayoutState {
    navBar: NavBarLayoutState;
}

export interface NavBarLayoutState {
    isOpened: boolean;
}