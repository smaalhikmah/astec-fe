import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 1024 * 1024 * 1;
export const step1 = z.object({
  namaLengkapKetua: z.string().min(2, {
    message: 'namaLengkapKetua must be at least 2 characters.',
  }),
  noTelponKetua: z.string().min(2, {}),
  emailKetua: z.string().email(),
  provinsiSekolah: z.string().min(2, {}),
  asalSekolah: z.string().min(2, {}),
  scanKartuPelajarKetua: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  fotoKetua: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});

export const step2 = z.object({
  anggota: z.array(
    z.object({
      namaLengkap: z.string().min(2, {}),
      noTelpon: z.string().min(2, {}),
      email: z.string().email(),
      scanKartuPelajar: z
        .any()
        .refine((files) => {
          return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
          (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported.',
        ),
      foto: z
        .any()
        .refine((files) => {
          return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
          (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported.',
        ),
    }),
  ),
});

export const pembimbing = z.object({
  nama: z.string().min(2, {}),
  email: z.string().email(),
});

export const step3 = z.object({
  pembimbing: z.array(pembimbing).max(2, {
    message: 'Only 2 pembimbing are allowed.',
  }),
});

// talkshow

export const talkshow = z.object({
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
    .email(),
  nomor: z.string().optional(),
  jenisKelamin: z
    .string({
      required_error: 'Jenis kelamin wajib diisi',
    })
    .min(2, {
      message: 'Jenis kelamin wajib diisi',
    }),
  metode: z.string({
    required_error: 'Metode wajib diisi',
  }),
  kodePromo: z.string().optional(),
  jumlahTiket: z
    .number({
      required_error: 'Jumlah tiket wajib diisi',
    })
    .min(1, {
      message: 'Jumlah tiket minimal 1',
    }),
  bukti: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});
