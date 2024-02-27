import { ExerciseType } from "./exerciseTypes.model";

export interface Exercise {
    id: string,
    name: string,
    types: ExerciseType[],
    image?: string,
    

    creationDate: Date
}