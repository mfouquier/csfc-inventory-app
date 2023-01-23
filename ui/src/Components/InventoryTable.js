import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormGroup, Modal } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { visuallyHidden } from '@mui/utils';
import { Stack } from '@mui/system';
import axios from 'axios';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'First Name',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'directorate',
    numeric: false,
    disablePadding: false,
    label: 'Directorate',
  },
  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Position',
  },
  {
    id: 'laptop_name',
    numeric: false,
    disablePadding: false,
    label: 'Laptop Name',
  },
  {
    id: 'laptop_sn',
    numeric: false,
    disablePadding: false,
    label: 'Laptop S/N',
  },
  {
    id: 'router_sn',
    numeric: false,
    disablePadding: false,
    label: 'Aruba S/N',
  },
  {
    id: 'boi',
    numeric: false,
    disablePadding: false,
    label: 'BOI'
  }

];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ bgcolor: 'silver' }}>

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ bgcolor: 'silver', fontSize: 20 }}
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function InventoryTable(inventory) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [formData, setFormData] = React.useState({});

  console.log("Inventory: ", inventory.data)

  const rows = inventory.data;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormData = (event) => {
    //TODO CHECK FOR VALID INPUTS
    let newData = {...formData};
    newData[event.target.id] = event.target.value;
    setFormData(newData);
  }

  console.log("I AM FORM DATA ", formData)

  const handleSubmit = (event) => {
    //TODO CHECK FOR VALID INPUTS
    let newData = {...formData};
    newData[event.target.id] = event.target.value;
    setFormData(newData);

    axios.post("http://localhost:8080/inventory", formData).then((response) => {
      console.log('Entry added successfully', response)
    });
  }


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor: 'slategray'
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: 30,
            justifyContent: 'center'
          }}>CSfC Kits</Typography>

        <Fab
          sx={{ marginLeft: 2 }}
          size="small"
          color="green"
          aria-label="add"
          onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Toolbar >
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                //onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(inventory.data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        //onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell align="left">{row.first_name}</TableCell>
                        <TableCell align="left">{row.last_name}</TableCell>
                        <TableCell align="left">{row.directorate}</TableCell>
                        <TableCell align="left">{row.position}</TableCell>
                        <TableCell align="left">{row.laptop_name}</TableCell>
                        <TableCell align="left">{row.laptop_sn}</TableCell>
                        <TableCell align="left">{row.router_sn}</TableCell>
                        <TableCell align="left">{row.boi === true ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>


      {/************************** START MODAL  ********************/}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
        >
          <Box
            component="form"
            autoComplete='on'
            spacing={2}
            sx={{
              position: "absolute",
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
              <FormGroup row={true} sx={{display: 'flex', justifyContent: 'space-evenly', borderRadius: 2}}>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                  <OutlinedInput
                    id="first_name"
                    label="first_name"
                    sx={{marginBottom:4}}
                    value={formData.first_name}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                  <OutlinedInput
                    id="last_name"
                    label="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Directorate</InputLabel>
                  <OutlinedInput
                    id="directorate"
                    label="directorate"
                    value={formData.directorate}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Position</InputLabel>
                  <OutlinedInput
                    id="position"
                    label="position"
                    sx={{marginBottom:4}}
                    value={formData.position}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Laptop Name</InputLabel>
                  <OutlinedInput
                    id="laptop_name"
                    label="laptop_name"
                    value={formData.laptop_name}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Laptop S/N</InputLabel>
                  <OutlinedInput
                    id="laptop_sn"
                    label="laptop_sn"
                    value={formData.laptop_sn}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-outlined">Aruba S/N</InputLabel>
                  <OutlinedInput
                    id="router_sn"
                    label="router_sn"
                    value={formData.router_sn}
                    onChange={(e) => handleFormData(e)}
                  />
                </FormControl>


              </FormGroup>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 4
              }}
              direction='row'
              spacing={2}>
              <Button variant='contained' color='success' margin={2} onClick={(e) => handleSubmit(e)}>Submit</Button>
              <Button variant='contained' color='error'>Cancel</Button>
            </Stack>


            {/* <Form noValidate validated={validated}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    id="last_name"
                    onChange={(e) => handleFormData(e)}
                    value={formData.last_name}
                    required
                    type="text"
                    placeholder="Last Name"
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    id="first_name"
                    onChange={(e) => handleFormData(e)}
                    value={formData.first_name}
                    required
                    type="text"
                    placeholder="First Name"
                  />
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Account Number</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      id="account_number"
                      onChange={(e) => handleFormData(e)}
                      value={formData.account_number}
                      className="accountNumber"
                      type="text"
                      placeholder="#"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Enter a valid email address.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    id="phone_number"
                    onChange={(e) => handleFormData(e)}
                    value={formData.phone_number}
                    className="phoneNumber"
                    type="text"
                    placeholder="(123) 456- 7890"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter an Phone Number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select
                    id="unit_id"
                    onChange={(e) => handleFormData(e)}
                    value={formData.unit_id}
                    aria-label="Default select example"
                  >
                    <option>Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>

                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a Unit
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="5">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    id="email"
                    onChange={(e) => handleFormData(e)}
                    value={formData.email}
                    type="email"
                    placeholder="email@address"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button variant="success" onClick={(e) => handleSubmit(e)}>
              Submit
            </Button> */}
            {/* </Modal.Footer> */}
          </Box>
        </Modal>

      </div>
    </>
  );
}
