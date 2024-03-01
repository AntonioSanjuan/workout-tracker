import { ExerciseType, MusclesInvolved } from "../../exercises";
import { Timestamp } from 'firebase/firestore';

export interface ExerciseDto {
    name: string,
    types: ExerciseType[],
    musclesInvolved: MusclesInvolved[],
    image?: string,
    creationDate: Timestamp
}