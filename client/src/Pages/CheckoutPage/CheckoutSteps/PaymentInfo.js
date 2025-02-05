import { months, years } from "../../../constants/constants";
import { CardElement } from "@stripe/react-stripe-js";

export const PaymentInfo = ({ register, errors }) => {
  return (
    <div>
      <h2>Payment Info</h2>
      <div className="form-group">
        <label>Card Details</label>
        <CardElement className="card-element" />
      </div>
    </div>
  );
};
