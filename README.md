# GamerDen

GamerDen is a web application that helps gamers find partners based on their gaming preferences. Users can create an account, choose their gaming preferences, upload profile images, fill in their information, and then search for other gamers who are playing the same games. Users can also look at other people's profiles.

## Features

- **User Registration:** Create an account with personal information and gaming preferences.
- **Profile Management:** Upload profile images and update personal details.
- **Game Search:** Find other gamers playing the same games by certain preferences.
- **Profile Viewing:** View other gamers' profiles to check out their details and preferences.

## Technology Stack

- **Frontend:** React, TypeScript, Material-UI, Tailwind CSS, Nginx
- **Backend:** Express, TypeScript, Prisma ORM
- **Database:** PostgreSQL
- **API Integration:** Twitch IGDB API for fetching over 500k games

## Getting Started

To deploy GamerDen, you need to clone the repository and ensure Docker and Docker Compose are installed on your system. Follow the steps below to set up and run the application.

### Prerequisites

- Docker
- Docker Compose

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/GiladSharabi/gamerden.git
    cd gamerden
    ```

2. **Create the `.env` File:**

    In the root folder of the project, create a `.env` file and fill in the following fields:

    ```env
    POSTGRES_USER=YOUR_POSTGRES_USERNAME
    POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD
    POSTGRES_DB=YOUR_POSTGRES_DATABASE_NAME
    
    PORT=YOUR_BACKEND_PORT
    
    DB_HOST=YOUR_DATABASE_HOST
    DB_PORT=YOUR_DATABASE_PORT
    
    JWT_SECRET_TOKEN=YOUR_JWT_SECRET_TOKEN
    
    CLIENT_ID=YOUR_TWITCH_CLIENT_ID
    IGDB_AUTHENTICATION_TOKEN="Bearer YOUR_IGDB_AUTHENTICATION_TOKEN"
    
    DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}
    
    VITE_API_ENDPOINT=http://localhost:${PORT}/api
    ```

    - **CLIENT_ID** and **IGDB_AUTHENTICATION_TOKEN** can be obtained from the [Twitch Developer Portal](https://dev.twitch.tv/console/apps/create).

3. **Run the Application:**

    Navigate to the project directory and run the following commands:

    ```bash
    docker-compose build
    docker-compose up -d
    ```

    This will build and run GamerDen in Docker containers, allowing for easy deployment and isolation.

## Automated Seeding

GamerDen includes an automated seed function that enables you to select how many games you want to fetch from the IGDB API.

## Contributing

Feel free to contribute, report issues, or suggest improvements to the GamerDen project!

---
