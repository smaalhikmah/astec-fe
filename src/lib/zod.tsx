import { z } from 'zod';
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
const foto = z.object({
  file: z.any({
    required_error: 'Foto wajib diisi',
  }),
  url: z.string().min(2, {
    message: 'Foto wajib diisi',
  }),
});
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
];
export const MAX_FILE_SIZE = 1024 * 1024 * 1;

export const step1 = z.object({
  lomba: z.string().min(2, {
    message: 'Lomba harus diisi.',
  }),
  namaLengkapKetua: z.string().min(2, {
    message: 'Nama lengkap harus diisi.',
  }),
  noTelponKetua: z.string().regex(phoneRegex, 'Pastikan nomor sudah benar'),
  emailKetua: z.string().email(),
  provinsiSekolah: z.string().min(2, {
    message: 'Provinsi sekolah harus diisi.',
  }),
  asalSekolah: z.string().min(2, {
    message: 'Asal sekolah harus diisi.',
  }),
  scanKartuPelajarKetua: foto,
  fotoKetua: foto,
  buktiFollow: foto,
  suratRekomendasi: foto,
  nomorIdentitasKetua: z
    .string()
    .regex(phoneRegex, 'Pastikan nomor sudah benar'),
  harga: z.string().min(2, {}),
});

const member = z.object({
  nomorIdentitas: z.string().regex(phoneRegex, 'Pastikan nomor sudah benar'),
  namaLengkap: z.string().min(2, {
    message: 'Nama lengkap harus diisi',
  }),
  noTelpon: z.string().regex(phoneRegex, 'Pastikan nomor sudah benar'),
  email: z.string().email(),
  scanKartuPelajar: foto,
  foto: foto,
  buktiFollow: foto,
  isKetua: z.boolean().optional().default(false),
});

export const step2 = z.object({
  anggota: z.array(member),
});

export const pembimbing = z.object({
  nomorIdentitas: z.string().regex(phoneRegex, 'Pastikan nomor sudah benar'),
  scanKTP: foto,
  nama: z.string().min(2, {
    message: 'Nama wajib diisi',
  }),
  email: z.string().email(),
});

export const step3 = z.object({
  pembimbing: z.array(pembimbing).max(2, {
    message: 'Only 2 pembimbing are allowed.',
  }),
  buktiTf: foto,
});

// talkshow

const talkshow = z.object({
  nama: z
    .string({
      required_error: 'Nama wajib diisi',
    })
    .min(2, {
      message: 'Nama wajib diisi',
    }),
  email: z
    .string({
      required_error: 'Email wajib diisi',
    })
    .email({
      message: 'Email tidak valid',
    }),
  nomorTelepon: z
    .string()
    .regex(phoneRegex, 'Pastikan nomor sudah benar')
    .min(2, {
      message: 'Nomor telepon wajib diisi',
    }),
  jenisKelamin: z
    .string({
      required_error: 'Jenis kelamin wajib diisi',
    })
    .min(2, {
      message: 'Jenis kelamin wajib diisi',
    }),

  kodePromo: z.string().optional(),
});

export const talkshows = z.object({
  data_diri: z.array(talkshow),
  bukti_tf: foto,
});

// badminton
export const badminton = z.object({
  lomba: z.string().min(2, {
    message: 'Lomba harus diisi.',
  }),
  provinsiSekolah: z.string().min(2, {
    message: 'Provinsi sekolah harus diisi.',
  }),
  asalSekolah: z.string().min(2, {
    message: 'Asal sekolah harus diisi.',
  }),
  anggota: z.array(member),
  pembimbing: z.array(pembimbing).optional(),
  buktiTf: foto,
  suratRekomendasi: foto,
});
