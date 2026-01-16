import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "showcase_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "showcase_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "showcase_section_locales" (
  	"label" varchar DEFAULT 'Our Work' NOT NULL,
  	"heading" varchar DEFAULT 'Transforming urban spaces into' NOT NULL,
  	"heading_highlight" varchar DEFAULT 'thriving ecosystems',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "showcase_section_images" ADD CONSTRAINT "showcase_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "showcase_section_images" ADD CONSTRAINT "showcase_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showcase_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "showcase_section_locales" ADD CONSTRAINT "showcase_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showcase_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "showcase_section_images_order_idx" ON "showcase_section_images" USING btree ("_order");
  CREATE INDEX "showcase_section_images_parent_id_idx" ON "showcase_section_images" USING btree ("_parent_id");
  CREATE INDEX "showcase_section_images_image_idx" ON "showcase_section_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "showcase_section_locales_locale_parent_id_unique" ON "showcase_section_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "showcase_section_images" CASCADE;
  DROP TABLE "showcase_section" CASCADE;
  DROP TABLE "showcase_section_locales" CASCADE;`)
}
