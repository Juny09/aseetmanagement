  import { useState } from 'react';

interface FormData {
  id:number;
  devname: string;
  devid: string;
  devtype: string;
  deveui: string;
  brandId: string;
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    id:0,
    devname:'',
    devid:'',
    devtype:'',
    deveui:'',
    brandId:'',
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
      devname:'',
      devid:'',
      devtype:'',
      deveui:'',
      brandId:'',
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

