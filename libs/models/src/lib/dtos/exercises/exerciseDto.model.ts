import { ExerciseType } from "../../exercises";
import { Timestamp } from 'firebase/firestore';

export interface ExerciseDto {
    name: string,
    types: ExerciseType[],
    image?: string,
    creationDate: Timestamp
}