import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


//localstorage get access token
const local_access_token = localStorage.getItem('access_token');
const access_token = JSON.parse(local_access_token);
//----------------------------------------------------------------------


//Get request to get user info
export const getUser = createAsyncThunk("api/getUser", async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${access_token.token}`,
        },
    }).then((res) => 
    res.json()
    );
})



//Post request to create users (Register user)
export const createUser = createAsyncThunk("api/createUser", async ({createData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(createData)
    }).then((res) => 
    res.json().then((data) => ({
        status: res.status,
        data: data,
    }))
    );
})


//Post request to Login
export const loginUser = createAsyncThunk("api/loginUser", async ({logData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
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
            "Access-Control-Allow-Origin": "*",
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
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(resendData)
    }).then((res) =>
        res.status
    );
})


const apiSlice = createSlice({
    name: "api",
    initialState: {
        api: null,
        logResponse: null,
        regResponse: null,
        actResponse: null,
        resendResponse: null,
        user: [],
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

      
    }
})


export default apiSlice.reducer;