import { MusclesInvolved } from "./muscles-involved.model";

export interface ExerciseTemplate {
    id: string,
    name: string,
    musclesInvolved: MusclesInvolved[],
    image?: string,
    observations?: string
    
    creationDate: Date
    lastModification?: Date
}