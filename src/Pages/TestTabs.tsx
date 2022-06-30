import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import styled from "@emotion/styled"
import { makeStyles } from '@material-ui/styles';
import { createTheme, useTheme } from '@mui/material/styles';
import { Avatar, Badge, Container, Stack, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const StyledDiv = styled.div`
background-color: lightpink;
height: 500px;
`
const StyledContainer = styled(Container)`
height: 200px;
border: 1px solid;
padding: 0
`

const StyledBox = styled(Box)`
background-color: royalblue;
height: 50px
`

// const StyledTab = styled(Tab)`
// background-color: lightgrey;
// &:hover {
//   background-color: lightblue;
// }
// &$selected {
//   background-color: blue;
// }
// color: black;
// margin:2px
// `


const useStyles = makeStyles((theme)=> ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiTab-root.Mui-selected": {
      color: 'black',
      backgroundColor: "white",
      margin: 2,
      marginBottom:0,
      borderRadius:2,
      opacity: 1,
      fontSize: 14
    }, 
    "& .MuiTab-root": {
      color: 'black',
      backgroundColor: "lightgrey",
      opacity: 0.9,
      marginBottom:0,
      margin: 2,
      borderRadius: 2,
      fontSize: 12,
    }
  }}))


export default function TestTabs() {
  const [value, setValue] = React.useState("0");
  const classes = useStyles()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <>
      <br></br>
      <StyledContainer maxWidth="xl" disableGutters>
        <TabContext value={value}>
          <StyledBox>
            <Tabs value={value} 
            onChange={handleChange} 
            className={classes.tabs} 
            //TabIndicatorProps={{style: {background: 'transparent'}}}
            >
              {/* <Tab classes={{ root : classes.tabRoot, selected : classes.selectedTab }} label="Item One" value="0" />
              <Tab classes={{ root:classes.tabRoot, selected:classes.selectedTab}} label="Item Two" value="1" />
              <Tab classes={{ root:classes.tabRoot, selected:classes.selectedTab}} label="Item Three"  value="2"/> */}
              {/* <Badge badgeContent={4} color="error">
                <Tab label = "All Status" value = "0"/>
              </Badge> */}
              {/* <Tab label = "All Status" value = "0"
                component={() => (
                <Avatar> 3 </Avatar>
                )}
              /> */}
              {/* <Tab label={["All", <Badge anchorOrigin={{vertical: 'top', horizontal: 'right',}} badgeContent={4} color="error"></Badge>]} value = "0"/> */}
              {/* <Tab label={["All", <Avatar> 3 </Avatar>]} value = "0"/> */}
              {/* <Tab label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant='h6'>
                  Test
                </Typography>
                <Avatar> 3 </Avatar>
              </Stack>} 
              value = "0"/> */}
              <Tab 
              label={<Stack direction="row" alignItems="center" spacing={4}>
                <Typography fontWeight="bold" variant='caption'>
                  All Status
                </Typography>
                <Badge badgeContent={7} color="primary"/>
              </Stack>} 
              value = "0"
              text-transform="none"/>
              <Tab label={<Stack direction="row" alignItems="center" spacing={4}>
                <Typography variant='caption'>
                  Error
                </Typography>
                <Badge badgeContent={7} color="error"/>
              </Stack>} value = "1"/>
              <Tab label={<Stack direction="row" alignItems="center" spacing={4}>
                <Typography variant='caption'>
                  Expiring
                </Typography>
                <Badge badgeContent={7} color="warning"/>
              </Stack>} value = "2"/>

              {/* <Tab label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant='caption'>
                  All Status
                </Typography>
                <Avatar sx={{ bgcolor:blue[700], width:20, height:20}}> <Typography align="left" variant="caption">3</Typography></Avatar>
              </Stack>} 
              value = "0"/>
              <Tab label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant='caption'>
                  Error
                </Typography>
                <Avatar sx={{width:20, height:20}}> 3 </Avatar>
              </Stack>} 
              value = "1"/>
              <Tab label={<Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant='caption'>
                  Expiring
                </Typography>
                <Avatar sx={{width:20, height:20}}> 3 </Avatar>
              </Stack>} 
              value = "2"/> */}
              {/* <Tab label = "Error" value = "1">
                <Avatar>2</Avatar>
              </Tab> */}
              {/* <Avatar>4</Avatar> */}
              {/* <Tab label = "Expiring" value = "2"/> */}



            </Tabs>
          </StyledBox>
          <TabPanel value="0" >
            <TextField label = "Email 1"/>
          </TabPanel>
          <TabPanel value="1" >
            <TextField label = "Email 2"/>
          </TabPanel>
          <TabPanel value="2" >
            <TextField label = "Email 3"/>
          </TabPanel>
        </TabContext>
      </StyledContainer>
    </>
  );
}


//-----------------------------------------------Customisations:-------------------------------------------------------
//To customise in the future-> Download function -> so that it is linked directly to download current file only instead of drop down
//Current Download function:
// const downloadFunction = (
//    event: React.MouseEvent<HTMLElement>,
//    idToDownload: DownloadItemsType,
//)=> {
  //eslint-disable-next-line no-alert
  //event.stopPropagation();
  //alert(`Selected Download ID: ${idToDownload.fileName}`)
//}

//To create Table
// const StyledTable =styled(BasicTable)`
//   flex-grow:1;
//   overflow:auto;
// }`

// return(
//   <TableWrapper>
//     <StyledTable
//       tableName="xx"
//       headers={headers}
//       rows = {rows}
//       loading={loading}
//       stickyHeader
//       onDownloadMenuItemClick={downloadFunction}
//       />
//   </TableWrapper>
// )

//For column with status and badge
//<Container>
//  <Stack directon="row" alignItems="center" justifyContent="center" spacing={3}>
//    <Typography variant="caption"> Active Status </Typography>
//    <Badge variant="dot" color="error"/>
//   </Stack>
//</Container>
