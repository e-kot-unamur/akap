import Head from 'next/head';

import Navbar from 'components/layout/navbar/navbar';
import Footer from 'components/layout/footer/footer';

import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

interface props {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "L'AKàP" }: props): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Site officiel de l'Assemblée des kots-à-projet (AKàP) de l'Université de Namur (UNamur)"
        />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
