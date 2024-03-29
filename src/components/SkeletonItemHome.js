// @mui
import {Skeleton, Grid } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonItemHome() {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Skeleton variant="rectangular" width="100%" sx={{ height: 300, borderRadius: 2, background: 'white' }} />
    </Grid>
  );
}
