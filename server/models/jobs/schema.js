// schema.js
const {
  pgTable,
  integer,
  varchar,
  jsonb,
  boolean,
  timestamp,
  numeric,
  date,
  text,
  serial,
} = require("drizzle-orm/pg-core"); // Ensure you're using the correct imports

// Define tables using Drizzle ORM
const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  name: varchar("name", 255).notNull().unique(),
  marketValuation: numeric("market_valuation", 15, 2),
  growthRate: numeric("growth_rate", 5, 2),
  challenges: text("challenges"),
  opportunities: text("opportunities"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", 255).notNull().unique(),
  industryId: integer("industry_id").references(() => industries.id),
  averageSalary: numeric("average_salary", 10, 2),
  jobGrowthRate: numeric("job_growth_rate", 5, 2),
  skillsGap: jsonb("skills_gap"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const employers = pgTable("employers", {
  id: serial("id").primaryKey(),
  name: varchar("name", 255).notNull().unique(),
  locationId: integer("location_id"),
  industryId: integer("industry_id").references(() => industries.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  country: varchar("country", 100),
  state: varchar("state", 100),
  city: varchar("city", 100),
  region: varchar("region", 100),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  industryId: integer("industry_id").references(() => industries.id),
  roleId: integer("role_id").references(() => roles.id),
  employerId: integer("employer_id").references(() => employers.id),
  title: varchar("title", 255).notNull(),
  locationId: integer("location_id").references(() => locations.id),
  experienceLevel: varchar("experience_level", 50),
  salary: numeric("salary", 10, 2),
  isRemote: boolean("is_remote").default(false),
  companyType: varchar("company_type", 50),
  educationRequired: jsonb("education_required"),
  datePosted: date("date_posted"),
  dateClosed: date("date_closed"),
  skillsRequired: text("skills_required").array(),
  certificationsRequired: text("certifications_required").array(),
  status: varchar("status", 50),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


module.exports = { industries, roles, employers, locations, jobs };
