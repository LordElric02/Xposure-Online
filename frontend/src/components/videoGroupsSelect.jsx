import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const VideoGroupSelect = ({ videoGroup, setVideoGroup, videoGroups }) => {
  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: '8px' }}>
      <InputLabel id="vgroup-label">Video Group</InputLabel>
      <Select
        labelId="vgroup-label"
        id="vgroup"
        value={videoGroup}
        onChange={(e) => setVideoGroup(e.target.value)}
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        {videoGroups.map((item) => (
          <MenuItem key={item.id} value={item.group}>
            {item.group}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VideoGroupSelect;
