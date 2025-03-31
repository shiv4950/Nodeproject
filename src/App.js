import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import ClearIcon from "@mui/icons-material/Clear";

function App() {
  const [singleOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [multiOptions, setMultiOptions] = useState(["Option A", "Option B", "Option C"]);

  const [rows, setRows] = useState([{ id: 1, singleSelect: "", multiSelect: [] }]);
  const [newOption, setNewOption] = useState("");

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, singleSelect: "", multiSelect: [] }]);
  };

  const handleSingleChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].singleSelect = value;
    setRows(updatedRows);
  };

  const handleSingleRemove = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].singleSelect = "";
    setRows(updatedRows);
  };

  const handleMultiChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].multiSelect = typeof value === "string" ? value.split(",") : value;
    setRows(updatedRows);
  };

  const handleMultiRemove = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].multiSelect = updatedRows[index].multiSelect.filter((item) => item !== value);
    setRows(updatedRows);
  };

  const handleAddMultiOption = (event) => {
    event.stopPropagation(); // Prevent dropdown from closing
    if (newOption.trim() && !multiOptions.includes(newOption.trim())) {
      setMultiOptions([...multiOptions, newOption.trim()]);
      setNewOption(""); // Clear input after adding
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          margin: 5,
          width: "95%",
        }}
      >
        <Table sx={{ tableLayout: "auto", width: "100%" }} aria-label="dynamic table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold',textAlign: 'center'}}>Single Select</TableCell>
              <TableCell sx={{ fontWeight: 'bold',textAlign: 'center'}}>Multi-Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  <Select
                    value={row.singleSelect}
                    onChange={(event) => handleSingleChange(index, event.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{ minWidth: 150 }}
                    renderValue={(selected) =>
                      selected ? (
                        <Chip
                          label={selected}
                          onDelete={() => {}}
                            deleteIcon={
                              <div
                                onMouseDown={(event) => {
                                    event.stopPropagation()
                                    handleSingleRemove(index);
                                }}
                              >
                                <ClearIcon />
                              </div>
                            }
                          sx={{ borderRadius: "8px" }}
                        />
                      ) : (
                        "Select an option"
                      )
                    }
                  >
                    {singleOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>

                <TableCell align="center">
                  <Select
                    multiple
                    value={row.multiSelect}
                    onChange={(event) => handleMultiChange(index, event.target.value)}
                    displayEmpty
                    fullWidth
                    sx={{ minWidth: 150 }}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {selected.length === 0 ? (
                          "Select multiple"
                        ) : (
                          selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              onDelete={() => {}}
                                deleteIcon={
                                  <div
                                    onMouseDown={(event) => {
                                        event.stopPropagation()
                                        handleMultiRemove(index, value);
                                    }}
                                  >
                                    <ClearIcon />
                                  </div>
                                }
                              sx={{ borderRadius: "8px" }}
                            />
                          ))
                        )}
                      </Box>
                    )}
                  >
                    {multiOptions.map((option) => (
                      <MenuItem disableRipple key={option} value={option}>
                        <Checkbox checked={row.multiSelect.includes(option)} />
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                    <Box sx={{ padding: "10px", display: "flex", gap: 1 }}>
                      <TextField disableRipple
                        label="New Option"
                        variant="outlined"
                        size="small"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        sx={{ minWidth: 150 }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleAddMultiOption}
                        sx={{ marginLeft: "auto", backgroundColor: "black", "&:hover": { backgroundColor: "gray" ,textTransform: 'none'} }}>
                        ➕ Add
                      </Button>
                    </Box> 
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2, marginRight:5 }}>
        <Button
          variant="contained"
          onClick={handleAddRow}
          sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "gray" } ,textTransform: 'none'}}>
          ➕ Add New Row
        </Button>
      </Box>
    </div>
  );
}

export default App;
