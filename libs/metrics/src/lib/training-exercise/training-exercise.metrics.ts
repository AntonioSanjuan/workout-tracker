import { CardiovascularTypeData, StrengthTypeData, TrainingExercise } from "@workout-tracker/models";

export class TrainingExerciseMetrics {
    public static getMaxSerieWeight = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.length > 0 ? Math.max(...trainingExercise.series.map((serie) => (serie.data as StrengthTypeData).weight)): 0
    }
    public static getTotalWeight = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.reduce((accumulator, currentValue) => {
            return accumulator + ((currentValue.data as StrengthTypeData).weight * (currentValue.data as StrengthTypeData).repetitions)
        },0);
    }
    public static getTotalTime = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.data as CardiovascularTypeData).speed
        },0);
    }
    public static getTotalDistance = (trainingExercise: TrainingExercise): number => {
        return trainingExercise.series.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.data as CardiovascularTypeData).duration
        },0);
    }
}