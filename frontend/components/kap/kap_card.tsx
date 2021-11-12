import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

interface param {
  kap_info: {
    labels: { name: string; color: string }[];
    logo: string;
    name: string;
    nameId: string;
  };
}

export const Kap_card = ({ kap_info }: param): JSX.Element => {
  return (
    <Grid item xs={12} md={3} sm={4}>
      <Link href={`/kaps/${kap_info.nameId}`}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Kap logo"
              height="140"
              image={kap_info.logo}
              title="Kap logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {kap_info.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          {kap_info.labels.length > 0 ? (
            <CardActions>
              {kap_info.labels.map((label: { name: string; color: string }, id: number) => (
                <Chip
                  key={id}
                  label={label.name}
                  size="small"
                  variant="outlined"
                  style={{ borderColor: label.color }}
                />
              ))}
            </CardActions>
          ) : null}
        </Card>
      </Link>
    </Grid>
  );
};
