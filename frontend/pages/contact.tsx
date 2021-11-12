import { GetStaticProps } from 'next';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Components, { Contact_params } from 'components/contact';
import { getSocials } from 'lib/api';
import Layout from 'components/layout/layout';

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: theme.spacing(4),
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Contact({ contact }: Contact_params): JSX.Element {
  const classes = useStyles();
  return (
    <Layout>
      <Container className={classes.main}>
        <Typography variant="h2" component="h3" className={classes.title} gutterBottom>
          Contacte-nous
        </Typography>
        <Components contact={contact} />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contact = (await getSocials()) || [];
  return { props: { contact }, revalidate: 180 };
};
