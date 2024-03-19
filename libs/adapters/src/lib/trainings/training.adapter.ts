import {Exercise, Training, TrainingDto, TrainingExercise, TrainingExerciseDto, TrainingExerciseSerie, TrainingExerciseSerieDto } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';

export class TrainingAdapter {
    static toState(training: TrainingDto, trainingId: string): Training {
        return {
            ...training,
            id: trainingId,
            trainingExercises: [],
            
            creationDate: training.creationDate.toDate(),
            finishDate: training.finishDate?.toDate()
        }
    }

    static toDto(training: Training): TrainingDto {
        return {
            observations: training.observations,

            creationDate: Timestamp.fromDate(training.creationDate),
            finishDate: training.finishDate ? Timestamp.fromDate(training.finishDate) : undefined
        }
    }
}

export class TrainingExerciseAdapter {
    static toState(trainingExercise: TrainingExerciseDto, trainingExerciseId: string): TrainingExercise {
        return {
            ...trainingExercise,
            id: trainingExerciseId,
            exercise: {} as Exercise,
            series: [],
        }
    }

    static toDto(trainingExercise: TrainingExercise): TrainingExerciseDto {
        return {
            exerciseId: trainingExercise.exercise.id,
            series: []
        }
    }
}

export class TrainingExerciseSerieAdapter {
    static toState(trainingExerciseSerie: TrainingExerciseSerieDto, trainingExerciseSerieId: string): TrainingExerciseSerie {
        return {
            ...trainingExerciseSerie,
            id: trainingExerciseSerieId,
        }
    }

    static toDto(trainingExerciseSerie: TrainingExerciseSerie): TrainingExerciseSerieDto {
        return {
            weight: trainingExerciseSerie.weight,
            repetitions: trainingExerciseSerie.repetitions,
            observations: trainingExerciseSerie.observations
        }
    }
}