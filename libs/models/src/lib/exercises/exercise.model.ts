import { MusclesInvolved } from "./musclesInvolved.model";

export interface Exercise {
    id: string,
    name: string,
    musclesInvolved: MusclesInvolved[],
    image?: string,
    observations?: string
    
    creationDate: Date
    lastModification?: Date
}