import { MusclesInvolved } from "../../exercise-templates";
import { Timestamp } from 'firebase/firestore';

export interface ExerciseTemplateDto {
    name: string,
    musclesInvolved: MusclesInvolved[],
    image?: string,
    observations?: string

    creationDate: Timestamp
    lastModification?: Timestamp
}