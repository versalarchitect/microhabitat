#!/usr/bin/env python3
import json
import urllib.request
import os

BASE_URL = "http://localhost:1337"

# Login
login_data = json.dumps({"email": "charlesdotdirect@gmail.com", "password": "Wazons001!"}).encode()
req = urllib.request.Request(f"{BASE_URL}/admin/login", data=login_data, headers={"Content-Type": "application/json"})
resp = urllib.request.urlopen(req)
TOKEN = json.loads(resp.read())["data"]["token"]
print(f"Logged in, token: {TOKEN[:50]}...")

def api_get(endpoint):
    req = urllib.request.Request(f"{BASE_URL}{endpoint}", headers={"Authorization": f"Bearer {TOKEN}"})
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())

def api_post(endpoint, data):
    req = urllib.request.Request(f"{BASE_URL}{endpoint}", data=json.dumps(data).encode(),
                                  headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
        return True
    except Exception as e:
        print(f"  Error: {e}")
        return False

# Add French to stats
print("\nAdding French to stats...")
stats = api_get("/content-manager/collection-types/api::stat.stat")
fr_stats = json.load(open("scripts/data/fr/stats.json"))
for i, stat in enumerate(stats.get("results", [])):
    fr = {"locale": "fr", "label": fr_stats[i]["label"], "description": fr_stats[i]["description"]}
    api_post(f"/content-manager/collection-types/api::stat.stat/{stat['documentId']}/localizations", fr)
print(f"  Added {len(stats.get('results', []))} French stats")

# Add French to services
print("Adding French to services...")
items = api_get("/content-manager/collection-types/api::service.service")
fr_items = json.load(open("scripts/data/fr/services.json"))
for i, item in enumerate(items.get("results", [])):
    fr = {"locale": "fr", "title": fr_items[i]["title"], "description": fr_items[i]["description"], "features": fr_items[i]["features"]}
    api_post(f"/content-manager/collection-types/api::service.service/{item['documentId']}/localizations", fr)
print(f"  Added {len(items.get('results', []))} French services")

# Add French to testimonials
print("Adding French to testimonials...")
items = api_get("/content-manager/collection-types/api::testimonial.testimonial")
fr_items = json.load(open("scripts/data/fr/testimonials.json"))
for i, item in enumerate(items.get("results", [])):
    fr = {"locale": "fr", "quote": fr_items[i]["quote"], "role": fr_items[i].get("role", ""), "company": fr_items[i]["company"], "highlight": fr_items[i].get("highlight", "")}
    api_post(f"/content-manager/collection-types/api::testimonial.testimonial/{item['documentId']}/localizations", fr)
print(f"  Added {len(items.get('results', []))} French testimonials")

# Add French to cities
print("Adding French to cities...")
items = api_get("/content-manager/collection-types/api::city.city")
fr_items = json.load(open("scripts/data/fr/cities.json"))
for i, item in enumerate(items.get("results", [])):
    fr = {"locale": "fr", "name": fr_items[i]["name"], "country": fr_items[i]["country"]}
    api_post(f"/content-manager/collection-types/api::city.city/{item['documentId']}/localizations", fr)
print(f"  Added {len(items.get('results', []))} French cities")

# Add French to FAQs
print("Adding French to FAQs...")
items = api_get("/content-manager/collection-types/api::faq.faq")
fr_items = json.load(open("scripts/data/fr/faqs.json"))
count = 0
for i, item in enumerate(items.get("results", [])):
    if i < len(fr_items):
        fr = {"locale": "fr", "question": fr_items[i]["question"], "answer": fr_items[i]["answer"], "category": fr_items[i]["category"]}
        api_post(f"/content-manager/collection-types/api::faq.faq/{item['documentId']}/localizations", fr)
        count += 1
print(f"  Added {count} French FAQs")

# Add French to hero
print("Adding French to hero...")
fr_hero = json.load(open("scripts/data/fr/hero.json"))
fr_hero["locale"] = "fr"
api_post("/content-manager/single-types/api::hero.hero/localizations", fr_hero)
print("  Added French hero")

print("\n=== Done adding French translations! ===")
