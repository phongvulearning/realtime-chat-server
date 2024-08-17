export interface Message {
  id: string;
  author: Author;
  content: string;
}

export interface Author {
  rgbColor: string;
  name: string;
  badges: Badge[];
}

export type Badge = "moderator" | "vip" | "prime" | "turbo";
