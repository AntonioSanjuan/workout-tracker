import { DocumentReference } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { MuscleGroups } from '../../exercise-templates';
import { TrainingExerciseSerieData } from '../../trainings';

export interface TrainingDto {
    observations?: string

    muscleGroups: MuscleGroups[]
    creationDate: Timestamp
    finishDate?: Timestamp
}

export interface TrainingExerciseDto {
    exerciseTemplateId: DocumentReference,

    creationDate: Timestamp
}

export interface TrainingExerciseSerieDto {
    data: TrainingExerciseSerieData
    observations?: string,

    creationDate: Timestamp
}