import { Container, Grid, Link as Material_link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import Link from 'next/link';

import Copyright from 'components/copyright';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Footer(): JSX.Element {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth={false}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}>
            <Material_link>
              <Link href="https://www.cslabs.be/">CSLabs.</Link>
            </Material_link>
            <Copyright />
          </Grid>{' '}
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            Made with <Favorite style={{ position: 'relative', top: '8px' }} /> from Namur
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </footer>
  );
}
