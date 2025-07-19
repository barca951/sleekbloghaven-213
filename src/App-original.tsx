
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { UnifiedModalProvider } from '@/components/modals/unified/UnifiedModalProvider';
import { EnhancedSecurityProvider } from '@/components/security/EnhancedSecurityProvider';
import { PerformanceOptimizer } from '@/components/optimization/PerformanceOptimizer';
import { AIAutoFillGlobalManager } from '@/components/ai/AIAutoFillGlobalManager';
import { SimpleErrorBoundary } from '@/components/common/SimpleErrorBoundary';

function App() {
  try {
    console.log('App component rendering...');
  return (
    <SimpleErrorBoundary>
      <Router>
        <EnhancedSecurityProvider>
          <PerformanceOptimizer>
            <UnifiedModalProvider>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/:section" element={<Index />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
                <AIAutoFillGlobalManager />
              </div>
            </UnifiedModalProvider>
          </PerformanceOptimizer>
        </EnhancedSecurityProvider>
      </Router>
    </SimpleErrorBoundary>
  );
  } catch (error) {
    console.error('Critical error in App component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur Critique</h1>
          <p className="text-gray-700 mb-4">L'application a rencontré une erreur critique.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recharger l'application
          </button>
        </div>
      </div>
    );
  }
}

export default App;
