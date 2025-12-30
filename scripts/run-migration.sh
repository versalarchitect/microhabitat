#!/bin/bash
# Run website_chats migration on MUF Supabase

API_URL="https://api.supabase.com/v1/projects/cuzozmvjqkatxkzdkojj/database/query"
TOKEN="sbp_fa06a2c7eb4bcae49d8870cdd52c82a64079dc7a"

# Read SQL file and escape for JSON
SQL=$(cat /Users/charlesgaudreaujackson/Code/Microhabitat/microhabitat/lib/chat/schema.sql)

# Execute via Management API
echo "Running website_chats migration..."

curl -s -X POST "$API_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$SQL" | jq -Rs .)}"

echo ""
echo "Migration complete!"
