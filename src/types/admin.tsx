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

type Lomba = {
  id: string;
  nama: string;
};

type Mentor = {
  name: string;
  email: string;
};

type Order = {
  asalSekolah: string;
  buktiTf: string;
  provinsiSekolah: string;
};

type Peserta = {
  namaLengkap: string;
  email: string;
  foto: string;
  ketua: boolean;
  noTelepon: string;
  buktiFollow: string;
  scanKartuPelajar: string;
};
