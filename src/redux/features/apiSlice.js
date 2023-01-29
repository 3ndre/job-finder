import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


//Post request to create users (Register user)
export const createUser = createAsyncThunk("api/createUser", async ({userData}) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                status: userData.status,
                phone: userData.phone,
                address: userData.address,
                is_organization: userData.is_organization,
                is_staff: userData.is_staff,
                is_active: userData.is_active,
                "organization": {
                    name: userData.organization.name,
                    number_of_employees: userData.organization.number_of_employees,
                    average_salary: userData.organization.average_salary,
                    logo: userData.organization.logo,
                    website: userData.organization.website
                },
                "detail": {
                    first_name:  userData.detail.first_name,
                    last_name: userData.detail.last_name,
                    gender: userData.detail.gender,
                    avatar: userData.detail.avatar,
                    birth_date: userData.detail.birth_date,
                    experience: userData.detail.experience,
                    expected_salary_low: userData.detail.expected_salary_low,
                    expected_salary_high: userData.detail.expected_salary_high,
                    cv: userData.detail.cv,
                    is_available: userData.detail.is_available
                  }
        })
    }).then((res) => 
    res.json()
    );
})


const apiSlice = createSlice({
    name: "api",
    initialState: {
        api: [],
        loading: false,
        error: null,
    },


    extraReducers: {

        //post user data
        [createUser.pending]: (state, action) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.api = action.payload;
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

      
    }
})


export default apiSlice.reducer;