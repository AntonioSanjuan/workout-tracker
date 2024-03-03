import { MuscleGroups } from "./muscleGroups.model";
import { MusclesInvolved } from "./musclesInvolved.model";

export const muscleInvolvedByGroups: { [key in MuscleGroups]: MusclesInvolved[] } = {
    [MuscleGroups.Chest]: [MusclesInvolved.Chest],
    [MuscleGroups.Back]: [MusclesInvolved.Lower_back, MusclesInvolved.Middle_back],
    [MuscleGroups.Legs]: [MusclesInvolved.Abductors, MusclesInvolved.Adductors, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
    [MuscleGroups.Arms]: [MusclesInvolved.Biceps, MusclesInvolved.Triceps, MusclesInvolved.Forearms],
    [MuscleGroups.Shoulder]: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Posterior_deltoid],
    [MuscleGroups.Core]: [MusclesInvolved.Abdominals]
};

export const getMuscleInvolvedGroup = (muscleInvolved: MusclesInvolved): MuscleGroups | undefined => {
    return Object.keys(muscleInvolvedByGroups).find(group => muscleInvolvedByGroups[group as MuscleGroups].includes(muscleInvolved)) as MuscleGroups;
}