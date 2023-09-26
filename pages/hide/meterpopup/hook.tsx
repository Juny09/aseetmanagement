  import { useState } from 'react';

interface FormData {
  id:number;
  metername: string,
  meterid: string,
  metertype: string,
  panel: string,
  manufacturer: string,
  model: string,
  serialnum: string,
  commissiondate: string,
  voltage: string,
  ratio: string,
  description: string
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    id:0,
    metername: '',
    meterid: '',
    metertype: '',
    panel: '',
    manufacturer: '',
    model: '',
    serialnum: '',
    commissiondate: '',
    voltage: '',
    ratio: '',
    description: '',
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
      id:0,
      metername: '',
      meterid: '',
      metertype: '',
      panel: '',
      manufacturer: '',
      model: '',
      serialnum: '',
      commissiondate: '',
      voltage: '',
      ratio: '',
      description: '',
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

