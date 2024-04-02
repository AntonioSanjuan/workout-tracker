import { DocumentReference } from "@angular/fire/compat/firestore";
import {Exercise, Training, TrainingDto, TrainingExerciseSerie, TrainingExerciseDto, TrainingExerciseSerieDto, TrainingExercise } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { DateAdapter } from "../date/date.adapter";

export class TrainingAdapter {
    static toState(training: TrainingDto, id: string, trainingExercises: TrainingExercise[]): Training {
        return {
            ...training,
            id: id,
            trainingExercises: trainingExercises,
            
            creationDate: DateAdapter.toState(training.creationDate),
            finishDate: training.finishDate ? DateAdapter.toState(training.finishDate) : undefined
        }
    }

    static toDto(training: Training): TrainingDto {
        return {
            observations: training.observations,

            muscleGroups: training.muscleGroups,
            creationDate:  DateAdapter.toDto(training.creationDate),
            finishDate: training.finishDate ? DateAdapter.toDto(training.finishDate) : undefined
        }
    }
}

export class TrainingExerciseAdapter {
    static toState(trainingExercise: TrainingExerciseDto, id: string, exerciseTemplate: Exercise, exerciseSeries: TrainingExerciseSerie[]): TrainingExercise {
        return {
            id: id,
            exerciseTemplate: exerciseTemplate,
            series: exerciseSeries,
        }
    }

    static toDto(trainingExercise: TrainingExercise, exerciseTemplateId: DocumentReference): TrainingExerciseDto {
        return {
            exerciseTemplateId: exerciseTemplateId,
        }
    }
}

export class TrainingExerciseSerieAdapter {
    static toState(trainingExerciseSerie: TrainingExerciseSerieDto, id: string): TrainingExerciseSerie {
        return {
            ...trainingExerciseSerie,
            id: id,
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