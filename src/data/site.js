export const site = {
  name: "M&J Water Wells",
  shortName: "M&J",
  tagline: "West Michigan's Well Drilling Specialists",
  description:
    "Family-owned and operated well drilling and repair for residential, commercial, and irrigation customers across West Michigan.",
  phone: "(616) 675-4875",
  phoneLink: "tel:+16166754875",
  email: "info@mandjwaterwells.com",
  address: {
    street: "1038 Stanton Avenue",
    city: "Newaygo",
    region: "MI",
    postalCode: "49337",
    country: "US",
    formatted: "1038 Stanton Avenue, Newaygo, MI 49337",
  },
  businessHours: "Call for current business hours",
  emergencyHours: "Emergency service available on weekends and holidays",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://mandjwaterwells.com",
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "",
  owners: ["Mark", "Julie"],
  features: [
    {
      eyebrow: "Rooted in West Michigan",
      title: "A local team that cares",
      description:
        "Family-owned and operated, M&J Water Wells brings practical experience and personal service to every job.",
      href: "/about",
      linkText: "Get to know us",
      icon: "home",
    },
    {
      eyebrow: "Confidence in every drop",
      title: "Pumps & tanks warranty",
      description:
        "Ask us about the 5-year warranty coverage for pumps and pressure tanks, including terms and eligibility.",
      href: "/services",
      linkText: "Explore our services",
      icon: "shield",
    },
    {
      eyebrow: "Here when you need us",
      title: "Let's get your water flowing",
      description:
        "Call our team or send a few details about your project to request a free estimate.",
      href: "/contact",
      linkText: "Request an estimate",
      icon: "phone",
    },
  ],
  partners: ["Franklin Electric", "Pentair", "Grundfos", "Pumps & Tanks"],
  paymentMethods: ["Square", "Visa", "Mastercard", "Amex", "Discover"],
  serviceAreas: {
    towns: [
      "Cedar Springs",
      "Byron",
      "Rockford",
      "Greenville",
      "Newaygo",
      "Fremont",
      "Hesperia",
      "Big Rapids",
    ],
    counties: ["Kent", "Ottawa", "Newaygo", "Muskegon", "Montcalm", "Mecosta"],
  },
  services: [
    {
      title: "Residential & commercial wells",
      description:
        "Drilling and service for 2-inch to 6-inch wells, sized to suit the property and its water needs.",
      icon: "drill",
    },
    {
      title: "Irrigation & large-capacity wells",
      description:
        "Drilling and service for 6-inch and larger wells for irrigation and commercial applications.",
      icon: "water",
    },
    {
      title: "Constant pressure systems",
      description:
        "Modern pressure solutions designed to help deliver steady water pressure throughout your home.",
      icon: "gauge",
    },
    {
      title: "Pumps & pressure tanks",
      description:
        "Submersible pumps, jet pumps, and pressure tanks, with help choosing the right setup.",
      icon: "settings",
    },
    {
      title: "Pump replacement",
      description:
        "Troubleshooting and replacement of well pumps to help restore a dependable water supply.",
      icon: "refresh",
    },
    {
      title: "Well care & disinfection",
      description:
        "Well chlorination, clean-out, and disinfection services to support a healthy water system.",
      icon: "sparkles",
    },
    {
      title: "Inspections & water sampling",
      description:
        "Well inspections and water sampling to help you better understand your water system.",
      icon: "clipboard",
    },
    {
      title: "Well abandonment",
      description:
        "Well abandonment and decommissioning services. Contact us to confirm the right process for your well.",
      icon: "shield",
    },
    {
      title: "Trenching & backhoe work",
      description:
        "Equipment and excavation support for water system projects and related site work.",
      icon: "truck",
    },
    {
      title: "Water line repair",
      description:
        "Water line repair and replacement to reconnect your well system with your home or building.",
      icon: "wrench",
    },
  ],
  faqs: [
    {
      question: "Do you drill in the winter?",
      answer:
        "We can drill in winter when conditions allow. Extreme cold can create safety concerns for the crew and make equipment and materials more difficult to work with, so work may need to wait until conditions are safe.",
    },
    {
      question: "How long does a well last?",
      answer:
        "A well's lifespan depends on its construction, local conditions, water use, and maintenance. If you have concerns about your well's performance, contact us to discuss an inspection.",
      todo: true,
    },
    // TODO: Have the owner review this general answer for actual local well lifespans.
    // TODO: Have the owner review this general answer for local geology and permitting context.
    {
      question: "How deep will my well need to be?",
      answer:
        "Well depth varies by location and the water source beneath a property. We can discuss local conditions and evaluate what your project may require after learning more about the site.",
      todo: true,
    },
    {
      question: "Do you offer emergency service?",
      answer:
        "Yes. Emergency service is available on weekends and holidays. Call (616) 675-4875 and leave a message if we can't answer; our team will return your call promptly.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve Newaygo and communities across West Michigan, including towns in Kent, Ottawa, Newaygo, Muskegon, Montcalm, and Mecosta counties. Call us to confirm service for your address.",
    },
    // TODO: Confirm this response reflects M&J's estimate intake process.
    {
      question: "What should I share when requesting an estimate?",
      answer:
        "Share your property location, the type of service you need, and a good time and way to reach you. Photos or details about an existing system can also help us understand the project.",
      todo: true,
    },
  ],
  serviceOptions: [
    "New well drilling",
    "Well or pump repair",
    "Pump or pressure tank replacement",
    "Water line repair",
    "Well inspection or water sampling",
    "Other / not sure",
  ],
  verificationItems: [
    "Confirm the Newaygo street address and ZIP code before publishing.",
    "Confirm Mark and Julie's full surnames and preferred owner biographies.",
    "Confirm the 5-year pump and pressure tank warranty, its terms, and eligibility.",
    "Confirm listed towns and county service coverage.",
    "Confirm pump replacement and well abandonment/decommissioning wording and availability.",
    "Confirm drilling capacity (2–10 inches; drilling or replacement up to 12 inches).",
    "Confirm business hours and the weekend/holiday emergency service process.",
    "Confirm the production domain/canonical URL and the original website redirect map.",
  ],
};

export const pageMeta = {
  home: {
    title: "M&J Water Wells | West Michigan Well Drilling",
    description:
      "West Michigan's well drilling specialists. Family-owned well drilling, pump repair, and water system service in Newaygo, MI and nearby communities.",
  },
  services: {
    title: "Well Drilling & Services in West Michigan | M&J Water Wells",
    description:
      "Explore residential, commercial, and irrigation well drilling, pump systems, inspections, water lines, and more from M&J Water Wells.",
  },
  about: {
    title: "About M&J Water Wells | Newaygo, Michigan",
    description:
      "Meet the family-owned M&J Water Wells team, serving Newaygo and West Michigan with well drilling and water system service.",
  },
  faq: {
    title: "Well Drilling Questions & Answers | M&J Water Wells",
    description:
      "Answers to common questions about well drilling, winter work, emergency service, and service areas in West Michigan.",
  },
  contact: {
    title: "Contact M&J Water Wells | Request a Free Estimate",
    description:
      "Contact M&J Water Wells in Newaygo, MI. Call (616) 675-4875 or request a free well drilling or repair estimate online.",
  },
  notFound: {
    title: "Page Not Found | M&J Water Wells",
    description: "We couldn't find that page. Contact M&J Water Wells in Newaygo, Michigan.",
  },
};
