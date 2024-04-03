import { TrainingsState } from "./trainingsState.model";

export const trainingsInitialState: TrainingsState =  {
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