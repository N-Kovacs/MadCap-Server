// import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Close from '@mui/icons-material/Close'


export default function SelectCategories(props) {
  const { categories } = props;
  const { currentCategories, setCurrentCategories } = props;

  const theme = useTheme();

  const getStyles = (name, categoryName, theme) => {
    return {
      fontWeight:
        categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  };

  const handleChange = (event) => {
    // console.log(event);
    const {
      target: { value },
    } = event;
    setCurrentCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const ITEM_HEIGHT = 88;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 208,
      },
    },
  };

  // console.log("Categories", categories);
  // console.log("Category IDs", currentCategories)

  const CategoryIDToValue = ((cat_id) => categories.find((category) => category.id === cat_id).title);

  return (
    <FormControl className="select-categories" sx={{ m: 1, width: '100%' }}>
      <InputLabel id="multiple-chip-label" >
        Categories
      </InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        value={currentCategories}
        onChange={handleChange}
        sx=
        {{
          display: 'flex',
          flexDirection: 'column',
          '&.MuiInputBase-root': { height: "84px"},
        }}
        // input=
        // {<OutlinedInput className="the-outline-input-class" id="select-multiple-chip" label="Chip"
        //   sx={{":root": {height: "117px"},
        //     height: "117px",
        //     px: 0,
        //     py: 0,
        //     '&.MuiInputBase-root': {height: "117px" },
        //     '&.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {p: 0 }
        //   }}
        // />}
        renderValue={(selected) => (
          <Box className="select-inner-scroll"
            sx={{
              display: 'flex', flexWrap: 'wrap',
              maxHeight: '76px',
              overflow: "scroll",
              overflowAnchor: 'auto',
              gap: 0.2,
              '&.MuiInputBase-input': {
                p: '0',
                height: '100%',
              }
            }}
          >
            {selected.map((value) => (
              <Chip key={value} label={CategoryIDToValue(value)}
                sx={{ '&.MuiChip-root': { fontSize: '12px' } }}
                deleteIcon={
                  <Close/>
                }
                onMouseDown={(event) => event.stopPropagation()}
                onDelete={(e) => {
                  setCurrentCategories((prev) => [...prev].filter((ids) => ids !== value))
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}

      >
        {categories && categories.map((cat) => (
          <MenuItem
            key={cat.id}
            value={cat.id}
            style={getStyles(cat.title, currentCategories, theme)}
          >
            {cat.title}
            {/* {console.log("cat", cat)} */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}