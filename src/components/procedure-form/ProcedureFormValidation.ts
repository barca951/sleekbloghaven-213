import { ProcedureFormData, ValidationError } from './types';

export class ProcedureFormValidator {
  private errors: ValidationError[] = [];

  validate(data: Partial<ProcedureFormData>): ValidationError[] {
    this.errors = [];

    this.validateRequired(data);
    this.validateDates(data);
    this.validateEmail(data);
    this.validateReferences(data);
    
    return this.errors;
  }

  private validateRequired(data: Partial<ProcedureFormData>): void {
    const requiredFields = [
      { field: 'title', message: 'Le titre est obligatoire' },
      { field: 'description', message: 'La description est obligatoire' },
      { field: 'type', message: 'Le type est obligatoire' },
      { field: 'category', message: 'La catégorie est obligatoire' },
      { field: 'organization', message: 'L\'organisation est obligatoire' }
    ];

    requiredFields.forEach(({ field, message }) => {
      if (!data[field as keyof ProcedureFormData] || 
          String(data[field as keyof ProcedureFormData]).trim() === '') {
        this.addError(field, message);
      }
    });
  }

  private validateDates(data: Partial<ProcedureFormData>): void {
    if (data.effectiveDate && data.expirationDate) {
      const effective = new Date(data.effectiveDate);
      const expiration = new Date(data.expirationDate);
      
      if (expiration <= effective) {
        this.addError('expirationDate', 'La date d\'expiration doit être postérieure à la date d\'entrée en vigueur');
      }
    }

    if (data.effectiveDate) {
      const effective = new Date(data.effectiveDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (effective < today) {
        this.addError('effectiveDate', 'La date d\'entrée en vigueur ne peut pas être dans le passé');
      }
    }
  }

  private validateEmail(data: Partial<ProcedureFormData>): void {
    if (data.contactEmail && !this.isValidEmail(data.contactEmail)) {
      this.addError('contactEmail', 'L\'adresse email n\'est pas valide');
    }
  }

  private validateReferences(data: Partial<ProcedureFormData>): void {
    if (data.reference && data.reference.length < 3) {
      this.addError('reference', 'La référence doit contenir au moins 3 caractères');
    }

    if (data.version && !this.isValidVersion(data.version)) {
      this.addError('version', 'Le format de version n\'est pas valide (ex: 1.0, 2.1)');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidVersion(version: string): boolean {
    const versionRegex = /^\d+\.\d+(\.\d+)?$/;
    return versionRegex.test(version);
  }

  private addError(field: string, message: string): void {
    this.errors.push({ field, message });
  }

  // Méthodes utilitaires pour la validation en temps réel
  static validateField(field: string, value: any): string | null {
    const validator = new ProcedureFormValidator();
    const data = { [field]: value } as Partial<ProcedureFormData>;
    const errors = validator.validate(data);
    
    const fieldError = errors.find(error => error.field === field);
    return fieldError ? fieldError.message : null;
  }

  static isFormValid(data: Partial<ProcedureFormData>): boolean {
    const validator = new ProcedureFormValidator();
    return validator.validate(data).length === 0;
  }
}