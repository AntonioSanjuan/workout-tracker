import { Timestamp } from 'firebase/firestore';
import { DateAdapter } from "./date.adapter";

describe('DateAdapter', () => {    
  describe('toState', () => {
    const dateSut: Date = new Date()
    const timestampSut: Timestamp = Timestamp.fromDate(dateSut)

    it('should convert Timestamp to date', () => {
      const dateResp = DateAdapter.toState(timestampSut)

      expect(dateResp).toEqual(dateSut) 
    });
  });
  describe('toDto', () => {
    const dateSut: Date = new Date()
    const timestampSut: Timestamp = Timestamp.fromDate(dateSut)
    it('should convert date to Timestamp', () => {
      const dateResp = DateAdapter.toDto(dateSut)

      expect(dateResp).toEqual(timestampSut)   
    });
  })
});