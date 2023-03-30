import React, { useState } from "react";
import Iconify from "../../../components/Iconify";

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";




//---------------------------------------------------------




const CVUser = ({item}) => {


   

    const [open, setOpen] = useState(false);
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




  return (
    <>


      <Dialog open={open} onClose={handleClose}>
        
         <DialogTitle id="alert-dialog-title" sx={{ display: "flex", alignItems: "center", mb: 5, }} >
         <Iconify icon="ion:documents-outline" sx={{ fontSize: "1.6rem", mr: 1 }}/> CV of&nbsp;<span style={{color: '#4338ca'}}>{item.email}</span>
        </DialogTitle>

        <DialogContent sx={{ pb: 0.5}}>

    
        <Stack sx={{ pb: 0.5 }}>
            
        </Stack>

        </DialogContent>
        <DialogActions>
         
          <>
          <Button variant="outlined" color="inherit" onClick={handleClose} >
          Cancel
        </Button>
          </>
         


        </DialogActions>
      </Dialog>


    

        <Button variant="outlined" component="label" onClick={handleClickOpen}>
           CV
        </Button>
    </>
  );
};

export default CVUser;
