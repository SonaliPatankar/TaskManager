import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Paper, Box } from '@mui/material';

const FilterSortControls = ({ filterStatus, setFilterStatus, sortOption, setSortOption }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <FormControl variant="outlined" sx={{ mr: 2, width: '45%' }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: '45%' }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} label="Sort By">
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Priority">Priority</MenuItem>
            <MenuItem value="Due Date">Due Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FilterSortControls;
