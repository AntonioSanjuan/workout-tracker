import { TrainingsState } from "./trainingsState.model";

export const trainingsInitialState: TrainingsState =  {
    list: [],
    filtered: [],
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