CREATE TABLE "items" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	CONSTRAINT "items_name_unique" UNIQUE("name")
);

