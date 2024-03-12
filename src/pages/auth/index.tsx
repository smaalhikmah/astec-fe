import AuthForm from '@/components/AuthForm';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
export default withAuth(index, 'auth');
function index() {
  return (
    <Layout>
      <div className='layout'>
        <h2 className='mt-6 mb-10 h2 font-bold tracking-tight text-center '>
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </Layout>
  );
}
