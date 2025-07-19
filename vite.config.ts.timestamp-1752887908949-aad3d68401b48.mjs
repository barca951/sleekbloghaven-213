// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // Optimisation des chunks pour réduire la taille du bundle
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("lucide-react") || id.includes("@radix-ui")) {
              return "ui-vendor";
            }
            if (id.includes("react-hook-form") || id.includes("zod")) {
              return "form-vendor";
            }
            return "vendor";
          }
          if (id.includes("/procedures/") || id.includes("ProcedureForm") || id.includes("ProceduresTabs")) {
            return "procedures";
          }
          if (id.includes("/legal/") || id.includes("LegalTextForm")) {
            return "legal";
          }
          if (id.includes("/ai/") || id.includes("AutomaticExtractionModal")) {
            return "ai";
          }
          if (id.includes("/configuration/") || id.includes("/help/") || id.includes("/docs/")) {
            return "admin";
          }
        }
      }
    },
    // Optimisation générale
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    // Augmenter la limite d'avertissement temporairement
    chunkSizeWarningLimit: 1e3,
    // Optimiser les sources maps pour la production
    sourcemap: mode === "development"
  },
  // Optimisations de performance
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs"
    ]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmXG4gICAgY29tcG9uZW50VGFnZ2VyKCksXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gT3B0aW1pc2F0aW9uIGRlcyBjaHVua3MgcG91ciByXHUwMEU5ZHVpcmUgbGEgdGFpbGxlIGR1IGJ1bmRsZVxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIC8vIFNcdTAwRTlwYXJlciBsZXMgdmVuZG9ycyBkZXMgZ3JvcyBwYWNrYWdlc1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QnKSB8fCBpZC5pbmNsdWRlcygncmVhY3QtZG9tJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdyZWFjdC12ZW5kb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdsdWNpZGUtcmVhY3QnKSB8fCBpZC5pbmNsdWRlcygnQHJhZGl4LXVpJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd1aS12ZW5kb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdC1ob29rLWZvcm0nKSB8fCBpZC5pbmNsdWRlcygnem9kJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdmb3JtLXZlbmRvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBdXRyZXMgdmVuZG9yc1xuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTXHUwMEU5cGFyZXIgbGVzIGNvbXBvc2FudHMgcGFyIGZvbmN0aW9ubmFsaXRcdTAwRTlcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9wcm9jZWR1cmVzLycpIHx8IGlkLmluY2x1ZGVzKCdQcm9jZWR1cmVGb3JtJykgfHwgaWQuaW5jbHVkZXMoJ1Byb2NlZHVyZXNUYWJzJykpIHtcbiAgICAgICAgICAgIHJldHVybiAncHJvY2VkdXJlcyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL2xlZ2FsLycpIHx8IGlkLmluY2x1ZGVzKCdMZWdhbFRleHRGb3JtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnbGVnYWwnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9haS8nKSB8fCBpZC5pbmNsdWRlcygnQXV0b21hdGljRXh0cmFjdGlvbk1vZGFsJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYWknO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9jb25maWd1cmF0aW9uLycpIHx8IGlkLmluY2x1ZGVzKCcvaGVscC8nKSB8fCBpZC5pbmNsdWRlcygnL2RvY3MvJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYWRtaW4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gT3B0aW1pc2F0aW9uIGdcdTAwRTluXHUwMEU5cmFsZVxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIC8vIEF1Z21lbnRlciBsYSBsaW1pdGUgZCdhdmVydGlzc2VtZW50IHRlbXBvcmFpcmVtZW50XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIC8vIE9wdGltaXNlciBsZXMgc291cmNlcyBtYXBzIHBvdXIgbGEgcHJvZHVjdGlvblxuICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xuICB9LFxuICAvLyBPcHRpbWlzYXRpb25zIGRlIHBlcmZvcm1hbmNlXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdyZWFjdCcsXG4gICAgICAncmVhY3QtZG9tJyxcbiAgICAgICdsdWNpZGUtcmVhY3QnLFxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC10YWJzJ1xuICAgIF1cbiAgfVxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQ1QsZ0JBQWdCO0FBQUEsRUFDbEIsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWMsQ0FBQyxPQUFPO0FBRXBCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxHQUFHLFNBQVMsT0FBTyxLQUFLLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDcEQscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGNBQWMsS0FBSyxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQzNELHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxpQkFBaUIsS0FBSyxHQUFHLFNBQVMsS0FBSyxHQUFHO0FBQ3hELHFCQUFPO0FBQUEsWUFDVDtBQUVBLG1CQUFPO0FBQUEsVUFDVDtBQUVBLGNBQUksR0FBRyxTQUFTLGNBQWMsS0FBSyxHQUFHLFNBQVMsZUFBZSxLQUFLLEdBQUcsU0FBUyxnQkFBZ0IsR0FBRztBQUNoRyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxTQUFTLEtBQUssR0FBRyxTQUFTLGVBQWUsR0FBRztBQUMxRCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxNQUFNLEtBQUssR0FBRyxTQUFTLDBCQUEwQixHQUFHO0FBQ2xFLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksR0FBRyxTQUFTLGlCQUFpQixLQUFLLEdBQUcsU0FBUyxRQUFRLEtBQUssR0FBRyxTQUFTLFFBQVEsR0FBRztBQUNwRixtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBO0FBQUEsSUFFWCx1QkFBdUI7QUFBQTtBQUFBLElBRXZCLFdBQVcsU0FBUztBQUFBLEVBQ3RCO0FBQUE7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
