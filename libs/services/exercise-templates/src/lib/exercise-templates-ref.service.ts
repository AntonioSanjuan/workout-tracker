import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'

@Injectable()
export class ExerciseTemplatesRefService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    public getExerciseTemplatesCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/exerciseTemplates`)
    }

    public getExerciseTemplateDocRef(userId: string, trainingExerciseId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/exerciseTemplates/${trainingExerciseId}`)
    }
}