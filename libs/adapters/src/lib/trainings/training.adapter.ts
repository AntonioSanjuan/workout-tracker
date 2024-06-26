import { DocumentReference } from "@angular/fire/compat/firestore";
import {ExerciseTemplate, Training, TrainingDto, TrainingExerciseSerie, TrainingExerciseDto, TrainingExerciseSerieDto, TrainingExercise } from "@workout-tracker/models";
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
    static toState(trainingExercise: TrainingExerciseDto, id: string, exerciseTemplate: ExerciseTemplate, exerciseSeries: TrainingExerciseSerie[]): TrainingExercise {
        return {
            id: id,
            exerciseTemplate: exerciseTemplate,
            series: exerciseSeries,
            creationDate: DateAdapter.toState(trainingExercise.creationDate),
        }
    }

    static toDto(trainingExercise: TrainingExercise, exerciseTemplateId: DocumentReference): TrainingExerciseDto {
        return {
            exerciseTemplateId: exerciseTemplateId,
            creationDate:  DateAdapter.toDto(trainingExercise.creationDate),
        }
    }
}

export class TrainingExerciseSerieAdapter {
    static toState(trainingExerciseSerie: TrainingExerciseSerieDto, id: string): TrainingExerciseSerie {
        return {
            ...trainingExerciseSerie,
            id: id,
            creationDate: DateAdapter.toState(trainingExerciseSerie.creationDate),
        }
    }

    static toDto(trainingExerciseSerie: TrainingExerciseSerie): TrainingExerciseSerieDto {
        return {
            data: trainingExerciseSerie.data,
            observations: trainingExerciseSerie.observations,
            creationDate:  DateAdapter.toDto(trainingExerciseSerie.creationDate),
        }
    }
}