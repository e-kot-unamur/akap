import { GetStaticProps } from 'next';

import Layout from 'components/layout/layout';
import { getGetHomePageContent, getKapsLogo } from 'lib/api';
import HeroBlock from 'components/home/heroBlock';
import TextBlock from 'components/home/textBlock';
import Gallery, { pictures } from 'components/home/gallery';
import TextAndImage from 'components/home/textAndImage';

interface props {
  content: {
    body: {
      __component: string;
      id: number;
      title: string;
      content: string;
      background: { url: string };
      image: { url: string };
      link: string;
    }[];
  };
  kaps_logo: pictures[];
}

export default function Home({ content, kaps_logo }: props): JSX.Element {
  return (
    <Layout>
      {content.body.map((element, id) => {
        switch (element.__component) {
          case 'page.hero-block':
            return (
              <HeroBlock
                key={id}
                title={element.title}
                content={element.content}
                backgroud={element.background.url}
              />
            );
          case 'page.text-block':
            return <TextBlock key={id} title={element.title} content={element.content} />;
          case 'page.kap-logo-gallery':
            if (kaps_logo.length > 0) {
              return <Gallery key={id} title={element.title} pictures={kaps_logo} />;
            }
            break;
          case 'page.text-and-image':
            return (
              <TextAndImage
                key={id}
                id={element.id == 1 ? 'joinKap' : element.id == 2 ? 'createKap' : undefined}
                left={Boolean(id % 2)}
                title={element.title}
                content={element.content}
                image={process.env.NEXT_PUBLIC_STRAPI_API_URL + element.image.url}
                link={
                  element.link
                    ? element.id == 1
                      ? { label: element.link, url: '/kaps' }
                      : element.id == 2
                      ? { label: element.link, url: '/contact' }
                      : undefined
                    : undefined
                }
              />
            );
          default:
            break;
        }
      })}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = (await getGetHomePageContent()) || [];
  const res = (await getKapsLogo()) || [];
  const kaps_logo = res.map((kap) => {
    return {
      button: {
        link: '/kaps/' + kap.slug,
        label: kap.slug,
      },
      src: process.env.NEXT_PUBLIC_STRAPI_API_URL + kap.logo.url,
    };
  });
  return { props: { content, kaps_logo }, revalidate: 180 };
};
