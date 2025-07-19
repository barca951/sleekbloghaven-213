import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimisation des chunks pour réduire la taille du bundle
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Séparer les vendors des gros packages
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'form-vendor';
            }
            // Autres vendors
            return 'vendor';
          }
          // Séparer les composants par fonctionnalité
          if (id.includes('/procedures/') || id.includes('ProcedureForm') || id.includes('ProceduresTabs')) {
            return 'procedures';
          }
          if (id.includes('/legal/') || id.includes('LegalTextForm')) {
            return 'legal';
          }
          if (id.includes('/ai/') || id.includes('AutomaticExtractionModal')) {
            return 'ai';
          }
          if (id.includes('/configuration/') || id.includes('/help/') || id.includes('/docs/')) {
            return 'admin';
          }
        }
      }
    },
    // Optimisation générale
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Augmenter la limite d'avertissement temporairement
    chunkSizeWarningLimit: 1000,
    // Optimiser les sources maps pour la production
    sourcemap: mode === 'development'
  },
  // Optimisations de performance
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tabs'
    ]
  }
}));
