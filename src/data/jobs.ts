// Development-only dummy job listings.
// Replace this array with data from an Admin Dashboard / API later —
// the shape below is what the UI consumes.
export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  department: string;
  description: string;
};

export const jobs: Job[] = [
  {
    id: "car-detailing-technician",
    title: "Car Detailing Technician",
    location: "Ongole, Andhra Pradesh",
    type: "Full Time",
    experience: "0–2 Years",
    department: "Detailing",
    description:
      "Assist with professional vehicle cleaning, detailing and finishing services.",
  },
  {
    id: "ppf-ceramic-technician",
    title: "PPF / Ceramic Coating Technician",
    location: "Ongole, Andhra Pradesh",
    type: "Full Time",
    experience: "1–3 Years",
    department: "Protection & Coating",
    description: "Work with vehicle protection and coating services.",
  },
  {
    id: "customer-relationship-executive",
    title: "Customer Relationship Executive",
    location: "Ongole, Andhra Pradesh",
    type: "Full Time",
    experience: "0–2 Years",
    department: "Customer Support",
    description:
      "Assist customers with service enquiries, bookings and communication.",
  },
];
