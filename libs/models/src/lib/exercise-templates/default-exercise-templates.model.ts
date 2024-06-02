import { ExerciseTemplate } from "./exercise-template.model";
import { MusclesInvolved } from "./muscles-involved.model";

export const defaultBackExerciseTemplates = [
    {
        name: 'Pull-ups',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
    },
    {
        name: 'Barbell Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Lower_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
    },
    {
        name: 'Dumbbell Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
    },
    {
        name: 'Dumbbell Pullover',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Serratus_anterior, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest],
    },
    {
        name: 'Seated Cable Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
    },
    {
        name: 'Deadlift',
        musclesInvolved: [MusclesInvolved.Lower_back, MusclesInvolved.Hamstrings, MusclesInvolved.Glutes, MusclesInvolved.Traps, MusclesInvolved.Forearms, MusclesInvolved.Lats],
    },
    {
        name: 'Inverted Rows',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps],
    },
    {
        name: 'Lat Pulldown',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
    },
    {
        name: 'Superman',
        musclesInvolved: [MusclesInvolved.Lower_back, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings],
    },
] as ExerciseTemplate[]

export const defaultLegExerciseTemplates = [
    {
        name: 'Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Lower_back, MusclesInvolved.Abdominals, MusclesInvolved.Calves],
    },
    {
        name: 'Leg Press',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
    },
    {
        name: 'Lunges',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Abdominals],
    },
    {
        name: 'Romanian Deadlift',
        musclesInvolved: [MusclesInvolved.Hamstrings, MusclesInvolved.Glutes, MusclesInvolved.Lower_back, MusclesInvolved.Calves, MusclesInvolved.Forearms],
    },
    {
        name: 'Leg Extensions',
        musclesInvolved: [MusclesInvolved.Quadriceps],
    },
    {
        name: 'Leg Curls',
        musclesInvolved: [MusclesInvolved.Hamstrings],
    },
    {
        name: 'Bulgarian Split Squats',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Abdominals],
    },
    {
        name: 'Calf Raises',
        musclesInvolved: [MusclesInvolved.Calves],
    },
    {
        name: 'Step-ups',
        musclesInvolved: [MusclesInvolved.Quadriceps, MusclesInvolved.Glutes, MusclesInvolved.Hamstrings, MusclesInvolved.Calves],
    },
    {
        name: 'Machine Hip Adduction',
        musclesInvolved: [MusclesInvolved.Adductors],
    },
] as ExerciseTemplate[]

export const defaultChestExerciseTemplates = [
    {
        name: 'Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Incline Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Decline Bench Press',
        musclesInvolved: [MusclesInvolved.Lower_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Dumbbell Flyes',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Dips',
        musclesInvolved: [MusclesInvolved.Lower_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Dumbbell Pullover',
        musclesInvolved: [MusclesInvolved.Lats, MusclesInvolved.Serratus_anterior, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest],
    },
    {
        name: 'Dumbbell Bench Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Push-ups',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid, MusclesInvolved.Abdominals],
    },
    {
        name: 'Machine Chest Press',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Triceps, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Cable Crossovers',
        musclesInvolved: [MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lower_chest, MusclesInvolved.Anterior_deltoid],
    },
] as ExerciseTemplate[]

export const defaultShoulderExerciseTemplates = [
    {
        name: 'Military Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
    },
    {
        name: 'Dumbbell Lateral Raises',
        musclesInvolved: [MusclesInvolved.Medial_deltoid, MusclesInvolved.Traps],
    },
    {
        name: 'Cable Lateral Raises',
        musclesInvolved: [MusclesInvolved.Medial_deltoid, MusclesInvolved.Traps],
    },
    {
        name: 'Front Raises',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Upper_chest],
    },
    {
        name: 'Rear Delt Flyes',
        musclesInvolved: [MusclesInvolved.Posterior_deltoid, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back],
    },
    {
        name: 'Shrugs',
        musclesInvolved: [MusclesInvolved.Traps, MusclesInvolved.Forearms],
    },
    {
        name: 'Arnold Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
    },
    {
        name: 'Dumbbell Shoulder Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
    },
    {
        name: 'Face Pull',
        musclesInvolved: [MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Posterior_deltoid, MusclesInvolved.Traps],
    },
    {
        name: 'Machine Shoulder Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps],
    },
    {
        name: 'Barbell Shoulder Press',
        musclesInvolved: [MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Upper_back],
    },
] as ExerciseTemplate[]

export const defaultCardioExerciseTemplates = [
    {
        name: 'Running',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
    },
    {
        name: 'Cycling',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
    },
    {
        name: 'Swimming',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest, MusclesInvolved.Lats, MusclesInvolved.Triceps, MusclesInvolved.Biceps],
    },
    {
        name: 'Rowing',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Lats, MusclesInvolved.Upper_back, MusclesInvolved.Middle_back, MusclesInvolved.Lower_back, MusclesInvolved.Biceps, MusclesInvolved.Forearms],
    },
    {
        name: 'Jump Rope',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Calves, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Glutes, MusclesInvolved.Forearms],
    },
    {
        name: 'Elliptical',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
    },
    {
        name: 'Stair Climbing',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
    },
    {
        name: 'Sprinting',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes],
    },
    {
        name: 'Burpees',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Quadriceps, MusclesInvolved.Hamstrings, MusclesInvolved.Calves, MusclesInvolved.Glutes, MusclesInvolved.Abdominals, MusclesInvolved.Upper_chest, MusclesInvolved.Middle_chest],
    },
    {
        name: 'Battle Ropes',
        musclesInvolved: [MusclesInvolved.Lungs, MusclesInvolved.Heart, MusclesInvolved.Anterior_deltoid, MusclesInvolved.Triceps, MusclesInvolved.Abdominals],
    },
] as ExerciseTemplate[]

export const defaultCoreExerciseTemplates = [
    {
        name: 'Plank',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Lower_back, MusclesInvolved.Glutes],
    },
    {
        name: 'Russian Twists',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Obliques],
    },
    {
        name: 'Hanging Leg Raises',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
    },
    {
        name: 'Bicycle Crunches',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Obliques],
    },
    {
        name: 'Mountain Climbers',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps, MusclesInvolved.Anterior_deltoid, MusclesInvolved.Medial_deltoid],
    },
    {
        name: 'V-Ups',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
    },
    {
        name: 'Side Plank',
        musclesInvolved: [MusclesInvolved.Obliques, MusclesInvolved.Abdominals],
    },
    {
        name: 'Ab Wheel Rollouts',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Lower_back, MusclesInvolved.Anterior_deltoid],
    },
    {
        name: 'Dead Bug',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
    },
    {
        name: 'Flutter Kicks',
        musclesInvolved: [MusclesInvolved.Abdominals, MusclesInvolved.Quadriceps],
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