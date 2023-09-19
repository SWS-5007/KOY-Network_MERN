# KOY Network

This project was developed by using [React.js](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) & [Node.js](https://nodejs.org/en) and using [MUI](https://mui.com/material-ui/).

## Installation

    // Clone the repository
    $ git clone https://github.com/KoyNetwork/koy-network-website

    // Navigate to directory
    $ cd ./koy-network-website

## `Setup the DB`

Install the [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_apac-cn_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=19633098220&adgroup=150152988654&cq_cmp=19633098220&gad=1&gclid=EAIaIQobChMIg5G3jdilgQMVLYpQBh1hQQoNEAAYASAAEgLrOPD_BwE) in your local.

And install your preferred Database GUI Tool.

I recommend the [MongoDB Compass](https://www.mongodb.com/products/tools/compass).

And create new Database and name it as `Koy`.

## `Set Environment Variables`

### `Client Environment Variables`

Copy the Sample.env file of ./client folder and rename it to .env.

### `Server Environment Variables`

Copy the Sample.env file of ./server folder and rename it to .env.

And set your environment variables in .env files.

Create New [Vonage API Account](https://dashboard.nexmo.com/).

And added the your apiKey and apiSecret as .env Environment variables.
(You can see the API key and API Secret in dashboard of [dashboard.nexmo.com](https://dashboard.nexmo.com/))

### `Setup and Run Client`

    // Navigate to client directory
    $ cd ./client

    // install packages
    $ npm i

    // start client (localhost:3000)
    $ npm start

    // For running in production
    $ npm run build
    $ npm start

### `Setup and Run Server`

    // Navigate to server directory
    $ cd ./server

    // install packages
    $ npm i

    // install nodemon for development
    $ npm i -D nodemon

    // start node server (localhost:5000)
    $ npm start
