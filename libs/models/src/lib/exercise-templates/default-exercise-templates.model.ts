import { ExerciseEquipment } from "./exercise-template-equipments.model";
import { ExerciseType } from "./exercise-template-types.model";
import { ExerciseTemplate } from "./exercise-template.model";
import { MusclesInvolved } from "./muscles-involved.model";

export const defaultBackExerciseTemplates = [
    {
        name: 'Pull-ups',
        musclesInvolved: [MusclesInvolved.Lats],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.None
    },
    {
        name: 'Machine Pull-ups',
        musclesInvolved: [MusclesInvolved.Lats],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Barbell Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel
    },
    {
        name: 'Dumbbell Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Machine Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Machine Lower Back',
        musclesInvolved: [MusclesInvolved.Lower_back],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Dumbbell Pullover',
        musclesInvolved: [MusclesInvolved.Lats],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Seated Cable Rows',
        musclesInvolved: [MusclesInvolved.Lats],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Cable
    },
    {
        name: 'Deadlift',
        musclesInvolved: [MusclesInvolved.Lower_back],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel
    },
    {
        name: 'Lat Pulldown',
        musclesInvolved: [MusclesInvolved.Lats],
        type: ExerciseType.Strength
    },
] as ExerciseTemplate[]

export const defaultLegExerciseTemplates = [
    {
        name: 'Barbell Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel

    },
    {
        name: 'Leg Press',
        musclesInvolved: [MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Lunges',
        musclesInvolved: [MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.None
    },
    {
        name: 'Dumbell Lunges',
        musclesInvolved: [MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Deadlift',
        musclesInvolved: [MusclesInvolved.Hamstrings, MusclesInvolved.Glutes],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel
    },
    {
        name: 'Leg Extensions',
        musclesInvolved: [MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Leg Curls',
        musclesInvolved: [MusclesInvolved.Hamstrings],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Bulgarian Split Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.None
    },
    {
        name: 'Dumbell Bulgarian Split Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Machine Calf Raises',
        musclesInvolved: [MusclesInvolved.Calves],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Machine Hip Adduction',
        musclesInvolved: [MusclesInvolved.Adductors],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Machine Hip Abductors',
        musclesInvolved: [MusclesInvolved.Abductors],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
] as ExerciseTemplate[]

export const defaultChestExerciseTemplates = [
    {
        name: 'Barbel Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel
    },
    {
        name: 'Barbel Incline Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel
    },
    {
        name: 'Barbel Decline Bench Press',
        musclesInvolved: [MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Barbel
    },
    {
        name: 'Dumbell Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Dumbell Incline Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Dumbell Decline Bench Press',
        musclesInvolved: [MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Dumbbell Flyes',
        musclesInvolved: [MusclesInvolved.Upper_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Dips',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Dumbbell Pullover',
        musclesInvolved: [MusclesInvolved.Upper_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Dumbbell Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Push-ups',
        musclesInvolved: [MusclesInvolved.Upper_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.None
    },
    {
        name: 'Machine Chest Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Cable Crossovers',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Cable
    },
] as ExerciseTemplate[]

export const defaultShoulderExerciseTemplates = [
    {
        name: 'Machine Shoulder Press',
        musclesInvolved: [MusclesInvolved.Medial_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    },
    {
        name: 'Dumbbell Lateral Raises',
        musclesInvolved: [MusclesInvolved.Medial_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Cable Lateral Raises',
        musclesInvolved: [MusclesInvolved.Medial_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Cable
    },
    {
        name: 'Dumbbell Front Raises',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Cable Face Pull',
        musclesInvolved: [MusclesInvolved.Posterior_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Cable
    },
    {
        name: 'Dumbbell Shoulder Press',
        musclesInvolved: [MusclesInvolved.Medial_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Dumbell
    },
    {
        name: 'Machine Shoulder Press',
        musclesInvolved: [MusclesInvolved.Medial_deltoid],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.Machine
    }
] as ExerciseTemplate[]

export const defaultCardioExerciseTemplates = [
    {
        name: 'Running',
        musclesInvolved: [MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular,
        equipment: ExerciseEquipment.None
    },
    {
        name: 'Rowing',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular,
        equipment: ExerciseEquipment.Machine
    }
] as ExerciseTemplate[]

export const defaultCoreExerciseTemplates = [
    {
        name: 'Ab Wheel Rollout',
        musclesInvolved: [MusclesInvolved.Abdominals],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.AbWWheel
    },
    {
        name: 'Ab Scissors',
        musclesInvolved: [MusclesInvolved.Abdominals],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.None
    },
    {
        name: 'Plank',
        musclesInvolved: [MusclesInvolved.Abdominals],
        type: ExerciseType.Strength,
        equipment: ExerciseEquipment.None
    }
] as ExerciseTemplate[]

export const defaultExerciseTemplates = [
    ...defaultBackExerciseTemplates,
    ...defaultLegExerciseTemplates,
    ...defaultChestExerciseTemplates,
    ...defaultShoulderExerciseTemplates,
    ...defaultCardioExerciseTemplates,
    ...defaultCoreExerciseTemplates
] as ExerciseTemplate[]