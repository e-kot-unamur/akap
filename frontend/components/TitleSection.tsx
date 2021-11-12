import Link from 'next/link';
import { IconList } from 'react-fa-icon-picker';

import SocialIcon from 'components/SocialIcon';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
  subTitle: {
    marginLeft: theme.spacing(4),
  },
}));

export interface props {
  title: string;
  socials?: { id: number; label: string; url?: string; name: string; icon?: IconList }[];
  subtitle: string;
  subtitleLink?: string;
}

function TitleSection({ title, socials, subtitle, subtitleLink }: props): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} md="auto" className={classes.title}>
        <div>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography variant="subtitle2" className={classes.subTitle} gutterBottom>
            {subtitleLink ? <Link href={subtitleLink}>{subtitle}</Link> : subtitle}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md="auto">
        <div></div>
      </Grid>
      <Grid item xs={12} md={3}>
        {socials
          ?.filter((social) => social.url)
          .map((social, id) => (
            <SocialIcon key={id} social={social} />
          ))}
      </Grid>
    </Grid>
  );
}

export default TitleSection;
