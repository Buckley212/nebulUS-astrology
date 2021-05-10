<h1>Steps</h1>


-  Deploy DB to Atlas

-  Add `MONGODB_URI` in `.env` file

- Heroku create new app either on dashboard or via CLI

- Add `.env` variables in  *settings >>> config vars* 

- Netlify import repository 

- In Netlify's build command fill out this:  ```cd frontend && npm i && npm run build```

- In Netlify's publish directory fill out this ```frontend/build``` 

- Add frontend `.env` variables set `CI` to `false`

- Add `REACT_APP_SERVER_URL` to `https://yourHerokuAppName.herokuapp.com/api`

- Change Netlify's domain.  

- Add `clientURL` to config vars in Heroku 