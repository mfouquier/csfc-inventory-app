import React, { useEffect, useState } from 'react';
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
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormGroup, MenuItem, Modal, Radio, RadioGroup, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { visuallyHidden } from '@mui/utils';
import { Stack } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AppForm from './Directorates';
import Pdf from '../static/2062_fillable.pdf';


//*********TABLE AND SORTING FUNCTIONS**************
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
    id: 'last_name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  // {
  //   id: 'first_name',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'First Name',
  // },
  {
    id: 'laptop_name',
    numeric: false,
    disablePadding: false,
    label: 'Laptop Name',
  },
  // {
  //   id: 'laptop_sn',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Laptop S/N',
  // },
  {
    id: 'router_sn',
    numeric: false,
    disablePadding: false,
    label: 'Aruba S/N',
  },
  {
    id: 'aruba_name',
    numeric: false,
    disablePadding: false,
    label: 'Aruba Name',
  },
  {
    id: 'cert_exp',
    numeric: false,
    disablePadding: false,
    label: 'Cert Exp',
  },
  {
    id: 'hand_receipt',
    numeric: false,
    disablePadding: false,
    label: 'Hand Receipt'
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
        <TableCell sx={{ bgcolor: 'silver' }}>

        </TableCell>
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

//*********** INVENTORY TABLE DATA ****************/
export default function InventoryTable(inventory) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [formData, setFormData] = React.useState({});
  const [deleteItem, setDeleteItem] = React.useState();
  const [editShow, setEditShow] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [selectedEdit, setSelectedEdit] = React.useState({});
  const [editedData, setEditedData] = React.useState({});
  const [file, setFile] = useState("");//Uploaded File
  const [filename, setFilename] = useState('Choose File');//File name

  //GET DATA FROM DB
  useEffect(() => {
    const getEditedData = async () => {
      const response = await axios.get('http://localhost:8080/inventory');
      const data = await response.data;
      setEditedData(data);
    }
    getEditedData();
  }, [inventory])

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

  // HANDLE OPENING AND CLOSING OF MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFormData({})
  };

  // HANDLE CLOSING OF DELETE ALERT
  const handleDeleteConfirmClose = () => {
    setDeleteItem();
    setConfirmDelete(false);
    inventory.change()
  }
  // HANDLE DELETING A ROW OBJECT
  const handleClickDelete = (id) => {
    setDeleteItem(id);
    setConfirmDelete(true);
    inventory.change()
  }
  // DELETE FROM DB
  const handleDelete = (deleteItem) => {
    axios.delete(`http://localhost:8080/inventory/${deleteItem}`);
    setConfirmDelete(false);
    inventory.change()
  }
  // HANDLE CLOSING EDIT MODAL
  const handleEditClose = () => {
    setEditShow(false);
    inventory.change()
  }
  // HANDLE OPENING EDIT MODAL AND POPULATE FORM WITH OBJECT DATA
  const handleEditShow = (obj) => {
    setSelectedEdit(obj)
    setEditShow(true);

  }
  // SUBMIT EDITED OBJECT TO DATABASE
  const handleEditSubmit = async () => {
    const newUserData = new FormData();
    newUserData.append('first_name', selectedEdit.first_name);
    newUserData.append('last_name', selectedEdit.last_name);
    newUserData.append('directorate', selectedEdit.directorate);
    newUserData.append('position', selectedEdit.position);
    newUserData.append('laptop_name', selectedEdit.laptop_name);
    newUserData.append('laptop_sn', selectedEdit.laptop_sn);
    newUserData.append('router_sn', selectedEdit.router_sn);
    newUserData.append('aruba_name', selectedEdit.aruba_name);
    newUserData.append('cert_exp', selectedEdit.cert_exp);
    newUserData.append('boi', selectedEdit.boi);
    newUserData.append('hand_receipt', file)

    await axios.patch(`http://localhost:8080/inventory/${selectedEdit.id}`, newUserData);
    inventory.change();
    setEditShow(false);

  }
 
  // MAKE CHANGES TO EDITED OBJECT AND SAVE TO OBJECT
  const handleEditFormData = (event, value) => {
    const newData = { ...selectedEdit };
    newData[event.target.id] = event.target.value
    newData[event.target.name] = event.target.value
    setSelectedEdit(newData)
  }
  // SAVE FORM DATA TO THE FORMDATA USESTATE OBJECT
  const handleFormData = (event) => {
    if (event.target.id === "") {
      event.target.id = 'boi'
    }
    if (event.target.id === undefined){
      event.target.id = 'directorate'
    }
    let newData = { ...formData };
    newData[event.target.id] = event.target.value;
    setFormData(newData);
  }
  // UPLOAD FILE ONCHANGE FUNCTION
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  // SUBMIT FORM DATA TO DATABASE
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    let newData = { ...formData };
    newData[event.target.id] = event.target.value;
    newData[event.target.name] = event.target.value
    setFormData(newData);
    
    const newUserData = new FormData();
    newUserData.append('first_name', formData.first_name);
    newUserData.append('last_name', formData.last_name);
    newUserData.append('directorate', formData.directorate);
    newUserData.append('position', formData.position);
    newUserData.append('laptop_name', formData.laptop_name);
    newUserData.append('laptop_sn', formData.laptop_sn);
    newUserData.append('router_sn', formData.router_sn);
    newUserData.append('aruba_name', formData.aruba_name);
    newUserData.append('cert_exp', formData.cert_exp);
    newUserData.append('boi', formData.boi);
    newUserData.append('hand_receipt', file)
   

    axios.post("http://localhost:8080/inventory", newUserData).then((response) => {
    });
    setOpen(false);
    setFormData({})
    inventory.change()
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Toolbar
        sx={{
          width: '100%',
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
                        <TableCell ><EditIcon onClick={() => handleEditShow(row)} /></TableCell>
                        <TableCell align="left">{row.directorate}</TableCell>
                        <TableCell align="left">{row.position}</TableCell>
                        <TableCell align="left">{row.last_name + ', ' + row.first_name}</TableCell>
                        <TableCell align="left">{row.laptop_name}</TableCell>
                        {/* <TableCell align="left">{row.laptop_sn}</TableCell> */}
                        <TableCell align="left">{row.router_sn}</TableCell>
                        <TableCell align='left'>{row.aruba_name}</TableCell>
                        <TableCell align='left'>{row.cert_exp}</TableCell>
                        <TableCell align='left'>{row.hand_receipt === null ? "" : <a target='_blank' href={`http://localhost:8080/uploads/${row.hand_receipt}`}>2062</a>}</TableCell>
                        <TableCell align="left">{row.boi === true ? 'Yes' : 'No'}</TableCell>
                        <TableCell><DeleteIcon onClick={() => handleClickDelete(row.id)} /></TableCell>
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


      {/************************** START ADD KIT MODAL  ********************/}
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

            <FormGroup row={true} sx={{ display: 'flex', justifyContent: 'space-evenly', borderRadius: 2}}>
              <FormControl required>
                <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                <OutlinedInput
                  id="first_name"
                  label="first_name"
                  type='text'
                  sx={{ marginBottom: 4 }}
                  value={formData.first_name}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                <OutlinedInput
                  id="last_name"
                  label="last_name"
                  type='text'
                  value={formData.last_name}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Directorate</InputLabel>
                <Select label='directorate' name='directorate' type='text' defaultValue={formData.directorate} onChange={(e) => handleFormData(e)}>
                  <MenuItem value={'J1'} id='directorate' >J1</MenuItem>
                  <MenuItem value={'J2'} id='directorate'>J2</MenuItem>
                  <MenuItem value={'J3'} id='directorate'>J3</MenuItem>
                  <MenuItem value={'J4'} id='directorate'>J4</MenuItem>
                  <MenuItem value={'J5'} id='directorate'>J5</MenuItem>
                  <MenuItem value={'J6'} id='directorate'>J6</MenuItem>
                  <MenuItem value={'J8'} id='directorate'>J8</MenuItem>
                  <MenuItem value={'CG'} id='directorate'>CG</MenuItem>
                  <MenuItem value={'CMDT'} id='directorate'>CMDT</MenuItem>
                  <MenuItem value={'POTFF'} id='directorate'>POTFF</MenuItem>
                  <MenuItem value={'JOG-C'} id='directorate'>JOG-C</MenuItem>
                </Select>
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Position</InputLabel>
                <OutlinedInput
                  id="position"
                  label="position"
                  type='text'
                  sx={{ marginBottom: 4 }}
                  value={formData.position}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>
 
              <FormControl required>
                <InputLabel htmlFor="component-outlined">Laptop Name</InputLabel>
                <OutlinedInput
                  id="laptop_name"
                  label="laptop_name"
                  type='text'
                  value={formData.laptop_name}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Laptop S/N</InputLabel>
                <OutlinedInput
                  id="laptop_sn"
                  label="laptop_sn"
                  type='text'
                  value={formData.laptop_sn}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Aruba S/N</InputLabel>
                <OutlinedInput
                  id="router_sn"
                  label="router_sn"
                  type='text'
                  value={formData.router_sn}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Aruba Name</InputLabel>
                <OutlinedInput
                  id="aruba_name"
                  label="aruba_name"
                  type='text'
                  value={formData.aruba_name}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl required>
                <InputLabel htmlFor="component-outlined">Cert Exp</InputLabel>
                <OutlinedInput
                  id="cert_exp"
                  label="cert_exp"
                  type='number'
                  value={formData.cert_exp}
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>

              <FormControl sx={{ padding:'1rem' }} required>
                <FormLabel >BOI</FormLabel>
                <RadioGroup
                  row
                  id="boi"
                  label="boi"
                  type='radio'
                  onChange={(e) => handleFormData(e)}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Yes" />
                  <FormControlLabel value='false' control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
             
              <FormControl sx={{ padding: '3rem' }} onChange={(e) => onChange(e)}>
                   <Button variant='contained' component="label" height={0.5}>
                  Upload Files
                  <input hidden type="file" />
                </Button>
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
              <Button variant='contained' color='error' onClick={() => handleClose()}>Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      </div>

      {/* *********** CONFIRM DELETE MODAL ******************** */}
      <Modal
        open={confirmDelete} onClose={handleDeleteConfirmClose}>
        <Box
          justifyContent='center'
          textAlign='center'
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
          <Typography >Are You Sure You Want to Delete?</Typography>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 4
            }}
            direction='row'
            spacing={2}>
            <Button variant='contained' color='success' margin={2} onClick={() => handleDelete(deleteItem)}>Confirm</Button>
            <Button variant='contained' color='error' onClick={() => handleDeleteConfirmClose()}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>

      {/* ******************* EDIT DATA MODAL ************************** */}
      <div>
        <Modal
          open={editShow}
          onClose={handleEditClose}
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
            
            <FormGroup row={true} sx={{ display: 'flex', justifyContent: 'space-evenly', borderRadius: 2 }}>
              <FormControl>
                <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                <OutlinedInput
                  id="first_name"
                  label="first_name"
                  sx={{ marginBottom: 4 }}
                  defaultValue={selectedEdit.first_name}
                  onChange={(e) => handleEditFormData(e)}
                  
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                <OutlinedInput
                  id="last_name"
                  label="last_name"
                  defaultValue={selectedEdit.last_name}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Directorate</InputLabel>
                <Select id='directorate' label='directorate' name='directorate' type='text' defaultValue={selectedEdit.directorate} onChange={(e) => handleEditFormData(e)}>
                  <MenuItem value={'J1'} id='directorate' >J1</MenuItem>
                  <MenuItem value={'J2'} id='directorate'>J2</MenuItem>
                  <MenuItem value={'J3'} id='directorate'>J3</MenuItem>
                  <MenuItem value={'J4'} id='directorate'>J4</MenuItem>
                  <MenuItem value={'J5'} id='directorate'>J5</MenuItem>
                  <MenuItem value={'J6'} id='directorate'>J6</MenuItem>
                  <MenuItem value={'J8'} id='directorate'>J8</MenuItem>
                  <MenuItem value={'CG'} id='directorate'>CG</MenuItem>
                  <MenuItem value={'CMDT'} id='directorate'>CMDT</MenuItem>
                  <MenuItem value={'POTFF'} id='directorate'>POTFF</MenuItem>
                  <MenuItem value={'JOG-C'} id='directorate'>JOG-C</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Position</InputLabel>
                <OutlinedInput
                  id="position"
                  label="position"
                  sx={{ marginBottom: 4 }}
                  defaultValue={selectedEdit.position}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Laptop Name</InputLabel>
                <OutlinedInput
                  id="laptop_name"
                  label="laptop_name"
                  defaultValue={selectedEdit.laptop_name}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Laptop S/N</InputLabel>
                <OutlinedInput
                  id="laptop_sn"
                  label="laptop_sn"
                  defaultValue={selectedEdit.laptop_sn}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Aruba S/N</InputLabel>
                <OutlinedInput
                  id="router_sn"
                  label="router_sn"
                  defaultValue={selectedEdit.router_sn}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="component-outlined">Aruba Name</InputLabel>
                <OutlinedInput
                  id="aruba_name"
                  label="aruba_name"
                  defaultValue={selectedEdit.aruba_name}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="component-outlined">Cert Exp</InputLabel>
                <OutlinedInput
                  id="cert_exp"
                  label="cert_exp"
                  defaultValue={selectedEdit.cert_exp}
                  onChange={(e) => handleEditFormData(e)}
                />
              </FormControl>

              <FormControl sx={{ padding:'1rem' }}>
                <FormLabel >BOI</FormLabel>
                <RadioGroup
                  row
                  id="boi"
                  label="boi"
                  defaultValue={selectedEdit.boi}
                  onChange={(e) => handleEditFormData(e)}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Yes" />
                  <FormControlLabel value='false' control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
             
              <FormControl sx={{ padding: '3rem' }} onChange={onChange}>
                   <Button variant='contained' component="label" height={0.5}>
                  Upload Files
                  <input hidden multiple type="file" />
                </Button>
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
              <Button variant='contained' color='success' margin={2} onClick={() => handleEditSubmit()}>Submit</Button>
              <Button variant='contained' color='error' onClick={() => handleEditClose()}>Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      </div>

    </>
  );
}
