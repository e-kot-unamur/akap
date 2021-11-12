import { Button, Chip, Container, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Carousel from 'components/Carousel/Carousel';
import Contact from 'components/contact';
import Layout from 'components/layout/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getKap, getKapsSlug, getKapsLogo, getKapProducts, getKapContacts } from 'lib/api';
import TitleSection from 'components/TitleSection';
import { IconList } from 'react-fa-icon-picker';
import ProductGallery, { props as ProductGalleryProps } from 'components/kap/product_gallery';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  lastSection: {
    marginBottom: theme.spacing(8),
  },
  textImageBlock: {
    padding: theme.spacing(2),
  },
  carousel_wrapper: {
    paddingTop: '4em',
    paddingLeft: '4em',
    paddingRight: '4em',
    paddingBottom: '8em',
    color: 'inherit',
    '& h2': {
      margin: '0',
      padding: '0.5em 0em',
      fontSize: '3.5em',
      backgroundImage: 'linear-gradient(120deg, #eceeef 0%, #eceeef 100%)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '6.5em 1em',
      backgroundPosition: '52% 0.6em',
      textAlign: 'center',
    },
  },
  productGallery: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

interface param {
  kap: {
    slug: string;
    name: string;
    logo: { url: string };
    description: string;
    categories: { name: string; color: string }[];
    pictures: { url: string }[];
  };
  kap_contacts?: { id: number; name: string; label: string; url: string; icon: IconList }[];
  kap_products?: ProductGalleryProps['products'];
  kaps_logo: {
    button?: {
      label: string;
      link: string;
    };
    src: string;
  }[];
}

export default function Kap({ kap, kap_contacts, kap_products, kaps_logo }: param): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return (
      <Container className={classes.main}>
        <Typography variant="h6" className={classes.title}>
          Chargement en cours... Votre kap est bientot disponible
          <span role="img" aria-label="Man Mechanic Emoji">
            👨‍🔧
          </span>
        </Typography>
      </Container>
    );
  } else {
    return (
      <Layout>
        <Container className={classes.section}>
          <TitleSection
            title={kap.name}
            socials={kap_contacts?.filter((contact) => contact.url)}
            subtitle={'☚ Retour à la liste des Kàps'}
            subtitleLink={'/kaps'}
          />
        </Container>
        <Container className={classes.textImageBlock}>
          <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Image
                src={process.env.NEXT_PUBLIC_STRAPI_API_URL + kap.logo.url}
                alt={`Logo ${kap.slug}`}
                width="640"
                height="360"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                {kap.description}
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid container item spacing={1}>
                  {kap.categories.map((categorie, id) => {
                    return (
                      <Grid key={id} item>
                        <Chip
                          label={categorie.name}
                          variant="outlined"
                          style={{ borderColor: categorie.color }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item>
                  {kap_contacts && kap_contacts.length > 0 ? (
                    <Link href={`/kaps/${id}/#contact`}>
                      <Button
                        size="large"
                        style={{
                          backgroundColor: 'blue',
                          color: 'white',
                        }}
                        endIcon={<SendIcon />}>
                        Contacter le KàP
                      </Button>
                    </Link>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        {kap.pictures.length > 0 ? (
          <Container className={classes.carousel_wrapper} maxWidth="md">
            <Carousel
              pictures={kap.pictures.map((picture) => {
                return {
                  src: process.env.NEXT_PUBLIC_STRAPI_API_URL + picture.url,
                };
              })}
            />
          </Container>
        ) : null}
        {kap_products && kap_products.length > 0 ? (
          <Container className={classes.productGallery}>
            <Paper elevation={3}>
              <ProductGallery products={kap_products} id={id as string} />
            </Paper>
          </Container>
        ) : null}
        <Container className={classes.lastSection}>
          <Grid container justify="center" alignItems="center">
            {kap_contacts && kap_contacts.length > 0 ? (
              <Grid item xs={12} md={8} id="contact">
                <Typography variant="h4">Contact</Typography>
                <Contact contact={kap_contacts} />
              </Grid>
            ) : null}
            <Grid item xs={12} md={4}>
              <Container>
                <Carousel pictures={kaps_logo} />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const params_id = params?.id as string;
  const kap = (await getKap(params_id)) || [];
  const res_kaps_logo = (await getKapsLogo()) || [];
  const kap_contacts = (await getKapContacts(kap.slug)) || [];
  const kap_products = (await getKapProducts(kap.slug)) || [];
  const kaps_logo = res_kaps_logo.map((kap) => {
    return {
      button: {
        link: kap.slug,
        label: kap.slug,
      },
      src: process.env.NEXT_PUBLIC_STRAPI_API_URL + kap.logo.url,
    };
  });
  return {
    props: {
      kap,
      kap_contacts,
      kap_products,
      kaps_logo,
    },
    revalidate: 180,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = (await getKapsSlug()) || [];
  const paths = res.map((kap: { slug: string }) => {
    return { params: { id: kap.slug } };
  });

  return {
    paths,
    fallback: true,
  };
};
