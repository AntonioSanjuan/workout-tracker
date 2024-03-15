import { MusclesInvolved } from "../../exercises";
import { Timestamp } from 'firebase/firestore';

export interface ExerciseDto {
    name: string,
    musclesInvolved: MusclesInvolved[],
    image?: string,
    observations?: string

    creationDate: Timestamp
    lastModification?: Timestamp
}