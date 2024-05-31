import { Grid } from '@mui/material';
import UserCard from './UserCard';
import { getGames } from '../api/api.endpoints';

const games = await getGames(4);

const users = [
    { username: "player 1", bio: "good player", rating: 2, games: games },
    { username: "player 2", bio: undefined, rating: 3.2, games: games },
    { username: "player 1", bio: "good player", rating: 2, games: games },
    { username: "player 2", bio: undefined, rating: 3.5, games: games },
    { username: "player 1", bio: "good player", rating: 2, games: games },
    { username: "player 2", bio: undefined, rating: 4.5, games: games },
    { username: "player 1", bio: "good player", rating: 2, games: games },
    { username: "player 2", bio: undefined, rating: 1.1, games: games },
];

const UserCards = () => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {users.map((user, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                    <UserCard
                        username={user.username}
                        bio={user.bio}
                        rating={user.rating}
                        games={user.games}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default UserCards;
