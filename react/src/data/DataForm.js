import {
    useRecoilState
} from 'recoil';

import React from 'react';

import {dataFormState} from "../State";
import {Button, TextField, Box, Snackbar, Stack} from "@mui/material";
import Grid from '@mui/material/Grid'; 
// Icons
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export function DataForm() {
    const [open, setOpen] = React.useState(false);

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
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const onReset = (event) => {
        setDataForm((form) => {
            return {id: '', title: '', link: '', body: ''}
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        }

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

    const changeTitle = ({target: {value}}) => {
        setDataForm((form) => {
            return {id: form.id, title: value, link: form.link, body: form.body}
        });
    }

    const changeLink = ({target: {value}}) => {
        setDataForm((form) => {
            return {id: form.id, title: form.title, link: value, body: form.body}
        });
    }

    const changeBody = ({target: {value}}) => {
        setDataForm((form) => {
            return {id: form.id, title: form.title, link: form.link, body: value}
        });
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
                    <TextField fullWidth onChange={changeTitle} label="Title" id="title" variant="standard" value={dataForm.title} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth onChange={changeLink} label="Link" id="link" variant="standard" value={dataForm.link} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth onChange={changeBody} label="Body" id="body" variant="standard" value={dataForm.body} multiline={true} minRows="2" />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={onReset} startIcon={<RotateLeftIcon />}>Reset</Button>
                            <Button variant="outlined" onClick={onSubmit} startIcon={<SaveIcon />}>Submit</Button>
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