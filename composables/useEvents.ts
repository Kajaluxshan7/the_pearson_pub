import { ref, computed } from "vue";
import type { Event, WeeklySchedule } from "~/types/events";

export const useEvents = () => {
  const events = ref<Event[]>([
    {
      id: "1",
      title: "Live Music Night",
      description:
        "Join us for a night of live acoustic music featuring local artists.",
      fullDescription: `Experience an unforgettable evening of live acoustic music in the intimate setting of The Pearson Pub. Our carefully curated lineup features the best local talent, bringing you everything from soulful ballads to upbeat folk tunes.

      The night begins at 8:00 PM with our opening act, followed by headliner performances that will keep you entertained until 11:00 PM. Each artist brings their unique style and repertoire, ensuring a diverse musical experience for all attendees.

      Our bar will be fully stocked with craft beers, specialty cocktails, and a selection of wines to complement the evening. Light bites and sharing platters will also be available throughout the night.

      Don't miss this opportunity to discover new artists and enjoy familiar favorites in one of Whitby's most beloved venues.`,
      date: "June 20, 2025",
      time: "8:00 PM - 11:00 PM",
      image: "/images/entertainment/music.jpg",
      images: [
        "/images/entertainment/music.jpg",
        "/images/entertainment/music2.jpg",
        "/images/pub/interior-main.jpg",
      ],
      location: "Main Hall",
      venue: {
        name: "Main Hall",
        capacity: 150,
        layout: "Concert style with standing room and limited seating",
      },
      tags: ["Music", "Live", "Acoustic", "Local Artists"],
      performers: ["The Local Band", "Jane Doe", "Acoustic Trio"],
      featured: true,
      ctaText: "Book a Table",
      ctaLink: "/contact",
      price: {
        general: 15,
        student: 10,
      },
      ticketsAvailable: 120,
      status: "upcoming",
      category: "music",
      ageRestriction: "19+",
      specialRequirements: ["Valid ID required", "No outside food or drinks"],
      contactInfo: {
        phone: "905-430-5699",
        email: "events@thepearsonpub.com",
      },
      organizer: {
        name: "The Pearson Pub Events Team",
        description: "Bringing you the best live entertainment in Whitby",
      },
      reviews: [
        {
          id: "r1",
          userId: "u1",
          userName: "Sarah M.",
          rating: 5,
          comment:
            "Amazing night! The acoustics were perfect and the atmosphere was incredible.",
          date: "2025-05-15",
          helpful: 12,
        },
        {
          id: "r2",
          userId: "u2",
          userName: "Mike T.",
          rating: 4,
          comment: "Great selection of local artists. Will definitely be back!",
          date: "2025-05-10",
          helpful: 8,
        },
      ],
      averageRating: 4.5,
      totalReviews: 15,
    },
    {
      id: "2",
      title: "Pub Quiz Night",
      description: "Test your knowledge and win prizes at our weekly pub quiz!",
      fullDescription: `Put your knowledge to the test at The Pearson Pub's legendary Quiz Night! Every Wednesday, teams gather to compete in our challenging yet fun trivia competition covering everything from pop culture to history, sports to science.

      Our quizmaster brings energy and humor to every round, ensuring everyone has a great time whether you're a trivia novice or a seasoned pro. Rounds include general knowledge, music identification, picture rounds, and our famous "Pearson's Puzzlers" - brain teasers that will challenge even the sharpest minds.

      Fantastic prizes await the winning teams, including bar tabs, meal vouchers, and special Pearson Pub merchandise. Even if you don't win, everyone gets to enjoy our quiz night drink specials and the friendly competitive atmosphere.

      Teams can be 2-6 people, and registration begins at 7:00 PM. The quiz starts promptly at 7:30 PM and runs until approximately 10:00 PM.`,
      date: "June 22, 2025",
      time: "7:30 PM - 10:00 PM",
      image: "/images/pub/interior-main.jpg",
      images: ["/images/pub/interior-main.jpg", "/images/pub/interior-bar.jpg"],
      location: "Quiz Room",
      venue: {
        name: "Quiz Room",
        capacity: 80,
        layout: "Table seating for teams of 2-6",
      },
      tags: ["Quiz", "Fun", "Prizes", "Weekly"],
      performers: ["Quizmaster John"],
      featured: false,
      ctaText: "Reserve Table",
      ctaLink: "/contact",
      price: {
        general: 5,
      },
      ticketsAvailable: 60,
      status: "upcoming",
      category: "quiz",
      ageRestriction: "All ages welcome",
      specialRequirements: ["Teams of 2-6 people", "Registration required"],
      contactInfo: {
        phone: "905-430-5699",
        email: "quiz@thepearsonpub.com",
      },
      organizer: {
        name: "Quiz Night Team",
        description: "Creating the best trivia experience in Whitby since 2015",
      },
      reviews: [
        {
          id: "r3",
          userId: "u3",
          userName: "Team Brainiacs",
          rating: 5,
          comment: "Best quiz night in town! Fair questions and great prizes.",
          date: "2025-06-01",
          helpful: 20,
        },
      ],
      averageRating: 4.8,
      totalReviews: 32,
    },
    {
      id: "3",
      title: "Summer BBQ Festival",
      description:
        "Celebrate summer with our special BBQ event featuring live music and games.",
      fullDescription: `Join us for the ultimate summer celebration at The Pearson Pub's Annual BBQ Festival! This outdoor extravaganza combines the best of summer dining, live entertainment, and family fun in our beautiful garden area.

      Our expert grill masters will be serving up mouthwatering BBQ specialties including slow-smoked ribs, grilled corn on the cob, gourmet burgers, and vegetarian options. All dishes are prepared fresh throughout the day using locally sourced ingredients.

      Live music performances run from 2:00 PM to 8:00 PM featuring a mix of local bands and solo artists. DJ Sunny will keep the energy high between sets with summer favorites and dance hits.

      Family-friendly activities include face painting, lawn games, and our famous BBQ eating contest at 4:00 PM. Kids under 12 eat free with adult meal purchase.

      Rain or shine - covered areas available. Advance tickets recommended as this popular event sells out quickly!`,
      date: "June 25, 2025",
      time: "2:00 PM - 8:00 PM",
      image: "/images/food/foods.jpg",
      images: [
        "/images/food/foods.jpg",
        "/images/food/foods2.jpg",
        "/images/pub/interior-main.jpg",
      ],
      location: "Garden Area",
      venue: {
        name: "Garden Area & Patio",
        capacity: 200,
        layout: "Outdoor festival style with picnic tables and standing areas",
      },
      tags: ["BBQ", "Summer", "Outdoor", "Family", "Live Music"],
      performers: ["DJ Sunny", "The Summer Band", "Local Folk Duo"],
      featured: true,
      ctaText: "Get Tickets",
      ctaLink: "/contact",
      price: {
        general: 25,
        vip: 40,
        student: 20,
      },
      ticketsAvailable: 150,
      status: "upcoming",
      category: "food",
      ageRestriction: "All ages",
      dresscode: "Casual outdoor attire",
      specialRequirements: [
        "Weather dependent - covered areas available",
        "Kids under 12 eat free with adult ticket",
        "No outside food or alcohol",
      ],
      contactInfo: {
        phone: "905-430-5699",
        email: "bbq@thepearsonpub.com",
      },
      socialMedia: {
        facebook: "https://facebook.com/pearsonpub",
        instagram: "https://instagram.com/pearsonpub",
      },
      organizer: {
        name: "The Pearson Pub Events Team",
        description:
          "Creating memorable experiences and bringing the community together",
      },
      reviews: [
        {
          id: "r4",
          userId: "u4",
          userName: "Family Fun Group",
          rating: 5,
          comment:
            "Perfect family event! Kids loved it and the food was incredible.",
          date: "2024-07-20",
          helpful: 25,
        },
      ],
      averageRating: 4.9,
      totalReviews: 45,
    },
  ]);
  const weeklySchedule = ref<WeeklySchedule[]>([
    {
      day: "Monday",
      event: "Open Mic Night",
      time: "7:30 PM - 11:00 PM",
      icon: "i-heroicons-microphone",
      description:
        "Show off your talent! Singers, comedians, and performers welcome.",
      recurring: true,
      specialNote: "Sign-up starts at 7:00 PM",
      link: "/events",
      ctaText: "Join Us",
    },
    {
      day: "Tuesday",
      event: "Trivia Tuesday",
      time: "7:00 PM - 10:00 PM",
      icon: "i-heroicons-academic-cap",
      description:
        "Weekly trivia night with great prizes and friendly competition.",
      recurring: true,
      price: 5,
      specialNote: "Teams of up to 6 people",
      link: "/events",
      ctaText: "Book Table",
    },
    {
      day: "Wednesday",
      event: "Wing Wednesday",
      time: "5:00 PM - 10:00 PM",
      icon: "i-heroicons-fire",
      description: "Half-price wings and beer specials all evening.",
      recurring: true,
      specialNote: "50% off all wings",
      link: "/menu",
      ctaText: "View Menu",
    },
    {
      day: "Thursday",
      event: "Live Acoustic",
      time: "8:00 PM - 11:00 PM",
      icon: "i-heroicons-musical-note",
      description: "Intimate acoustic performances by local artists.",
      recurring: true,
      link: "/events",
      ctaText: "See Lineup",
    },
    {
      day: "Friday",
      event: "Live Music",
      time: "8:00 PM - 12:00 AM",
      icon: "i-heroicons-musical-note",
      description:
        "Live bands and high-energy performances to kick off the weekend.",
      recurring: true,
      price: 10,
      link: "/events",
      ctaText: "Get Tickets",
    },
    {
      day: "Saturday",
      event: "DJ Night",
      time: "9:00 PM - 2:00 AM",
      icon: "i-heroicons-speaker-wave",
      description:
        "Dance the night away with our resident DJs spinning the latest hits.",
      recurring: true,
      price: 8,
      specialNote: "21+ after 10 PM",
      link: "/events",
      ctaText: "Join Party",
    },
    {
      day: "Sunday",
      event: "Sunday Roast",
      time: "12:00 PM - 6:00 PM",
      icon: "i-heroicons-heart",
      description: "Traditional Sunday roast dinners with all the trimmings.",
      recurring: true,
      specialNote: "Reservations recommended",
      link: "/menu",
      ctaText: "Reserve Now",
    },
  ]);

  // Computed properties
  const featuredEvents = computed(() =>
    events.value.filter(
      (event) => event.featured && event.status === "upcoming"
    )
  );

  const upcomingEvents = computed(() =>
    events.value
      .filter((event) => event.status === "upcoming")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );

  const eventsByCategory = computed(() => {
    const categories: Record<string, Event[]> = {};
    events.value.forEach((event) => {
      if (!categories[event.category]) {
        categories[event.category] = [];
      }
      categories[event.category].push(event);
    });
    return categories;
  });

  // Methods
  const getEventById = (id: string): Event | undefined => {
    return events.value.find((event) => event.id === id);
  };

  const addEvent = (event: Event) => {
    events.value.push(event);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const index = events.value.findIndex((event) => event.id === id);
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...updates };
    }
  };

  const deleteEvent = (id: string) => {
    const index = events.value.findIndex((event) => event.id === id);
    if (index !== -1) {
      events.value.splice(index, 1);
    }
  };

  const searchEvents = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return events.value.filter(
      (event) =>
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery) ||
        event.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        event.performers?.some((performer) =>
          performer.toLowerCase().includes(lowercaseQuery)
        )
    );
  };

  return {
    events: readonly(events),
    weeklySchedule: readonly(weeklySchedule),
    featuredEvents,
    upcomingEvents,
    eventsByCategory,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
  };
};
