CREATE TABLE IF NOT EXISTS "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	CONSTRAINT "items_name_unique" UNIQUE("name")
);
