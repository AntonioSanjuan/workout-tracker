import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument, DocumentData, QueryFn, QueryGroupFn } from '@angular/fire/compat/firestore'
import { DateAdapter } from "@workout-tracker/adapters";
import { TrainingQuery } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';

@Injectable()
export class TrainingsRefService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getTrainingsPaginatedQuery(trainingQuery: TrainingQuery): QueryFn {
        const trainingsPaginatedQuery: QueryFn = ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

            //filters
            if (trainingQuery.filters.betweenDates) { 
                console.log("trainingQuery.filters.betweenDates", trainingQuery.filters.betweenDates)
                query = query.where('creationDate', ">=", DateAdapter.toDto(trainingQuery.filters.betweenDates.fromDate)).where('creationDate', "<=",  DateAdapter.toDto(trainingQuery.filters.betweenDates.toDate)) 
            }
            if (trainingQuery.filters.muscleGroups.length) { 
                console.log("trainingQuery.filters.muscleGroups", trainingQuery.filters.muscleGroups)
                query = query.where('muscleGroups', "array-contains-any", trainingQuery.filters.muscleGroups) 
                
            }

            // Aplicar ordenamiento
            query = query
                .limit(trainingQuery.pagination.pageElements)
                .orderBy('creationDate', 'desc')

            //pagination
            if (trainingQuery.pagination.lastElement) { 
                query = query.startAfter(DateAdapter.toDto(trainingQuery.pagination.lastElement.creationDate)) 
            }
            
            return query
        }
        return trainingsPaginatedQuery;
    }
    
    public getTrainingsCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings`)
    }

    public getTrainingsPaginatedCollectionRef(userId: string, trainingQuery: TrainingQuery): AngularFirestoreCollection {
        const firestoreQuery = this.getTrainingsPaginatedQuery(trainingQuery)
        return this.firebaseDataBase.collection(`user/${userId}/trainings`, firestoreQuery)
    }

    public getTrainingExercisesCollectionRef(userId: string, trainingId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings/${trainingId}/exercises`)
    }

    public getTrainingExerciseSeriesCollectionRef(userId: string, trainingId: string, trainingExerciseId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series`)
    }

    public getTrainingDocRef(userId: string, trainingId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}`)
    }

    public getTrainingExerciseDocRef(userId: string, trainingId: string, trainingExerciseId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}`)
    }

    public getTrainingExerciseSerieDocRef(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerieId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series/${trainingExerciseSerieId}`)
    }

    public getExerciseTemplateTrainingExercisesDocRefs(userId: string, exerciseTemplateId: string, exerciseTemplateRef: AngularFirestoreDocument): AngularFirestoreCollectionGroup {
        console.log("ref",`/user/${userId}/exerciseTemplates/${exerciseTemplateId}`)
        const exerciseTemplateTrainingExercisesQuery: QueryGroupFn<DocumentData> = ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref
            query = query.where('exerciseTemplateId', "==", exerciseTemplateRef.ref) 
            query = query.limit(5)

            return query;
        }
        return this.firebaseDataBase.collectionGroup('exercises', exerciseTemplateTrainingExercisesQuery)}

}