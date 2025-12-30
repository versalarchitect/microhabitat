#!/usr/bin/env python3
"""Verify all Strapi content exists in all 6 locales with images."""
import json
import urllib.request

BASE_URL = "http://localhost:1337"
LOCALES = ['en', 'fr', 'de', 'nl', 'it', 'es']

def api_get(endpoint):
    try:
        req = urllib.request.Request(f"{BASE_URL}{endpoint}")
        resp = urllib.request.urlopen(req)
        return json.loads(resp.read())
    except Exception as e:
        return {"error": str(e)}

def check_single_type(name, endpoint, image_field=None):
    print(f"\n{name}:")
    for locale in LOCALES:
        pop = f"&populate={image_field}" if image_field else ""
        data = api_get(f"{endpoint}?locale={locale}{pop}")
        if "error" in data:
            print(f"  {locale}: ERROR - {data['error']}")
        elif data.get("data"):
            d = data["data"]
            locale_val = d.get("locale", "?")
            img = ""
            if image_field and d.get(image_field):
                img_data = d.get(image_field)
                if isinstance(img_data, list):
                    img = f" | {len(img_data)} images"
                else:
                    img = f" | image: {img_data.get('url', 'none')[:30]}..."
            # Get first text field for display
            first_field = next((d.get(k) for k in ['label', 'title', 'heading'] if d.get(k)), "")
            print(f"  {locale_val}: {first_field[:40]}{img}")
        else:
            print(f"  {locale}: NO DATA")

def check_collection_type(name, endpoint, image_field=None):
    print(f"\n{name}:")
    for locale in LOCALES:
        pop = f"&populate={image_field}" if image_field else ""
        data = api_get(f"{endpoint}?locale={locale}{pop}")
        if "error" in data:
            print(f"  {locale}: ERROR - {data['error']}")
        elif data.get("data"):
            items = data["data"]
            count = len(items)
            has_images = 0
            if image_field:
                for item in items:
                    if item.get(image_field):
                        has_images += 1
            img_info = f" ({has_images} with images)" if image_field else ""
            locale_val = items[0].get("locale", locale) if items else locale
            print(f"  {locale_val}: {count} items{img_info}")
        else:
            print(f"  {locale}: NO DATA")

print("=" * 60)
print("STRAPI CONTENT VERIFICATION - ALL 6 LOCALES")
print("=" * 60)

# Single Types
check_single_type("HERO", "/api/hero", "image")
check_single_type("IMPACT SECTION", "/api/impact-section", "images")
check_single_type("SERVICES SECTION", "/api/services-section")
check_single_type("PARTNERS SECTION", "/api/partners-section")
check_single_type("TESTIMONIALS SECTION", "/api/testimonials-section")
check_single_type("CITIES SECTION", "/api/cities-section")
check_single_type("FAQ SECTION", "/api/faq-section")
check_single_type("CTA SECTION", "/api/cta-section")

# Collection Types
check_collection_type("STATS", "/api/stats")
check_collection_type("SERVICES", "/api/services", "image")
check_collection_type("TESTIMONIALS", "/api/testimonials", "image")
check_collection_type("PARTNERS", "/api/partners", "logo")
check_collection_type("CITIES", "/api/cities")
check_collection_type("FAQS", "/api/faqs")
check_collection_type("NAV LINKS", "/api/nav-links")
check_collection_type("FOOTER SECTIONS", "/api/footer-sections")

print("\n" + "=" * 60)
print("VERIFICATION COMPLETE")
print("=" * 60)
