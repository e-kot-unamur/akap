import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitleSection from 'components/TitleSection';
import { getGetAboutPageContent, getSocials, getStaffContent } from 'lib/api';
import Layout from 'components/layout/layout';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { IconList } from 'react-fa-icon-picker/dist/iconType';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(4),
  },
  staff: {
    padding: theme.spacing(6),
  },
  first: {
    marginBottom: theme.spacing(6),
  },
  second: {
    marginBottom: theme.spacing(7),
  },
  other: {
    marginBottom: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  medium: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

interface props {
  content: {
    title: { title: string; subtitle: string };
    TextAndImage: { content: string; image: { url: string } };
    StaffSectionTitle: { title: string };
  };
  staff: { position: number; poste: string; photo: { url: string }; nom: string; prenom: string }[];
  socials: { id: number; label: string; url?: string; name: string; icon?: IconList }[];
}

export default function About({ content, staff, socials }: props): JSX.Element {
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        {content.title ? (
          <TitleSection
            title={content.title.title}
            socials={socials}
            subtitle={content.title.subtitle}
          />
        ) : null}

        {content.TextAndImage ? (
          <Grid container className={classes.text} spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <div
                  dangerouslySetInnerHTML={{ __html: content.TextAndImage.content }}
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container justify="center" alignItems="center">
                <Image
                  objectPosition="right top"
                  layout="intrinsic"
                  src={process.env.NEXT_PUBLIC_STRAPI_API_URL + content.TextAndImage.image.url}
                  alt="Photo de l'équipe"
                  width={300}
                  height={300}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        {staff?.length > 0 ? (
          <Container className={classes.staff}>
            <Typography variant="h3" component="h2">
              {content.StaffSectionTitle}
            </Typography>
            <Paper elevation={6} className={classes.staff}>
              {staff.map((membre, id: number) => {
                return (
                  <Grid
                    key={id}
                    container
                    className={
                      membre.position == 1
                        ? classes.first
                        : membre.position == 2
                        ? classes.second
                        : classes.other
                    }>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant={
                          membre.position == 1 ? 'h4' : membre.position == 2 ? 'h6' : 'subtitle1'
                        }
                        gutterBottom>
                        {membre.poste}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container alignItems="center" direction="column">
                        <Grid item>
                          <Avatar
                            className={
                              membre.position == 1
                                ? classes.large
                                : membre.position == 2
                                ? classes.medium
                                : classes.small
                            }
                            src={
                              membre.photo
                                ? process.env.NEXT_PUBLIC_STRAPI_API_URL + membre.photo.url
                                : '/defaultUser.png'
                            }
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" gutterBottom>
                            {membre.prenom} {membre.nom}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Paper>
          </Container>
        ) : null}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = (await getGetAboutPageContent()) || [];
  const staff = (await getStaffContent()) || [];
  const socials = (await getSocials()) || [];
  return { props: { content, staff, socials }, revalidate: 180 };
};
