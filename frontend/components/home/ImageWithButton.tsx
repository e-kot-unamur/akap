import { Button, Container, withStyles } from '@material-ui/core';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  image_warper: {
    position: 'relative',
    '& Button': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      msTransform: 'translate(-50%, -50%)',
    },
  },
});

const ImageButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#E6E7E8',
    borderColor: '#E6E7E8',
    '&:hover': {
      backgroundColor: '#B3B4B4',
      borderColor: '#A7A8A8',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ADAEAE',
      borderColor: '#ADAEAE',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

function ImageWithButton({
  image,
  link,
}: {
  image: string;
  link?: {
    label: string;
    url: string;
  };
}): JSX.Element {
  const classes = useStyles();
  return (
    <Container className={classes.image_warper}>
      <img src={image} alt="First" style={{ maxWidth: '100%', height: 'auto' }} />
      {link ? (
        <Link href={`${link.url}`}>
          <ImageButton variant="contained" color="primary">
            {link.label}
          </ImageButton>
        </Link>
      ) : null}
    </Container>
  );
}

export default ImageWithButton;
