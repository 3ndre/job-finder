import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack } from '@mui/material';

// components
import Logo from '../../components/Logo';
import LogoFooter from '../../components/LogoFooter';
import SocialsButton from '../../components/SocialsButton';
import useResponsive from '../../hooks/useResponsive';
import MenuMobile from './MenuMobile';

// ----------------------------------------------------------------------

const LINKS = [
 
  {
    headline: 'Legal',
    children: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'job-finder@gmail.com', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter({isOffset, isHome, navConfig}) {

  let currentYear = new Date().getFullYear();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle>
      {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
      <Divider />
      <Container sx={{ pt: 5 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            {isDesktop && <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />}
            {!isDesktop && <LogoFooter sx={{ mx: { xs: 'auto', md: 'inherit' } }} />}
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
             Job Finder.
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 5,
            
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © {currentYear} Job Finder
        </Typography>
      </Container>
    </RootStyle>
  );
}
