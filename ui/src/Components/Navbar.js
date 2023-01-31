import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import axios from 'axios';
import SearchResults from "./SearchResults";
import { Autocomplete, TextField } from "@mui/material";
import { color } from "@mui/system";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [matches, setMatches] = useState({})
  let navigate = useNavigate()

  useEffect(() => {
    const getSearchData = async () => {
      const response = await axios.get(`http://localhost:8080/inventory`)
      const data = await response.data;
      setSearchData(data);
    }
    getSearchData();
  }, [])

 

    const handleSearchSubmit = (e) => {
      let searchText = e.target.value;

      let searchMatches = searchData.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.first_name.match(regex) || data.last_name.match(regex) || data.laptop_name.match(regex) ||
          data.laptop_sn.match(regex) || data.router_sn.match(regex) || data.directorate.match(regex) ||
          data.position.match(regex)
      })
      setMatches(searchMatches)
    }

    const navigateSearchResults = () => {
      console.log('NAV MATCH ', matches)
      navigate('/SearchResults', {state: matches})
    }
   



  console.log('MATCHES: ', matches)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'slategray' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 30 }}
          >
            <Link to='/inventory' style={{ textDecoration: 'none', color: 'white' }}>
              CSfC Inventory Tracker
            </Link>
          </Typography>


          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => handleSearchSubmit(e)}
            />
          </Search>
         
            <Button variant="contained" style={{color: 'white'}} color='warning' onClick={() => {navigateSearchResults()}}> Submit </Button>
         
          

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}