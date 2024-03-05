import AuthForm from '@/components/AuthForm';
import withAuth from '@/components/hoc/withAuth';
export default withAuth(index, 'auth');
function index() {
  return (
    <div className='flex flex-col justify-center h-screen bg-gray-100 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 mb-10 text-3xl font-bold tracking-tight text-center text-gray-900 '>
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
