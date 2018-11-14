# CryoInsight

This web app was initially developed for an hackathon competition. 

The aim is basically to let the user search for all the parts of the cryosphere that exist in the world (glaciers, areas of permafrost, snowpack, ice sheet, etc.) and discover information and images about them.

## Installation instructions

### Clone this project 

```
git clone --depth=1 https://github.com/gcoro/CryoInsight.git
```

### Start Elasticsearch docker

```bash
cd CryoInsight
docker-compose up
```

### Run the backend
If you cloned this project in a different path from your home folder, you need to modify the file `backend/server.js`, assigning the variable `csvFilePath` the current path to your repository.

Then move to the backend folder, install the dependencies and run it
```bash
cd backend
npm install
npm start
```

Note that startup may take a while, once it is finished a message will appear in the console.

### Run the frontend

Now move in the frontend, install the dependencies and run it
```bash
cd ../frontend
npm install
npm start
```

You will now be able to navigate the project at the address `http://localhost:3000/`.
