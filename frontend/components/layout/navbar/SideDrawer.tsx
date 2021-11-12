import { Container, Divider, Drawer, IconButton, List, ListItemText } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  side_drawer_list: {
    width: '20em',
  },
  side_drawer_link: {
    display: 'block',
    padding: '1em 1em',
    textDecoration: 'none',
    color: '#55595c',
  },
  icon: {
    color: 'black',
  },
}));

interface props {
  navLinksLeft: { title: string; path: string }[];
  navLinksRight: { title: string; path: string }[];
}

function SideDrawer({ navLinksLeft, navLinksRight }: props): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setState({ left: open });
  };

  const sideDrawerList = (anchor: string): JSX.Element => (
    <Container
      className={classes.side_drawer_list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      disableGutters={true}>
      <List component="nav">
        {navLinksLeft.map(({ title, path }, id: number) => (
          <li key={id}>
            <Link href={path}>
              <a className={classes.side_drawer_link}>
                <ListItemText primary={title} />
              </a>
            </Link>
          </li>
        ))}
      </List>
      <Divider />
      <List component="nav">
        {navLinksRight.map(({ title, path }, id: number) => (
          <li key={id}>
            <Link href={path}>
              <a className={classes.side_drawer_link}>{title}</a>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/#">
            <a className={classes.side_drawer_link}>
              <InstagramIcon className={classes.icon} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/akapunamur/" passHref>
            <a target="_blank" rel="noreferrer" className={classes.side_drawer_link}>
              <FacebookIcon className={classes.icon} />
            </a>
          </Link>
        </li>
      </List>
    </Container>
  );

  return (
    <Fragment>
      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer('left', true)}>
        <Menu fontSize="large" />
      </IconButton>

      <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)} color="primary">
        {sideDrawerList('right')}
      </Drawer>
    </Fragment>
  );
}

export default SideDrawer;
