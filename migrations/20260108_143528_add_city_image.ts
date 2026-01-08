import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr', 'de', 'nl', 'it', 'es');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('Leaf', 'Building2', 'GraduationCap', 'Heart', 'Users', 'Sprout');
  CREATE TYPE "public"."enum_cities_region" AS ENUM('north-america', 'europe');
  CREATE TYPE "public"."enum_faq_items_category" AS ENUM('General Urban Farming Queries', 'About Us', 'Technical', 'Products and Services', 'Engagement', 'Collaboration', 'Getting Started', 'Safety');
  CREATE TYPE "public"."enum_blog_posts_categories" AS ENUM('CSR', 'ESG', 'Green Buildings', 'Urban Farming', 'Sustainability', 'News', 'Case Studies', 'Education');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_version_categories" AS ENUM('CSR', 'ESG', 'Green Buildings', 'Urban Farming', 'Sustainability', 'News', 'Case Studies', 'Education');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_published_locale" AS ENUM('en', 'fr', 'de', 'nl', 'it', 'es');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stats_locales" (
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum_services_icon" NOT NULL,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"image_id" integer,
  	"company_logo_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar NOT NULL,
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" "enum_cities_region" NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cities_locales" (
  	"name" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faq_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" "enum_faq_items_category" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_posts_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_blog_posts_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"author" varchar,
  	"published_date" timestamp(3) with time zone,
  	"featured_image_id" integer,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_posts_v_version_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__blog_posts_v_version_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_author" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_featured_image_id" integer,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"stats_id" integer,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"partners_id" integer,
  	"cities_id" integer,
  	"faq_items_id" integer,
  	"blog_posts_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hero_locales" (
  	"title" varchar NOT NULL,
  	"title_highlight" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"cta_primary" varchar NOT NULL,
  	"cta_secondary" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "impact_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "impact_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impact_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_highlight" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_highlight" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partners_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testimonials_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cities_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cities_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar,
  	"cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faq_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar,
  	"cta_button_text" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cta_section_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"indicator" varchar NOT NULL
  );
  
  CREATE TABLE "cta_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_secondary_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cta_section_locales" (
  	"label" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_highlight" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_primary" varchar NOT NULL,
  	"cta_secondary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_label" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"mission_label" varchar NOT NULL,
  	"mission_title" varchar NOT NULL,
  	"mission_paragraph1" varchar NOT NULL,
  	"mission_paragraph2" varchar,
  	"solidarity_label" varchar,
  	"solidarity_title" varchar,
  	"solidarity_description" varchar,
  	"story_label" varchar,
  	"story_title" varchar,
  	"story_content" jsonb,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "outdoor_farm_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "outdoor_farm_page_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "outdoor_farm_page_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "outdoor_farm_page_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "outdoor_farm_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "outdoor_farm_page_locales" (
  	"hero_label" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"services_label" varchar,
  	"services_title" varchar,
  	"gallery_label" varchar,
  	"gallery_title" varchar,
  	"packages_label" varchar,
  	"packages_title" varchar,
  	"requirements_label" varchar,
  	"requirements_title" varchar,
  	"requirements_description" varchar,
  	"requirements_card_title" varchar,
  	"requirements_card_description" varchar,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"cta_view_faq" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "indoor_farm_page_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "indoor_farm_page_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "indoor_farm_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "indoor_farm_page_locales" (
  	"hero_label" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"features_label" varchar,
  	"features_title" varchar,
  	"benefits_label" varchar,
  	"benefits_title" varchar,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "careers_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "careers_page_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "careers_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "careers_page_locales" (
  	"hero_label" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"intro_text" varchar,
  	"values_label" varchar,
  	"values_title" varchar,
  	"why_join_label" varchar,
  	"why_join_title" varchar,
  	"cta_title" varchar,
  	"cta_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"address" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_offices_locales" (
  	"name" varchar NOT NULL,
  	"type" varchar,
  	"city" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"hero_label" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_title_highlight" varchar NOT NULL,
  	"intro_text" varchar,
  	"form_title" varchar,
  	"form_subtitle" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "educational_activities_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "educational_activities_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "community_engagement_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "community_engagement_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "commercial_real_estate_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "commercial_real_estate_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "corporations_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "corporations_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "schools_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "schools_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partnerships_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partnerships_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cities_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cities_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "privacy_policy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_policy_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "terms_of_service_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terms_of_service_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cookie_policy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cookie_policy_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "roi_calculator_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "roi_calculator_page_locales" (
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats_locales" ADD CONSTRAINT "stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities" ADD CONSTRAINT "cities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities_locales" ADD CONSTRAINT "cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_items_locales" ADD CONSTRAINT "faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_categories" ADD CONSTRAINT "blog_posts_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_categories" ADD CONSTRAINT "_blog_posts_v_version_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stats_fk" FOREIGN KEY ("stats_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_items_fk" FOREIGN KEY ("faq_items_id") REFERENCES "public"."faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero" ADD CONSTRAINT "hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero" ADD CONSTRAINT "hero_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_locales" ADD CONSTRAINT "hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_section_images" ADD CONSTRAINT "impact_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_section_images" ADD CONSTRAINT "impact_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_section_locales" ADD CONSTRAINT "impact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_section_locales" ADD CONSTRAINT "services_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_section_locales" ADD CONSTRAINT "partners_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_section_locales" ADD CONSTRAINT "testimonials_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_section_locales" ADD CONSTRAINT "cities_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_section" ADD CONSTRAINT "faq_section_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_section_locales" ADD CONSTRAINT "faq_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_section_trust_indicators" ADD CONSTRAINT "cta_section_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_section_locales" ADD CONSTRAINT "cta_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_impact_stats" ADD CONSTRAINT "about_page_impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outdoor_farm_page_services" ADD CONSTRAINT "outdoor_farm_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outdoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outdoor_farm_page_packages_features" ADD CONSTRAINT "outdoor_farm_page_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outdoor_farm_page_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outdoor_farm_page_packages" ADD CONSTRAINT "outdoor_farm_page_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outdoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outdoor_farm_page_requirements" ADD CONSTRAINT "outdoor_farm_page_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outdoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outdoor_farm_page" ADD CONSTRAINT "outdoor_farm_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "outdoor_farm_page_locales" ADD CONSTRAINT "outdoor_farm_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outdoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "indoor_farm_page_features" ADD CONSTRAINT "indoor_farm_page_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."indoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "indoor_farm_page_benefits" ADD CONSTRAINT "indoor_farm_page_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."indoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "indoor_farm_page" ADD CONSTRAINT "indoor_farm_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "indoor_farm_page_locales" ADD CONSTRAINT "indoor_farm_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."indoor_farm_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page_values" ADD CONSTRAINT "careers_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page_benefits" ADD CONSTRAINT "careers_page_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_page" ADD CONSTRAINT "careers_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_page_locales" ADD CONSTRAINT "careers_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_offices" ADD CONSTRAINT "contact_page_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_offices_locales" ADD CONSTRAINT "contact_page_offices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_quick_links" ADD CONSTRAINT "contact_page_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "educational_activities_page" ADD CONSTRAINT "educational_activities_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "educational_activities_page_locales" ADD CONSTRAINT "educational_activities_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."educational_activities_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "community_engagement_page" ADD CONSTRAINT "community_engagement_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "community_engagement_page_locales" ADD CONSTRAINT "community_engagement_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."community_engagement_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "commercial_real_estate_page" ADD CONSTRAINT "commercial_real_estate_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "commercial_real_estate_page_locales" ADD CONSTRAINT "commercial_real_estate_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."commercial_real_estate_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "corporations_page" ADD CONSTRAINT "corporations_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "corporations_page_locales" ADD CONSTRAINT "corporations_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."corporations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schools_page" ADD CONSTRAINT "schools_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schools_page_locales" ADD CONSTRAINT "schools_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schools_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partnerships_page" ADD CONSTRAINT "partnerships_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partnerships_page_locales" ADD CONSTRAINT "partnerships_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partnerships_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities_page" ADD CONSTRAINT "cities_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities_page_locales" ADD CONSTRAINT "cities_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_locales" ADD CONSTRAINT "blog_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_page" ADD CONSTRAINT "privacy_policy_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_policy_page_locales" ADD CONSTRAINT "privacy_policy_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_of_service_page" ADD CONSTRAINT "terms_of_service_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "terms_of_service_page_locales" ADD CONSTRAINT "terms_of_service_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_of_service_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cookie_policy_page" ADD CONSTRAINT "cookie_policy_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cookie_policy_page_locales" ADD CONSTRAINT "cookie_policy_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cookie_policy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roi_calculator_page" ADD CONSTRAINT "roi_calculator_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "roi_calculator_page_locales" ADD CONSTRAINT "roi_calculator_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roi_calculator_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stats_updated_at_idx" ON "stats" USING btree ("updated_at");
  CREATE INDEX "stats_created_at_idx" ON "stats" USING btree ("created_at");
  CREATE UNIQUE INDEX "stats_locales_locale_parent_id_unique" ON "stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_features_locale_idx" ON "services_features" USING btree ("_locale");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_image_idx" ON "testimonials" USING btree ("image_id");
  CREATE INDEX "testimonials_company_logo_idx" ON "testimonials" USING btree ("company_logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "cities_slug_idx" ON "cities" USING btree ("slug");
  CREATE INDEX "cities_image_idx" ON "cities" USING btree ("image_id");
  CREATE INDEX "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE UNIQUE INDEX "cities_locales_locale_parent_id_unique" ON "cities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_items_updated_at_idx" ON "faq_items" USING btree ("updated_at");
  CREATE INDEX "faq_items_created_at_idx" ON "faq_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "faq_items_locales_locale_parent_id_unique" ON "faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_categories_order_idx" ON "blog_posts_categories" USING btree ("order");
  CREATE INDEX "blog_posts_categories_parent_idx" ON "blog_posts_categories" USING btree ("parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_featured_image_idx" ON "blog_posts" USING btree ("featured_image_id");
  CREATE INDEX "blog_posts_seo_seo_og_image_idx" ON "blog_posts" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE UNIQUE INDEX "blog_posts_locales_locale_parent_id_unique" ON "blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_version_categories_order_idx" ON "_blog_posts_v_version_categories" USING btree ("order");
  CREATE INDEX "_blog_posts_v_version_categories_parent_idx" ON "_blog_posts_v_version_categories" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_featured_image_idx" ON "_blog_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_posts_v_version_seo_version_seo_og_image_idx" ON "_blog_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_snapshot_idx" ON "_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX "_blog_posts_v_published_locale_idx" ON "_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_blog_posts_v_locales_locale_parent_id_unique" ON "_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("stats_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_faq_items_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_items_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_image_idx" ON "hero" USING btree ("image_id");
  CREATE INDEX "hero_seo_seo_og_image_idx" ON "hero" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "hero_locales_locale_parent_id_unique" ON "hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_section_images_order_idx" ON "impact_section_images" USING btree ("_order");
  CREATE INDEX "impact_section_images_parent_id_idx" ON "impact_section_images" USING btree ("_parent_id");
  CREATE INDEX "impact_section_images_image_idx" ON "impact_section_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "impact_section_locales_locale_parent_id_unique" ON "impact_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_section_locales_locale_parent_id_unique" ON "services_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "partners_section_locales_locale_parent_id_unique" ON "partners_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_section_locales_locale_parent_id_unique" ON "testimonials_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "cities_section_locales_locale_parent_id_unique" ON "cities_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_section_seo_seo_og_image_idx" ON "faq_section" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "faq_section_locales_locale_parent_id_unique" ON "faq_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cta_section_trust_indicators_order_idx" ON "cta_section_trust_indicators" USING btree ("_order");
  CREATE INDEX "cta_section_trust_indicators_parent_id_idx" ON "cta_section_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "cta_section_trust_indicators_locale_idx" ON "cta_section_trust_indicators" USING btree ("_locale");
  CREATE UNIQUE INDEX "cta_section_locales_locale_parent_id_unique" ON "cta_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_impact_stats_order_idx" ON "about_page_impact_stats" USING btree ("_order");
  CREATE INDEX "about_page_impact_stats_parent_id_idx" ON "about_page_impact_stats" USING btree ("_parent_id");
  CREATE INDEX "about_page_impact_stats_locale_idx" ON "about_page_impact_stats" USING btree ("_locale");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "about_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "outdoor_farm_page_services_order_idx" ON "outdoor_farm_page_services" USING btree ("_order");
  CREATE INDEX "outdoor_farm_page_services_parent_id_idx" ON "outdoor_farm_page_services" USING btree ("_parent_id");
  CREATE INDEX "outdoor_farm_page_services_locale_idx" ON "outdoor_farm_page_services" USING btree ("_locale");
  CREATE INDEX "outdoor_farm_page_packages_features_order_idx" ON "outdoor_farm_page_packages_features" USING btree ("_order");
  CREATE INDEX "outdoor_farm_page_packages_features_parent_id_idx" ON "outdoor_farm_page_packages_features" USING btree ("_parent_id");
  CREATE INDEX "outdoor_farm_page_packages_features_locale_idx" ON "outdoor_farm_page_packages_features" USING btree ("_locale");
  CREATE INDEX "outdoor_farm_page_packages_order_idx" ON "outdoor_farm_page_packages" USING btree ("_order");
  CREATE INDEX "outdoor_farm_page_packages_parent_id_idx" ON "outdoor_farm_page_packages" USING btree ("_parent_id");
  CREATE INDEX "outdoor_farm_page_packages_locale_idx" ON "outdoor_farm_page_packages" USING btree ("_locale");
  CREATE INDEX "outdoor_farm_page_requirements_order_idx" ON "outdoor_farm_page_requirements" USING btree ("_order");
  CREATE INDEX "outdoor_farm_page_requirements_parent_id_idx" ON "outdoor_farm_page_requirements" USING btree ("_parent_id");
  CREATE INDEX "outdoor_farm_page_requirements_locale_idx" ON "outdoor_farm_page_requirements" USING btree ("_locale");
  CREATE INDEX "outdoor_farm_page_seo_seo_og_image_idx" ON "outdoor_farm_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "outdoor_farm_page_locales_locale_parent_id_unique" ON "outdoor_farm_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "indoor_farm_page_features_order_idx" ON "indoor_farm_page_features" USING btree ("_order");
  CREATE INDEX "indoor_farm_page_features_parent_id_idx" ON "indoor_farm_page_features" USING btree ("_parent_id");
  CREATE INDEX "indoor_farm_page_features_locale_idx" ON "indoor_farm_page_features" USING btree ("_locale");
  CREATE INDEX "indoor_farm_page_benefits_order_idx" ON "indoor_farm_page_benefits" USING btree ("_order");
  CREATE INDEX "indoor_farm_page_benefits_parent_id_idx" ON "indoor_farm_page_benefits" USING btree ("_parent_id");
  CREATE INDEX "indoor_farm_page_benefits_locale_idx" ON "indoor_farm_page_benefits" USING btree ("_locale");
  CREATE INDEX "indoor_farm_page_seo_seo_og_image_idx" ON "indoor_farm_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "indoor_farm_page_locales_locale_parent_id_unique" ON "indoor_farm_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "careers_page_values_order_idx" ON "careers_page_values" USING btree ("_order");
  CREATE INDEX "careers_page_values_parent_id_idx" ON "careers_page_values" USING btree ("_parent_id");
  CREATE INDEX "careers_page_values_locale_idx" ON "careers_page_values" USING btree ("_locale");
  CREATE INDEX "careers_page_benefits_order_idx" ON "careers_page_benefits" USING btree ("_order");
  CREATE INDEX "careers_page_benefits_parent_id_idx" ON "careers_page_benefits" USING btree ("_parent_id");
  CREATE INDEX "careers_page_benefits_locale_idx" ON "careers_page_benefits" USING btree ("_locale");
  CREATE INDEX "careers_page_seo_seo_og_image_idx" ON "careers_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "careers_page_locales_locale_parent_id_unique" ON "careers_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_offices_order_idx" ON "contact_page_offices" USING btree ("_order");
  CREATE INDEX "contact_page_offices_parent_id_idx" ON "contact_page_offices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_page_offices_locales_locale_parent_id_unique" ON "contact_page_offices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_quick_links_order_idx" ON "contact_page_quick_links" USING btree ("_order");
  CREATE INDEX "contact_page_quick_links_parent_id_idx" ON "contact_page_quick_links" USING btree ("_parent_id");
  CREATE INDEX "contact_page_quick_links_locale_idx" ON "contact_page_quick_links" USING btree ("_locale");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "educational_activities_page_seo_seo_og_image_idx" ON "educational_activities_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "educational_activities_page_locales_locale_parent_id_unique" ON "educational_activities_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "community_engagement_page_seo_seo_og_image_idx" ON "community_engagement_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "community_engagement_page_locales_locale_parent_id_unique" ON "community_engagement_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "commercial_real_estate_page_seo_seo_og_image_idx" ON "commercial_real_estate_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "commercial_real_estate_page_locales_locale_parent_id_unique" ON "commercial_real_estate_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "corporations_page_seo_seo_og_image_idx" ON "corporations_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "corporations_page_locales_locale_parent_id_unique" ON "corporations_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "schools_page_seo_seo_og_image_idx" ON "schools_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "schools_page_locales_locale_parent_id_unique" ON "schools_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partnerships_page_seo_seo_og_image_idx" ON "partnerships_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "partnerships_page_locales_locale_parent_id_unique" ON "partnerships_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cities_page_seo_seo_og_image_idx" ON "cities_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "cities_page_locales_locale_parent_id_unique" ON "cities_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_page_seo_seo_og_image_idx" ON "blog_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "blog_page_locales_locale_parent_id_unique" ON "blog_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_policy_page_seo_seo_og_image_idx" ON "privacy_policy_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "privacy_policy_page_locales_locale_parent_id_unique" ON "privacy_policy_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_of_service_page_seo_seo_og_image_idx" ON "terms_of_service_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "terms_of_service_page_locales_locale_parent_id_unique" ON "terms_of_service_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cookie_policy_page_seo_seo_og_image_idx" ON "cookie_policy_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "cookie_policy_page_locales_locale_parent_id_unique" ON "cookie_policy_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "roi_calculator_page_seo_seo_og_image_idx" ON "roi_calculator_page" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "roi_calculator_page_locales_locale_parent_id_unique" ON "roi_calculator_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "stats" CASCADE;
  DROP TABLE "stats_locales" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "cities_locales" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "faq_items_locales" CASCADE;
  DROP TABLE "blog_posts_categories" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_locales" CASCADE;
  DROP TABLE "_blog_posts_v_version_categories" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "_blog_posts_v_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "hero_locales" CASCADE;
  DROP TABLE "impact_section_images" CASCADE;
  DROP TABLE "impact_section" CASCADE;
  DROP TABLE "impact_section_locales" CASCADE;
  DROP TABLE "services_section" CASCADE;
  DROP TABLE "services_section_locales" CASCADE;
  DROP TABLE "partners_section" CASCADE;
  DROP TABLE "partners_section_locales" CASCADE;
  DROP TABLE "testimonials_section" CASCADE;
  DROP TABLE "testimonials_section_locales" CASCADE;
  DROP TABLE "cities_section" CASCADE;
  DROP TABLE "cities_section_locales" CASCADE;
  DROP TABLE "faq_section" CASCADE;
  DROP TABLE "faq_section_locales" CASCADE;
  DROP TABLE "cta_section_trust_indicators" CASCADE;
  DROP TABLE "cta_section" CASCADE;
  DROP TABLE "cta_section_locales" CASCADE;
  DROP TABLE "about_page_impact_stats" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "outdoor_farm_page_services" CASCADE;
  DROP TABLE "outdoor_farm_page_packages_features" CASCADE;
  DROP TABLE "outdoor_farm_page_packages" CASCADE;
  DROP TABLE "outdoor_farm_page_requirements" CASCADE;
  DROP TABLE "outdoor_farm_page" CASCADE;
  DROP TABLE "outdoor_farm_page_locales" CASCADE;
  DROP TABLE "indoor_farm_page_features" CASCADE;
  DROP TABLE "indoor_farm_page_benefits" CASCADE;
  DROP TABLE "indoor_farm_page" CASCADE;
  DROP TABLE "indoor_farm_page_locales" CASCADE;
  DROP TABLE "careers_page_values" CASCADE;
  DROP TABLE "careers_page_benefits" CASCADE;
  DROP TABLE "careers_page" CASCADE;
  DROP TABLE "careers_page_locales" CASCADE;
  DROP TABLE "contact_page_offices" CASCADE;
  DROP TABLE "contact_page_offices_locales" CASCADE;
  DROP TABLE "contact_page_quick_links" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "educational_activities_page" CASCADE;
  DROP TABLE "educational_activities_page_locales" CASCADE;
  DROP TABLE "community_engagement_page" CASCADE;
  DROP TABLE "community_engagement_page_locales" CASCADE;
  DROP TABLE "commercial_real_estate_page" CASCADE;
  DROP TABLE "commercial_real_estate_page_locales" CASCADE;
  DROP TABLE "corporations_page" CASCADE;
  DROP TABLE "corporations_page_locales" CASCADE;
  DROP TABLE "schools_page" CASCADE;
  DROP TABLE "schools_page_locales" CASCADE;
  DROP TABLE "partnerships_page" CASCADE;
  DROP TABLE "partnerships_page_locales" CASCADE;
  DROP TABLE "cities_page" CASCADE;
  DROP TABLE "cities_page_locales" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "blog_page_locales" CASCADE;
  DROP TABLE "privacy_policy_page" CASCADE;
  DROP TABLE "privacy_policy_page_locales" CASCADE;
  DROP TABLE "terms_of_service_page" CASCADE;
  DROP TABLE "terms_of_service_page_locales" CASCADE;
  DROP TABLE "cookie_policy_page" CASCADE;
  DROP TABLE "cookie_policy_page_locales" CASCADE;
  DROP TABLE "roi_calculator_page" CASCADE;
  DROP TABLE "roi_calculator_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_cities_region";
  DROP TYPE "public"."enum_faq_items_category";
  DROP TYPE "public"."enum_blog_posts_categories";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_categories";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum__blog_posts_v_published_locale";`)
}
