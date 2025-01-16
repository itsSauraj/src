import { UUID } from "crypto";

export interface Course {
  id: UUID;
  title: string;
  description: string;
}
