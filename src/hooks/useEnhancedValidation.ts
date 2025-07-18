
import { useState, useCallback } from 'react';
import { secureValidation } from '@/utils/optimizedSecurity';

export function useEnhancedValidation() {
  const [validationResults, setValidationResults] = useState<Record<string, any>>({});

  const validateField = useCallback((type: string, value: any, fieldName: string, context?: string) => {
    const result = secureValidation.validate(secureValidation.schemas.searchInput, value);
    setValidationResults(prev => ({
      ...prev,
      [fieldName]: result
    }));
    return result;
  }, []);

  const validateForm = useCallback((schema: Record<string, string>, data: Record<string, any>, context?: string) => {
    const result = secureValidation.validateObject ? secureValidation.validateObject(schema, data, context) : { isValid: true, results: {}, summary: { total: 0, passed: 0, failed: 0 } };
    setValidationResults(result.results);
    return result;
  }, []);

  const clearValidation = useCallback((fieldName?: string) => {
    if (fieldName) {
      setValidationResults(prev => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setValidationResults({});
    }
  }, []);

  return {
    validationResults,
    validateField,
    validateForm,
    clearValidation
  };
}
