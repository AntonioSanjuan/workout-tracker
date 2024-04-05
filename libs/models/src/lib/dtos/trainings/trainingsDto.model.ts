import { DocumentReference } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { MuscleGroups } from '../../exercise-templates';

export interface TrainingDto {
    observations?: string

    muscleGroups: MuscleGroups[]
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