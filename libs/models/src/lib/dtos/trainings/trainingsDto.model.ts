import { DocumentReference } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';

export interface TrainingDto {
    observations?: string

    creationDate: Timestamp
    finishDate?: Timestamp
}

export interface TrainingExerciseDto {
    exerciseTemplateId: DocumentReference,
}

export interface TrainingExerciseSerieDto {
    weight: number,
    repetitions: number,
    observations?: string
}