import { initialWorkoutExerciseTemplatesState } from "../../models/workoutExerciseTemplatesState.initialState";
import { WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY } from "../../workout-exercise-templates.reducer";

export const workoutExerciseTemplatesAppStateMock = {
    [WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY]: initialWorkoutExerciseTemplatesState
}