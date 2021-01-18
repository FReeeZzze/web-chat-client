import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const CopyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/FReeeZzze">
        Web-messenger Maxim Bezrukov
      </Link>
      {`\t${new Date().getFullYear()}`}
    </Typography>
  );
};

export default CopyRight;
