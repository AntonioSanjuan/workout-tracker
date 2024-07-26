import { ExerciseTemplate, ExerciseTemplateDto } from "@workout-tracker/models";
import { DateAdapter } from "../date/date.adapter";

export class ExerciseTemplateAdapter {
    static toState(exerciseTemplate: ExerciseTemplateDto, exerciseTemplateId: string): ExerciseTemplate {
        return {
            ...exerciseTemplate,
            id: exerciseTemplateId,
            creationDate: DateAdapter.toState(exerciseTemplate.creationDate),
            lastModification: exerciseTemplate.lastModification ? DateAdapter.toState(exerciseTemplate.lastModification) : undefined 
        }
    }

    static toDto(exerciseTemplate: ExerciseTemplate): ExerciseTemplateDto {
        return {
            name: exerciseTemplate.name,
            musclesInvolved: exerciseTemplate.musclesInvolved,
            image: exerciseTemplate.image,
            type: exerciseTemplate.type,
            equipment: exerciseTemplate.equipment,
            observations: exerciseTemplate.observations,
            creationDate: DateAdapter.toDto(exerciseTemplate.creationDate),
            lastModification: exerciseTemplate.lastModification ? DateAdapter.toDto(exerciseTemplate.lastModification) : undefined
        }
    }
}