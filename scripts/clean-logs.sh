#!/bin/bash

# Script de nettoyage des logs de debug
echo "🧹 NETTOYAGE DES LOGS DE DEBUG"

# Compter les fichiers avec des logs avant nettoyage
before_count=$(find src -name "*.tsx" -exec grep -l "console\.log\|console\.error\|console\.warn" {} \; | wc -l)
echo "📊 Fichiers avec logs avant nettoyage: $before_count"

# Types de logs à nettoyer (sans supprimer les logs d'erreur importantes)
declare -a patterns_to_remove=(
    "console\.log\('=== DEBUG"
    "console\.log\(\"=== DEBUG"
    "console\.log\('🎯"
    "console\.log\(\"🎯"
    "console\.log\('📋"
    "console\.log\(\"📋"
    "console\.log\('✅"
    "console\.log\(\"✅"
    "console\.log\('Nombre total"
    "console\.log\(\"Nombre total"
    "console\.log\('Formulaires"
    "console\.log\(\"Formulaires"
    "console\.log\('Tous les formulaires"
    "console\.log\(\"Tous les formulaires"
)

# Nettoyer chaque pattern
for pattern in "${patterns_to_remove[@]}"; do
    echo "🔍 Nettoyage du pattern: $pattern"
    find src -name "*.tsx" -type f -exec sed -i "/${pattern}/d" {} \;
done

# Nettoyer les lignes vides consécutives laissées par la suppression
find src -name "*.tsx" -type f -exec sed -i '/^[[:space:]]*$/N;/^\s*\n$/d' {} \;

# Compter les fichiers avec des logs après nettoyage
after_count=$(find src -name "*.tsx" -exec grep -l "console\.log\|console\.error\|console\.warn" {} \; | wc -l)
echo "📊 Fichiers avec logs après nettoyage: $after_count"
echo "✅ Logs supprimés dans $((before_count - after_count)) fichiers"

echo "🎯 NETTOYAGE TERMINÉ"