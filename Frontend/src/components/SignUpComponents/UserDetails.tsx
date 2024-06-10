// UserDetails.tsx
import { TextField, Box, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { User, Gender } from '../../api/types';

type UserDetailsProps = {
    user: User;
    onChange: (name: keyof User, value: string) => void;
};

const UserDetails = ({ user, onChange }: UserDetailsProps) => {
    return (
        <Box>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={user.username}
                onChange={(e) => onChange('username', e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={(e) => onChange('email', e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={user.password}
                onChange={(e) => onChange('password', e.target.value)}
            />
            <FormControl component="fieldset" margin="normal">
                <Typography variant="subtitle1" gutterBottom>Gender</Typography>
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={user.gender}
                    onChange={(e) => onChange('gender', e.target.value)}
                >
                    {Object.keys(Gender).map((key) => {
                        const genderOption = Gender[key as keyof typeof Gender];
                        return (
                            <FormControlLabel
                                key={genderOption}
                                value={genderOption}
                                control={<Radio />}
                                label={genderOption}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default UserDetails;
