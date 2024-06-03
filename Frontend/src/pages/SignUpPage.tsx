import { Avatar, CssBaseline, Paper, Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Gender, User } from '../api/types';
import UserDetails from '../components/SignUpComponents/UserDetails';
import CountrySelector from '../components/SignUpComponents/CountrySelector';
import LanguageSelector from '../components/SignUpComponents/LanguagesSelector';
import DatePickerComponent from '../components/SignUpComponents/DatePickerComponent';
import BioTextarea from '../components/SignUpComponents/BioTextarea';
import SubmitButton from '../components/SignUpComponents/SubmitButton';
import { PersonAdd } from '@mui/icons-material';

const SignUp = () => {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    password: '',
    dob: new Date(),
    country: '',
    gender: Gender.None,
    languages: [],
    bio: '',
  });

  const handleUserChange = (name: keyof User, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleCountryChange = (value: string) => {
    setUser({ ...user, country: value });
  };

  const handleLanguageChange = (languages: string[]) => {
    setUser({ ...user, languages });
  };

  const handleDateChange = (date: Date | null) => {
    setUser({ ...user, dob: date || new Date() });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(user);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(./src/images/LoginBackground.jpeg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            p: 4,
            borderRadius: 4,
            mt: 8,
            mb: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <UserDetails user={user} onChange={handleUserChange} />
            <DatePickerComponent selectedDate={user.dob} onChange={handleDateChange} />
            <CountrySelector country={user.country} onChange={handleCountryChange} />
            <LanguageSelector languages={user.languages} onChange={handleLanguageChange} />
            <BioTextarea bio={user.bio || ''} onChange={(value) => setUser({ ...user, bio: value })} />
            <SubmitButton onSubmit={handleSubmit} />
          </Box>
        </Box>
      </Grid>
    </Grid >
  );
};

export default SignUp;
