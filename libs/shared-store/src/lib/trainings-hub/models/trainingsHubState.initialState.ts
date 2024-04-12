import { TRAININGS_LIST_FEATURE_KEY, trainingsListInitialState } from "../../trainings-list";
import { TrainingsHubState } from "./trainingsHubState.model";

export const trainingsHubInitialState: TrainingsHubState = {
    [TRAININGS_LIST_FEATURE_KEY]: trainingsListInitialState
  }