import { UseFormReturn } from 'react-hook-form';

export interface ProcedureFormData {
  // Informations générales
  title: string;
  description: string;
  type: string;
  category: string;
  priority: string;
  status: string;
  
  // Métadonnées
  reference: string;
  version: string;
  effectiveDate: string;
  expirationDate: string;
  
  // Organisation
  organization: string;
  department: string;
  responsible: string;
  
  // Documents et fichiers
  documents: File[];
  attachments: File[];
  
  // Étapes et processus
  steps: ProcedureStep[];
  requirements: string[];
  
  // Tags et classification
  tags: string[];
  keywords: string[];
  
  // Informations de contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Champs dynamiques
  customFields: Record<string, any>;
}

export interface ProcedureStep {
  id: string;
  title: string;
  description: string;
  order: number;
  duration?: string;
  responsible?: string;
  documents?: string[];
  mandatory: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ProcedureFormProps {
  onClose: () => void;
  onSubmit: (data: ProcedureFormData) => void;
  ocrData?: any;
  initialInputMethod?: 'manual' | 'ocr';
  initialData?: Partial<ProcedureFormData>;
}

export interface OCRProcessingState {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
  error?: string;
}

export interface FormStepProps {
  form: UseFormReturn<any>;
  procedureSteps?: ProcedureStep[];
  setProcedureSteps?: (steps: ProcedureStep[]) => void;
  requiredDocs?: string[];
  setRequiredDocs?: (docs: string[]) => void;
  complementaryDocs?: string[];
  setComplementaryDocs?: (docs: string[]) => void;
}

export const defaultFormValues = {
  // Step 1
  title: '',
  description: '',
  targetAudience: '',
  category: '',
  institution: '',
  
  // Step 2
  conditions: '',
  
  // Step 3
  requiredDocuments: '',
  complementaryDocuments: '',
  
  // Step 4
  processingTime: '',
  cost: '',
  paymentMethods: '',
  
  // Step 5
  digitalProcedure: false,
  thirdPartySubmission: false,
  withdrawalConditions: '',
  withdrawalMethods: '',
  validityDuration: '',
  appealPossible: false,
  
  // Step 6
  legalBasis: '',
  frequentQuestions: '',
  contactAddress: '',
  phoneNumber: '',
  email: '',
  greenNumber: ''
};

export const targetCategories = [
  'Citoyens',
  'Entreprises',
  'Administrations',
  'Associations'
];

export const procedureTypes = [
  'Demande',
  'Déclaration',
  'Autorisation',
  'Certificat'
];