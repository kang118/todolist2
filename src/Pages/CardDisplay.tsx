import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, IconButton, Stack } from '@mui/material';
import styled from "@emotion/styled"
import StarIcon from '@mui/icons-material/Star';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const StyledGreenHeaderDiv = styled.div`
background-color: rgb(51, 204, 51);
height: 50px
`

const StyledRedHeaderDiv = styled.div`
background-color: rgb(255, 0, 0);
height: 50px
`


export default function BasicCard() {
  return (
    <Container maxWidth="xs">
      <Card>
        <Stack alignItems="flex-end">
          <CardActions>
              <Button size="small">STar</Button>
              <IconButton>
                <StarIcon/>
              </IconButton>
          </CardActions>
        </Stack>
        <CardContent>
          <Stack alignItems="center">
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Task ABC
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Date
            </Typography>
            <br/>
            <br/>
            <Stack direction="row" spacing={15}>
              <Typography variant="body2">
                Collection Date
                <br />
                15 Jan
              </Typography>
              <Typography variant="body2">
                Status
                <br />
                Error
              </Typography>
            </Stack>
          </Stack>
          <br/>
          <StyledGreenHeaderDiv/>
        </CardContent>
      </Card>


      <Card>
        <CardActions>
          <Button size="small">STar</Button>
        </CardActions>
        <CardContent>
          <Stack alignItems="center">
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Task ABC
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Date
            </Typography>
            <br/>
            <br/>
            <Stack direction="row" spacing={15}>
              <Typography variant="body2">
                Collection Date
                <br />
                15 Jan
              </Typography>
              <Typography variant="body2">
                Status
                <br />
                Error
              </Typography>
            </Stack>
          </Stack>
          <br/>
          <StyledRedHeaderDiv/>
        </CardContent>
      </Card>
    </Container>
  );
}
