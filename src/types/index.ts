export type Language = 'kn' | 'en';

export interface CoupleDetails {
  fullName: string;
  kannadaName: string;
  title: string;
}

export interface VenueDetails {
  name: string;
  city: string;
  state: string;
  kannadaLocation: string;
}

export interface EventDetails {
  type: string;
  kannadaType: string;
  date: string;
  dateFormatted: string;
  timeFormatted: string;
  dayOfWeek: string;
  venue: VenueDetails;
}

export interface InvitationData {
  groom: CoupleDetails;
  bride: CoupleDetails;
  event: EventDetails;
  palette: {
    warmIvory: string;
    softCream: string;
    champagneGold: string;
    antiqueGold: string;
    deepBrown: string;
  };
}
