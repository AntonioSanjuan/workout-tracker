import { TrainingExercise } from "@workout-tracker/models";

export class TrainingExerciseMetrics {
    public static getMaxSerieWeight = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.length > 0 ? Math.max(...trainingExercise.series.map((serie) => serie.weight)): 0
    }
    public static getTotalWeight = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.weight * currentValue.repetitions)
        },0);
    }
    public static getTotalTime = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.weight 
        },0);
    }
    public static getTotalDistance = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.weight 
        },0);
    }
}