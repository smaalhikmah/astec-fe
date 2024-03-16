/* eslint-disable @typescript-eslint/no-explicit-any */
export type StepOneData = {
  lomba: string;
  nomorIdentitasKetua: string;
  namaLengkapKetua: string;
  noTelponKetua: string;
  emailKetua: string;
  provinsiSekolah: string;
  asalSekolah: string;
  scanKartuPelajarKetua: foto;
  fotoKetua: foto;
  buktiFollow: foto;
  harga: string;
  suratRekomendasi: foto;
};

export type StepTwoData = {
  anggota: Anggota[];
};

export type StepThreeData = {
  pembimbing: Pembimbing[];
  buktiTf: foto;
};

export type FormData = StepOneData & StepTwoData & StepThreeData;

type foto = {
  file: File | null;
  url: string;
};
export type Anggota = {
  nomorIdentitas: string;
  namaLengkap: string;
  noTelpon: string;
  email: string;
  scanKartuPelajar: foto;
  foto: foto;
  buktiFollow: foto;
  isKetua: boolean;
};
export type Pembimbing = {
  nama: string;
  email: string;
};
