export interface Resource {
  id: string;
  title: string;
  subjectCode: string;
  subject: string;
  type: 'Notes' | 'Slides' | 'Assignment' | 'Syllabus' | 'Links' | 'Videos';
  unit: string;
  tags: string[];
  author: string;
  url: string;
  uploadedAt: string;
  featured?: boolean;
  views?: number;
}

export interface Subject {
  code: string;
  name: string;
  description: string;
  resourceCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bookmarks: string[];
  uploads: string[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  featured: boolean;
}

export const subjects: Subject[] = [
  {
    code: "DS4141",
    name: "Software Engineering",
    description: "Software development lifecycle, design patterns, and project management",
    resourceCount: 12
  },
  {
    code: "DS4142", 
    name: "Blockchain Technology",
    description: "Distributed ledgers, cryptocurrencies, and smart contracts",
    resourceCount: 8
  },
  {
    code: "DS4145",
    name: "Social Network Analysis", 
    description: "Graph theory, centrality measures, and community detection",
    resourceCount: 15
  },
  {
    code: "DS4147",
    name: "Information Retrieval",
    description: "Search engines, ranking algorithms, and text processing",
    resourceCount: 10
  },
  {
    code: "DS4150",
    name: "Computer Vision",
    description: "Image processing, object detection, and machine learning applications",
    resourceCount: 18
  },
  {
    code: "DS4158",
    name: "Supply Chain Management",
    description: "Logistics optimization, demand forecasting, and operations research",
    resourceCount: 7
  }
];

export const seedResources: Resource[] = [
  {
    id: "r1",
    title: "SE Syllabus & Units",
    subjectCode: "DS4141",
    subject: "Software Engineering",
    type: "Syllabus",
    unit: "All",
    tags: ["overview", "semester-plan"],
    author: "Dept",
    url: "#",
    uploadedAt: "2025-07-20",
    featured: true,
    views: 245
  },
  {
    id: "r2",
    title: "Blockchain Basics (Slides)",
    subjectCode: "DS4142",
    subject: "Blockchain Technology",
    type: "Slides",
    unit: "Unit 1",
    tags: ["ledger", "consensus"],
    author: "Student Rep",
    url: "#",
    uploadedAt: "2025-08-01",
    views: 187
  },
  {
    id: "r3",
    title: "SNA – Centrality Cheatsheet",
    subjectCode: "DS4145",
    subject: "Social Network Analysis",
    type: "Notes",
    unit: "Unit 2",
    tags: ["degree", "betweenness", "closeness"],
    author: "Study Group A",
    url: "#",
    uploadedAt: "2025-08-05",
    featured: true,
    views: 312
  },
  {
    id: "r4",
    title: "IR – Boolean vs Vector Space",
    subjectCode: "DS4147",
    subject: "Information Retrieval",
    type: "Notes",
    unit: "Unit 3",
    tags: ["ranking", "tf-idf"],
    author: "TA",
    url: "#",
    uploadedAt: "2025-08-07",
    views: 156
  },
  {
    id: "r5",
    title: "CV – Edge Detection Lab",
    subjectCode: "DS4150",
    subject: "Computer Vision",
    type: "Assignment",
    unit: "Unit 4",
    tags: ["opencv", "canny"],
    author: "Lab",
    url: "#",
    uploadedAt: "2025-08-10",
    views: 203
  },
  {
    id: "r6",
    title: "SCM – Forecasting Slides",
    subjectCode: "DS4158",
    subject: "Supply Chain Management",
    type: "Slides",
    unit: "Unit 5",
    tags: ["demand", "bullwhip"],
    author: "Faculty",
    url: "#",
    uploadedAt: "2025-08-12",
    views: 124
  },
  {
    id: "r7",
    title: "Design Patterns Deep Dive",
    subjectCode: "DS4141",
    subject: "Software Engineering",
    type: "Notes",
    unit: "Unit 3",
    tags: ["patterns", "architecture", "oop"],
    author: "Prof. Sharma",
    url: "#",
    uploadedAt: "2025-08-14",
    views: 189
  },
  {
    id: "r8",
    title: "Smart Contracts Tutorial",
    subjectCode: "DS4142",
    subject: "Blockchain Technology",
    type: "Videos",
    unit: "Unit 4",
    tags: ["ethereum", "solidity", "dapps"],
    author: "TechClub",
    url: "#",
    uploadedAt: "2025-08-15",
    views: 267
  }
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Mid-Semester Exams Schedule",
    message: "Mid-sem exams start from Sept 15. Check individual subject pages for specific dates.",
    type: "info",
    date: "2025-08-16",
    featured: true
  },
  {
    id: "a2", 
    title: "New Study Group Resources",
    message: "Fresh notes and assignments uploaded for CV and SNA subjects.",
    type: "success",
    date: "2025-08-15",
    featured: false
  }
];