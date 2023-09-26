  import { useState } from 'react';

interface FormData {
  id:                 number;
  ename:              string;
  ide:                string;
  type:               string;
  subtype:            string;
  manufacturer:       string;
  modelnum:           string;
  serialnum:          string;
  datepurc:           string;
  install:            string;
  controlsys:         string;
  commission:         string;
  datasheet:          string;
  connection:         string;
  foundation:         string;
  mechanical:         string;
  electrical:         string;
  ratedeffiency:      string;
  deviceassociation:  string;
  generalnote:        string;
}

export function useForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>({
    id:0,
    ename: '',
    ide: '',
    type: '',
    subtype: '',
    manufacturer: '',
    modelnum: '',
    serialnum: '',
    datepurc: '',
    install: '',
    controlsys: '',
    commission: '',
    datasheet: '',
    connection: '',
    foundation: '',
    mechanical: '',
    electrical: '',
    ratedeffiency: '',
    deviceassociation: '',
    generalnote: '',
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
      ename: '',
      ide: '',
      type: '',
      subtype: '',
      manufacturer: '',
      modelnum: '',
      serialnum: '',
      datepurc: '',
      install: '',
      controlsys: '',
      commission: '',
      datasheet: '',
      connection: '',
      foundation: '',
      mechanical: '',
      electrical: '',
      ratedeffiency: '',
      deviceassociation: '',
      generalnote: '',
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

