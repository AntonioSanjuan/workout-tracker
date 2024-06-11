import { ExerciseType } from "./exercise-template-types.model";
import { ExerciseTemplate } from "./exercise-template.model";
import { MusclesInvolved } from "./muscles-involved.model";

export const defaultBackExerciseTemplates = [
    {
        name: 'Pull-ups',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Barbell Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Lower_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Pullover',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Serratus_anterior, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest],
        type: ExerciseType.Strength
    },
    {
        name: 'Seated Cable Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Deadlift',
        musclesInvolved: [MusclesInvolved.Lower_back, MusclesInvolved.Hamstrings, MusclesInvolved.Glutes, MusclesInvolved.Traps, MusclesInvolved.Forearms, MusclesInvolved.Lats],
        type: ExerciseType.Strength
    },
    {
        name: 'Inverted Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps],
        type: ExerciseType.Strength
    },
    {
        name: 'Lat Pulldown',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Superman',
        musclesInvolved: [MusclesInvolved.Lower_back, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings],
        type: ExerciseType.Strength
    },
] as ExerciseTemplate[]

export const defaultLegExerciseTemplates = [
    {
        name: 'Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Lower_back, MusclesInvolved.Abdominals, MusclesInvolved.Calves],
        type: ExerciseType.Strength
    },
    {
        name: 'Leg Press',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
        type: ExerciseType.Strength
    },
    {
        name: 'Lunges',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Abdominals],
        type: ExerciseType.Strength
    },
    {
        name: 'Romanian Deadlift',
        musclesInvolved: [MusclesInvolved.Hamstrings, MusclesInvolved.Glutes, MusclesInvolved.Lower_back, MusclesInvolved.Calves, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Leg Extensions',
        musclesInvolved: [MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength
    },
    {
        name: 'Leg Curls',
        musclesInvolved: [MusclesInvolved.Hamstrings],
        type: ExerciseType.Strength
    },
    {
        name: 'Bulgarian Split Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Abdominals],
        type: ExerciseType.Strength
    },
    {
        name: 'Calf Raises',
        musclesInvolved: [MusclesInvolved.Calves],
        type: ExerciseType.Strength
    },
    {
        name: 'Step-ups',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
        type: ExerciseType.Strength
    },
    {
        name: 'Machine Hip Adduction',
        musclesInvolved: [MusclesInvolved.Adductors],
        type: ExerciseType.Strength
    },
] as ExerciseTemplate[]

export const defaultChestExerciseTemplates = [
    {
        name: 'Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Incline Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Decline Bench Press',
        musclesInvolved: [MusclesInvolved.Lower_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Flyes',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Dips',
        musclesInvolved: [MusclesInvolved.Lower_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Pullover',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Serratus_anterior, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Push-ups',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid, MusclesInvolved.Abdominals],
        type: ExerciseType.Strength
    },
    {
        name: 'Machine Chest Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Cable Crossovers',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
] as ExerciseTemplate[]

export const defaultShoulderExerciseTemplates = [
    {
        name: 'Military Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Lateral Raises',
        musclesInvolved: [MusclesInvolved.Medial_deltoid, MusclesInvolved.Traps],
        type: ExerciseType.Strength
    },
    {
        name: 'Cable Lateral Raises',
        musclesInvolved: [MusclesInvolved.Medial_deltoid, MusclesInvolved.Traps],
        type: ExerciseType.Strength
    },
    {
        name: 'Front Raises',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Upper_chest],
        type: ExerciseType.Strength
    },
    {
        name: 'Rear Delt Flyes',
        musclesInvolved: [MusclesInvolved.Posterior_deltoid, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back],
        type: ExerciseType.Strength
    },
    {
        name: 'Shrugs',
        musclesInvolved: [MusclesInvolved.Traps, MusclesInvolved.Forearms],
        type: ExerciseType.Strength
    },
    {
        name: 'Arnold Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength
    },
    {
        name: 'Dumbbell Shoulder Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength
    },
    {
        name: 'Face Pull',
        musclesInvolved: [MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Posterior_deltoid, MusclesInvolved.Traps],
        type: ExerciseType.Strength
    },
    {
        name: 'Machine Shoulder Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps],
        type: ExerciseType.Strength
    },
    {
        name: 'Barbell Shoulder Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
        type: ExerciseType.Strength
    },
] as ExerciseTemplate[]

export const defaultCardioExerciseTemplates = [
    {
        name: 'Running',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Cycling',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Swimming',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lats, MusclesInvolved.Triceps, MusclesInvolved.Biceps],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Rowing',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Lower_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Jump Rope',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Calves, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Glutes, MusclesInvolved.Forearms],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Elliptical',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Stair Climbing',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Sprinting',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
        type: ExerciseType.Cardiovascular
    },
    {
        name: 'Burpees',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes, MusclesInvolved.Abdominals, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest],
        type: ExerciseType.Strength
    },
    {
        name: 'Battle Ropes',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Anterior_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Abdominals],
        type: ExerciseType.Cardiovascular
    },
] as ExerciseTemplate[]

export const defaultCoreExerciseTemplates = [
    {
        name: 'Plank',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Lower_back, MusclesInvolved.Glutes],
        type: ExerciseType.Strength
    },
    {
        name: 'Russian Twists',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Obliques],
        type: ExerciseType.Strength
    },
    {
        name: 'Hanging Leg Raises',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength
    },
    {
        name: 'Bicycle Crunches',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Obliques],
        type: ExerciseType.Strength
    },
    {
        name: 'Mountain Climbers',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps, MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'V-Ups',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength
    },
    {
        name: 'Side Plank',
        musclesInvolved: [MusclesInvolved.Obliques, MusclesInvolved.Abdominals],
        type: ExerciseType.Strength
    },
    {
        name: 'Ab Wheel Rollouts',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Lower_back, MusclesInvolved.Anterior_deltoid],
        type: ExerciseType.Strength
    },
    {
        name: 'Dead Bug',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength
    },
    {
        name: 'Flutter Kicks',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
        type: ExerciseType.Strength
    },
] as ExerciseTemplate[]

export const defaultExerciseTemplates = [
    ...defaultBackExerciseTemplates,
    ...defaultLegExerciseTemplates,
    ...defaultChestExerciseTemplates,
    ...defaultShoulderExerciseTemplates,
    ...defaultCardioExerciseTemplates,
    ...defaultCoreExerciseTemplates
] as ExerciseTemplate[]