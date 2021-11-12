import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import markdownToHtml from 'lib/markdownToHtml';
import React from 'react';
const useStyles = makeStyles({
  body_wrapper: {
    padding: '4em 1.5em',
    color: 'inherit',
    '& h2': {
      margin: '0',
      padding: '0.5em 0em',
      fontSize: '3.5em',
      backgroundImage: 'linear-gradient(120deg, #eceeef 0%, #eceeef 100%)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '35% 40%',
      backgroundPosition: '55% 70%',
      textAlign: 'center',
    },
    '& p': {
      padding: '0.5em 2em',
      margin: '0',
      fontSize: '1.2em',
    },
  },
});

interface props {
  title: string;
  content: string;
}

function TextBlock({ title, content }: props): JSX.Element {
  const classes = useStyles();
  const [Content, setContent] = React.useState('');

  React.useEffect(() => {
    const transformContent = async (): Promise<void> => {
      setContent(await markdownToHtml(content));
    };
    transformContent();
  }, [content]);

  return (
    <Container className={classes.body_wrapper} maxWidth="xl">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={12} md={6}>
          <h2>{title}</h2>
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: Content }}
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TextBlock;
