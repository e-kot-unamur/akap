import { Link as Material_link, Typography } from '@material-ui/core';

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Material_link color="inherit" href="/">
        L&apos;AKàP
      </Material_link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
