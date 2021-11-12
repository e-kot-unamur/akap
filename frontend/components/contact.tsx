import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IconPickerItem, IconList } from 'react-fa-icon-picker';
import Link from 'next/link';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  adressLabel: {
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  icon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export interface Contact_params {
  contact: { name: string; label: string; url: string; icon: IconList }[];
}

export default function Contact({ contact }: Contact_params): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container justify="center" alignItems="center">
        {contact.map((contact_info, id) => {
          return (
            <React.Fragment key={id}>
              <Grid item xs={12} md={6}>
                <Grid container>
                  <IconPickerItem
                    size={42}
                    icon={contact_info.icon ? contact_info.icon : 'FaLink'}
                  />
                  <Typography variant="h6" gutterBottom className={classes.adressLabel}>
                    {contact_info.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  {contact_info.url ? (
                    <Link href={contact_info.url} passHref>
                      <a target="_blank" rel="noreferrer">
                        {contact_info.label}
                      </a>
                    </Link>
                  ) : (
                    contact_info.label
                  )}
                </Typography>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Paper>
  );
}
