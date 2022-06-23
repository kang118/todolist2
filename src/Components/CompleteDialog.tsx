import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteTodoAsync } from '../Slices/todoListSlice';
import { useAppDispatch } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import styled from "@emotion/styled"


const StyledDeleteButton = styled(Button)`
background-color: red;
&:hover {
  background-color: darkred;
}
color: white;
`

const StyledBackButton = styled(Button)`
&:hover {
  background-color: lightgrey;
}
color: blue;
`

const StyledConfirmButton = styled(Button)`
background-color: blue;
&:hover {
  background-color: darkblue;
}
color: white;
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

  const handleComplete = () => {
    setOpen(false);
    dispatch(deleteTodoAsync({
        id: id
    }))
    navigate('/')
  }

  return (
    <div>
      <StyledDeleteButton onClick = {handleClickOpen}>
        Delete
      </StyledDeleteButton>

      <Dialog
        open = {open}
        onClose = {handleClose}
      >
        <DialogTitle>
          {"Complete Task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledBackButton onClick = {handleClose}>Back</StyledBackButton>
          <StyledConfirmButton onClick = {handleComplete} autoFocus>
            Continue
          </StyledConfirmButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
