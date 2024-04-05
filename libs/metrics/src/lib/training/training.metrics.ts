import { MuscleGroups, MusclesInvolved, Training, TrainingExercise } from "@workout-tracker/models";
import { ExerciseTemplateMetrics } from "../exercise-template";
export interface MuscleGroupExercises {
    muscleGroup: MuscleGroups,
    numberOfExercises: number
  }

export class TrainingMetrics {
    public static getTrainingMuscleGroupExercises(training: Training): MuscleGroupExercises[] {
        const counter: { [key in MuscleGroups]: number } = {} as { [key in MuscleGroups]: number };
        const muscleGroupExercises: MuscleGroupExercises[] = []

        //to-do refactor
        if (training.trainingExercises) {
            training.trainingExercises.forEach((trainingExercise: TrainingExercise) => {
                trainingExercise.exerciseTemplate.musclesInvolved.forEach((muscleInvolved: MusclesInvolved) => {
                    const muscleInvolvedGroup = ExerciseTemplateMetrics.getMuscleInvolvedGroup(muscleInvolved);
                    if (muscleInvolvedGroup) {
                      (counter[muscleInvolvedGroup]) = (counter[muscleInvolvedGroup] || 0) + 1;
                    }
                });
            });
    
            for (const [muscleGroup, numberOfExercises] of Object.entries(counter)) {
                muscleGroupExercises.push({ muscleGroup: muscleGroup as MuscleGroups, numberOfExercises });
            }
        }

        return muscleGroupExercises
    }
}