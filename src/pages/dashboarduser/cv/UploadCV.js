import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Iconify from "../../../components/Iconify";

//---------------Mui Dialog -----------------
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Stack } from "@mui/material";

//--------------------Redux---------------------------------
import { useDispatch } from 'react-redux';
import { createCV, getUserCV } from '../../../redux/features/apiSlice';


//---------------------------------------------------------




const UploadCV = ({data}) => {


    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
   

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Upload');
    const [file, setFile] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setMessage('Upload')
    };

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };




    const handleSubmitUpload = async (event) => {
      event.preventDefault();

      try {

        setLoading(true);
        setMessage('Uploading...')

        const formData = new FormData();
        formData.append("cv", file);

        const result = await dispatch(createCV(formData));
        
        if(result.payload !== null && result.payload.status === 201) {

          setTimeout(() => {
            navigate('/cv')
          }, 2000)
          dispatch(getUserCV());
          setFile(null);
          setLoading(false);
          setMessage('Upload')
          setOpen(false);

        } else {

          setLoading(false);
          setMessage('Upload')
      }


      } catch (e) {
        console.log(e)
        setLoading(false);
        setMessage('Upload')
      }
      
    };


  return (
    <>


      <Dialog open={open}>
        
         <DialogTitle id="alert-dialog-title" sx={{ display: "flex", alignItems: "center", mb: 5, }} >
         <Iconify icon="material-symbols:drive-folder-upload-outline" sx={{ fontSize: "1.6rem", mr: 1 }}/> Upload your new CV to the list
        </DialogTitle>

        <DialogContent sx={{ pb: 2}}>

    
        <Stack sx={{ pb: 1 }}>
    
                <form>

                <Grid container spacing={1} >


                <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth size="large">
                     &nbsp;{ file !== null ? <>{file.name}</> : <>Import CV</>}
                        <input accept=".pdf, .doc, .docx" hidden type="file"  onChange={handleFileChange}/>
                     </Button>
                </Grid>
                </Grid>

            </form>
     
    </Stack>

        </DialogContent>
        <DialogActions>
         
          <>
          <Button variant="outlined" color="inherit" onClick={handleClose} >
          Cancel
        </Button>

          {loading === true ? 
          <>
          <Button variant="contained" disabled autoFocus>
            {message}
          </Button>
          </>
          :
          <>
          <Button type="submit" variant="contained" disabled={file !== null ? false : true} autoFocus onClick={handleSubmitUpload}>
            {message}
          </Button>
          </>}

          </>
         


        </DialogActions>
      </Dialog>


    

        <Button variant="contained" startIcon={<Iconify icon="material-symbols:add"/>} onClick={handleClickOpen}>
            New
        </Button>
    </>
  );
};

export default UploadCV;
