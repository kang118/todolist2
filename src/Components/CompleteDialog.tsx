import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteTodoAsync } from './listSlice';
import { useAppDispatch } from './hooks';
import { useNavigate, useParams } from 'react-router-dom';

export default function CompleteDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<string>()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen(false);
    console.log('handling delete')
    dispatch(deleteTodoAsync({
        id:id
    }))
    console.log('navigating')
    navigate('/')
  }

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Complete Task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button variant="contained" onClick={handleClose1} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
