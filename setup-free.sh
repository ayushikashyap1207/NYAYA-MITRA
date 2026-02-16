#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🎉 Setting up Nyaya-Mitra FREE Version...${NC}"

copy_if_exists() {
  local source=$1
  local target=$2
  if [[ -f "$source" ]]; then
    cp "$source" "$target"
    echo -e "${GREEN}✔ Copied $source to $target${NC}"
  else
    echo -e "${YELLOW}⚠ $source not found, keeping existing $target${NC}"
  fi
}

copy_if_exists "backend/server-free.js" "backend/server.js"
copy_if_exists "backend/controllers/documentController-free.js" "backend/controllers/documentController.js"
copy_if_exists "frontend/src/App-free.jsx" "frontend/src/App.jsx"

if [[ ! -f "backend/.env" ]]; then
  cat <<EOF > backend/.env
PORT=5000
NODE_ENV=development
# FREE mode active
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=10485760
EOF
  echo -e "${GREEN}✔ Created backend/.env${NC}"
fi

if [[ ! -f "frontend/.env" ]]; then
  echo "VITE_API_URL=http://localhost:5000" > frontend/.env
  echo -e "${GREEN}✔ Created frontend/.env${NC}"
fi

echo "FREE MODE ACTIVE" > FREE_MODE_ACTIVE.txt

echo -e "${GREEN}✅ Nyaya-Mitra FREE Version is ready!${NC}"
echo -e "Next steps: install dependencies in backend and frontend, then run dev servers."
