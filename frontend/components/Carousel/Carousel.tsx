import 'react-awesome-slider/dist/styles.css';

import { Button, withStyles } from '@material-ui/core';
import Link from 'next/link';
import { Component } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const ImageButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#E6E7E8',
    borderColor: '#E6E7E8',
    '&:hover': {
      backgroundColor: '#B3B4B4',
      borderColor: '#A7A8A8',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ADAEAE',
      borderColor: '#ADAEAE',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

interface Props {
  pictures: {
    button?: {
      label: string;
      link: string;
    };
    src: string;
  }[];
}

class Carousel extends Component<Props> {
  render(): JSX.Element | null {
    if (this.props.pictures.length > 0) {
      return (
        <AutoplaySlider
          play
          cancelOnInteraction={true}
          interval={6000}
          style={{ border: '0.25em solid #eceeef' }}>
          {this.props.pictures.map(({ button, src }, id) => (
            <div key={id} data-src={src}>
              {button ? (
                <Link href={button.link}>
                  <ImageButton variant="contained" color="primary" disableRipple>
                    {button.label.charAt(0).toUpperCase() + button.label.slice(1)}
                  </ImageButton>
                </Link>
              ) : null}
            </div>
          ))}
        </AutoplaySlider>
      );
    } else {
      return null;
    }
  }
}

export default Carousel;
