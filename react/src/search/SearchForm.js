import {useRecoilState} from 'recoil';

import * as state from "../State";
import {IconButton, InputBase, Paper} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import {tabState} from "../State";

// This function creates the search form.
export function SearchForm() {
    const [searchState, setSearchState] = useRecoilState(state.searchState);
    const [,setTabValue] = useRecoilState(tabState);

    // Handle submitting the form.
    const onSubmit = (event) => {
        event.preventDefault();

        // Call the web search with a search query
        fetch("http://localhost:8088/search?query=" + searchState.query)
            .then(res => res.json()) //Maps the response into JSON
            .then(
                (result) => {
                    // Add the results to the search state object, keeping the query.
                    setSearchState((s) => {
                        return {error: null, query: s.query, isReady: true, results: JSON.parse(result)};
                    })
                    // Change the tab back to the first tab to display the results.
                    setTabValue(t => {
                        return 0;
                    })
                },
                (error) => {
                    // If an error occurs, add the error to the state so it can be displayed.
                    setSearchState((s) => {
                        return {error: error, query: s.query, isReady: false, results: []};
                    })
                }
            )
    }

    // Store the changes to the query state, clearing the state on change,
    // except for the updated text
    const onChange = ({target: {value}}) => {
        setSearchState((s) => {
            return {error: null, query: value, isReady: false, results: []};
        })
    }

    // Handle the key on the search input, if it's enter, run the search.
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    }

    // Creates the search input form.
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