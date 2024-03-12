export type UserData = {
  id: string;
  asalSekolah: string;
  approved: boolean;
  provinsiSekolah: string;
};

export type DetailUserData = {
  lomba: Lomba;
  mentor: Mentor[];
  order: Order;
  peserta: Peserta[];
};

export type Lomba = {
  id: string;
  nama: string;
};

export type Mentor = {
  name: string;
  email: string;
};

type Order = {
  asalSekolah: string;
  buktiTf: string;
  provinsiSekolah: string;
};

export type Peserta = {
  namaLengkap: string;
  email: string;
  foto: string;
  ketua: boolean;
  noTelepon: string;
  buktiFollow: string;
  scanKartuPelajar: string;
};
