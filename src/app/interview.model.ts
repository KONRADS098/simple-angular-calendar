import { ColSpans } from "./col-spans.model";

export interface Interview {
    participant: string;
    interviewer: string;
    startTime: Date;
    endTime: Date;
    colSpans?: ColSpans;
}