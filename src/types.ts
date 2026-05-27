export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  longDesc?: string;
  tech: string[];
  link?: string;
  repo?: string;
  category: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface Activity {
  id: string;
  title: string;
  organization: string;
  location: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  activities?: Activity[];
  rates?: string;
  availability?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
