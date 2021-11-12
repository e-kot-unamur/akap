import React from 'react';
import Link from 'next/link';

import markdownToHtml from 'lib/markdownToHtml';

import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  hero_bg: {
    backgroundImage: (styleParams: { image_url: string }) =>
      `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${process.env.NEXT_PUBLIC_STRAPI_API_URL}${styleParams.image_url})`,
    backgroundColor: '#909090',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    color: 'white',
  },
  hero_content: {
    paddingTop: '10em',
    paddingBottom: '10em',
    paddingLeft: '1.5em',
    paddingRight: '3em',
    color: 'inherit',
    '& h1': {
      margin: '0',
      fontSize: '6em',
    },
    '& p': {
      margin: '0',
      fontSize: '1.5em',
    },
    '& button': {
      marginTop: '3em',
    },
  },
});

interface props {
  title: string;
  content: string;
  backgroud: string;
}

function HeroBlock({ title, content, backgroud }: props): JSX.Element {
  const styleParams = { image_url: backgroud };
  const classes = useStyles(styleParams);

  const [Content, setContent] = React.useState('');

  React.useEffect(() => {
    const transformContent = async (): Promise<void> => {
      setContent(await markdownToHtml(content));
    };
    transformContent();
  }, [content]);

  return (
    <Container className={classes.hero_bg} maxWidth="xl">
      <Container>
        <div className={classes.hero_content}>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: Content }} />
          <Link href="/contact">
            <Button variant="outlined" color="primary">
              Contacte-nous !
            </Button>
          </Link>
        </div>
      </Container>
    </Container>
  );
}

export default HeroBlock;
