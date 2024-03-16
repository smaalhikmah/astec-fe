export type UserData = {
  id: string;
  asalSekolah: string;
  approved: boolean;
  provinsiSekolah: string;
  namaKetua: string;
  lomba: Lomba;
};

export type TalkShow = {
  id: string;
  nama: string;
  approved: boolean;
  email: string;
};

export type DetailTalkshow = {
  order: {
    approved: boolean;
    buktiTf: string;
  };
  participants: participant[];
};

export type participant = {
  id: string;
  nama: string;
  email: string;
  phone: string;
  gender: string;
};

export type DetailUserData = {
  lomba: Lomba;
  mentor: Mentor[];
  order: Order;
  peserta: Peserta[];
  updatedAt: string;
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
  suratRekomendasi: string;
};

export type Peserta = {
  namaLengkap: string;
  email: string;
  foto: string;
  ketua: boolean;
  noTelepon: string;
  buktiFollow: string;
  scanKartuPelajar: string;
  nomorIdentitas: string;
};
