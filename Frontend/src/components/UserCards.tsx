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
        <Grid className='flex justify-center flex-wrap mb-20 size-full'>
            {users.map((user, i) => (
                <Grid item key={i} m={1} mb={20} className='size-80'>
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
