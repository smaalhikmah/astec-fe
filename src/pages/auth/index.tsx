import AuthForm from '@/components/AuthForm';
import Seo from '@/components/Seo';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
export default withAuth(index, 'auth');
function index() {
  return (
    <Layout header='home'>
      <Seo templateTitle='Login' />
      <div className='min-h-screen md:h-screen w-full hero relative overflow-hidden flex justify-center items-center'>
        <div className='layout bg'>
          <h2 className='mt-6 mb-10 h2 font-bold tracking-tight text-center text-white'>
            Sign in to your account
          </h2>

          <AuthForm />
        </div>
      </div>
    </Layout>
  );
}
