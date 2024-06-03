import { Grid } from '@mui/material';
import UserCard from './UserCard';
import { getGames } from '../api/api.endpoints';

const games = await getGames(5);

const users = [
    { username: "itamarthedog", bio: "good player", rating: 2, games: games, avatarUrl: "//images.igdb.com/igdb/image/upload/t_logo_med/co7q89.jpg" },
    { username: "player 2", bio: undefined, rating: 3.2, games: games },
    { username: "player 1", bio: "good player", rating: 2, games: games },
    { username: "player 2", bio: undefined, rating: 3.7, games: games },
    { username: "player 1", bio: "good player", rating: 2, games: games },
    { username: "player 2", bio: undefined, rating: 4.8, games: games },
    { username: "player 1", bio: "good player", rating: 2, games: games, avatarUrl: "//images.igdb.com/igdb/image/upload/t_logo_med/co2una.jpg" },
    { username: "player 2", bio: undefined, rating: 1.1, games: games, avatarUrl: "//images.igdb.com/igdb/image/upload/t_logo_med/co7q89.jpg" },
];

const UserCards = () => {
    return (
        <Grid container spacing={10} justifyContent="center" mb={10}>
            {users.map((user, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3} mb={-8.5}>
                    <UserCard
                        username={user.username}
                        bio={user.bio}
                        rating={user.rating}
                        games={user.games}
                        avatarUrl={user.avatarUrl}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default UserCards;
