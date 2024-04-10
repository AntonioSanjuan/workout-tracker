import { TrainingsListState } from "./trainingsListState.model";

export const trainingsListInitialState: TrainingsListState =  {
    list: [],
    query: {
        filters: {
            betweenDates: undefined,
            muscleGroups: []
        },
        pagination: {
            pageElements: 10,
            moreElements: true,
            lastElement: undefined
        }
    }
}