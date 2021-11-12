import { Slide, useScrollTrigger } from '@material-ui/core';

interface props {
  children: React.ReactElement<any, any>;
}

function HideOnScroll({ children }: props): JSX.Element {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default HideOnScroll;
