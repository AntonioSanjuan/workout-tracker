import { DocumentReference } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';

export interface TrainingDto {
    observations?: string
    trainingExercises?: TrainingExerciseDto[]

    creationDate: Timestamp
    finishDate?: Timestamp
}

export interface TrainingExerciseDto {
    exerciseTemplateId: DocumentReference,
    series: TrainingExerciseSerieDto[]
}

export interface TrainingExerciseSerieDto {
    weight: number,
    repetitions: number,
    observations?: string
}