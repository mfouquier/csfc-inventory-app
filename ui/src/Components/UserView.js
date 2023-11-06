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
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';



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
    id: 'boi',
    numeric: false,
    disablePadding: false,
    label: 'BOI'
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
 
  // {
  //   id: 'laptop_name',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Laptop Name',
  // },
  // {
  //   id: 'laptop_sn',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Laptop S/N',
  // },
  // {
  //   id: 'router_sn',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Aruba S/N',
  // },
  // {
  //   id: 'aruba_name',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Aruba Name',
  // },
  // {
  //   id: 'cert_exp',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Cert Exp',
  // },
  {
    id: 'hand_receipt',
    numeric: false,
    disablePadding: false,
    label: 'Hand Receipt'
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
export default function UserView(inventory) {
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
  }, [editShow])

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
                        <TableCell >{""}</TableCell>
                        <TableCell align="left">{row.directorate}</TableCell>
                        <TableCell align="left">{row.position}</TableCell>
                        <TableCell align="left">{row.boi === true ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">{row.last_name + ', ' + row.first_name}</TableCell>
                        {/* <TableCell align="left">{row.first_name}</TableCell> */}
                        {/* <TableCell align="left">{row.laptop_name}</TableCell>
                        <TableCell align="left">{row.laptop_sn}</TableCell>
                        <TableCell align="left">{row.router_sn}</TableCell>
                        <TableCell align='left'>{row.aruba_name}</TableCell> */}
                        {/* <TableCell align='left'>{row.cert_exp}</TableCell> */}
                        <TableCell align='left'>{row.hand_receipt === null ? "" : <a target='_blank' href={`http://localhost:8080/uploads/${row.hand_receipt}`}>2062</a>}</TableCell>
                        
                        <TableCell></TableCell>
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
    </>
  );
}
