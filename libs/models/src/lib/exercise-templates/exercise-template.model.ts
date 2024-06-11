import { ExerciseType } from "./exercise-template-types.model";
import { MusclesInvolved } from "./muscles-involved.model";

export interface ExerciseTemplate {
    id: string,
    name: string,
    musclesInvolved: MusclesInvolved[],
    image?: string,
    observations?: string
    type: ExerciseType
    
    creationDate: Date
    lastModification?: Date
}


