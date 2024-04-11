import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'
import { ExerciseTemplateAdapter } from "@workout-tracker/adapters";
import { ExerciseTemplate, ExerciseTemplateDto } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, from, map } from "rxjs";
import { ExerciseTemplatesRefService } from "./exercise-templates-ref.service";

@Injectable()
export class ExerciseTemplatesService {
    private exerciseTemplatesRefService: ExerciseTemplatesRefService = inject(ExerciseTemplatesRefService)

    public getExerciseTemplate(userId: string, exerciseId: string): Observable<ExerciseTemplate> {
        return from(this.exerciseTemplatesRefService.getExerciseTemplateDocRef(userId, exerciseId).get()).pipe(
            map((doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
                return ExerciseTemplateAdapter.toState({...doc.data() as ExerciseTemplateDto}, doc.id);
            })
        )
    }

    public getExerciseTemplates(userId: string): Observable<ExerciseTemplate[]> {
        return this.exerciseTemplatesRefService.getExerciseTemplatesCollectionRef(userId).get().pipe(
            map((querySnapshot: firebase.firestore.QuerySnapshot) => {
                return querySnapshot.docs.map((doc) => {
                    return ExerciseTemplateAdapter.toState({...doc.data() as ExerciseTemplateDto}, doc.id);
                })
            })
        )
    }

    public setExerciseTemplate(userId: string, exercise: ExerciseTemplate): Observable<ExerciseTemplate> {
        const exerciseInput = ExerciseTemplateAdapter.toDto(exercise);
        return from(this.exerciseTemplatesRefService.getExerciseTemplatesCollectionRef(userId).add(exerciseInput)).pipe(
            map((doc: DocumentReference<firebase.firestore.DocumentData>) => {
                return ExerciseTemplateAdapter.toState({...exerciseInput as ExerciseTemplateDto}, doc.id);
            })
        )
    }

    public updateExerciseTemplate(userId: string, exercise: ExerciseTemplate): Observable<ExerciseTemplate> {
        exercise.lastModification = new Date()
        const exerciseInput = ExerciseTemplateAdapter.toDto(exercise);

        return from(this.exerciseTemplatesRefService.getExerciseTemplateDocRef(userId, exercise.id).update(exerciseInput)).pipe(
            map(() => {
                return {...exercise}
            })
        )
    }

    public deleteExerciseTemplate(userId: string, exercise: ExerciseTemplate): Observable<boolean> {
        return from(this.exerciseTemplatesRefService.getExerciseTemplateDocRef(userId, exercise.id).delete()).pipe(
            map(() => true)
        )
    }
}