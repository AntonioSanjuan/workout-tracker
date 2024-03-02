import { Exercise, ExerciseDto } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';

export class ExerciseAdapter {
    static toState(exercise: ExerciseDto, exerciseId: string): Exercise {
        return {
            ...exercise,
            id: exerciseId,
            creationDate: exercise.creationDate.toDate(),
            lastModification: exercise.lastModification?.toDate()
        }
    }

    static toDto(exercise: Exercise): ExerciseDto {
        return {
            name: exercise.name,
            musclesInvolved: exercise.musclesInvolved,
            image: exercise.image,
            creationDate: Timestamp.fromDate(exercise.creationDate),
            lastModification: exercise.lastModification ? Timestamp.fromDate(exercise.lastModification) : undefined
        }
    }
}