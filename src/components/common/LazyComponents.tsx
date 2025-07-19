import React, { lazy, Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Wrapper pour lazy loading avec fallback - version simplifiée
function withSuspense(Component: React.LazyExoticComponent<React.ComponentType<any>>) {
  return function WrappedComponent(props: any) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Lazy load des composants volumineux (>600 lignes)
export const ProcedureFormLazy = withSuspense(
  lazy(() => import('../ProcedureForm').then(module => ({ default: module.ProcedureForm })))
);

export const TrendsTabLazy = withSuspense(
  lazy(() => import('../analysis/TrendsTab').then(module => ({ default: module.TrendsTab })))
);

export const ProcedureCatalogTabLazy = withSuspense(
  lazy(() => import('../procedures/ProcedureCatalogTab').then(module => ({ default: module.ProcedureCatalogTab })))
);

export const AdminGuideSectionLazy = withSuspense(
  lazy(() => import('../help/AdminGuideSection').then(module => ({ default: module.AdminGuideSection })))
);

export const TechnicalSpecificationLazy = withSuspense(
  lazy(() => import('../docs/TechnicalSpecification').then(module => ({ default: module.TechnicalSpecification })))
);

export const SpecializedNLPLazy = withSuspense(
  lazy(() => import('../ai/SpecializedNLP').then(module => ({ default: module.SpecializedNLP })))
);

export const NomenclatureSectionLazy = withSuspense(
  lazy(() => import('../configuration/NomenclatureSection').then(module => ({ default: module.NomenclatureSection })))
);

export const UserGuideSectionLazy = withSuspense(
  lazy(() => import('../help/UserGuideSection').then(module => ({ default: module.UserGuideSection })))
);

export const AlertsNotificationsSectionLazy = withSuspense(
  lazy(() => import('../configuration/AlertsNotificationsSection').then(module => ({ default: module.AlertsNotificationsSection })))
);

// Lazy load des sections entières moins utilisées
export const ConfigurationSectionsLazy = withSuspense(
  lazy(() => import('../ConfigurationSections').then(module => ({ default: module.ConfigurationSections })))
);

export const HelpSectionsLazy = withSuspense(
  lazy(() => import('../HelpSections').then(module => ({ default: module.HelpSections })))
);

export const AnalysisReportsSectionsLazy = withSuspense(
  lazy(() => import('../AnalysisReportsSections').then(module => ({ default: module.AnalysisReportsSections })))
);

// Lazy load des formulaires complexes
export const LegalTextFormEnhancedLazy = withSuspense(
  lazy(() => import('../LegalTextFormEnhanced').then(module => ({ default: module.LegalTextFormEnhanced })))
);

export const EnhancedAssistedWritingSectionLazy = withSuspense(
  lazy(() => import('../EnhancedAssistedWritingSection').then(module => ({ default: module.EnhancedAssistedWritingSection })))
);