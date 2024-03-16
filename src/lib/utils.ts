/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import api from './axios-helper';
import { ACCEPTED_IMAGE_MIME_TYPES } from './zod';
import { MAX_FILE_SIZE } from './zod';
import toast from 'react-hot-toast';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
}

export async function uploadImage(
  params: File | undefined,
  form: any,
  name: string,
  setloading?: (value: boolean) => void,
) {
  if (setloading) setloading(true);
  if (params?.type && !ACCEPTED_IMAGE_MIME_TYPES.includes(params.type)) {
    return toast.error('File tidak didukung');
  }
  if (params?.size && params.size > MAX_FILE_SIZE) {
    toast.error('Ukuran file terlalu besar');
    return form.setValue(name, {
      file: null,
      url: '',
    });
  }
  const formData = new FormData();
  formData.append('img', params as Blob);
  const res = await api.post('image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  setloading && setloading(false);
  return form.setValue(name, {
    file: params,
    url: res.data.data.img_url,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteImage(name: any, form: any) {
  const res = await api.delete('image/delete', {
    data: {
      img_url: name,
    },
  });
  if (res.data.code === 200) {
    return form.setValue(name, {
      file: null,
      url: '',
    });
  }
}

export function formFormat(data: any) {
  const formAnggota = data.anggota.map((item: any) => {
    return {
      nomorIdentitas: item.nomorIdentitas,
      namaLengkap: item.namaLengkap,
      noTelpon: item.noTelpon,
      email: item.email,
      scanKartuPelajar: item.scanKartuPelajar.url,
      foto: item.foto.url,
      buktiFollow: item.buktiFollow.url,
      ketua: item.isKetua,
    };
  });
  const pembimbing = data.pembimbing.map((item: any) => {
    return {
      name: item.nama,
      email: item.email,
    };
  });
  const formData = {
    anggota: formAnggota,
    buktiTf: data.buktiTf.url,
    lomba: data.lomba,
    provinsiSekolah: data.provinsiSekolah,
    asalSekolah: data.asalSekolah,
    pembimbing: pembimbing,
    suratRekomendasi: data.suratRekomendasi.url,
  };
  return formData;
}
