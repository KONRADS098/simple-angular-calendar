import { Injectable } from '@angular/core';
import { Interview } from './interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private startHour = 10;
  private endHour = 17;

  constructor() {}

  getInterviews(): Interview[] {
    return [
      {
        participant: 'Alice',
        interviewer: 'Bob',
        startTime: new Date('2022-01-01T10:00:00'),
        endTime: new Date('2022-01-01T12:00:00')
      },
      {
        participant: 'Charlie',
        interviewer: 'Dave',
        startTime: new Date('2022-01-01T13:00:00'),
        endTime: new Date('2022-01-01T14:00:00')
      },
      {
        participant: 'Eve',
        interviewer: 'Frank',
        startTime: new Date('2022-01-01T12:00:00'),
        endTime: new Date('2022-01-01T17:00:00')
      }
    ];
  }

  getStartHour(): number {
    return this.startHour;
  }

  getEndHour(): number {
    return this.endHour;
  }
}