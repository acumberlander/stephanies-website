# SexesByStephanie Website

![homepage](/client/src/assets/website-screenshot.png)

This is an e-commerce I built for a client who runs her own clothing line called Sexes. Initially I was using a e-commerce platform called commerce.js, but I wasn't able to use it for production. Work on the application was postponed due to the client not wanting to pay a monthly subscription for a different commerce platform. Now I'm re-working the site with the intention to create my own e-commerce backend so that she won't have to pay monthly subscription.

[View Demo](https://stephanies-website-frontend.onrender.com/)

**Note**: You can run the app locally, but you won't get full functionality because it would require that I expose my firebase api key. I'm using firebase for authentication and I currently have the product pictures loading up from the storage there as well.

## Instructions to run locally

- Clone the project down
- Run this command

```
npm install
```

- When it's done all of the needed node packages (dependencies) should be installed
- Then execute the command

```
npm run dev
```

- This should make the program begin to render in your default browser

## Tech Stack

- React
- Redux
- MongoDB (users and products)
- Express
- Node
- Firebase Storage (images)
- Material UI

## Future Updates

Future updates will include:

- Stripe api integration for payment options
- Some kind of email notification api that will send a confirmation receipt to user’s email
- Allow users to transition from an anonymous account to a credentialed account via firebase’s sdk
- Create admin portal that will allow client/site owner to add new products and update the current products.
