import { useState } from 'react';

interface FormData {
  lid:string;
  country: string;
  state: string;
  area: string;
  building: string;
  floor: string;
  zone: string;
  dimensions: string;
  areasq: string;
  occupancy: string;
  spacetype: string;
  purposeusage: string;
  id:string;
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const initialFormData: FormData = {
    lid:'',
    country: '',
    state: '',
    area: '',
    building: '',
    floor: '',
    zone: '',
    dimensions: '',
    areasq: '',
    occupancy: '',
    spacetype: '',
    purposeusage: '',
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
