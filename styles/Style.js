import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  section: {
    margin: '10px 0 20px 0',
  },
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#fff',
      fontSize: 16,
    },
  },
  brandLogo: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  nabWraqpper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  navLink: {
    fontSize: 15,
  },
  footerTitle: {
    textAlign: 'center',
    margin: '15px 0',
  },
});
export default useStyles;
