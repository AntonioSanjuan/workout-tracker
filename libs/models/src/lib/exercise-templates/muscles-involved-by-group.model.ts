import { MuscleGroups } from "./muscle-groups.model";
import { MusclesInvolved } from "./muscles-involved.model";

export const muscleInvolvedByGroups: { [key in MuscleGroups]: MusclesInvolved[] } = {
    [MuscleGroups.Chest]: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Serratus_anterior],
    [MuscleGroups.Back]: [MusclesInvolved.Lower_back, MusclesInvolved.Middle_back, MusclesInvolved.Upper_back],
    [MuscleGroups.Legs]: [MusclesInvolved.Abductors, MusclesInvolved.Adductors, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
    [MuscleGroups.Arms]: [MusclesInvolved.Biceps, MusclesInvolved.Triceps, MusclesInvolved.Forearms],
    [MuscleGroups.Shoulder]: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Posterior_deltoid],
    [MuscleGroups.Core]: [MusclesInvolved.Abdominals, MusclesInvolved.Obliques],
    [MuscleGroups.Cardio]: [MusclesInvolved.Heart, MusclesInvolved.Lungs],
};