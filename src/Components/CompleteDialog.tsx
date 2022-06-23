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
import styled from "@emotion/styled"


const StyledButton1 = styled(Button)`
background-color:red;
&:hover {
  background-color:darkred;
}
color:white;
`

const StyledButton2 = styled(Button)`
&:hover {
  background-color:lightgrey;
}
color:blue;
`

const StyledButton3 = styled(Button)`
background-color:blue;
&:hover {
  background-color:darkblue;
}
color:white;
`

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
      <StyledButton1  onClick={handleClickOpen}>
        Delete
      </StyledButton1>

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
          <StyledButton2 onClick={handleClose}>Back</StyledButton2>
          <StyledButton3 onClick={handleClose1} autoFocus>
            Continue
          </StyledButton3>
        </DialogActions>
      </Dialog>
    </div>
  );
}
