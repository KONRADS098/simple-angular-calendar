import { Component } from '@angular/core';
import { InterviewService } from './interview.service';
import { Interview } from './interview.model';
import { ColSpans } from './col-spans.model';

@Component({
  selector: 'app-root',
  template: `
    Datepicker here
    <!-- Table Content -->
    <div class="centered-container">
      <table class="interview-table">
        <thead>
          <tr>
            <th></th>
            <ng-container *ngFor="let hour of hours">
              <th class="hour">{{ hour }}</th>
            </ng-container>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let interview of interviews">
            <td class="participant">{{ interview.participant }}</td>
            <ng-container *ngIf="interview.colSpans">
              <td *ngIf="interview.colSpans.beforeInterview > 0" [attr.colspan]="interview.colSpans.beforeInterview" class="empty-cell"></td>
              <td *ngIf="interview.colSpans.duringInterview > 0" 
                  [attr.colspan]="interview.colSpans.duringInterview" 
                  class="filled-cell"
                  (click)="openPopup()">
              </td>
              <td *ngIf="interview.colSpans.afterInterview > 0" [attr.colspan]="interview.colSpans.afterInterview" class="empty-cell"></td>
            </ng-container>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Popup Content -->
    <div class="popup-overlay" *ngIf="showPopup">
      <div class="popup">
        <h2>Available Candidates: </h2>
        <!-- list of hardcoded names -->
        <ul>          
          <li>Tim</li>
          <li>Bas</li>
          <li>Charlie</li>
        </ul>

        <button (click)="closePopup()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .centered-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Set the container height to 100% of the viewport height */
    }

    .interview-table {
      width: 100%;
      margin-bottom: 20px;
      border-collapse: separate; /* Use separate to apply border-spacing */
      border-spacing: 2px; /* Adjust the space between rows and columns as needed */
    }

    .interview-table th, .interview-table td {
      padding: 10px;
      text-align: center;
      border: none;
    }

    .interview-table th.hour {
      text-align: left;
    }

    .participant {
      font-weight: bold;
    }

    .empty-cell {
      background-color: #f2f2f2;
    }

    .filled-cell {
      background-color: lightgreen;
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .popup {
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  `]
})
export class AppComponent {
  hours: string[] = [];
  interviews: Interview[];
  showPopup = false;

  constructor(private interviewService: InterviewService) {
    this.interviews = this.interviewService.getInterviews();

    for (let i = this.interviewService.getStartHour(); i < this.interviewService.getEndHour(); i++) {
      this.hours.push(`${i}:00`);
    }

    this.interviews.forEach(interview => {
      interview.colSpans = this.getColSpansForInterview(interview);
    });
  }

  getColSpansForInterview(interview: Interview): ColSpans {
    const beforeInterview = interview.startTime.getHours() - this.interviewService.getStartHour();
    const duringInterview = interview.endTime.getHours() - interview.startTime.getHours();
    const afterInterview = this.interviewService.getEndHour() - interview.endTime.getHours();

    return { beforeInterview, duringInterview, afterInterview };
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}