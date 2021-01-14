import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const CopyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Web-chat Maxim Bezrukov
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

export default CopyRight;
