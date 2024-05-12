import { TrainingsRefService } from './trainings-ref.service';
import { AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

export const trainingsRefServiceMock: Partial<TrainingsRefService> = {
    getTrainingsCollectionRef: () => ({} as AngularFirestoreCollection),
    getTrainingsPaginatedCollectionRef: () => ({} as AngularFirestoreCollection),
    getTrainingExercisesCollectionRef: () => ({} as AngularFirestoreCollection),
    getTrainingExerciseSeriesCollectionRef: () => ({} as AngularFirestoreCollection),
    getTrainingDocRef: () => ({} as AngularFirestoreDocument),
    getTrainingExerciseDocRef: () => ({} as AngularFirestoreDocument),
    getTrainingExerciseSerieDocRef: () => ({} as AngularFirestoreDocument),
    getExerciseTemplateTrainingExercisesDocRefs: () => ({} as AngularFirestoreCollectionGroup),
}
