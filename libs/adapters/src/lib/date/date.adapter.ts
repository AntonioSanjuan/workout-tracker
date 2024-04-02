import { Timestamp } from 'firebase/firestore';

export class DateAdapter {
    static toState(date: Timestamp): Date {
        return date.toDate()
    }

    static toDto(date: Date): Timestamp {
        return Timestamp.fromDate(date)
    }
}