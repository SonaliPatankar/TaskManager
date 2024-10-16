import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterSortControls = ({ filterStatus, setFilterStatus, sortOption, setSortOption }) => {
  return (
    <div className="filter-sort-controls">
      <FormControl variant="outlined" sx={{ mr: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} label="Sort By">
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Priority">Priority</MenuItem>
          <MenuItem value="Due Date">Due Date</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSortControls;
