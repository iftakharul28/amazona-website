import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Switch,
  Badge,
} from '@material-ui/core';
import useStyles from '../styles/Style';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, card } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '24px',
        fontWeight: '700',
        margin: '10px 0',
      },
      h2: {
        fontSize: '18px',
        fontWeight: '500',
        margin: '8px 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
  const darkModeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newdarkMode = !darkMode;
    Cookies.set('darkMode', newdarkMode ? 'ON' : 'OFF');
  };
  return (
    <>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.nabWraqpper}>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brandLogo}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.navLinkWrapper}>
              <Switch checked={darkMode} onChange={darkModeHandler} />
              <NextLink href="/card" passHref>
                <Link className={classes.navLink}>
                  {card.cardItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={card.cardItems.length}
                    >
                      Card
                    </Badge>
                  ) : (
                    'Card'
                  )}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link className={classes.navLink}>LogIn</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
        <footer>
          <Typography className={classes.footerTitle}>
            All Right Reserved. Next Amazona
          </Typography>
        </footer>
      </ThemeProvider>
    </>
  );
}
