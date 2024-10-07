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
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityInput = event.currentTarget.elements.namedItem('city') as HTMLInputElement;
    setCity(cityInput?.value || '');
  };

  return (
    <Paper
      component="form"
      role="form"
      sx={{ p: '2px 4px', display: 'flex', width: 400 }}
      onSubmit={onSubmit}
    >
      <InputBase
        id='city'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter City Name"
        inputProps={{ 'aria-label': 'search city' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}