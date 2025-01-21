# SexesByStephanie Website

![homepage screenshot](/src/assets/website-screenshot.png)

This is an e-commerce I built for a client who runs her own clothing line called Sexes. Initially I was using a e-commerce platform called commerce.js, but I wasn't able to use it for production. Work on the application was postponed due to the client not wanting to pay a monthly subscription for a different commerce platform. Now I'm re-working the site with the intention to create my own e-commerce backend so that she won't have to pay monthly subscription.

[View Demo ](https://sexesbystephanie.netlify.app/)

**Run locally to see the most recent updates.**

## Instructions to run locally

- Clone the project down
- cd into the client folder and execute the command
- This should install all of the needed node packages (dependencies)

```
npm install
```

- Then execute the command

```
npm start
```

- This should make the program begin to render in your default browser

## Tech Stack

- React
- Redux
- Material UI
- Firebase Storage (images)
- Firestore Database (users and products)

## Future Updates

Future updates will include:

- Stripe api integration for payment options
- Some kind of email notification api that will send a confirmation receipt to user’s email
- Create a backend that utilizes Node/Express
- May switch to using MongoDB as a database
- Allow users to transition from an anonymous account to a credentialed account via firebase’s sdk
- Create admin portal that will allow client/site owner to add new products and update the current products.
