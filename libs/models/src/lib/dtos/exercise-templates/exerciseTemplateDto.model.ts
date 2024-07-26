import { ExerciseEquipment, ExerciseType, MusclesInvolved } from "../../exercise-templates";
import { Timestamp } from 'firebase/firestore';

export interface ExerciseTemplateDto {
    name: string,
    musclesInvolved: MusclesInvolved[],
    image?: string,
    observations?: string
    type: ExerciseType
    equipment: ExerciseEquipment

    creationDate: Timestamp
    lastModification?: Timestamp
}