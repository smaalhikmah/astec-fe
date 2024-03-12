// import React, { useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useFieldArray, useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { badminton } from '@/lib/zod';
// import withAuth from '@/components/hoc/withAuth';
// import { z } from 'zod';

// import { Input } from '@/components/ui/input';

// import { FaImage } from 'react-icons/fa6';
// import { formatCurrency } from '@/lib/utils';
// import 'yet-another-react-lightbox/styles.css';
// import ImagePreview from '@/components/form/ImagePreview';
// import Alert from '@/components/button/Alert';
// import api from '@/lib/axios-helper';
// import { DevTool } from '@hookform/devtools';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// export default withAuth(Index, 'optional');
// function Index() {
//   const [open, setOpen] = useState(false);
//   const [max, setMax] = useState(2);

//   const form = useForm<z.infer<typeof badminton>>({
//     mode: 'onTouched',
//     resolver: zodResolver(badminton),
//     defaultValues: {
//       nomorIdentitas: '',
//       lomba: 'badminton',
//       namaLengkapKetua: '',
//       noTelponKetua: '',
//       emailKetua: '',
//       provinsiSekolah: '',
//       asalSekolah: '',
//       scanKartuPelajarKetua: null,
//       fotoKetua: null,
//       buktiFollow: null,
//       anggota: [
//         {
//           nomorIdentitas: '',
//           namaLengkap: '',
//           noTelpon: '',
//           email: '',
//           scanKartuPelajar: {
//             file: null,
//             url: '',
//           },
//           foto: {
//             file: null,
//             url: '',
//           },
//           buktiFollow: {
//             file: null,
//             url: '',
//           },
//         },
//         {
//           nomorIdentitas: '',
//           namaLengkap: '',
//           noTelpon: '',
//           email: '',
//           scanKartuPelajar: {
//             file: null,
//             url: '',
//           },
//           foto: {
//             file: null,
//             url: '',
//           },
//           buktiFollow: {
//             file: null,
//             url: '',
//           },
//         },
//       ],
//       pembimbing: [
//         {
//           nama: '',
//           email: '',
//         },
//       ],
//       status: 'pending',
//       buktiTf: {
//         file: null,
//         url: '',
//       },
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     name: 'anggota',
//     control: form.control,
//     rules: {
//       maxLength: max,
//       minLength: 1,
//     },
//   });
//   const pembimbing = useFieldArray({
//     name: 'pembimbing',
//     control: form.control,
//     rules: {
//       maxLength: 2,
//     },
//   });

//   async function uploadImage(params: File | undefined) {
//     const formData = new FormData();
//     formData.append('img', params as Blob);
//     const res = await api.post('image/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log(res.data.data.img_url);
//     return res.data.data.img_url;
//   }
//   function onSubmit(data: z.infer<typeof badminton>) {
//     console.log(data);
//   }

//   // useEffect(() => {
//   //   if (form.formState.isSubmitSuccessful) {
//   //     form.reset();
//   //   }
//   // }, [form]);
//   return (
//     <>
//       <div>
//         <p className='h2'>Form pendaftaran Lomba</p>
//       </div>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className='md:w-1/2 w-full space-y-4'
//         >
//           <FormField
//             control={form.control}
//             name='lomba'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Jenis Lomba</FormLabel>
//                 <Select
//                   onValueChange={(value) => {
//                     field.onChange(value);
//                     setMax(10);
//                   }}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder='Pilih jenis lomba' />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value='basket-putra'>Basket Putra</SelectItem>
//                     <SelectItem value='basket-putri'>Basket Putri</SelectItem>
//                     <SelectItem value='mini-soccer'>Mini Soccer</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <p className='h3 pt-4'>Data diri Ketua </p>
//           <span>ketua otomatis menjadi pemain 1</span>
//           <FormField
//             control={form.control}
//             name='nomorIdentitas'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>NISN/NIK/NOMOR KARTU PELAJAR</FormLabel>
//                 <FormControl>
//                   <Input
//                     type='number'
//                     placeholder='NISN/NIK/NOMOR KARTU PELAJAR...'
//                     {...field}
//                     value={field.value}
//                     onChange={(e) => {
//                       field.onChange(e.target.value);
//                       form.setValue('anggota.0.nomorIdentitas', e.target.value);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='namaLengkapKetua'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Nama Lengkap</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder='Nama...'
//                     {...field}
//                     value={field.value}
//                     onChange={(e) => {
//                       field.onChange(e.target.value);
//                       form.setValue('anggota.0.namaLengkap', e.target.value);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='emailKetua'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder='example@gmail.com...'
//                     {...field}
//                     value={field.value}
//                     onChange={(e) => {
//                       field.onChange(e.target.value);
//                       form.setValue('anggota.0.email', e.target.value);
//                     }}
//                     ref={field.ref}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='provinsiSekolah'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Asal Provinsi</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Jawa timur' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='asalSekolah'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Asal Sekolah</FormLabel>
//                 <FormControl>
//                   <Input placeholder='SMA Konoha 1' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {fields.map((field, index) => (
//             <div key={index}>
//               <p className='h3 pt-4'>Data diri Pemain {index + 1}</p>
//               <FormField
//                 control={form.control}
//                 name={`anggota.${index}.nomorIdentitas`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>NISN/NIK/NOMOR KARTU PELAJAR</FormLabel>
//                     <FormControl>
//                       <Input
//                         type='number'
//                         disabled={index === 0}
//                         placeholder='Nama...'
//                         {...field}
//                         value={field.value}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`anggota.${index}.namaLengkap`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nama Lengkap</FormLabel>
//                     <FormControl>
//                       <Input
//                         disabled={index === 0}
//                         placeholder='Nama...'
//                         {...field}
//                         value={field.value}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`anggota.${index}.noTelpon`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>No telpon</FormLabel>
//                     <FormControl>
//                       <Input type='number' placeholder='08...' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`anggota.${index}.email`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         disabled={index === 0}
//                         placeholder='example@gmail.com'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div>
//                 <div
//                   className={`flex justify-center items-center md:flex-[1] h-[fit-content]

//             `}
//                 ></div>
//                 <FormField
//                   control={form.control}
//                   name={`anggota.${index}.scanKartuPelajar`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Scan kartu pelajar </FormLabel>
//                       {form.getValues(
//                         `anggota.${index}.scanKartuPelajar.file`,
//                       ) ? (
//                         <ImagePreview
//                           open={open}
//                           setOpen={setOpen}
//                           url={URL.createObjectURL(
//                             form.getValues(
//                               `anggota.${index}.scanKartuPelajar.file`,
//                             ) as File,
//                           )}
//                         />
//                       ) : (
//                         <div className='flex items-center justify-between'>
//                           <div className='p-3 bg-slate-200  justify-center items-center flex'>
//                             <FaImage size={40} />
//                           </div>
//                         </div>
//                       )}
//                       <FormControl>
//                         <Input
//                           type='file'
//                           id='fileInput'
//                           onBlur={field.onBlur}
//                           name={field.name}
//                           onChange={async (e) => {
//                             field.onChange({
//                               file: e.target.files?.[0] as File,
//                               url: await uploadImage(
//                                 e.target.files?.[0] as File,
//                               ),
//                             });
//                           }}
//                           ref={field.ref}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name={`anggota.${index}.foto`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Foto Formal </FormLabel>
//                       {form.getValues(`anggota.${index}.foto.file`) ? (
//                         <ImagePreview
//                           open={open}
//                           setOpen={setOpen}
//                           url={URL.createObjectURL(
//                             form.getValues(
//                               `anggota.${index}.foto.file`,
//                             ) as File,
//                           )}
//                         />
//                       ) : (
//                         <div className='flex items-center justify-between'>
//                           <div className='p-3 bg-slate-200  justify-center items-center flex'>
//                             <FaImage size={40} />
//                           </div>
//                         </div>
//                       )}
//                       <FormControl>
//                         <Input
//                           type='file'
//                           id='fileInput'
//                           onBlur={field.onBlur}
//                           name={field.name}
//                           onChange={async (e) => {
//                             field.onChange({
//                               file: e.target.files?.[0] as File,
//                               url: await uploadImage(
//                                 e.target.files?.[0] as File,
//                               ),
//                             });
//                           }}
//                           ref={field.ref}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name={`anggota.${index}.buktiFollow`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Bukti Follow Instagram </FormLabel>
//                       {form.getValues(`anggota.${index}.buktiFollow.file`) ? (
//                         <ImagePreview
//                           open={open}
//                           setOpen={setOpen}
//                           url={URL.createObjectURL(
//                             form.getValues(
//                               `anggota.${index}.buktiFollow.file`,
//                             ) as File,
//                           )}
//                         />
//                       ) : (
//                         <div className='flex items-center justify-between'>
//                           <div className='p-3 bg-slate-200  justify-center items-center flex'>
//                             <FaImage size={40} />
//                           </div>
//                         </div>
//                       )}
//                       <FormControl>
//                         <Input
//                           type='file'
//                           id='fileInput'
//                           onBlur={field.onBlur}
//                           name={field.name}
//                           onChange={async (e) => {
//                             field.onChange({
//                               file: e.target.files?.[0] as File,
//                               url: await uploadImage(
//                                 e.target.files?.[0] as File,
//                               ),
//                             });
//                           }}
//                           ref={field.ref}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//           ))}

//           <div className='flex justify-between'>
//             {fields.length < max && (
//               <Button
//                 onClick={() => {
//                   append({
//                     nomorIdentitas: '',
//                     namaLengkap: '',
//                     noTelpon: '',
//                     email: '',
//                     scanKartuPelajar: {
//                       file: null,
//                       url: '',
//                     },
//                     foto: {
//                       file: null,
//                       url: '',
//                     },
//                     buktiFollow: {
//                       file: null,
//                       url: '',
//                     },
//                   });
//                 }}
//               >
//                 tambah Pemain
//               </Button>
//             )}
//             <div className='flex space-x-4'></div>
//             {
//               // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//               fields.length > 1 && (
//                 <div className='flex space-x-4'>
//                   <Alert onclick={() => remove(fields.length - 1)} />
//                 </div>
//               )
//             }
//           </div>

//           <p className='h3 pt-4'>Data diri Pembimbing </p>
//           <span>Pembimbing maksimal 2</span>
//           {pembimbing.fields.map((field, index) => (
//             <div key={index}>
//               <p className='h3 pt-4'>Data diri Pembimbing {index + 1}</p>
//               <FormField
//                 control={form.control}
//                 name={`pembimbing.${index}.nama`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nama Pembimbing {index + 1}</FormLabel>
//                     <FormDescription />
//                     <FormControl>
//                       <Input placeholder='Nama...' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`pembimbing.${index}.email`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email Pembimbing {index + 1}</FormLabel>
//                     <FormDescription />
//                     <FormControl>
//                       <Input placeholder='Nama...' {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           ))}
//           <div className='flex justify-between'>
//             {pembimbing.fields.length < 2 && (
//               <Button
//                 onClick={() => {
//                   pembimbing.append({
//                     nama: '',
//                     email: '',
//                   });
//                 }}
//               >
//                 tambah Pembimbing
//               </Button>
//             )}
//             <div className='flex space-x-4'></div>
//             {
//               // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//               pembimbing.fields.length > 1 && (
//                 <div className='flex space-x-4'>
//                   <Alert onclick={() => pembimbing.remove(fields.length - 1)} />
//                 </div>
//               )
//             }
//           </div>

//           <div>
//             <div
//               className={`flex justify-center items-center md:flex-[1] h-[fit-content]

//             `}
//             ></div>
//             <FormField
//               control={form.control}
//               name='buktiTf'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bukti pembayaran </FormLabel>
//                   {form.getValues('buktiTf.file') ? (
//                     <ImagePreview
//                       open={open}
//                       setOpen={setOpen}
//                       url={URL.createObjectURL(
//                         form.getValues('buktiTf.file') as File,
//                       )}
//                     />
//                   ) : (
//                     <div className='flex items-center justify-between'>
//                       <div className='p-3 bg-slate-200  justify-center items-center flex'>
//                         <FaImage size={40} />
//                       </div>
//                     </div>
//                   )}
//                   <FormDescription>
//                     Anda harus membayar sebersar{' '}
//                     {formatCurrency(100000 * fields.length)}
//                     <br></br>
//                     Bank: BRI
//                     <br></br>
//                     No Rek: 030701131750500
//                     <br></br>
//                     A/N: Azita Zahwa Zahida Asmoro
//                   </FormDescription>
//                   <FormControl>
//                     <Input
//                       type='file'
//                       id='fileInput'
//                       onBlur={field.onBlur}
//                       name={field.name}
//                       onChange={async (e) => {
//                         field.onChange({
//                           file: e.target.files?.[0] as File,
//                           url: await uploadImage(e.target.files?.[0] as File),
//                         });
//                       }}
//                       ref={field.ref}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Button disabled={form.formState.isSubmitting} type='submit'>
//             Lanjut
//           </Button>
//         </form>
//       </Form>
//       <DevTool control={form.control} />
//     </>
//   );
// }
