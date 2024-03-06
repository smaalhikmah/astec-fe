import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMeta = {
  title: 'Astec 2024',
  site_name: 'Astec 2024',
  description:
    'Al-𝙃𝙞𝙠𝙢𝙖𝙝 Sport, Technology, Education, Ard and Business 𝘾𝙤𝙢𝙥𝙚𝙩𝙞𝙩𝙞𝙤𝙣',
  url: '',
  image: '/images/logonobg.png',
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.site_name}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      <link rel='icon' href='/logo.ico' />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.site_name} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />

      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta name='author' property='article:author' content='Astec 2024' />
        </>
      )}
    </Head>
  );
}
