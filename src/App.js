import React, { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './redux/features/apiSlice';
// ----------------------------------------------------------------------

export default function App() {


  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({...state.api}));
  

  //localstorage clear 24hr

  var hours = 24;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('access_token');
  var parsed = JSON.parse(setupTime)

  if (setupTime !== null) {
    if(now-parsed.expiry > hours*60*60*1000) {
      localStorage.clear()
      window.location.reload()
  }
  }

  if (localStorage.getItem('access_token') !== null && localStorage.getItem('user_data') === null || {} && user && (user[0] !== null || user[0] !== undefined)) {

    const item = {
      userData: user[0],
    }

    localStorage.setItem('user_data', JSON.stringify(item));
  }

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      dispatch(getUser());
    }
  }, [dispatch]);

 

  
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <RtlLayout>
          <MotionLazyContainer>
            <ProgressBarStyle />
            <ScrollToTop />
            <Router />
          </MotionLazyContainer>
        </RtlLayout>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
