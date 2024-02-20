import { ExerciseType } from "./exerciseTypes.model";

export interface Exercise {
    id: string,
    name: string,
    type: ExerciseType,
    image?: string
}