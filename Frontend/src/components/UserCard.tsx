import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import { Chat, Gamepad, Info, Person } from '@mui/icons-material';
import { Game } from "../api/types"

type CardProps = {
    username: string;
    rating: number;
    bio?: string;
    games: Game[];
};

const UserCard = ({ username, rating, bio, games }: CardProps) => {
    return (
        <Card className="user-card" sx={{ minWidth: 300 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6">{username}</Typography>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1}>
                            <Info />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="body1"><strong>Bio:</strong> {bio ? bio : "No bio available"}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1}>
                            <Gamepad />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="body1"><strong>Games:</strong></Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        {games.map((game, index) => (
                            <Grid item key={index}>
                                <img className="game-image mb-2" src={game.cover} alt={game.name} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={11}>
                            <Rating name="user-rating" value={rating} precision={0.1} readOnly />
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2} textAlign="center">
                    <Button variant="contained" color="primary" startIcon={<Chat />}>
                        Start Chatting
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;