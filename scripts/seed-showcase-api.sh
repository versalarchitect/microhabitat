#!/bin/bash
# Seed showcase images via Payload REST API

API_URL="http://localhost:3000/api"
SHOWCASE_DIR="public/images/showcase"

echo "=== Showcase Seeding Script ==="
echo ""

# Check if dev server is running
if ! curl -s "$API_URL/globals/showcase-section" > /dev/null 2>&1; then
    echo "ERROR: Dev server not running. Start it with 'bun dev' first."
    exit 1
fi

echo "Dev server detected. Starting image upload..."
echo ""

# Array of images to upload
declare -a IMAGES=(
    "urban-rooftop-farm.webp|Urban rooftop farm with lush vegetables"
    "team-photo.webp|MicroHabitat team members working together"
    "fresh-produce.webp|Fresh locally grown produce"
    "community-engagement.webp|Community engagement activity on Toronto rooftop"
    "toronto-rooftop.webp|Rooftop urban farm in Toronto"
    "educational-activities.webp|Educational urban farming activities"
)

# Store uploaded image IDs
IMAGE_IDS=()

for item in "${IMAGES[@]}"; do
    IFS='|' read -r filename alt <<< "$item"
    filepath="$SHOWCASE_DIR/$filename"

    if [ ! -f "$filepath" ]; then
        echo "SKIP: $filename not found"
        continue
    fi

    echo "Uploading: $filename..."

    # Upload image via multipart form
    response=$(curl -s -X POST "$API_URL/media" \
        -F "file=@$filepath" \
        -F "alt=$alt" \
        -H "Content-Type: multipart/form-data")

    # Extract ID from response
    id=$(echo "$response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

    if [ -n "$id" ]; then
        echo "  ✓ Uploaded (ID: $id)"
        IMAGE_IDS+=("$id|$alt")
    else
        echo "  ✗ Failed: $response"
    fi
done

echo ""
echo "Building showcase section payload..."

# Build the images array for the showcase section
images_json="["
first=true
for item in "${IMAGE_IDS[@]}"; do
    IFS='|' read -r id alt <<< "$item"
    if [ "$first" = true ]; then
        first=false
    else
        images_json+=","
    fi
    images_json+="{\"image\":$id,\"alt\":\"$alt\"}"
done
images_json+="]"

# Update showcase section
echo "Updating showcase section..."
update_response=$(curl -s -X POST "$API_URL/globals/showcase-section" \
    -H "Content-Type: application/json" \
    -d "{
        \"label\": \"Our Work\",
        \"heading\": \"Transforming urban spaces into\",
        \"headingHighlight\": \"thriving ecosystems\",
        \"images\": $images_json
    }")

if echo "$update_response" | grep -q '"id"'; then
    echo "✓ Showcase section updated successfully!"
else
    echo "✗ Failed to update showcase section: $update_response"
fi

echo ""
echo "=== Done ==="
