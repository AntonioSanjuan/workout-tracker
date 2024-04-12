import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY, exerciseTemplatesListInitialState } from "../../exercise-templates-list";
import { ExerciseTemplatesHubState } from "./exerciseTemplatesHubState.model";

export const exerciseTemplatesHubInitialState: ExerciseTemplatesHubState = {
    [EXERCISE_TEMPLATES_LIST_FEATURE_KEY]: exerciseTemplatesListInitialState
  }