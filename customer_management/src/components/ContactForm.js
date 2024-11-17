import { Container, Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, TextField, Typography, IconButton } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
//import { phone } from 'phone';
import styled from "styled-components";

import { Business, Delete } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AddContact() {
    const [noError, setNoError] = useState(false)
    const [addContData, setAddContData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        jobTitle: '',
        company: '',
        contactNo: '',
       
    })
  
    

    const handleAddFormData = (e) => {
        console.log(e.target.name)
        setAddContData({ ...addContData, [e.target.name]: e.target.value })
    }
    const handleResetCompForm = () => {
        console.log(addContData)
        setAddContData({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            jobTitle: '',
            contactNo: '',
          
        })
        setNoError(false)
        
    }

    const handleSubmitCompForm = (e) => {
        e.preventDefault();
        console.log(addContData)
        if (!noError) {
            toast.promise(axios.post('http://localhost:8080/addcontactdata', addContData, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }),
                {
                    pending: {
                        render() {
                            return ('Adding Company')
                        }
                    },
                    success: {
                        render(res) {
                            handleResetCompForm()
                            toast('Contact added successfully!');
                        }
                    },
                    error: {
                        render(err) {
                            toast('Something went wrong');
                        }
                    }
                }

            )

        }


    }

    return (
        <>
        <Box sx={{height: { xs: 'auto', lg: '90vh' }, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', p: 2,}}>
            <Box component="main" sx={{flexGrow: 1, p: 3, width: { xs: '95%', md: '75%', lg: '50%' }, backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                <Typography variant="h5" component="h5" textAlign="center" mb={3}> View Contact </Typography>
                <Box component="form" onSubmit={handleSubmitCompForm} sx={{display: 'flex', flexDirection: 'column', gap: 2,}}>
                    <Grid container spacing={2}>
                        {/* First Name */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel size="small" required>
                                    First Name
                                </InputLabel>
                                <OutlinedInput
                                    size="small"
                                    name="firstName"
                                    value={addContData.firstName}
                                    required
                                    label="First Name"
                                    placeholder="Enter first name"
                                    onInput={handleAddFormData}
                                />
                            </FormControl>
                        </Grid>
    
                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel size="small" required>
                                    Last Name
                                </InputLabel>
                                <OutlinedInput
                                    size="small"
                                    name="lastName"
                                    value={addContData.lastName}
                                    required
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    onInput={handleAddFormData}
                                />
                            </FormControl>
                        </Grid>
    
                        {/* email */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel size="small" required>
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    size="small"
                                    name="email"
                                    value={addContData.email}
                                    required
                                    type="email"
                                    label="email"
                                    placeholder="Enter your email"
                                    onInput={handleAddFormData}
                                />
                            </FormControl>
                        </Grid>
    
                        {/* Contact Number */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    size="small"
                                    error={noError}
                                    name="contactNo"
                                    value={addContData.contactNo}
                                    helperText="Enter contact no. with country code, e.g., +91..."
                                    required
                                    label="Contact No"
                                    placeholder="Enter contact no."
                                    onChange={handleAddFormData}
                                />
                            </FormControl>
                        </Grid>
    
                        {/* Company Name */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel size="small" required>
                                    Company Name
                                </InputLabel>
                                <OutlinedInput
                                    size="small"
                                    name="company"
                                    value={addContData.company}
                                    required
                                    multiline
                                    label="Company Name"
                                    placeholder="Enter company name"
                                    onInput={handleAddFormData}
                                />
                            </FormControl>
                        </Grid>
    
                        {/* Job Title */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel size="small">
                                    Job Title
                                </InputLabel>
                                <OutlinedInput
                                    size="small"
                                    name="jobTitle"
                                    value={addContData.jobTitle}
                                    label="Job Title"
                                    placeholder="Enter job title"
                                    onInput={handleAddFormData}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
    
                    {/* Action Buttons */}
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        mt={2}
                    >
                        <Button size="small" variant="outlined" color="success" type="submit">
                            Add
                        </Button>
                        <Button size="small" variant="outlined" color="error" onClick={handleResetCompForm}>
                            Clear
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    </>
    
    )
}
export default AddContact;