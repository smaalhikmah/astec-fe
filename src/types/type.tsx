import { Lomba, Mentor, Peserta } from './admin';

export type selectCompetition = {
  id: string;
  max: number;
  lomba: string;
  official: boolean;
  harga: string;
};

export type UserTicket = {
  id: string;
  asalSekolah: string;
  namaKetua: string;
  provinsiSekolah: string;
  approved: boolean;
};

type Order = {
  asalSekolah: string;
  buktiTf: string;
  provinsiSekolah: string;
  approved: boolean;
  ticketURL: string;
};

export type DetailUserTicket = {
  lomba: Lomba;
  mentor: Mentor[];
  order: Order;
  peserta: Peserta[];
};
