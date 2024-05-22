import { MuscleGroups } from "./muscle-groups.model";
import { MusclesInvolved } from "./muscles-involved.model";

export const muscleInvolvedByGroups: { [key in MuscleGroups]: MusclesInvolved[] } = {
    [MuscleGroups.Chest]: [MusclesInvolved.Pectoralis_major, MusclesInvolved.Pectoralis_minor, MusclesInvolved.Serratus_anterior],
    [MuscleGroups.Back]: [MusclesInvolved.Lower_back, MusclesInvolved.Middle_back, MusclesInvolved.Upper_back],
    [MuscleGroups.Legs]: [MusclesInvolved.Abductors, MusclesInvolved.Adductors, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
    [MuscleGroups.Arms]: [MusclesInvolved.Biceps, MusclesInvolved.Triceps, MusclesInvolved.Forearms],
    [MuscleGroups.Shoulder]: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Posterior_deltoid],
    [MuscleGroups.Core]: [MusclesInvolved.Abdominals],
    [MuscleGroups.Cardio]: [MusclesInvolved.Bicycle, MusclesInvolved.Elliptical, MusclesInvolved.Treadmill],
};