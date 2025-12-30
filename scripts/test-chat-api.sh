#!/bin/bash

# Chat API Test Script
# Tests the /api/chat/ai endpoint with various inputs

BASE_URL="${1:-http://localhost:3001}"
API_URL="$BASE_URL/api/chat/ai"
PASSED=0
FAILED=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  MicroHabitat Chat API Test Suite"
echo "========================================"
echo "Testing: $API_URL"
echo ""

# Function to test a message
test_message() {
  local name="$1"
  local message="$2"
  local expected_source="$3"
  local expected_contains="$4"

  echo -n "Testing: $name... "

  response=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"message\": \"$message\"}" 2>/dev/null)

  # Check if response is valid JSON
  if ! echo "$response" | jq -e . >/dev/null 2>&1; then
    echo -e "${RED}FAILED${NC} - Invalid JSON response"
    echo "  Response: ${response:0:200}..."
    ((FAILED++))
    return
  fi

  success=$(echo "$response" | jq -r '.success')
  source=$(echo "$response" | jq -r '.source')
  answer=$(echo "$response" | jq -r '.response')

  # Check success
  if [ "$success" != "true" ]; then
    echo -e "${RED}FAILED${NC} - success != true"
    echo "  Response: $response"
    ((FAILED++))
    return
  fi

  # Check source if specified
  if [ -n "$expected_source" ] && [ "$source" != "$expected_source" ]; then
    echo -e "${YELLOW}WARN${NC} - Expected source '$expected_source', got '$source'"
  fi

  # Check if answer contains expected text
  if [ -n "$expected_contains" ]; then
    if echo "$answer" | grep -qi "$expected_contains"; then
      echo -e "${GREEN}PASSED${NC} (source: $source)"
      ((PASSED++))
    else
      echo -e "${RED}FAILED${NC} - Response doesn't contain '$expected_contains'"
      echo "  Response: ${answer:0:150}..."
      ((FAILED++))
    fi
  else
    if [ ${#answer} -gt 50 ]; then
      echo -e "${GREEN}PASSED${NC} (source: $source, ${#answer} chars)"
      ((PASSED++))
    else
      echo -e "${RED}FAILED${NC} - Response too short"
      echo "  Response: $answer"
      ((FAILED++))
    fi
  fi
}

# Wait for server to be ready
echo "Waiting for server..."
for i in {1..30}; do
  if curl -s "$BASE_URL" >/dev/null 2>&1; then
    echo "Server is ready!"
    echo ""
    break
  fi
  sleep 1
  if [ $i -eq 30 ]; then
    echo -e "${RED}Server not responding after 30s${NC}"
    exit 1
  fi
done

echo "--- Greeting Tests ---"
test_message "Hello greeting" "hello" "greeting" "MicroHabitat assistant"
test_message "Hi greeting" "Hi there!" "greeting" "MicroHabitat assistant"
test_message "Bonjour greeting" "bonjour" "greeting" "MicroHabitat assistant"

echo ""
echo "--- Curated Response Tests ---"
test_message "What is MicroHabitat" "What is MicroHabitat?" "curated" "urban farm"
test_message "Services question" "What services do you offer?" "curated" "Outdoor"
test_message "How to get started" "How do I get started?" "curated" "Book"
test_message "Benefits question" "What are the benefits?" "curated" "Environmental"
test_message "Locations question" "Where do you operate?" "curated" "Montreal"
test_message "Pricing question" "How much does it cost?" "curated" "pricing"
test_message "Certifications" "What certifications do you help with?" "curated" "LEED"
test_message "Contact info" "How can I contact you?" "curated" "info@microhabitat"
test_message "Maintenance" "Who maintains the farms?" "curated" "maintenance"
test_message "Produce grown" "What vegetables do you grow?" "curated" "vegetables"

echo ""
echo "--- Smart Retrieval Tests ---"
test_message "Indoor farming question" "Tell me about indoor vertical farming" "smart-retrieval" "indoor"
test_message "ESG benefits" "How does urban farming help with ESG goals?" "smart-retrieval" "ESG"
test_message "School programs" "Do you offer programs for schools?" "smart-retrieval" "school"
test_message "Career question" "Are you hiring?" "smart-retrieval" "career"
test_message "Real estate value" "How do farms increase property value?" "smart-retrieval" "property"

echo ""
echo "--- Language Detection Tests ---"
test_message "French greeting" "Bonjour, comment ça va?" "greeting" "MicroHabitat"
test_message "French question" "Quels services offrez-vous?" "language-redirect" "français"
test_message "German greeting" "Guten Tag, wie geht es Ihnen?" "greeting" "MicroHabitat"
test_message "Spanish question" "Qué servicios ofrecen?" "language-redirect" "español"

echo ""
echo "--- Fallback Tests ---"
test_message "Unrelated question" "What is the weather like today?" "fallback" "help"
test_message "Random gibberish" "asdfghjkl qwerty" "fallback" "help"

echo ""
echo "========================================"
echo "  Test Results"
echo "========================================"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}Some tests failed${NC}"
  exit 1
fi
