import { Pipe, PipeTransform } from "@angular/core";
import { ExerciseType } from "@workout-tracker/models";

export const defaultImageByExerciseType: { [key in ExerciseType]: string } = {
    [ExerciseType.Cardiovascular]: "assets/images/defaultExerciseTemplateImgs/exerciseType_cardiovascular.jpg" ,
    [ExerciseType.Strength]: "assets/images/defaultExerciseTemplateImgs/exerciseType_strength.jpg" 
}

@Pipe({
    name: 'defaultExerciseTemplateImage',
    pure: false,
    standalone: true
  })
  export class DefaultExerciseTemplateImagePipe implements PipeTransform {

    transform(value: string | undefined, exerciseType: ExerciseType): string {
        return value ?? this.getDefaultImageByExerciseType(exerciseType);
    }

    private getDefaultImageByExerciseType(exerciseType: ExerciseType): string {
        return defaultImageByExerciseType[exerciseType]
    }

    
  
  }