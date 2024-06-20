import React from 'react';
import { Box, Button } from '@mui/material';

const Categories = () => {
  const categoryList = ['Web Development','App Development', 'Data Science', 'Blockchain', 'Machine Learning', 'Deep Learning', 'DevOps', 'Cloud Computing'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, mt: 4 }}>
      {categoryList.map((category, index) => (
        <Button
          key={index}
          variant="outlined"
          type="button"
          sx={{
            color: '#000080',
            borderColor: '#000080',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 128, 0.1)', // Optional: add a slight background on hover
              borderColor: '#000080',
            }
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default Categories;
