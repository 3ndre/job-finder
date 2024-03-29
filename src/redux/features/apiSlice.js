import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


//localstorage get access token
const local_access_token = localStorage.getItem('access_token');
const access_token = JSON.parse(local_access_token);
//----------------------------------------------------------------------


//---------------------------------------------------Get Request ---------------------------------------------------------------

//Get request to get user info
export const getUser = createAsyncThunk("api/getUser", async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) => 
    res.json()
    );
})


//Get all users
export const getAllUser = createAsyncThunk("api/getAllUser", async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) => 
    res.json()
    );
})


//Get top staff
export const getTopStaff = createAsyncThunk("api/getTopStaff", async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/top_staff`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).then((res) => 
    res.json()
    );
})



//Get request to get user CV
export const getUserCV = createAsyncThunk("api/getUserCV", async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/cv/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) => 
    res.json()
    );
})


//Get list of posted job

export const getJob = createAsyncThunk("api/getJob", async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
           
        },
    });
    const data = await response.json();
    return data;
});


//Get search of posted job

export const getJobSearch = createAsyncThunk("api/getJobSearch", async (searchApiData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/?${searchApiData}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',

        },
    });
    const data = await response.json();
    return data;
});


//Get job by id

export const getJobById = createAsyncThunk("api/getJobById", async ({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    });
    const data = await response.json();
    return data;
});


//Get applicants by Job ID

export const getApplicantsById = createAsyncThunk("api/getApplicantsById", async ({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/applicants/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${access_token.token}`,
        },
    });
    const data = await response.json();
    return data;
});



//Get list of created organization

export const getUserByOrg = createAsyncThunk("api/getUserByOrg", async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/organization`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    });
    const data = await response.json();
    return data;
});



//Get org user by id

export const getOrgUserById = createAsyncThunk("api/getOrgUserById", async ({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/organization/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    });
    const data = await response.json();
    return data;
});



//Get list of created users

export const getAllUsersCreated = createAsyncThunk("api/getAllUsersCreated", async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    });
    const data = await response.json();
    return data;
});

//-------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------Delete Request------------------------------------------------------------

//Delete job by Id 
export const deleteJob = createAsyncThunk("api/deleteJob", async ({id}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/post/${id}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) =>  {
        res.json();
    }
    );
})


//Delete user by Id  for organization
export const deleteUser = createAsyncThunk("api/deleteUser", async ({id}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/organization/${id}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) =>  {
        res.json();
    }
    );
})


//Delete user By ID
export const deleteUserById = createAsyncThunk("api/deleteUserById", async ({id}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/user/${id}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) =>  {
        res.json();
    }
    );
})


//--------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------PUT (Update Request)------------------------------------------------------


//Put request to update JOB

export const updateJob = createAsyncThunk("api/updateJob", async ({updateJobData, id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(updateJobData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});



//Put request to update custom user

export const updateUserByOrg = createAsyncThunk("api/updateUserByOrg", async ({updateUserData, id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/organization/${id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(updateUserData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});


//Put request to update account details

export const updateUser = createAsyncThunk("api/updateUser", async ({updateUserData}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(updateUserData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});



//--------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------Post Request ---------------------------------------------------------------
//Post request to create users (Register user)
export const createUser = createAsyncThunk("api/createUser", async ({createData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
        },
        body: JSON.stringify(createData)
    }).then((res) => 
    res.json().then((data) => ({
        status: res.status,
        data: data,
    }))
    );
})


//Post request to create JOB

export const createJob = createAsyncThunk("api/createJob", async ({createJobData}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(createJobData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});



//Post request to create User By organization

export const createUserByOrg = createAsyncThunk("api/createUserByOrg", async ({createUserData}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/organization/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(createUserData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});



//Post request to create new User

export const createNewUser = createAsyncThunk("api/createNewUser", async ({createUserData}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/user/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(createUserData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});



//Post User CV

export const createCV = createAsyncThunk("api/createCV", async (formData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/cv/`, {
        method: "POST",
        headers: {
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: formData
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});



//Post Apply job (Job application)

export const createJobApply = createAsyncThunk("api/createJobApply", async ({jobData}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/application/submit/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization': `Bearer ${access_token.token}`,
        },
        body: JSON.stringify(jobData)
    });
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
});

//------------------------------------------------------------Authentication ------------------------------------------------

//Post request to Login
export const loginUser = createAsyncThunk("api/loginUser", async ({logData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
        },
        body: JSON.stringify(logData)
    }).then((res) =>
    res.json().then((data) => ({
        status: res.status,
        data: data,
    }))
    );
})

//post Activate Account
export const activateUser = createAsyncThunk("api/activateUser", async ({activateData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
        },
        body: JSON.stringify(activateData)
    }).then((res) =>
        res.status
    );
})

//post Resend Activate Account
export const resendActivateUser = createAsyncThunk("api/resendActivateUser", async ({resendData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
        },
        body: JSON.stringify(resendData)
    }).then((res) =>
        res.status
    );
})


//------------------------------------------------------------------------------------------------------------------

const apiSlice = createSlice({
    name: "api",
    initialState: {
        api: null,
        logResponse: null,
        regResponse: null,
        actResponse: null,
        jobResponse: null,
        cvResponse: null,
        applyResponse: null,
        userResponse: null,
        resendResponse: null,
        user: [],
        userList: [],
        topStaff: [],
        cv: [],
        job: [],
        jobSearch: [],
        orgUser: [],
        allUsers: [],
        jobById: [],
        applicantsById: [],
        orgUserById: [],
        loading: false,
        error: null,
    },


    extraReducers: {

         //get user info
         [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = [action.payload];
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //get all user 
        [getAllUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userList = [action.payload];
        },
        [getAllUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



        //get top staff 
        [getTopStaff.pending]: (state, action) => {
            state.loading = true;
        },
        [getTopStaff.fulfilled]: (state, action) => {
            state.loading = false;
            state.topStaff = [action.payload];
        },
        [getTopStaff.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

         //get cv list
         [getUserCV.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserCV.fulfilled]: (state, action) => {
            state.loading = false;
            state.cv = [action.payload];
        },
        [getUserCV.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //get job list
        [getJob.pending]: (state, action) => {
            state.loading = true;
        },
        [getJob.fulfilled]: (state, action) => {
            state.loading = false;
            state.job = [action.payload];
        },
        [getJob.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //get job Search
        [getJobSearch.pending]: (state, action) => {
            state.loading = true;
        },
        [getJobSearch.fulfilled]: (state, action) => {
            state.loading = false;
            state.jobSearch = [action.payload];
        },
        [getJobSearch.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //get job by ID 
        [getJobById.pending]: (state, action) => {
            state.loading = true;
        },
        [getJobById.fulfilled]: (state, action) => {
            state.loading = false;
            state.jobById = [action.payload];
        },
        [getJobById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //get applicants by Job ID 
        [getApplicantsById.pending]: (state, action) => {
            state.loading = true;
        },
        [getApplicantsById.fulfilled]: (state, action) => {
            state.loading = false;
            state.applicantsById = [action.payload];
        },
        [getApplicantsById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //get org list
        [getUserByOrg.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserByOrg.fulfilled]: (state, action) => {
            state.loading = false;
            state.orgUser = [action.payload];
        },
        [getUserByOrg.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //get user by ID 
        [getOrgUserById.pending]: (state, action) => {
            state.loading = true;
        },
        [getOrgUserById.fulfilled]: (state, action) => {
            state.loading = false;
            state.orgUserById = [action.payload];
        },
        [getOrgUserById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


         //get user list
         [getAllUsersCreated.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllUsersCreated.fulfilled]: (state, action) => {
            state.loading = false;
            state.allUsers = [action.payload];
        },
        [getAllUsersCreated.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //delete job post
        [deleteJob.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteJob.fulfilled]: (state, action) => {
            state.loading = false;
            state.job = [action.payload];
        },
        [deleteJob.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


         //delete organization user 
         [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.orgUser = [action.payload];
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


         //delete user by ID
         [deleteUserById.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUserById.fulfilled]: (state, action) => {
            state.loading = false;
            state.allUsers = [action.payload];
        },
        [deleteUserById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //post user data (Register)
        [createUser.pending]: (state, action) => {
            state.loading = true;
            state.regResponse = null;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.regResponse = action.payload;
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //post job data (Create Job)
        [createJob.pending]: (state, action) => {
            state.loading = true;
            state.jobResponse = null;
        },
        [createJob.fulfilled]: (state, action) => {
            state.loading = false;
            state.jobResponse = action.payload;
        },
        [createJob.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //post user data by org (Create User)
        [createUserByOrg.pending]: (state, action) => {
            state.loading = true;
            state.jobResponse = null;
        },
        [createUserByOrg.fulfilled]: (state, action) => {
            state.loading = false;
            state.userResponse = action.payload;
        },
        [createUserByOrg.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



         //post new User (Create User)
         [createNewUser.pending]: (state, action) => {
            state.loading = true;
            state.jobResponse = null;
        },
        [createNewUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userResponse = action.payload;
        },
        [createNewUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



        //post CV DATA
        [createCV.pending]: (state, action) => {
            state.loading = true;
            state.cvResponse = null;
        },
        [createCV.fulfilled]: (state, action) => {
            state.loading = false;
            state.cvResponse = action.payload;
        },
        [createCV.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


         //post Job Apply data
         [createJobApply.pending]: (state, action) => {
            state.loading = true;
            state.applyResponse = null;
        },
        [createJobApply.fulfilled]: (state, action) => {
            state.loading = false;
            state.applyResponse = action.payload;
        },
        [createJobApply.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



        //--------------------------------Authentication--------------------------

        //post credentials (Login)
        [loginUser.pending]: (state, action) => {
            state.loading = true;
            state.logResponse = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.logResponse = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //post Activate user
        [activateUser.pending]: (state, action) => {
            state.loading = true;
            state.actResponse = null;
        },
        [activateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.actResponse = action.payload;
        },
        [activateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //post Resend Activate user
        [resendActivateUser.pending]: (state, action) => {
            state.loading = true;
            state.resendResponse = null;
        },
        [resendActivateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.resendResponse = action.payload;
        },
        [resendActivateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //--------------------------------------------------Updating Data---------------------------------

         //PUT job data (Update Job)
         [updateJob.pending]: (state, action) => {
            state.loading = true;
            state.jobResponse = null;
        },
        [updateJob.fulfilled]: (state, action) => {
            state.loading = false;
            state.jobResponse = action.payload;
        },
        [updateJob.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


         //PUT custom user data (Update Org user)
         [updateUserByOrg.pending]: (state, action) => {
            state.loading = true;
            state.userResponse = null;
        },
        [updateUserByOrg.fulfilled]: (state, action) => {
            state.loading = false;
            state.userResponse = action.payload;
        },
        [updateUserByOrg.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


         //PUT - Update User
         [updateUser.pending]: (state, action) => {
            state.loading = true;
            state.userResponse = null;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userResponse = action.payload;
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
      
    }
})


export default apiSlice.reducer;