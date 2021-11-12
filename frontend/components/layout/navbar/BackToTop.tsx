import { useScrollTrigger, Zoom } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  BackToTop: {
    position: 'fixed',
    bottom: '5%',
    right: '2.5%',
  },
}));

interface props {
  children: React.ReactNode;
}

function BackToTop({ children }: props): JSX.Element {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const handleClick = (event: React.MouseEvent): void => {
    const anchor = (event.currentTarget.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.BackToTop}>
        {children}
      </div>
    </Zoom>
  );
}

export default BackToTop;
