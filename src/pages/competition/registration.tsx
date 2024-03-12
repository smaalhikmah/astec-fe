import Layout from '@/components/layout/Layout';
import React, { useEffect, useState } from 'react';

import withAuth from '@/components/hoc/withAuth';
import Seo from '@/components/Seo';
import 'yet-another-react-lightbox/styles.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Player12 from '@/components/form/pagesForm/Player12';
import Player2 from '@/components/form/pagesForm/Player2';
import useFormStore from '@/store/useFormStore';
import toast from 'react-hot-toast';
import { selectCompetition } from '@/types/type';
import { ApiReturn } from '@/types/api';
import api from '@/lib/axios-helper';

export default withAuth(Registration, 'all');
function Registration() {
  const { stepOne } = useFormStore();
  const [select, setSelect] = useState<selectCompetition>();
  const [allCompetition, setAllCompetition] = useState<selectCompetition[]>();

  async function getCompetitions() {
    try {
      const res = await api.get<ApiReturn<selectCompetition[]>>('homepage/all');
      setAllCompetition(res.data.data);
    } catch (err) {
      toast.error('Opps, sepertinya ada yang tidak beres');
    }
  }

  useEffect(() => {
    getCompetitions();
  }, []);

  useEffect(() => {
    if (stepOne && allCompetition) {
      const selected = allCompetition.find((value) => {
        return value.id === stepOne.lomba;
      });
      if (selected) {
        setSelect({
          id: selected?.id,
          lomba: selected?.lomba.toLocaleLowerCase().split(' ').join('-'),
          max: selected?.max,
          official: selected?.official,
        });
      }
    }
  }, [stepOne, allCompetition]);
  return (
    <Layout header='sticky'>
      <Seo templateTitle='Pendaftaran' />
      <div className='layout flex justify-center items-center flex-col'>
        {allCompetition != undefined ? (
          <>
            <div className='md:w-1/2 w-full space-y-2'>
              <p className='h2'>Form pendaftaran Lomba</p>
              <Select
                onValueChange={(value) => {
                  const selected = allCompetition.find((item) => {
                    return item.id === value;
                  });
                  if (selected) {
                    setSelect({
                      id: selected?.id,
                      lomba: selected?.lomba
                        .toLocaleLowerCase()
                        .split(' ')
                        .join('-'),
                      max: selected?.max,
                      official: selected?.official,
                    });
                  }
                }}
                defaultValue={stepOne?.lomba}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Pilih Lomba' />
                </SelectTrigger>
                <SelectContent>
                  {allCompetition.map((value) => {
                    return (
                      <SelectItem key={value.id} value={`${value.id}`}>
                        {value.lomba}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            {allCompetition.find((value) => {
              return value.id === select?.id && value.max === 12;
            }) != undefined
              ? select && <Player12 lomba={select?.id} />
              : select && (
                  <Player2
                    lomba={select?.id}
                    max={select?.max}
                    official={select?.official}
                  />
                )}
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </Layout>
  );
}
