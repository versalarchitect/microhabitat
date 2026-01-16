import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "cities_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "cities_locales" ADD COLUMN "region_name" varchar;
  ALTER TABLE "cities_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "cities_highlights" ADD CONSTRAINT "cities_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cities_highlights_order_idx" ON "cities_highlights" USING btree ("_order");
  CREATE INDEX "cities_highlights_parent_id_idx" ON "cities_highlights" USING btree ("_parent_id");
  CREATE INDEX "cities_highlights_locale_idx" ON "cities_highlights" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cities_highlights" CASCADE;
  ALTER TABLE "cities_locales" DROP COLUMN "region_name";
  ALTER TABLE "cities_locales" DROP COLUMN "description";`)
}
