import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, Container, Stack, FormControl, InputLabel, OutlinedInput, TextField, DialogActions, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const ViewContData = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [data, setData] = React.useState([]);


    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [filterContact, setFilterContact] = useState(data)
    const [viewContData, setViewContData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: '',
        contactNo: ''
    })
    const [editContData, setEditContData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: '',
        contactNo: '',
    })
    const [loader, setLoader] = useState(true)
    const [noError, setNoError] = useState(false)
    const [prevData, setPrevData] = useState(editContData)
    const [updates, setUpdates] = useState(0)


    useEffect(() => {
        axios.get('http://localhost:8080/viewcontactdata')
            .then(res => {
                console.log(res.data)
                setContacts(res.data)
                const fetchedData = res.data.map((contact) => ({
                    id: contact.id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                    contactNo: contact.contactNo,
                    company: contact.company,
                    jobTitle: contact.jobTitle,
                }));
                setContacts(fetchedData);
                setData(res.data)
                setFilterContact(res.data)
                setLoader(false)
            })
            // kya kare

            .catch(err => {
                console.log(err)
                setLoader(false)
            })
    }, [])

    const editView = useMemo(() => {

        const handleEditContactData = (e) => {
            setEditContData({ ...editContData, [e.target.name]: e.target.value })
        };
        const handleEditButton = (row) => {
            //console.log(row)
           setEditContData({ ...row })
            setPrevData({ ...row })
            setEditDialogOpen(true)
        };

        const handleEditDialogClose = () => {
            setEditContData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                jobTitle: '',
                contactNo: '',
            })
            setEditDialogOpen(false)
        }

        const handleEditSubmit = (e) => {
            e.preventDefault()
            console.log('Edit contact:');

            const updatedContact = {
               
                firstName: editContData.firstName,
                lastName: editContData.lastName,
                email: editContData.email,
                contactNo: editContData.contactNo,
                company: editContData.company,
                jobTitle: editContData.jobTitle,
            };

            axios.put(`http://localhost:8080/contacts/${editContData.id}`, updatedContact)
                .then(res => {
                    console.log('Contact updated successfully:', res.data);
                    // const updatedContacts = contacts.map(c =>
                    //     c.id === contact.id ? res.data : c
                    // );
                    //setContacts(updatedContact);
                    handleEditDialogClose(); // Close the dialog after submission
                })
                .catch(err => {
                    console.error('Error updating contact:', err);
                });
        };

        return (
            <>
                <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth={'120ch'}>
                    <DialogTitle>Edit Contact</DialogTitle>
                    <DialogContent dividers={true}>
                        <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '30ch', md: '45ch', lg: '100ch' }, height: { xs: '100%', md: '100%', lg: '52ch', }, p: 1 }}>
                            <form id='conteditsubmit' onSubmit={handleEditSubmit}>
                                <Typography variant="p" component={'h5'} m={1} textAlign={'center'}>Edit Contact Details </Typography>
                                <Container sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'center' }}>

                                    <Stack spacing={2}>
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}   >
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel size="small" required >First Name</InputLabel>
                                                <OutlinedInput value={editContData.firstName} onChange={handleEditContactData} size="small" name="firstName" required={true} type={"text"} label="First Name" placeholder="enter first name" />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}   >

                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel size="small" required >Last Name</InputLabel>
                                                <OutlinedInput value={editContData.lastName} onChange={handleEditContactData} size="small" name="lastName" required={true} type={"text"} label="Last Name" placeholder="enter last name" />
                                            </FormControl>
                                        </Stack>

                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}   >
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel size="small" required>
                                                    Email
                                                </InputLabel>
                                                <OutlinedInput
                                                    size="small"
                                                    name="email"
                                                    value={editContData.email}
                                                    required
                                                    type="email"
                                                    label="email"
                                                    placeholder="Enter your email"
                                                    onInput={handleEditContactData}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}   >

                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel size="small" required>
                                                    Company Name
                                                </InputLabel>
                                                <OutlinedInput
                                                    size="small"
                                                    name="company"
                                                    value={editContData.company}
                                                    required
                                                    multiline
                                                    label="Company Name"
                                                    placeholder="Enter company name"
                                                    onInput={handleEditContactData}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}   >
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel size="small">
                                                    Job Title
                                                </InputLabel>
                                                <OutlinedInput
                                                    size="small"
                                                    name="jobTitle"
                                                    value={editContData.jobTitle}
                                                    label="Job Title"
                                                    placeholder="Enter job title"
                                                    onInput={handleEditContactData}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}   >

                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    size="small"
                                                    error={noError}
                                                    name="contactNo"
                                                    value={editContData.contactNo}
                                                    helperText="Enter contact no. with country code, e.g., +91..."
                                                    required
                                                    label="Contact No"
                                                    placeholder="Enter contact no."
                                                    onChange={handleEditContactData}
                                                />
                                            </FormControl>
                                        </Stack>
                                        <DialogActions>
                                            <Button color='error' onClick={handleEditDialogClose}>Cancel</Button>
                                            <Button color='success' type='submit' form='conteditsubmit' >Update</Button>
                                        </DialogActions>
                                    </Stack>
                                </Container>

                            </form>
                        </Paper>
                    </DialogContent>
                </Dialog>

            </>
        )

    }, [editContData, editDialogOpen, contacts, noError])
//  fields edit nehi ho paraha

    const handleEdit = (contact) => {
        setEditContData({ ...editContData, ...contact })
        setEditDialogOpen(true)

    }
    const handleDelete = (id) => {
        console.log('Delete contact with ID:', id);
        axios.delete(`http://localhost:8080/contacts/${id}`)
        .then(res =>{
            console.log(res.data)
        })
        // Add delete functionality here
    };


    const columns = [
        { field: "id", headerName: "SL No", width: 90 }, // SL No (assuming ID is unique and sequential)
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "contactNo", headerName: "Phone Number", width: 150 },
        { field: "company", headerName: "Company", width: 150 },
        { field: "jobTitle", headerName: "Job Title", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box sx={{ height: { xs: 'auto', lg: '90vh' }, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', p: 2, }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs: '95%', md: '75%', lg: '50%' }, backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                <Typography variant="h5" component="h5" textAlign="center" mb={3}> View Contact </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>

                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={contacts}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            disableSelectionOnClick
                            getRowId={(row) => row.email}
                        />
                    </div>

                </Box>
            </Box>
            {editView}
        </Box>
    );
};

export default ViewContData;
