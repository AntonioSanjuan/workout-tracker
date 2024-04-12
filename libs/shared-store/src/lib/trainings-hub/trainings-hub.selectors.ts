import { createFeatureSelector } from "@ngrx/store";
import { TrainingsHubState } from "./models/trainingsHubState.model";
import { TRAININGS_HUB_FEATURE_KEY } from "./trainings-hub.reducer";

export const selectTrainingsHubFeature = createFeatureSelector<TrainingsHubState>(TRAININGS_HUB_FEATURE_KEY);
