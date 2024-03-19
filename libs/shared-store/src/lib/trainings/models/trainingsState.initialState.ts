import { TrainingsState } from "./trainingsState.model";

export const trainingsInitialState: TrainingsState =  {
    list: [],
    filtered: [],
    query: {
        filters: {
            byName: '',
        }
    }
}