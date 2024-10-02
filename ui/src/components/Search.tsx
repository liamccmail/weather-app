import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Dispatch, SetStateAction } from 'react';

interface SearchProps {
  setCity: Dispatch<SetStateAction<string>>;
}

export default function Search({setCity}: SearchProps) {
  const onSubmit = (e: any) => {
    e.preventDefault();
    setCity(e.target.city.value);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', width: 400 }}
      onSubmit={onSubmit}
    >
      <InputBase
        id='city'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search City"
        inputProps={{ 'aria-label': 'search city' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}