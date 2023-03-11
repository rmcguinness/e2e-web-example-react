import {useRecoilState} from "recoil";
import * as state from "../State";
import Box from "@mui/material/Box";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

export function SearchResults() {
    const [searchState] = useRecoilState(state.searchState);

    let out = searchState.results.map(function(item) {
        return (
            <Card key={item.id} sx={{ margin: 2}}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: 8 }}>{item.link}</Typography>
                    <Typography sx={{ fontSize: 10 }}>{item.body}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        window.open(item.link, '_blank')
                    }} >Learn More</Button>
                </CardActions>
            </Card>
        )
    })

    if (searchState.error) {
        return <div>Error: {searchState.error.message}</div>;
    } else if (!searchState.isReady && searchState.results.length === 0) {
        return <span></span>;
    } else {
        return (
            <Box sx={{ width: '100%'}}>
                <h5>Results</h5>
                <div>{out}</div>
            </Box>
        );
    }
}