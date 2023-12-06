import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import { useEffect, useImperativeHandle, useRef } from 'react';
import {
  anchorRef,
  bindPopper,
  bindToggle,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import './styles.css';

export default function TestComponent() {
  const popperRef = useRef(null);
  const popupState = usePopupState({
    variant: 'popper',
  });
  const toggleRef = useRef(null);

  useEffect(() => {
    anchorRef(popupState)(toggleRef.current);
  }, [[toggleRef, popupState]]);

  // useImperativeHandle(
  //   popperRef,
  //   () => ({
  //     open: () => popupState.open(popupState.anchorEl),
  //     toggle: () => popupState.toggle(popupState.anchorEl),
  //   }),
  //   [popupState]
  // );

  return (
    <Box className='App'>
      <h3 ref={toggleRef} style={{ marginBottom: 64 }}>
        Popper origination point using h3
      </h3>
      {/* <Typography variant='h6' ref={toggleRef} style={{ marginBottom: 64 }}>
        Popper origination point using Typography
      </Typography> */}
      <button {...bindToggle(popupState)}>Toggle Popper</button>

      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography>The content of the Popper</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
