import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Navigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components 
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';


//--------------------Redux---------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getOrgUserById } from '../../../redux/features/apiSlice';
import SkeletonItem from "../../../components/SkeletonItem";
import OrganizationBoardUpdateForm from "./OrganizationBoardUpdateForm";


// ----------------------------------------------------------------------

export default function OrganizationBoardIndexUpdate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch(); 


  const { orgUserById } = useSelector((state) => ({...state.api}));


  let id = useParams().id;
  
 
  const fetchById = () => {
     dispatch(getOrgUserById({id}));
   }


      useEffect(() => {
        fetchById();
    }, []);

    console.log(orgUserById)



  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Update Job">
      <Container maxWidth={themeStretch ? false : 'lg'}>



      <HeaderBreadcrumbs
          heading="Update User"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'User Board', href: '/user-board'},
            { name: 'Update User'},
          ]}

        />


          {orgUserById && orgUserById.length > 0 && orgUserById[0] ? 
          <>
           <OrganizationBoardUpdateForm data={orgUserById} id={id} />
          </>
            :
          <SkeletonItem/>
          }
        

      </Container>
    </Page> 
  );
}
