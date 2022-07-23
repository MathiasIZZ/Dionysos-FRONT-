export class EventRequest {

  event!: Event;
  userId!: string;

  constructor(event: Event, userId: string) {
    this.event = event;
    this.userId = userId;
  }

}
