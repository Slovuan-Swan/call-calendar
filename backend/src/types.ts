export interface EventType {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
}

export interface Booking {
  id: string;
  eventTypeId: string;
  startAt: string;   // ISO
  endAt: string;
  guestName: string;
  guestEmail: string;
}

export interface ErrorResponse {
  code: 'validation_error' | 'not_found' | 'slot_unavailable' | 'booking_window_exceeded';
  message: string;
}
