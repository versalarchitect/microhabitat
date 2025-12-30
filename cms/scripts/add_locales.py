#!/usr/bin/env python3
"""
Add German (de), Dutch (nl), Italian (it), and Spanish (es) localizations to Strapi content.
Requires Strapi to be running at localhost:1337.
"""
import json
import urllib.request
import os
import sys

BASE_URL = "http://localhost:1337"
LOCALES = ['de', 'nl', 'it', 'es']

# Get credentials from environment or use defaults
EMAIL = os.environ.get('STRAPI_EMAIL', 'admin@microhabitat.com')
PASSWORD = os.environ.get('STRAPI_PASSWORD', 'Admin123!')

def login():
    login_data = json.dumps({"email": EMAIL, "password": PASSWORD}).encode()
    req = urllib.request.Request(f"{BASE_URL}/admin/login", data=login_data, headers={"Content-Type": "application/json"})
    try:
        resp = urllib.request.urlopen(req)
        token = json.loads(resp.read())["data"]["token"]
        print(f"Logged in successfully")
        return token
    except Exception as e:
        print(f"Login failed: {e}")
        sys.exit(1)

def api_get(endpoint, token):
    req = urllib.request.Request(f"{BASE_URL}{endpoint}", headers={"Authorization": f"Bearer {token}"})
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())

def api_post(endpoint, data, token):
    req = urllib.request.Request(f"{BASE_URL}{endpoint}", data=json.dumps(data).encode(),
                                  headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
        return True
    except Exception as e:
        print(f"    Error: {e}")
        return False

def load_locale_data(locale, filename):
    path = f"scripts/data/{locale}/{filename}"
    try:
        return json.load(open(path))
    except Exception as e:
        print(f"    Warning: Could not load {path}: {e}")
        return None

def add_stats_localization(token, locale, items, locale_data):
    print(f"  Adding stats...")
    count = 0
    for i, item in enumerate(items.get("results", [])):
        if i < len(locale_data):
            data = {"locale": locale, "label": locale_data[i]["label"], "description": locale_data[i]["description"]}
            if api_post(f"/content-manager/collection-types/api::stat.stat/{item['documentId']}/localizations", data, token):
                count += 1
    print(f"    Added {count} stats")

def add_services_localization(token, locale, items, locale_data):
    print(f"  Adding services...")
    count = 0
    for i, item in enumerate(items.get("results", [])):
        if i < len(locale_data):
            data = {"locale": locale, "title": locale_data[i]["title"], "description": locale_data[i]["description"], "features": locale_data[i]["features"]}
            if api_post(f"/content-manager/collection-types/api::service.service/{item['documentId']}/localizations", data, token):
                count += 1
    print(f"    Added {count} services")

def add_testimonials_localization(token, locale, items, locale_data):
    print(f"  Adding testimonials...")
    count = 0
    for i, item in enumerate(items.get("results", [])):
        if i < len(locale_data):
            data = {"locale": locale, "quote": locale_data[i]["quote"], "role": locale_data[i].get("role", ""),
                    "company": locale_data[i]["company"], "highlight": locale_data[i].get("highlight", "")}
            if api_post(f"/content-manager/collection-types/api::testimonial.testimonial/{item['documentId']}/localizations", data, token):
                count += 1
    print(f"    Added {count} testimonials")

def add_cities_localization(token, locale, items, locale_data):
    print(f"  Adding cities...")
    count = 0
    for i, item in enumerate(items.get("results", [])):
        if i < len(locale_data):
            data = {"locale": locale, "name": locale_data[i]["name"], "country": locale_data[i]["country"]}
            if api_post(f"/content-manager/collection-types/api::city.city/{item['documentId']}/localizations", data, token):
                count += 1
    print(f"    Added {count} cities")

def add_faqs_localization(token, locale, items, locale_data):
    print(f"  Adding FAQs...")
    count = 0
    for i, item in enumerate(items.get("results", [])):
        if i < len(locale_data):
            data = {"locale": locale, "question": locale_data[i]["question"], "answer": locale_data[i]["answer"],
                    "category": locale_data[i]["category"]}
            if api_post(f"/content-manager/collection-types/api::faq.faq/{item['documentId']}/localizations", data, token):
                count += 1
    print(f"    Added {count} FAQs")

def add_hero_localization(token, locale, locale_data):
    print(f"  Adding hero...")
    locale_data["locale"] = locale
    if api_post("/content-manager/single-types/api::hero.hero/localizations", locale_data, token):
        print(f"    Added hero")
    else:
        print(f"    Failed to add hero")

def main():
    print("=== Adding Multilingual Content to Strapi ===\n")

    token = login()

    # Get existing content
    print("\nFetching existing content...")
    stats = api_get("/content-manager/collection-types/api::stat.stat", token)
    services = api_get("/content-manager/collection-types/api::service.service", token)
    testimonials = api_get("/content-manager/collection-types/api::testimonial.testimonial", token)
    cities = api_get("/content-manager/collection-types/api::city.city", token)
    faqs = api_get("/content-manager/collection-types/api::faq.faq", token)

    print(f"Found: {len(stats.get('results', []))} stats, {len(services.get('results', []))} services, "
          f"{len(testimonials.get('results', []))} testimonials, {len(cities.get('results', []))} cities, "
          f"{len(faqs.get('results', []))} FAQs")

    for locale in LOCALES:
        print(f"\n=== Adding {locale.upper()} translations ===")

        # Load locale data
        stats_data = load_locale_data(locale, "stats.json")
        services_data = load_locale_data(locale, "services.json")
        testimonials_data = load_locale_data(locale, "testimonials.json")
        cities_data = load_locale_data(locale, "cities.json")
        faqs_data = load_locale_data(locale, "faqs.json")
        hero_data = load_locale_data(locale, "hero.json")

        # Add localizations
        if stats_data:
            add_stats_localization(token, locale, stats, stats_data)
        if services_data:
            add_services_localization(token, locale, services, services_data)
        if testimonials_data:
            add_testimonials_localization(token, locale, testimonials, testimonials_data)
        if cities_data:
            add_cities_localization(token, locale, cities, cities_data)
        if faqs_data:
            add_faqs_localization(token, locale, faqs, faqs_data)
        if hero_data:
            add_hero_localization(token, locale, hero_data)

    print("\n=== Done adding all translations! ===")

if __name__ == "__main__":
    main()
