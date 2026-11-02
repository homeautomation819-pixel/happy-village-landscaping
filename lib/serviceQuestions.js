// Service-specific booking questions. Each entry renders extra fields in the
// booking form when that service is selected.
// type: "select" (needs options) or "text"

export const SERVICE_QUESTIONS = {
  "landscape-design": [
    { key: "projectScope", label: "What part of the property?", type: "select", options: ["Front yard", "Backyard", "Full property", "Not sure yet"] },
    { key: "budgetRange", label: "Approximate budget range", type: "select", options: ["Under $10,000", "$10,000–$25,000", "$25,000–$50,000", "$50,000+", "Prefer to discuss"] },
  ],
  hardscaping: [
    { key: "projectType", label: "Project type", type: "select", options: ["Driveway", "Patio", "Walkway", "Retaining wall", "Steps / entrance", "Multiple"] },
    { key: "approxSize", label: "Approximate size (sq ft, if known)", type: "text" },
  ],
  "sod-installation": [
    { key: "lawnArea", label: "Approximate lawn area (sq ft)", type: "select", options: ["Under 500", "500–1,000", "1,000–2,500", "2,500+", "Not sure"] },
    { key: "currentCondition", label: "Current lawn condition", type: "select", options: ["Bare soil / new build", "Mostly weeds", "Patchy", "Dead or damaged", "Other"] },
  ],
  "lawn-care": [
    { key: "frequency", label: "How often do you need service?", type: "select", options: ["Weekly", "Bi-weekly", "One-time cleanup", "Seasonal program"] },
    { key: "lotSize", label: "Approximate lot size", type: "select", options: ["Small (townhome)", "Standard city lot", "Large lot", "Not sure"] },
  ],
  "irrigation-systems": [
    { key: "installType", label: "What do you need?", type: "select", options: ["New system install", "Repair existing system", "Spring start-up", "Fall blowout / winterization"] },
    { key: "areas", label: "Areas to water", type: "select", options: ["Lawn only", "Lawn + garden beds", "Garden beds only", "Full property"] },
  ],
  "landscape-architecture": [
    { key: "siteChallenge", label: "What's the main challenge?", type: "select", options: ["Sloped lot", "Drainage / flooding", "Permits or bylaws", "Whole-property master plan", "Other"] },
    { key: "timeline", label: "When do you want to build?", type: "select", options: ["This season", "Next season", "Planning ahead", "Flexible"] },
  ],
  "stone-cement-features": [
    { key: "material", label: "Material preference", type: "select", options: ["Natural flagstone", "Stamped concrete", "Exposed aggregate", "Not sure — advise me"] },
    { key: "featureType", label: "Feature type", type: "select", options: ["Patio", "Walkway", "Steps / porch", "Fire pit / seating wall", "Multiple"] },
  ],
  "waterscape-features": [
    { key: "featureType", label: "Which water feature?", type: "select", options: ["Pondless waterfall", "Ecosystem pond", "Fountain / formal feature", "Winterization service", "Not sure yet"] },
    { key: "hasExisting", label: "Do you have an existing water feature?", type: "select", options: ["No", "Yes — needs repair", "Yes — needs maintenance"] },
  ],
  "basement-finishing": [
    { key: "basementSize", label: "Approximate basement size (sq ft)", type: "select", options: ["Under 500", "500–1,000", "1,000–1,500", "1,500+", "Not sure"] },
    { key: "purpose", label: "What's the space for?", type: "select", options: ["Rec room / family space", "Home theatre", "Home gym", "Legal rental suite", "Home office", "Multiple"] },
  ],
  drywall: [
    { key: "workType", label: "What do you need?", type: "select", options: ["New installation", "Water damage repair", "Crack / patch repair", "Full room or basement", "Other"] },
    { key: "roomCount", label: "How many rooms / areas?", type: "select", options: ["1", "2–3", "4+", "Whole basement"] },
  ],
  flooring: [
    { key: "material", label: "Flooring material", type: "select", options: ["Luxury vinyl plank", "Laminate", "Engineered hardwood", "Solid hardwood", "Not sure — advise me"] },
    { key: "approxArea", label: "Approximate area (sq ft)", type: "text" },
  ],
  "kitchen-bath-remodeling": [
    { key: "room", label: "Which room?", type: "select", options: ["Kitchen", "Bathroom", "Both", "Powder room"] },
    { key: "scope", label: "Project scope", type: "select", options: ["Refresh / update", "Full remodel", "Layout change", "Not sure yet"] },
  ],
  painting: [
    { key: "paintType", label: "Interior or exterior?", type: "select", options: ["Interior", "Exterior", "Both", "Cabinets / trim"] },
    { key: "roomCount", label: "How many rooms / areas?", type: "select", options: ["1–2", "3–5", "Whole home", "Exterior only"] },
  ],
  "commercial-landscape-design": [
    { key: "propertyType", label: "Property type", type: "select", options: ["Office", "Retail plaza", "Condo / HOA", "Industrial", "Other commercial"] },
    { key: "scope", label: "What do you need?", type: "select", options: ["New site design", "Entrance refresh", "Redesign of existing grounds", "Design + build + maintenance"] },
  ],
  "commercial-property-maintenance": [
    { key: "propertyType", label: "Property type", type: "select", options: ["Office", "Retail plaza", "Condo / HOA", "Industrial", "Other commercial"] },
    { key: "frequency", label: "Service frequency", type: "select", options: ["Weekly", "Bi-weekly", "Seasonal contract incl. snow", "One-time cleanup"] },
  ],
  "snow-removal": [
    { key: "serviceModel", label: "Seasonal contract or per-event?", type: "select", options: ["Seasonal contract (unlimited visits)", "Per-event / on-call", "Not sure — advise me"] },
    { key: "propertyType", label: "Property type", type: "select", options: ["House — driveway + walkway", "Townhome", "Commercial lot", "Multi-unit residential"] },
  ],
};

export function getServiceQuestions(slug) {
  return SERVICE_QUESTIONS[slug] || [];
}
