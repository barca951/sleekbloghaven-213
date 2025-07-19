/**
 * Utilitaire pour identifier et nettoyer les fichiers obsolètes
 */

import { lightSecurityMonitor } from './optimizedSecurity';

// Fichiers nettoyés (supprimés avec succès)
const cleanedFiles = [
  'src/utils/enhancedSecurity.ts', // ✅ Supprimé - remplacé par optimizedSecurity
  'src/components/ai/future-features/PredictiveAnalysisTab.tsx', // ✅ Supprimé - non implémenté
];

// Fichiers inexistants (déjà supprimés précédemment)
const alreadyCleanedFiles = [
  'src/utils/enhancedValidation.ts',
  'src/utils/securityUtils.ts',
  'src/utils/securityEnhanced.ts',
  'src/components/modals/UnifiedModalManager.tsx',
  'src/utils/validation/enhancedValidator.ts'
];

// Fichiers volumineux à refactoriser
const largeFilesToRefactor = [
  {
    file: 'src/utils/unifiedSecurity.ts',
    currentLines: 374,
    reason: 'Fichier de sécurité trop volumineux'
  },
  {
    file: 'src/components/Dashboard.tsx', 
    currentLines: 500,
    reason: 'Composant Dashboard trop complexe'
  }
];

export class CleanupManager {
  private cleanupLog: string[] = [];

  logCleanup(action: string, file: string) {
    const logEntry = `${new Date().toISOString()}: ${action} - ${file}`;
    this.cleanupLog.push(logEntry);
    lightSecurityMonitor.logEvent('file_cleanup', 'low');
    console.log(`🧹 CLEANUP: ${logEntry}`);
  }

  getCleanedFiles(): string[] {
    return cleanedFiles;
  }

  getAlreadyCleanedFiles(): string[] {
    return alreadyCleanedFiles;
  }

  getLargeFiles(): typeof largeFilesToRefactor {
    return largeFilesToRefactor;
  }

  getCleanupSummary() {
    return {
      cleanedFilesCount: cleanedFiles.length,
      alreadyCleanedCount: alreadyCleanedFiles.length,
      largeFilesCount: largeFilesToRefactor.length,
      cleanupActions: this.cleanupLog.length,
      lastCleanup: this.cleanupLog[this.cleanupLog.length - 1] || 'Aucun nettoyage effectué',
      totalFilesProcessed: cleanedFiles.length + alreadyCleanedFiles.length
    };
  }

  generateRefactorPlan() {
    return {
      phase1: 'Suppression des fichiers obsolètes',
      phase2: 'Refactorisation des gros composants', 
      phase3: 'Optimisation de la sécurité',
      phase4: 'Harmonisation du design',
      phase5: 'Tests et validation'
    };
  }
}

export const cleanupManager = new CleanupManager();