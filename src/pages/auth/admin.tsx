import AdminAuthForm from '@/components/AdminAuthForm';
import Seo from '@/components/Seo';
import adminWithAuth from '@/components/hoc/adminWithAuth';

export default adminWithAuth(index, 'auth');
function index() {
  return (
    <div>
      <Seo templateTitle='Login' />
      <div className='min-h-screen md:h-screen w-full hero relative overflow-hidden flex justify-center items-center'>
        <div className='layout bg'>
          <h2 className='mt-6 mb-10 h2 font-bold tracking-tight text-center text-white'>
            Sign in to your admin account
          </h2>
          <AdminAuthForm />
        </div>
      </div>
    </div>
  );
}
