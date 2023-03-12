import {useRecoilState} from 'recoil';

import React from 'react';

import {dataFormState} from "../State";
import {Box, Button, Snackbar, Stack, TextField} from "@mui/material";
import Grid from '@mui/material/Grid';
// Icons
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export function DataForm() {
    // These are the local form state
    const [open, setOpen] = React.useState(false);
    const [titleError, setTitleError] = React.useState(false);
    const [linkError, setLinkError] = React.useState(false);
    const [bodyError, setBodyError] = React.useState(false);

    // This is an application state, so if the user leaves the component
    // and comes back later, it's still present.
    const [dataForm, setDataForm] = useRecoilState(dataFormState);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    // Handles setting the state for the title object
    const changeTitle = ({target: {value}}) => {
        setDataForm((form) => {
            return {id: form.id, title: value, link: form.link, body: form.body}
        });
    }

    // Validates the title is not null or empty
    // this is verbose as the observation of state change is called after
    // the render cycle, otherwise it could have been a single line.
    const validateTitle = () => {
        let invalid = dataForm.title === null || dataForm.title.trim() === ''
        setTitleError(invalid)
        return !invalid
    }

    // Sets the link state as the input changes
    const changeLink = ({target: {value}}) => {
        setDataForm((form) => {
            return {id: form.id, title: form.title, link: value, body: form.body}
        });
    }

    // Validates the link
    const validateLink = () => {
        let invalid = dataForm.link === null || dataForm.link.trim() === ''
            || (!dataForm.link.startsWith("http://") && !dataForm.link.startsWith("https://"))
        setLinkError(invalid);
        return !invalid;
    }

    // Changes the state of the body
    const changeBody = ({target: {value}}) => {
        setDataForm((form) => {
            return {id: form.id, title: form.title, link: form.link, body: value}
        });
    }

    // Validates the body is not null or empty
    const validateBody = () => {
        let invalid = dataForm.body === null || dataForm.body.trim() === '';
        setBodyError(invalid);
        return !invalid;
    }

    const onReset = (event) => {
        setDataForm((form) => {
            return {id: '', title: '', link: '', body: ''}
        });
        setTitleError(false)
        setLinkError(false)
        setBodyError(false)
    }

    // Client side validation
    const validateDataForm = async () => {
        return  validateTitle() & validateLink() & validateBody();
    }

    const onSubmit = async (event) => {
        //event.preventDefault();

        let formIsValid = await validateDataForm();

        console.log(formIsValid);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataForm)
        }

        if (formIsValid) {
            try {
                const response = await fetch('http://localhost:8088/api/db', requestOptions);
                const data = await response.json();
                console.log(data)
                onReset(event);
                setOpen(true);
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Box
            component="form"
            sx={{
                width: 'auto',
            }}
            noValidate
            autoComplete="off">
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            error={titleError}
                            onChange={changeTitle}
                            onBlur={validateTitle}
                            label="Title"
                            id="title"
                            variant="standard"
                            value={dataForm.title}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   error={linkError}
                                   onChange={changeLink}
                                   onBlur={validateLink}
                                   helperText={'Text must begin with http:// or https://'}
                                   label="Link"
                                   id="link"
                                   variant="standard"
                                   value={dataForm.link} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   error={bodyError}
                                   onChange={changeBody}
                                   onBlur={validateBody}
                                   label="Body"
                                   id="body"
                                   variant="standard"
                                   value={dataForm.body}
                                   multiline={true}
                                   minRows="2"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={0}>
                            <Stack spacing={2} direction="row">
                                <Button variant="outlined" onClick={onReset}
                                        startIcon={<RotateLeftIcon/>}>Reset</Button>
                                <Button variant="outlined" onClick={onSubmit} startIcon={<SaveIcon/>}>Submit</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Saved"
                    action={action}
                />
            </div>
        </Box>
    )
}