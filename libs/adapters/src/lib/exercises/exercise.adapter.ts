import { Exercise, ExerciseDto } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { DateAdapter } from "../date/date.adapter";

export class ExerciseAdapter {
    static toState(exercise: ExerciseDto, exerciseId: string): Exercise {
        return {
            ...exercise,
            id: exerciseId,
            creationDate: DateAdapter.toState(exercise.creationDate),
            lastModification: exercise.lastModification ? DateAdapter.toState(exercise.lastModification) : undefined 
        }
    }

    static toDto(exercise: Exercise): ExerciseDto {
        return {
            name: exercise.name,
            musclesInvolved: exercise.musclesInvolved,
            image: exercise.image,
            observations: exercise.observations,
            creationDate: DateAdapter.toDto(exercise.creationDate),
            lastModification: exercise.lastModification ? DateAdapter.toDto(exercise.lastModification) : undefined
        }
    }
}