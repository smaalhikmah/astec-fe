/* eslint-disable @typescript-eslint/no-explicit-any */
export type StepOneData = {
  namaLengkapKetua: string;
  noTelponKetua: string;
  emailKetua: string;
  provinsiSekolah: string;
  asalSekolah: string;
  scanKartuPelajarKetua: FileList;
  fotoKetua: FileList;
};

export type StepTwoData = {
  anggota: Anggota[];
};

export type StepThreeData = {
  pembimbing: Pembimbing[];
};

export type FormData = StepOneData & StepTwoData & StepThreeData;

export type Anggota = {
  namaLengkap: string;
  noTelpon: string;
  email: string;
  scanKartuPelajar: any;
  foto: any;
};
export type Pembimbing = {
  nama: string;
  email: string;
};

export type LatLong = {
  lat: number;
  lng: number;
};
