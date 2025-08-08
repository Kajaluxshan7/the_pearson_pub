export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  startDate?: string;
  endDate?: string;
  startDateTime?: string;
  endDateTime?: string;
  endTime?: string;
  image?: string;
  images?: readonly string[];
  location?: string;
  venue?: {
    name: string;
    capacity: number;
    layout?: string;
  };
  tags?: readonly string[];
  performers?: readonly string[];
  featured?: boolean;
  ctaText?: string;
  ctaLink?: string;
  price?: {
    general?: number;
    vip?: number;
    student?: number;
  };
  ticketsAvailable?: number;
  status:
    | "upcoming"
    | "ongoing"
    | "completed"
    | "cancelled"
    | "current"
    | "ended";
  category: "music" | "quiz" | "food" | "special" | "entertainment";
  ageRestriction?: string;
  dresscode?: string;
  specialRequirements?: readonly string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  organizer?: {
    name: string;
    description?: string;
    image?: string;
  };
  reviews?: readonly EventReview[];
  averageRating?: number;
  totalReviews?: number;
}

export interface EventReview {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}

export interface WeeklySchedule {
  day: string;
  event: string;
  time: string;
  icon: string;
  description?: string;
  recurring: boolean;
  price?: number;
  specialNote?: string;
  link?: string;
  ctaText?: string;
}
