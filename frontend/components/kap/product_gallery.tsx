import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      padding: theme.spacing(2),
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    tileTitle: {
      color: theme.palette.primary.light,
    },
    titleIcon: {
      color: theme.palette.primary.light,
      '&:hover': {
        color: 'skyblue',
      },
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
    },
    titleBarTop: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
    },
  })
);

export interface props {
  id: string;
  products?: {
    photo: { url: string };
    name: string;
    description: string;
    title: string;
    prix: number;
    caution: number;
  }[];
}

function ProductGallery({ products, id }: props): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h3">Besoin de matos ?</Typography>
        <Typography variant="h6">Contact le kot à projet</Typography>
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {products?.map((product) => {
            return (
              <GridListTile rows={2} key={product.photo.url}>
                <img
                  src={process.env.NEXT_PUBLIC_STRAPI_API_URL + product.photo.url}
                  alt={product.name}
                />
                <GridListTileBar
                  title={product.name}
                  subtitle={<span>{product.description}</span>}
                  classes={{
                    root: classes.titleBar,
                    title: classes.tileTitle,
                  }}
                  actionIcon={
                    <IconButton aria-label={`contact ${product.title}`}>
                      <Link href={`/kaps/${id}/#contact`}>
                        <MessageIcon className={classes.titleIcon} />
                      </Link>
                    </IconButton>
                  }
                />

                {product.prix || product.caution ? (
                  <GridListTileBar
                    title={
                      product.caution ? (
                        <Chip
                          deleteIcon={<EuroSymbolIcon />}
                          onDelete={() => ({})}
                          label={'Caution: ' + product.caution}
                          color="primary"
                          style={{ margin: '0.8em 0' }}
                        />
                      ) : null
                    }
                    subtitle={
                      product.prix ? (
                        <Chip
                          variant="outlined"
                          size="small"
                          deleteIcon={<EuroSymbolIcon />}
                          onDelete={() => ({})}
                          label={'Prix: ' + product.prix}
                          color="primary"
                        />
                      ) : null
                    }
                    titlePosition="top"
                    classes={{
                      root: classes.titleBarTop,
                      title: classes.tileTitle,
                    }}
                  />
                ) : null}
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    </div>
  );
}

export default ProductGallery;
