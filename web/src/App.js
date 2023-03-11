
import './App.css';
import {SearchForm} from './search/SearchForm';
import {SearchResults} from "./search/SearchResults";

import React from 'react';

import {
    RecoilRoot,
} from 'recoil';

import {DataForm} from "./data/DataForm";
import {Tabs, Tab} from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {AppBar, Toolbar, IconButton, Button} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
      <div className="App">
      <RecoilRoot>
          <div>
              <Box sx={{ width: '100%' }}>
                  <AppBar position="static">
                      <Toolbar>
                          <IconButton
                              size="large"
                              edge="start"
                              color="inherit"
                              aria-label="menu"
                              sx={{ mr: 2 }}
                          >
                              <MenuIcon />
                          </IconButton>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                              Example Application
                          </Typography>
                          <SearchForm />
                      </Toolbar>
                  </AppBar>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Search" {...a11yProps(0)} />
                          <Tab label="Form" {...a11yProps(1)} />
                      </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                      <SearchResults />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                      <DataForm/>
                  </TabPanel>
              </Box>
          </div>
      </RecoilRoot>
      </div>
  );
}

export default App;
