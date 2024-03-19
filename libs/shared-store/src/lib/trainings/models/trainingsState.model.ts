import { Training, TrainingQuery } from "@workout-tracker/models";

export interface TrainingsState {
    list: Training[],
    filtered: Training[]
    query: TrainingQuery,
}