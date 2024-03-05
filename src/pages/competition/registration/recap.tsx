// /* eslint-disable unused-imports/no-unused-vars */
// import Layout from '@/components/layout/Layout';
// import { Input } from '@/components/ui/input';
// import useFormStore from '@/store/useFormStore';
// import { FormData } from '@/types/form';
// import { useRouter } from 'next/router';
// import React from 'react';
// import { FormProvider, useForm, useFormContext } from 'react-hook-form';

// function Recap() {
//   const router = useRouter();

//   const { stepOne, stepTwo, stepThree } = useFormStore();
//   const form = useForm({
//     mode: 'onTouched',
//     defaultValues: { ...stepOne, ...stepTwo, ...stepThree },
//   });
//   const { handleSubmit } = form;
//   //#endregion forms

//   //#region //? action ==================================
//   const onSubmit = (data: FormData) => {
//     // eslint-disable-next-line no-console
//     console.log(data);
//   };
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();
//   return (
//     <Layout>
//       <main>
//         <section>
//           <FormProvider {...form}>
//             <form className='max-w-sm mt-8 space-y-8'>
//               {' '}
//               <Input
//                 placeholder='Nama...'
//                 id='namaLengkapKetua'
//                 {...register('namaLengkapKetua')}
//               />
//             </form>
//           </FormProvider>
//         </section>
//       </main>
//     </Layout>
//   );
// }

// export default Recap;
