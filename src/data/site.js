/* Centralized content data layer preserving all copy and alt text verbatim, with explicit legacy / verify / dummy tags */

export const siteFieldTags = {
  companyIdentity: { tag: "legacy" },
  owners: { tag: "verify", note: "Confirm Mark and Julie's full surnames and preferred biographies." },
  address: { tag: "verify", note: "Confirm 1038 Stanton Avenue street address and ZIP 49337." },
  businessHours: { tag: "verify", note: "Confirm regular weekday hours." },
  emergencyHours: { tag: "verify", note: "Confirm 24/7 weekend and holiday emergency dispatch process." },
  credentials: { tag: "verify", note: "Confirm Michigan driller license number." },
  warrantyStatement: { tag: "verify", note: "Confirm 5-year pump and pressure tank warranty terms and eligibility." },
  drillingCapacity: { tag: "verify", note: "Confirm 2-10 inch standard / up to 12 inch drilling and replacement." },
  serviceAreas: { tag: "verify", note: "Confirm listed West Michigan towns and six counties." },
  siteUrl: { tag: "verify", note: "Confirm production canonical URL and redirect map." },
  heroAlternatives: { tag: "dummy", note: "Sample alternative headlines pending owner selection." },
  processSteps: { tag: "dummy", note: "Confirm 5-step field process sequence before production launch." },
  projectsFilmstrip: { tag: "dummy", note: "Placeholder project showcase strip awaiting real jobsite photos and captions." },
};

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
    tag: "verify",
  },
  businessHours: "Call for current regular hours",
  emergencyHours: "24/7 emergency service available on weekends and holidays",
  credentials: {
    licenseLabel: "Michigan licensed driller",
    licenseNumber: "",
    tag: "verify",
  },
  googleBusinessUrl:
    "https://www.google.com/maps/search/?api=1&query=M%26J%20Water%20Wells%201038%20Stanton%20Avenue%20Newaygo%20MI%2049337",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://mandjwaterwells.com",
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "",
  owners: ["Mark", "Julie"],
  altText: {
    sign: "M&J Water Wells roadside sign in Newaygo, Michigan",
    warehouse: "M&J Water Wells property and warehouse in Newaygo",
    trucks: "M&J Water Wells drilling trucks ready for a job",
    farm: "A red barn and open field in West Michigan",
  },
  /* dummy headline alternatives kept in data layer; only anchor headline renders in production */
  heroAlternatives: [
    { id: "alt-1", text: "Deep Bedrock Water. Straightforward Local Work.", tag: "dummy" },
    { id: "alt-2", text: "Clean Water Wells Across Six West Michigan Counties.", tag: "dummy" },
  ],
  features: [
    {
      eyebrow: "Rooted in West Michigan",
      title: "A local team that cares",
      description:
        "Family-owned and operated, M&J Water Wells brings practical experience and personal service to every job.",
      href: "/about",
      linkText: "Get to know us",
      icon: "home",
      tag: "legacy",
    },
    {
      eyebrow: "Confidence in every drop",
      title: "Pumps & tanks warranty",
      description:
        "Ask us about the 5-year warranty coverage for pumps and pressure tanks, including terms and eligibility.",
      href: "/services",
      linkText: "Explore our services",
      icon: "shield",
      tag: "verify",
    },
    {
      eyebrow: "Here when you need us",
      title: "Let's get your water flowing",
      description:
        "Call our team or send a few details about your project to request a free estimate.",
      href: "/contact",
      linkText: "Request an estimate",
      icon: "phone",
      tag: "legacy",
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
      "Grant",
      "Hesperia",
      "Big Rapids",
    ],
    counties: ["Kent", "Ottawa", "Newaygo", "Muskegon", "Montcalm", "Mecosta"],
    tag: "verify",
  },
  machineryStages: [
    {
      code: "01 // 2\" TO 6\" WELLS",
      title: "Residential & commercial wells.",
      body: "Drilling and service for 2-inch to 6-inch wells, sized carefully to suit the property geology and household or commercial water demand.",
      imageBase: "truck",
      caption: "M&J DRILLING FLEET · RESIDENTIAL & COMMERCIAL",
      alt: "M&J Water Wells drilling trucks ready for a job",
      tag: "legacy",
    },
    {
      code: "02 // 6\" TO 12\" CAPABILITY",
      title: "Irrigation & heavy replacement bores.",
      body: "High-yield drilling for 6-inch and larger irrigation and agricultural applications, with capacity to drill or replace wells up to 12 inches.",
      imageBase: "service-trucks",
      caption: "HIGH-CAPACITY RIGS · UP TO 12\" BORES",
      alt: "M&J Water Wells drilling trucks ready for a job",
      tag: "verify",
    },
    {
      code: "03 // PUMP & PRESSURE GEAR",
      title: "Constant pressure, pumps & tanks.",
      body: "Submersible pumps, jet pumps, and constant-pressure systems from Franklin Electric, Pentair, and Grundfos—backed by available 5-year warranty terms.",
      imageBase: "process-step-4",
      caption: "PRESSURE CONTROL · SUBMERSIBLE SYSTEMS",
      alt: "Completed water well system cutaway",
      tag: "verify",
    },
    {
      code: "04 // EXCAVATION & LINES",
      title: "Trenching, backhoe & water line repair.",
      body: "On-site excavation support, trenching, well chlorination, water sampling, abandonment, and buried water line reconnection from our Newaygo base.",
      imageBase: "warehouse",
      caption: "1038 STANTON AVE · NEWAYGO DISPATCH",
      alt: "M&J Water Wells property and warehouse in Newaygo",
      tag: "legacy",
    },
  ],
  /* Tagged dummy until the owner confirms the 5-step field process */
  processSteps: [
    {
      step: "01",
      title: "Consultation",
      description: "Call or send your property details so we can discuss household or irrigation flow needs.",
      imageBase: "process-step-1",
      alt: "3D isometric soil cutaway diorama showing M&J pickup truck, evergreens, and survey flag",
      tag: "dummy",
    },
    {
      step: "02",
      title: "Site Assessment",
      description: "Walk the lot, check access and setbacks, and mark the clean drilling target.",
      imageBase: "process-step-1",
      alt: "3D isometric soil cutaway diorama showing site survey marker",
      tag: "dummy",
    },
    {
      step: "03",
      title: "Drilling",
      description: "Bore through glacial strata into dependable aquifer zones and set protective steel casing.",
      imageBase: "process-step-2",
      alt: "3D isometric soil cutaway diorama showing drilling rig boring into soil layers",
      tag: "dummy",
    },
    {
      step: "04",
      title: "Installation",
      description: "Fit submersible pump, pressure tank, sanitary wellhead seal, and trench water lines.",
      imageBase: "process-step-3",
      alt: "3D isometric soil cutaway diorama showing completed wellhead manifold",
      tag: "dummy",
    },
    {
      step: "05",
      title: "Follow-Up",
      description: "Disinfect, flush, verify steady pressure, and support the system long after startup.",
      imageBase: "process-step-4",
      alt: "3D isometric soil cutaway diorama showing clean water flow",
      tag: "dummy",
    },
  ],
  /* Tagged dummy filmstrip awaiting verified jobsite photos & locations */
  projectsFilmstrip: [
    {
      id: "proj-1",
      code: "FIELD SAMPLE 01",
      title: "Residential 4\" Bedrock Well",
      location: "Newaygo Area · Sample",
      imageBase: "service-trucks",
      alt: "M&J Water Wells drilling trucks ready for a job",
      tag: "dummy",
    },
    {
      id: "proj-2",
      code: "FIELD SAMPLE 02",
      title: "Heavy Agricultural Irrigation Bore",
      location: "West Michigan · Sample",
      imageBase: "west-michigan-farm",
      alt: "A red barn and open field in West Michigan",
      tag: "dummy",
    },
    {
      id: "proj-3",
      code: "FIELD SAMPLE 03",
      title: "Rig & Casing Deployment",
      location: "Regional Fieldwork · Sample",
      imageBase: "truck",
      alt: "M&J Water Wells drilling rig truck parked at a job site",
      tag: "dummy",
    },
    {
      id: "proj-4",
      code: "FIELD SAMPLE 04",
      title: "Shop Dispatch & Yard Operations",
      location: "1038 Stanton Ave · Sample",
      imageBase: "warehouse",
      alt: "M&J Water Wells property and warehouse in Newaygo",
      tag: "dummy",
    },
  ],
  services: [
    {
      title: "Residential & commercial wells",
      description:
        "Drilling and service for 2-inch to 6-inch wells, sized to suit the property and its water needs.",
      icon: "drill",
      tag: "legacy",
    },
    {
      title: "Irrigation & large-capacity wells",
      description:
        "Drilling and service for 6-inch and larger wells for irrigation and commercial applications.",
      icon: "water",
      tag: "legacy",
    },
    {
      title: "Constant pressure systems",
      description:
        "Modern pressure solutions designed to help deliver steady water pressure throughout your home.",
      icon: "gauge",
      tag: "legacy",
    },
    {
      title: "Pumps & pressure tanks",
      description:
        "Submersible pumps, jet pumps, and pressure tanks, with help choosing the right setup.",
      icon: "settings",
      tag: "legacy",
    },
    {
      title: "Pump replacement",
      description:
        "Troubleshooting and replacement of well pumps to help restore a dependable water supply.",
      icon: "refresh",
      tag: "verify",
    },
    {
      title: "Well care & disinfection",
      description:
        "Well chlorination, clean-out, and disinfection services to support a healthy water system.",
      icon: "sparkles",
      tag: "legacy",
    },
    {
      title: "Inspections & water sampling",
      description:
        "Well inspections and water sampling to help you better understand your water system.",
      icon: "clipboard",
      tag: "legacy",
    },
    {
      title: "Well abandonment",
      description:
        "Well abandonment and decommissioning services. Contact us to confirm the right process for your well.",
      icon: "shield",
      tag: "verify",
    },
    {
      title: "Trenching & backhoe work",
      description:
        "Equipment and excavation support for water system projects and related site work.",
      icon: "truck",
      tag: "legacy",
    },
    {
      title: "Water line repair",
      description:
        "Water line repair and replacement to reconnect your well system with your home or building.",
      icon: "wrench",
      tag: "legacy",
    },
  ],
  faqs: [
    {
      question: "Do you drill in the winter?",
      answer:
        "We can drill in winter when conditions allow. Extreme cold can create safety concerns for the crew and make equipment and materials more difficult to work with, so work may need to wait until conditions are safe.",
      tag: "legacy",
    },
    {
      question: "How long does a well last?",
      answer:
        "A well's lifespan depends on its construction, local conditions, water use, and maintenance. If you have concerns about your well's performance, contact us to discuss an inspection.",
      tag: "verify",
    },
    {
      question: "How deep will my well need to be?",
      answer:
        "Well depth varies by location and the water source beneath a property. We can discuss local conditions and evaluate what your project may require after learning more about the site.",
      tag: "verify",
    },
    {
      question: "Should I have my well water tested?",
      answer:
        "Testing is a practical way to check the quality of private well water, especially if you notice a change in taste, smell, or appearance, or after work on the well. Ask your local health department about recommended tests and sampling, or contact us about water sampling.",
      tag: "legacy",
    },
    {
      question: "What should I do if my water pressure drops?",
      answer:
        "First, check whether the pressure is low at one fixture or throughout the property. If it affects the whole system or drops suddenly, contact a well professional to check the pump, pressure tank, and system. Avoid opening pump controls or electrical equipment.",
      tag: "legacy",
    },
    {
      question: "Do you offer emergency service?",
      answer:
        "Yes. Emergency service is available on weekends and holidays. Call (616) 675-4875 and leave a message if we can't answer; our team will return your call promptly.",
      tag: "verify",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve Newaygo and communities across West Michigan, including towns in Kent, Ottawa, Newaygo, Muskegon, Montcalm, and Mecosta counties. Call us to confirm service for your address.",
      tag: "verify",
    },
    {
      question: "What should I share when requesting an estimate?",
      answer:
        "Share your property location, the type of service you need, and a good time and way to reach you. Photos or details about an existing system can also help us understand the project.",
      todo: true,
      tag: "verify",
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
    "Confirm the 5-step cutaway process and supply real jobsite photos for the Projects Filmstrip.",
  ],
};

export const pageMeta = {
  home: {
    title: "Well Drilling in Newaygo, MI | M&J Water Wells",
    description:
      "West Michigan's well drilling specialists. Family-owned well drilling, pump repair, and water system service in Newaygo, MI and nearby communities.",
    ogImage: "/images/truck.webp",
  },
  services: {
    title: "Well Drilling & Pump Services in Newaygo, MI | M&J Water Wells",
    description:
      "Explore residential, commercial, and irrigation well drilling, pump systems, inspections, water lines, and more from M&J Water Wells.",
    ogImage: "/images/service-trucks.webp",
  },
  about: {
    title: "About M&J Water Wells | Family-Owned in Newaygo, MI",
    description:
      "Meet the family-owned M&J Water Wells team, serving Newaygo and West Michigan with well drilling and water system service.",
    ogImage: "/images/company-sign.webp",
  },
  faq: {
    title: "Well Drilling FAQs | Newaygo, MI | M&J Water Wells",
    description:
      "Answers to common questions about well drilling, winter work, emergency service, and service areas in West Michigan.",
    ogImage: "/images/truck.webp",
  },
  contact: {
    title: "Contact M&J Water Wells | Request a Free Estimate",
    description:
      "Contact M&J Water Wells in Newaygo, MI. Call (616) 675-4875 or request a free well drilling or repair estimate online.",
    ogImage: "/images/warehouse.webp",
  },
  notFound: {
    title: "Page Not Found | M&J Water Wells",
    description: "We couldn't find that page. Contact M&J Water Wells in Newaygo, Michigan.",
    ogImage: "/images/truck.webp",
  },
};
