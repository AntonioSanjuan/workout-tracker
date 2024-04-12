import { createFeatureSelector } from "@ngrx/store";
import { ExerciseTemplatesHubState } from "./models/exerciseTemplatesHubState.model";
import { EXERCISE_TEMPLATES_HUB_FEATURE_KEY } from "./exercise-templates-hub.reducer";

export const selectExerciseTemplatesHubFeature = createFeatureSelector<ExerciseTemplatesHubState>(EXERCISE_TEMPLATES_HUB_FEATURE_KEY);
