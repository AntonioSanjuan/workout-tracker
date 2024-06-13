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
                query = query.where('creationDate', ">=", DateAdapter.toDto(trainingQuery.filters.betweenDates.fromDate)).where('creationDate', "<=",  DateAdapter.toDto(trainingQuery.filters.betweenDates.toDate)) 
            }
            if (trainingQuery.filters.muscleGroups.length) { 
                query = query.where('muscleGroups', "array-contains-any", trainingQuery.filters.muscleGroups) 
                
            }

            // Aplicar ordenamiento
            query = query
                .limit(trainingQuery.pagination.pageElements)
                .orderBy('creationDate', 'desc')

            //pagination
            if (trainingQuery.pagination.lastElement) { 
                console.log("lastElement", trainingQuery.pagination.lastElement)
                query = query.startAfter(DateAdapter.toDto(trainingQuery.pagination.lastElement.creationDate)) 
            }
            
            return query
        }
        return trainingsPaginatedQuery;
    }

    private getTrainingsExercisesQuery(): QueryFn {
        const TrainingsExerciseQuery: QueryFn = ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

            // Aplicar ordenamiento
            query = query
                .orderBy('creationDate', 'desc')
            
            return query
        }
        return TrainingsExerciseQuery;
    }

    private getTrainingsExerciseSeriesQuery(): QueryFn {
        const TrainingsExerciseSerieQuery: QueryFn = ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

            // Aplicar ordenamiento
            query = query
                .orderBy('creationDate', 'asc')
            
            return query
        }
        return TrainingsExerciseSerieQuery;
    }
    
    public getTrainingsCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings`)
    }

    public getTrainingsPaginatedCollectionRef(userId: string, trainingQuery: TrainingQuery): AngularFirestoreCollection {
        const firestoreQuery = this.getTrainingsPaginatedQuery(trainingQuery)
        return this.firebaseDataBase.collection(`user/${userId}/trainings`, firestoreQuery)
    }

    public getTrainingExercisesCollectionRef(userId: string, trainingId: string): AngularFirestoreCollection {
        const firestoreQuery = this.getTrainingsExercisesQuery()
        return this.firebaseDataBase.collection(`user/${userId}/trainings/${trainingId}/exercises`, firestoreQuery)
    }

    public getTrainingExerciseSeriesCollectionRef(userId: string, trainingId: string, trainingExerciseId: string): AngularFirestoreCollection {
        const firestoreQuery = this.getTrainingsExerciseSeriesQuery()

        return this.firebaseDataBase.collection(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series`, firestoreQuery)
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

    public getExerciseTemplateTrainingExercisesDocRefs(exerciseTemplateRef: AngularFirestoreDocument, limit = 5, previousOfDate: Date | undefined = undefined): AngularFirestoreCollectionGroup {
        const exerciseTemplateTrainingExercisesQuery: QueryGroupFn<DocumentData> = ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref
            query = query.where('exerciseTemplateId', "==", exerciseTemplateRef.ref) 
            query = query.limit(limit)
            query = query.orderBy('creationDate', 'desc')

            if(previousOfDate) {
                query = query.where('creationDate', "<", DateAdapter.toDto(previousOfDate)) 
            }
            return query;
        }
        return this.firebaseDataBase.collectionGroup('exercises', exerciseTemplateTrainingExercisesQuery)}

}