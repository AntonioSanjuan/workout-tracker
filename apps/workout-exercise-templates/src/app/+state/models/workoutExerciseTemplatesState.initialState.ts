import { WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY, initialWorkoutExerciseTemplateDetailsState } from "../../workout-exercise-template/state/workout-exercise-template.reducer";
import { exerciseTemplatesHubInitialState } from '@workout-tracker/shared-store'
import { WorkoutExerciseTemplatesState } from "./workoutExerciseTemplatesState.model";

export const initialWorkoutExerciseTemplatesState: WorkoutExerciseTemplatesState = {
    ...exerciseTemplatesHubInitialState,
    // set initial required properties
    [WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY]: initialWorkoutExerciseTemplateDetailsState
}
