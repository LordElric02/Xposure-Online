import React from 'react';
import { Input } from '@mui/material';

const SearchVideos = ({ onSearch }) => {
  return (
    <Input
      placeholder="Search by title"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};


export default SearchVideos;