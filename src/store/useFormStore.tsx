import { create } from 'zustand';

import { StepOneData, StepThreeData, StepTwoData } from '@/types/form';

const stepVariant = {
  1: 'stepOne',
  2: 'stepTwo',
  3: 'stepThree',
};

type setDataType =
  | { step: 1; data: StepOneData }
  | { step: 2; data: StepTwoData }
  | { step: 3; data: StepThreeData };

const useFormStore = create<{
  stepOne: StepOneData | null;
  stepTwo: StepTwoData | null;
  stepThree: StepThreeData | null;
  setData: ({ step, data }: setDataType) => void;
}>((set) => ({
  stepOne: null,
  stepTwo: null,
  stepThree: null,
  setData: ({ step, data }) => {
    set({
      [stepVariant[step]]: data,
    });
  },
}));

export default useFormStore;
