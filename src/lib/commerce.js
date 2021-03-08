import Commerce from '@chec/commerce.js';

const publicKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;

const commerce = new Commerce(publicKey, true);

export default commerce;
