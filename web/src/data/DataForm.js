import {
    useRecoilState
} from 'recoil';

import {dataFormState} from "../State";
import {Button, TextField, Box} from "@mui/material";

export function DataForm() {
    const [dataForm, setDataForm] = useRecoilState(dataFormState);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            let res = await fetch("http://localhost:8088/api/db", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForm)
            });
            let resJson = await res.json();

            if (res.status === 200) {
                setDataForm((form) => {
                    return {id: null, title: null, link: null, body: null}
                });
            } else {
                alert("An error occured")
            }

        } catch (err) {
            console.log(err)
        }

        alert("Submitting Form")
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
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <input type="hidden" value={dataForm.id} />
            <TextField fullWidth onChange={changeTitle} label="Title" id="title" variant="standard" value={dataForm.title} />
            <TextField fullWidth onChange={changeLink} label="Link" id="link" variant="standard" value={dataForm.link} />
            <TextField fullWidth onChange={changeBody} label="Body" id="body" variant="standard" value={dataForm.body} multiline="true" minRows="2" />
            <Button variant="outlined" onClick={onSubmit}>Submit</Button>
        </Box>
    )
}