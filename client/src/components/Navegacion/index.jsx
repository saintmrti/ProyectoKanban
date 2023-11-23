import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const [value, setValue] = React.useState('Programador');
  let location = useLocation();
    console.log(location.pathname) 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 250, height:'30px' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Programador"
        value="Programador" sx={{height:'30px', background: location.pathname === '/planeacion/programador' && '#E5E7E9'}}/>
      <BottomNavigationAction
        label="Produccion"
        value="Programador" sx={{height:'30px', background: location.pathname === '/planeacion/produccion' && '#E5E7E9'}}/>
    </BottomNavigation>
  );
}