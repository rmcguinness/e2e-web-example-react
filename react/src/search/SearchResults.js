import {useRecoilState} from "recoil";
import * as state from "../State";
import Box from "@mui/material/Box";
import {Link, Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export function SearchResults() {
    const [searchState] = useRecoilState(state.searchState);

    // Iterate over the searchState.results[], which is an array of objects.
    // for each item, create a card  that can be displayed.
    let out = searchState.results.map(function (item) {
        return (
            <Card key={item.id} sx={{margin: 2}}>
                <CardContent>
                    <Typography variant="h6" component={'h6'}>{item.title}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        <Link href={item.link} target="_blank">{item.link}</Link>
                    </Typography>
                    <Typography variant="body1" gutterBottom>{item.body}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        window.open(item.link, '_blank')
                    }}>Learn More</Button>
                </CardActions>
            </Card>
        )
    })

    // Handle the state change of the searchStateObject
    if (searchState.error) {
        return <div>Error: {searchState.error.message}</div>;
    } else if (!searchState.isReady && searchState.results.length === 0) {
        return <span></span>;
    } else {
        // Return a list of cards within a box element.
        return (
            <Box sx={{width: '100%'}}>
                <Typography variant="h5" component={'h5'}>Search Results</Typography>
                {out}
            </Box>
        );
    }
}