import { DbService } from "src/app/Services/db.service";

declare global {
  interface Window {
    DbService: DbService;
  }
}
