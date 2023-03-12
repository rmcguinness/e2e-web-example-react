import {useRecoilState} from 'recoil';

import * as state from "../State";
import {IconButton, InputBase, Paper} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import {tabState} from "../State";

export function SearchForm() {
    const [searchState, setSearchState] = useRecoilState(state.searchState);
    const [tabValue, setTabValue] = useRecoilState(tabState);

    const onSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8088/search?query=" + searchState.query)
            .then(res => res.json())
            .then(
                (result) => {
                    setSearchState((s) => {
                        return {error: null, query: s.query, isReady: true, results: JSON.parse(result)};
                    })
                    setTabValue(t => {
                        return 0;
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

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    }

    return (
        <Paper component="form">
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search"
                onChange={onChange}
                onKeyDown={onKeyPress}
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={onSubmit}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}