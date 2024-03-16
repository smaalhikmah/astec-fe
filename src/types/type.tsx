import { Lomba, Mentor, Peserta } from './admin';

export type selectCompetition = {
  id: string;
  max: number;
  lomba: string;
  official: boolean;
  harga: string;
};

export type TalkShowProfile = {
  id: string;
  approved: boolean;
  email: string;
  nama: string;
  ticket: string;
};

type participant = {
  id: string;
  name: string;
  email: string;
  nomorTelepon: string;
  gender: string;
};

export type DetailTalkShowProfile = {
  order: {
    id: string;
    buktiTf: string;
    ticketURL: string;
    approved: boolean;
  };
  participants: participant[];
};

export type UserTicket = {
  id: string;
  asalSekolah: string;
  namaKetua: string;
  provinsiSekolah: string;
  approved: boolean;
  ticketURL: string;
};

type Order = {
  asalSekolah: string;
  buktiTf: string;
  provinsiSekolah: string;
  approved: boolean;
  ticketURL: string;
  suratRekomendasi: string;
};

export type DetailUserTicket = {
  lomba: Lomba;
  mentor: Mentor[];
  order: Order;
  peserta: Peserta[];
};
