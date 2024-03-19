import { Timestamp } from 'firebase/firestore';

export interface TrainingDto {
    observations?: string
    trainingExercises?: TrainingExerciseDto[]

    creationDate: Timestamp
    finishDate?: Timestamp
}

export interface TrainingExerciseDto {
    exerciseId: string,
    series: TrainingExerciseSerieDto[]
}

export interface TrainingExerciseSerieDto {
    weight: number,
    repetitions: number,
    observations?: string
}