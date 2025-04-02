import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  TextField, 
  Button, 
  Divider,
  Grid,
  Avatar
} from '@mui/material';
import { updateUserProfile } from '../../store/authThunks/authThunks';
import './AccountSettings.scss';

const AccountSettings = () => {
  const { email, displayName, phoneNumber } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    displayName: displayName || '',
    phoneNumber: phoneNumber || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const getAvatarLetter = () => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  return (
    <Container maxWidth="md" className="account-settings-container">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="page-title"
      >
        Account Settings
      </Typography>

      <Paper elevation={3} className="account-paper">
        <Box className="account-header">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "secondary.main",
              fontSize: "2rem",
            }}
          >
            {getAvatarLetter()}
          </Avatar>
          <Box ml={2}>
            <Typography variant="h5">{displayName || email}</Typography>
            <Typography variant="body1" color="textSecondary">
              {email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                disabled
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              {isEditing ? (
                <Box display="flex" gap={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                  disabled
                >
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AccountSettings;