import { createFeatureSelector } from "@ngrx/store";
import { WorkoutTrainingState } from "./models/workoutTrainingsState.model";
import { WORKOUT_TRAININGS_FEATURE_KEY } from "./workout-trainings-templates.reducer";

export const selectWorkoutTrainingFeature = createFeatureSelector<WorkoutTrainingState>(WORKOUT_TRAININGS_FEATURE_KEY);
