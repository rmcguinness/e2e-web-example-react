import {
    useRecoilState
} from 'recoil';

import * as state from "../State";
import {Button, FormControl, IconButton, InputAdornment, InputBase, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";

import SearchIcon from '@mui/icons-material/Search';

export function SearchForm() {
    const [searchState, setSearchState] = useRecoilState(state.searchState);

    const onSubmit = (event)  => {
        event.preventDefault();

        fetch("http://localhost:8088/search?query=" + searchState.query)
        .then(res => res.json())
        .then(
            (result) => {
                setSearchState((s) => {
                    return {error: null, query: s.query, isReady: true, results: JSON.parse(result)};
                })
            },
            (error) => {
                setSearchState((s) => {
                    return {error: error, query: s.query, isReady: false, results: []};
                })
            }
        )
    }

    const onChange = ({target: {value}}) => {
        setSearchState((s) => {
            return {error: null, query: value, isReady: false, results: []};
        })
    }


    return (
        <Paper component="form">
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                onChange={onChange}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSubmit}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}