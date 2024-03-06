import ArrowButton from '@/components/button/ArrowButton';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';
import { easeInOut, motion } from 'framer-motion';
import withAuth from '@/components/hoc/withAuth';

import Cards from '@/components/carousel/Card';
import Seo from '@/components/Seo';
const CardCarousel = dynamic(
  () => import('@/components/carousel/CardCarousel'),
  {
    ssr: false,
  },
);
export default withAuth(Home, 'optional');
function Home() {
  // const [competition, setCompetition] = useState([]);
  const animation = {
    hidden: {
      transition: { ease: easeInOut, duration: 1 },
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { ease: easeInOut, duration: 1 },
    },

    divHidden: {
      x: '350',
      transition: { ease: easeInOut, duration: 1 },
    },
    divisible: {
      x: 0,
      transition: { ease: easeInOut, duration: 1 },
    },
    textHidden: {
      with: '0',
      opacity: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    textVisible: {
      with: '100%',
      opacity: 1,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
  };

  // async function getCompetition() {
  //   try {
  //     const res = await api.get('homepage/index');
  //     console.log(res.data.data);
  //     setCompetition(res.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getCompetition();
  // }, []);
  const cards = [
    {
      key: 1,
      content: <Cards />,
    },
    {
      key: 2,
      content: <Cards />,
    },
    {
      key: 3,
      content: <Cards />,
    },
    {
      key: 4,
      content: <Cards />,
    },
    {
      key: 5,
      content: <Cards />,
    },
    {
      key: 6,
      content: <Cards />,
    },
    {
      key: 7,
      content: <Cards />,
    },
    {
      key: 8,
      content: <Cards />,
    },
    {
      key: 9,
      content: <Cards />,
    },
    {
      key: 10,
      content: <Cards />,
    },
    {
      key: 11,
      content: <Cards />,
    },
    {
      key: 12,
      content: <Cards />,
    },
  ];
  return (
    <Layout header='fixed' className='text-white dark:text-black'>
      <Seo templateTitle='Home' />
      <div className='min-h-screen md:h-screen w-full hero relative overflow-hidden'>
        <div className='layout pt-20 space-y-10 md:space-y-0 md:pt-0 h-full flex flex-col justify-center items-center md:flex-row'>
          <div className='flex h-full w-full md:w-1/2 flex-col justify-center space-y-2'>
            <div className='flex items-center space-x-4 '>
              <motion.div
                initial='divHidden'
                animate='divisible'
                variants={animation}
                className='h-44 w-2 bg-white'
              ></motion.div>
              <motion.div
                initial='textHidden'
                animate='textVisible'
                variants={animation}
                className='flex flex-col '
              >
                <span className='h0 font-extrabold text-white'>ASTEC</span>
                <span className='h0 font-extrabold text-green-200'>2024</span>
              </motion.div>
            </div>

            <div>
              <p className='h3 text-white dark:text-black'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                tempora expedita dolor eligendi perspiciatis, reiciendis
                cupiditate unde soluta animi maxime dolores, atque modi hic
                exercitationem cumque consequuntur, repellendus numquam. Nulla!
              </p>
            </div>
            <div>
              <ArrowButton className='bg-yellow-200' href='/auth'>
                Register
              </ArrowButton>
            </div>
          </div>

          <motion.div
            initial='hidden'
            animate='visible'
            variants={animation}
            className='flex h-full w-full md:w-1/2 overflow-hidden flex-col justify-center items-center space-y-2'
          >
            <CardCarousel
              cards={cards}
              height='600px'
              margin='0 auto'
              offset={2}
              showArrows={false}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
