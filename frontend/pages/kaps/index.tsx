import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Kap_card } from 'components/kap/kap_card';
import Layout from 'components/layout/layout';
import { GetStaticProps } from 'next';
import { getKaps } from 'lib/api';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

interface param {
  kaps: {
    labels: { name: string; color: string }[];
    logo: string;
    name: string;
    nameId: string;
  }[];
}

export default function Kaps({ kaps }: param): JSX.Element {
  const classes = useStyles();
  return (
    <Layout>
      {kaps.length > 0 ? (
        <Container className={classes.main}>
          <Typography variant="h2" component="h1" className={classes.title}>
            Choisis ton KàP
          </Typography>
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            {kaps.map((kap, id) => (
              <Kap_card key={id} kap_info={kap} />
            ))}
          </Grid>
        </Container>
      ) : (
        <Container className={classes.main}>
          <Typography variant="h6" className={classes.title}>
            Il n&apos;y a pas encore de projet il ne tien qu&apos;à toi d&apos;en créer un.
            N&apos;hesite pas à contacter l&apos;akap via les différents
            <Link href="/contact"> points de contact </Link>
          </Typography>
        </Container>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = (await getKaps()) || [];
  const kaps = res.map((kap) => {
    return {
      name: kap.name,
      logo: process.env.NEXT_PUBLIC_STRAPI_API_URL + kap.logo.url,
      labels: kap.categories,
      nameId: kap.slug,
    };
  });
  return { props: { kaps }, revalidate: 180 };
};
