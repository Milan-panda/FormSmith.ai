import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://formsmith-forms_owner:SUOacMNJbm89@ep-dawn-brook-a19ffflh.ap-southeast-1.aws.neon.tech/formsmith-forms?sslmode=require',
  }
});