import { ExerciseEquipment } from "./exercise-template-equipments.model";
import { ExerciseType } from "./exercise-template-types.model";
import { MusclesInvolved } from "./muscles-involved.model";

export interface ExerciseTemplate {
    id: string,
    name: string,
    musclesInvolved: MusclesInvolved[],
    secondaryMusclesInvolved?: MusclesInvolved[],
    image?: string,
    observations?: string
    type: ExerciseType,
    equipment: ExerciseEquipment

    creationDate: Date
    lastModification?: Date
}


