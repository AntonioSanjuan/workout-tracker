import { TRAININGS_FEATURE_KEY, trainingsInitialState } from "../../trainings";
import { WorkoutTrainingState } from "./workoutTrainingsState.model";

export const workoutTrainingsInitialState: WorkoutTrainingState = {
    [TRAININGS_FEATURE_KEY]: trainingsInitialState
  }