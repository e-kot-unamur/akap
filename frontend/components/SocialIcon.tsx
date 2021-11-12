import Link from 'next/link';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconPickerItem, IconList } from 'react-fa-icon-picker';

const useStyles = makeStyles(() => ({
  socialIcon: {
    cursor: 'pointer',
    float: 'right',
    margin: '0.5em',
  },
}));

function SocialIcon({
  social,
}: {
  social: { id: number; label: string; url?: string; name: string; icon?: IconList };
}): JSX.Element {
  const classes = useStyles();
  return (
    <Container>
      {social.url ? (
        <Link href={social.url} passHref>
          <a target="_blank" rel="noreferrer">
            <div className={classes.socialIcon}>
              <IconPickerItem size={42} icon={social.icon ? social.icon : 'FaLink'} />
            </div>
          </a>
        </Link>
      ) : (
        <div className={classes.socialIcon}>
          <IconPickerItem size={42} icon={social.icon ? social.icon : 'FaLink'} />
        </div>
      )}
    </Container>
  );
}

export default SocialIcon;
