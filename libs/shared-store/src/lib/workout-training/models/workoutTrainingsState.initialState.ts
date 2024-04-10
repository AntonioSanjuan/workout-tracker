import { TRAININGS_LIST_FEATURE_KEY, trainingsListInitialState } from "../../trainings-list";
import { WorkoutTrainingState } from "./workoutTrainingsState.model";

export const workoutTrainingsInitialState: WorkoutTrainingState = {
    [TRAININGS_LIST_FEATURE_KEY]: trainingsListInitialState
  }