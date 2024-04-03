import { MuscleGroups, MusclesInvolved, muscleInvolvedByGroups } from "@workout-tracker/models";

export class ExerciseMetrics {
    public static getMuscleInvolvedGroup = (muscleInvolved: MusclesInvolved): MuscleGroups | undefined => {
        return Object.keys(muscleInvolvedByGroups).find(group => muscleInvolvedByGroups[group as MuscleGroups].includes(muscleInvolved)) as MuscleGroups;
    }
}