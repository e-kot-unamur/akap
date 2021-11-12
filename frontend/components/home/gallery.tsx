import Carousel from 'components/Carousel/Carousel';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
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
});

export interface pictures {
  button?: {
    label: string;
    link: string;
  };
  src: string;
}

interface props {
  title: string;
  pictures: pictures[];
}

function Gallery({ title, pictures }: props): JSX.Element {
  const classes = useStyles();
  return (
    <Container className={classes.carousel_wrapper} maxWidth="md">
      <h2>{title}</h2>
      <Carousel pictures={pictures} />
    </Container>
  );
}

export default Gallery;
