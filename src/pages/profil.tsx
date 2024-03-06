import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import React from 'react';

export default withAuth(Profile, 'all');
function Profile() {
  return (
    <Layout>
      <main>
        <section></section>
      </main>
    </Layout>
  );
}
