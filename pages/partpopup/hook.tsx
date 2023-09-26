import { useState } from 'react';

interface FormData {
  name: string;
  idp: string;
  quantity: string;
  description: string;
  id: string;
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const initialFormData: FormData = {
    name: '',
    idp: '',
    quantity: '',
    description: '',
    id: '',
  };
  const [form, setForm] = useState<FormData>(initialFormData);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setForm(initialFormData);
  };

  return {
    step,
    form,
    setForm,
    nextStep,
    prevStep,
    resetForm,
  };
}
