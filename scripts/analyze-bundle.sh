#!/bin/bash

echo "📊 ANALYSE DU BUNDLE - DIAGNOSTIC PERFORMANCE"
echo "=============================================="

# 1. Build avec analyse
echo "🔨 Build en cours avec analyse..."
npm run build > build.log 2>&1

# 2. Analyse des tailles de fichiers
echo "📁 Analyse des tailles de fichiers générés:"
echo "=========================================="
if [ -d "dist" ]; then
  echo "📊 Fichiers dans dist/:"
  du -h dist/* 2>/dev/null | sort -hr
  echo ""
  
  echo "📦 Détail des assets:"
  ls -lh dist/assets/ 2>/dev/null | grep -E "\.(js|css)$" || echo "Aucun asset trouvé"
  echo ""
fi

# 3. Analyse des dépendances dans package.json
echo "📦 TOP 10 DES PLUS GROS PACKAGES:"
echo "================================="
if command -v npm ls &> /dev/null; then
  npm ls --depth=0 --parseable 2>/dev/null | head -10 || echo "Impossible d'analyser les packages"
fi
echo ""

# 4. Analyse des imports dans le code
echo "🔍 ANALYSE DES IMPORTS DANS LE CODE:"
echo "==================================="
echo "📊 Nombre d'imports par fichier (top 10):"
find src -name "*.tsx" -exec grep -c "^import" {} \; -print | \
  sed 'N;s/\n/ /' | sort -nr | head -10

echo ""
echo "📦 Packages les plus importés:"
grep -r "from ['\"]" src --include="*.tsx" --include="*.ts" | \
  sed "s/.*from ['\"]//; s/['\"].*//" | \
  grep -v "^@/" | grep -v "^\." | \
  sort | uniq -c | sort -nr | head -10

echo ""

# 5. Recherche de gros fichiers sources
echo "📁 FICHIERS SOURCES LES PLUS VOLUMINEUX:"
echo "======================================="
find src -name "*.tsx" -exec wc -c {} \; -print | \
  sed 'N;s/\n/ /' | sort -nr | head -10 | \
  while read size file; do
    echo "$(echo $size | numfmt --to=iec-i)B $file"
  done

echo ""

# 6. Analyse des logs de build
echo "⚠️  AVERTISSEMENTS DE BUILD:"
echo "==========================="
if [ -f "build.log" ]; then
  grep -E "(warning|large|chunk|MB|KB)" build.log || echo "Aucun avertissement trouvé"
else
  echo "Fichier build.log non trouvé"
fi

echo ""
echo "✅ ANALYSE TERMINÉE"
echo "=================="