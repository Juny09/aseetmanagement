import { useState } from 'react';

interface FormData {
  id: string;
  mstatus: string
  category:string
  from:string
  to:string
  performby: string
  attach: string
  estimateddate: string
  warrantyinfo: string
  comment: string
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    id: '',
    mstatus:'',
    category:'',
    from:'',
    to:'',
    performby:'', 
    attach:'', 
    estimateddate:'',
    warrantyinfo:'',
    comment:'',
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
      id: '',
      mstatus:'',
      category:'',
      from:'',
      to:'',
      performby:'', 
      attach:'', 
      estimateddate:'',
      warrantyinfo:'',
      comment:'',
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

