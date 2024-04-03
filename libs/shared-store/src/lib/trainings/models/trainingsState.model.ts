import { Training, TrainingQuery } from "@workout-tracker/models";

export interface TrainingsState {
    list: Training[],
    query: TrainingQuery,
}