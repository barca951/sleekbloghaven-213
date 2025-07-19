import { useState, useCallback } from 'react';
import { ModalType } from '@/components/common/modals/UnifiedModal';

interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  title?: string;
  description?: string;
  data?: any;
}

interface UseModalReturn {
  modalState: ModalState;
  openModal: (config?: Partial<ModalState>) => void;
  closeModal: () => void;
  updateModal: (config: Partial<ModalState>) => void;
  isOpen: boolean;
}

export function useModal(initialState?: Partial<ModalState>): UseModalReturn {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: 'default',
    title: '',
    description: '',
    data: null,
    ...initialState
  });

  const openModal = useCallback((config?: Partial<ModalState>) => {
    setModalState(prev => ({
      ...prev,
      isOpen: true,
      ...config
    }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const updateModal = useCallback((config: Partial<ModalState>) => {
    setModalState(prev => ({
      ...prev,
      ...config
    }));
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    updateModal,
    isOpen: modalState.isOpen
  };
}

// Hook spécialisé pour les confirmations
interface UseConfirmationModalReturn {
  isOpen: boolean;
  openConfirmation: (config: {
    title?: string;
    message: string;
    onConfirm: () => void;
    dangerous?: boolean;
  }) => void;
  closeConfirmation: () => void;
  confirmationConfig: {
    title?: string;
    message: string;
    onConfirm: () => void;
    dangerous?: boolean;
  } | null;
}

export function useConfirmationModal(): UseConfirmationModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title?: string;
    message: string;
    onConfirm: () => void;
    dangerous?: boolean;
  } | null>(null);

  const openConfirmation = useCallback((config: {
    title?: string;
    message: string;
    onConfirm: () => void;
    dangerous?: boolean;
  }) => {
    setConfig(config);
    setIsOpen(true);
  }, []);

  const closeConfirmation = useCallback(() => {
    setIsOpen(false);
    setConfig(null);
  }, []);

  return {
    isOpen,
    openConfirmation,
    closeConfirmation,
    confirmationConfig: config
  };
}