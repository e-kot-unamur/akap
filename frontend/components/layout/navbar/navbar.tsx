import Link from 'next/link';

import HideOnScroll from 'components/layout/navbar/HideOnScrool';
import SideDrawer from 'components/layout/navbar/SideDrawer';
import BackToTop from 'components/layout/navbar/BackToTop';

import { AppBar, Avatar, Fab, Hidden, Toolbar } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  logo: {
    marginRight: '1.5em',
  },
  nabvar_list: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    width: '100%',
  },
  nabvar_list_elem: {
    display: 'inline',
  },
  left: {
    float: 'left',
  },
  right: {
    float: 'right',
  },
  icon: {
    color: 'black',
    '&:hover': {
      color: 'blueviolet',
    },
  },
  navbar_link: {
    display: 'block',
    padding: '1em 1em',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      backgroundColor: '#d9dfe0',
    },
  },
}));

const navLinksLeft = [
  { title: 'Tous les Kàps', path: '/kaps', new_tab: false },
  {
    title: 'Où les trouver',
    path:
      'https://www.google.com/maps/d/u/1/edit?mid=14rK1zLFAVcVVrqBXb_HJgfpkDA1XZPFm&usp=sharing',
    new_tab: true,
  },
  { title: 'Rejoindre un Kàp', path: '/#joinKap', new_tab: false },
  { title: 'Créer un Kàp', path: '/#createKap', new_tab: false },
];
const navLinksRight = [
  { title: 'Contact', path: '/contact' },
  { title: 'À propos de nous', path: '/about' },
];

function Navbar(): JSX.Element {
  const classes = useStyles();
  return (
    <header>
      <HideOnScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Hidden mdUp>
              <SideDrawer navLinksLeft={navLinksLeft} navLinksRight={navLinksRight} />
            </Hidden>
            <Link href="/">
              <Avatar
                style={{ cursor: 'pointer' }}
                variant="square"
                className={classes.logo}
                src="/logo.png"
                alt="Logo de l'AKàP"
              />
            </Link>
            <Hidden smDown>
              <ul className={classes.nabvar_list}>
                {navLinksLeft.map(({ title, path, new_tab }, id) => (
                  <li key={id} className={(classes.nabvar_list_elem, classes.left)}>
                    <Link href={path} passHref={new_tab}>
                      <a
                        target={new_tab ? '_blank' : '_self'}
                        rel={new_tab ? 'noreferrer' : ''}
                        className={classes.navbar_link}>
                        {title}
                      </a>
                    </Link>
                  </li>
                ))}
                <li className={(classes.nabvar_list_elem, classes.right)}>
                  <Link href="https://www.instagram.com/akap.namur/" passHref>
                    <a className={classes.navbar_link} target="_blank" rel="noreferrer">
                      <InstagramIcon className={classes.icon} />
                    </a>
                  </Link>
                </li>
                <li className={(classes.nabvar_list_elem, classes.right)}>
                  <Link href="https://www.facebook.com/akapunamur/" passHref>
                    <a target="_blank" rel="noreferrer" className={classes.navbar_link}>
                      <FacebookIcon className={classes.icon} />
                    </a>
                  </Link>
                </li>
                {navLinksRight.map(({ title, path }, id) => (
                  <li key={id} className={(classes.nabvar_list_elem, classes.right)}>
                    <Link href={path}>
                      <a className={classes.navbar_link}>{title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Hidden>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <BackToTop>
        <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </header>
  );
}

export default Navbar;
