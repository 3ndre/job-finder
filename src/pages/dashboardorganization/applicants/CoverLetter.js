import React, { useState } from "react";
import DOMPurify from 'dompurify';
import Iconify from "../../../components/Iconify";

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";





//---------------------------------------------------------




const CoverLetter = ({item}) => {


   

    const [open, setOpen] = useState(false);
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function createMarkup(html) {
        return {
          __html: DOMPurify.sanitize(html)
        }
      }


  return (
    <>


      <Dialog open={open} onClose={handleClose}>
        
         <DialogTitle id="alert-dialog-title" sx={{ display: "flex", alignItems: "center", mb: 2, }} >
         <Iconify icon="ion:documents-outline" sx={{ fontSize: "1.6rem", mr: 1 }}/> Cover Letter of&nbsp;<span style={{color: '#4338ca'}}>{item.email}</span>
        </DialogTitle>

        <DialogContent sx={{  ml: 1.5 }}>
        <div
        dangerouslySetInnerHTML={createMarkup(item.cover_letter)}>
        </div>
            
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
            Cover Letter
        </Button>
    </>
  );
};

export default CoverLetter;
