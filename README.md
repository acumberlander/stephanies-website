# SexesByStephanie Website

![homepage](/client/src/assets/website-screenshot.png)

This is an e-commerce I built for a client who runs her own clothing line called Sexes. Initially I was using a e-commerce platform called commerce.js, but I wasn't able to use it for production. Work on the application was postponed due to the client not wanting to pay a monthly subscription for a different commerce platform. Now I'm re-working the site with the intention to create my own e-commerce backend so that she won't have to pay monthly subscription.

[View Demo](https://stephanies-website-frontend.onrender.com/)

**Note**: You can run the app locally, but you won't get full functionality because it would require that I expose my firebase api key. I'm using firebase for authentication and the create of an anonymous user. I currently have the product pictures loading up from the storage there as well. If you load in your own firebaseConfig though, the app should work just fine.

## Instructions to run locally

- Clone the project down
- Run this command

```
npm install
```

- When it's done, all of the needed node packages (dependencies) should be installed

  - If by chance this is not the case, just cd into the client folder and run npm install and then do the same for the backend folder.

- Now lets move on to loading up an instance of MongoDB!

## Seeding MongoDB Data Locally

Below are instructions for spinning up MongoDB in a Docker container and running the provided **seed** script to populate your database with sample product data.

## 1. Install Docker

If you haven’t already, install Docker:

- [Docker Docs](https://docs.docker.com/get-docker/)

Ensure Docker is running on your machine.

## 2. Start a MongoDB Container

Open a terminal and run:

```
docker run -d \
  --name my-local-mongo \
  -p 27017:27017 \
  mongo:latest
```

- **--name my-local-mongo** is the container name (you can change it).
- **-p 27017:27017** publishes the default MongoDB port so your app can connect via mongodb://localhost:27017.

Confirm that it's running by executing the command

```
docker ps
```

You should see **my-local-mongo** (unless you chose a different name)

Then in the root of the project, execute the command

```
npm run dev
```

This should spin up both the backend server as well as the client side server.

- If for whatever reason this doesn't work, just cd into both the client and backend folders and then run this command for both.
- ```
  npm start
  ```

## Tech Stack

- React
- Redux
- Stripe API
- Node/Express
- MongoDB (orders and users)
- Firebase Storage (images)

## Future Updates

Future updates will include:

- Stripe api integration for payment options ✅
- Separating "orders" from the User model.
  - More efficient to separate orders into their own collections in mongoDB.
- Some kind of email notification api that will send a confirmation receipt to user’s email
- Create admin portal that will allow client/site owner to add new products and update the current products.
