# SexesByStephanie Website

![homepage screenshot](/src/assets/website-screenshot.png)

This is an e-commerce I'm currently building for a client who runs her own clothing line called Sexes. I'm still in the process of building the site out, but most of the shopping features are complete. The site will also act as a promo for her other offered services.

[View Demo ](https://sexesbystephanie.netlify.app/)

**Run locally to see the most recent updates.**

(Currently can't deploy most recent updates because build file is too large.)

## Instructions to run locally

- Clone the project down
- When in the proper directory path, execute the command

```
npm install
```

- This should install all of the needed node packages (dependencies)
- Then execute the command

```
npm start
```

- This should make the program begin to render in your default browser

## Tech Stack

- React
- Redux
- Material UI
- CommerceJS (e-commerce platform)

## Notes

- Might be switching the e-commerce platform to Shopify.
  - Noticed after the fact that CommerceJS's platform does not offer an ideal authentication API. It doesn't take a user password as a parameter and that's not something I'll willing to work around. (3/23/21)
  - **UPDATE** -- Client has expressed that she doesn't care to have a login feature for her app because she doesn't feel it's of much use to her business. Her products are one of a kind, so the customer doesn't really need to see their order history because they typically wouldn't be able to buy more of that same item, plus in a way it would be redundant since a receipt will be emailed to the customer after each purchase. Also, CommerceJS keeps up with all of the order and customer data, so it's not really necessary in the long run. (3/24/21)
- Services page was recently added. There are some responsiveness bugs that need to be fixed. (3/24/21)
- **UPDATE** Will be updating the project to utilize firebase storage for all the photos used in the multiple photo galleries. Having them stored locally is making the build folder too large to deploy. (3/26/21)
- **UPDATE** Dumped majority of the photos for the services carousels into firebase storage. Doing this optimized the overall project size allowing me to deploy the latest changes. (3/27/21)
- **UPDATE** Gallery images for each service section is now being dynamically set to state when the data is retrieved as opposed to pulling from a list of hard-coded sources. (3/29/21)
- **UPDATE** Updated website screen shot image and limited the number of images displayed in each service section photo gallery to cut down on the number of requests made to firebase. (3/30/21)


## INSTALL LIST

- Material UI
  - npm install @mui/material @emotion/react @emotion/styled
  - https://mui.com/material-ui/
- React Stripe
  - npm i @stripe/react-stripe-js
  - https://www.npmjs.com/package/@stripe/react-stripe-js
- Stripe
  - npm i stripe

