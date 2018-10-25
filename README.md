# cryoinsight-project

This web app was initially developed for an hackathon competition. 

The aim is basically to let the user search for all the parts of the cryosphere that exist in the world (glaciers, areas of permafrost, snowpack, ice sheet, etc.) and discover information and images about them.

## Getting started

### Clone this project 

```bash
git clone --depth=1 https://github.com/gcoro/cryoinsight-project.git my-project
```
### Start elasticsearch docker

in the **backend** folder run 

```bash
docker compose up
```

### Start the backend
* change the path of the CSV with the path in your computer in `backend/index.js`
* in the backend folder run `npm start`
startup may take a while, once it is finished a message will appear in the console

### Start the frontend

* put your elasticsearch ip in the `findGlaciers`call in `App.js`
* in the main folder run `npm start`
