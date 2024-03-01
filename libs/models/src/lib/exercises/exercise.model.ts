import { ExerciseType } from "./exerciseTypes.model";
import { MusclesInvolved } from "./musclesInvolved.model";

export interface Exercise {
    id: string,
    name: string,
    types: ExerciseType[],
    musclesInvolved: MusclesInvolved[],
    image?: string,
    

    creationDate: Date
}