import { Training, TrainingQuery } from "@workout-tracker/models";

export interface TrainingsListState {
    list: Training[],
    query: TrainingQuery,
}