import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { FormGroup, Modal } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Stack } from '@mui/system';
import FormControl from "@mui/material/FormControl";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import axios from "axios";
import BOI from '../static/2062_fillable.pdf'
import SearchResults from "./SearchResults";
import UserContext from "./UserContext";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar(props) {
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [loginShow, setLoginShow] = useState(false);
  const [matches, setMatches] = useState({});
  const [adminData, setAdminData] = useState([]);
  let navigate = useNavigate();

  const { isAdmin } = useContext(UserContext);
  const { handleIsAdmin } = useContext(UserContext);

  useEffect(() => {
    const getSearchData = async () => {
      const response = await axios.get(`http://localhost:8080/inventory`);
      const data = await response.data;
      setSearchData(data);
    };

    const getAdminData = async () => {
      const response = await axios.get(`http://localhost:8080/admins`);
      const data = await response.data;
      setAdminData(data);
    }
    getSearchData();
    getAdminData();
  }, []);

  // HANDLE OPENING LOGIN MODAL
  const handleLoginShow = () => {
    setLoginShow(!loginShow);
  };

  const handleLoginSubmit = (e) => {
    let username = e.target.form[0].value;
    let password = e.target.form[2].value;

    for(let el of adminData) {
      
      if(username === el.username && password === el.password){
        handleIsAdmin();  
      } else {
        console.log('unsuccessful')
      }
    }
    setLoginShow(false)
  }

  const handleSearchSubmit = (e) => {
    let searchText = e.target.value;

    let searchMatches = searchData.filter((data) => {
      const regex = new RegExp(`^${searchText}`, "gi");

      try {
        return (
          data.first_name.match(regex) ||
          data.last_name.match(regex) ||
          data.laptop_name.match(regex) ||
          data.laptop_sn.match(regex) ||
          data.router_sn.match(regex) ||
          data.directorate.match(regex) ||
          data.position.match(regex) ||
          data.aruba_name.match(regex) ||
          data.cert_exp.match(regex)
        );
      } catch (error) {
        console.log(error);
      }
    });
    setMatches(searchMatches);
  };

  const navigateSearchResults = () => {
    console.log("NAV MATCH ", matches);
    navigate("/SearchResults", { state: matches });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "slategray" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, fontSize: 30 }}
            >
              <Link
                to="/"
                params={{isAdmin: isAdmin}}
                style={{ textDecoration: "none", color: "white" }}
              >
                CSfC Inventory Tracker
              </Link>
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => handleSearchSubmit(e)}
              />
            </Search>
            <Button
              variant="contained"
              style={{ color: "white" }}
              color="warning"
              onClick={() => {
                navigateSearchResults();
              }}
            >
              {" "}
              Submit{" "}
            </Button>

            <Typography 
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, fontSize: 30, marginLeft: '5em' }}>
                <Link to={BOI} target="_blank" style={{ textDecoration: "none", color: "white" }}>Approved BOI</Link>

            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              onClick={handleLoginShow}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* ******************* LOGIN MODAL ************************** */}
      <div>
        <Modal
          open={loginShow}
          onClose={handleLoginShow}
          aria-labelledby="modal-modal-title"
        >
          <Box
            component="form"
            autoComplete="on"
            spacing={2}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <FormGroup
              row={true}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                borderRadius: 2,
              }}
            >
              <FormControl>
                <InputLabel htmlFor="component-outlined">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  label="username"
                  sx={{ marginBottom: 4 }}
                 
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="password"
                  type="password"
                
                />
              </FormControl>
            </FormGroup>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 4,
              }}
              direction="row"
              spacing={2}
            >
              <Button
                variant="contained"
                color="success"
                margin={2}
                onClick={(e) => handleLoginSubmit(e)}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleLoginShow()}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}
