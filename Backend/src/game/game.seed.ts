import axios, { AxiosRequestConfig } from 'axios';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

type Game = {
    id: number,
    name: string,
    cover: string,
}

type Cover = {
    id: number,
    url: string,
}

async function fetchData(url: string, headers: any, payload: string): Promise<any> {
    const config: AxiosRequestConfig = {
        headers: headers
    };
    try {
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error: any) {
        throw new Error(`Error fetching data from ${url}: ${error.message}`);
    }
}

function saveToJson(data: any, filename: string): void {
    fs.writeFileSync(filename, JSON.stringify(data, null, 4));
}

async function fetchCoversInBatches(coverIds: number[], gameHeaders: any): Promise<Cover[]> {
    const batchSize = 10; // Number of covers to fetch in each batch
    const delayMs = 350; // Delay between each batch in milliseconds (to stay within rate limit)
    const coverData: Cover[] = [];

    for (let i = 0; i < coverIds.length; i += batchSize) {
        const batchIds = coverIds.slice(i, i + batchSize);
        const coverPayload: string = `fields url; where id = (${batchIds.join(',')});`;
        const batchCoverData: Cover[] = await fetchData("https://api.igdb.com/v4/covers", gameHeaders, coverPayload);
        console.log(`batchCoverDataLength : ${batchCoverData.length} and the batchid is: ${i}`);
        coverData.push(...batchCoverData);
        if (i + batchSize < coverIds.length) {
            await new Promise(resolve => setTimeout(resolve, delayMs)); // Delay between batches
        }
    }

    return coverData;
}

async function fetchGameData(gameHeaders: any): Promise<Game[]> {
    const gameUrl: string = "https://api.igdb.com/v4/games";
    const limit = 30;
    const gamePayload: string = `fields id, name, cover; sort rating_count desc; limit ${limit};`;

    return await fetchData(gameUrl, gameHeaders, gamePayload);
}

function mapCoverUrls(gameData: Game[], coverData: Cover[]): Game[] {
    const coverMap: { [key: number]: string } = {};
    coverData.forEach(cover => {
        coverMap[cover.id] = cover.url.replace("t_thumb", "t_logo_med"); // better cover image resolution, see: https://api-docs.igdb.com/#images
    });

    return gameData.map(game => {
        if (game.cover && coverMap[Number(game.cover)]) {
            return { ...game, cover: coverMap[Number(game.cover)] };
        }
        return game;
    });
}


async function populateDatabase(gameData: Game[]): Promise<void> {
    for (const game of gameData) {
        await prisma.game.create({
            data: {
                id: game.id,
                name: game.name,
                cover: game.cover
            }
        });
    }
}

async function seedDB(): Promise<void> {

    const gameHeaders: any = {
        "Client-ID": `${process.env.CLIENT_ID}`,
        "Authorization": `${process.env.IGDB_AUTHENTICATION_TOKEN}`,
    };
    const gameData: Game[] = await fetchGameData(gameHeaders);
    const coverIds: number[] = gameData.filter(game => game.cover).map(game => Number(game.cover));
    const coverData: Cover[] = await fetchCoversInBatches(coverIds, gameHeaders);

    const updatedGameData: Game[] = mapCoverUrls(gameData, coverData);

    // Save updated game data
    saveToJson(updatedGameData, "game.json");
    console.log("Saved to json, Populating database...");

    // Populate the database
    await populateDatabase(updatedGameData);
    console.log("Finished database seeding");
    console.log("To check the db content use: npx prisma studio");
}

seedDB();
