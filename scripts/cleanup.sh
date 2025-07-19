#!/bin/bash

echo "🧹 NETTOYAGE GLOBAL DE L'APPLICATION"
echo "=================================="

# 1. Nettoyage des fichiers de build
echo "📁 Nettoyage des fichiers de build..."
rm -rf dist/
rm -rf build/
rm -rf .vite/
rm -rf node_modules/.cache/
echo "✅ Fichiers de build supprimés"

# 2. Nettoyage des logs temporaires
echo "📋 Nettoyage des logs temporaires..."
find . -name "*.log" -type f -delete 2>/dev/null
find . -name "npm-debug.log*" -type f -delete 2>/dev/null
find . -name "yarn-debug.log*" -type f -delete 2>/dev/null
find . -name "yarn-error.log*" -type f -delete 2>/dev/null
echo "✅ Logs temporaires supprimés"

# 3. Nettoyage des fichiers OS
echo "💻 Nettoyage des fichiers système..."
find . -name ".DS_Store" -type f -delete 2>/dev/null
find . -name "Thumbs.db" -type f -delete 2>/dev/null
find . -name ".Trashes" -type f -delete 2>/dev/null
echo "✅ Fichiers système supprimés"

# 4. Analyse des imports non utilisés
echo "🔍 Analyse des imports non utilisés..."
unused_imports=$(find src -name "*.tsx" -exec grep -l "^import.*{.*}.*from" {} \; | wc -l)
echo "📊 $unused_imports fichiers avec imports à vérifier"

# 5. Statistiques finales
echo ""
echo "📊 STATISTIQUES FINALES:"
echo "========================"
total_files=$(find src -name "*.tsx" -o -name "*.ts" | wc -l)
echo "📁 Total fichiers TypeScript: $total_files"

log_files=$(find src -name "*.tsx" -exec grep -l "console\." {} \; 2>/dev/null | wc -l)
echo "📋 Fichiers avec logs restants: $log_files"

file_size=$(du -sh src/ 2>/dev/null | cut -f1)
echo "💾 Taille du code source: $file_size"

echo ""
echo "✅ NETTOYAGE TERMINÉ"
echo "==================="