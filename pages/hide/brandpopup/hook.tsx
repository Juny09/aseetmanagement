  import { useState } from 'react';

interface FormData {
  name: string;
  id: string;
  bid: string;
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    name: '', bid: '', id: ''
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setForm({
      name: '', bid: '', id: ''
    });
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

