import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

export default function SnackbarWithDecorators({ open, onClose, message }) {
  return (
    <Snackbar
      variant="soft"
      color="neutral"
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      startDecorator={<ErrorOutlineRoundedIcon />}
      endDecorator={
        <Button
          onClick={onClose}
          size="sm"
          variant="soft"
          color="neutral"
        >
          Dismiss
        </Button>
      }
    >
      {message}
    </Snackbar>
  );
}
