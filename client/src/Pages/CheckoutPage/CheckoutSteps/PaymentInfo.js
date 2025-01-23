import { months, years } from "../../../constants/constants";

export const PaymentInfo = ({ register, errors }) => {
  return (
    <div>
      <h2>Payment Info</h2>
      <div className="form-group">
        <label htmlFor="cardNumber">Fake Card Number</label>
        <input
          {...register("cardNumber", { required: false })}
          id="cardNumber"
          type="text"
          disabled={true}
          placeholder="xxxx xxxx xxxx xxxx"
        />
        {errors.cardNumber?.type === "required" && (
          <p style={{ color: "red" }} role="alert">
            Card Number is required
          </p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="cardName">Card Name</label>
        <input
          {...register("cardName", { required: false })}
          id="cardName"
          type="text"
          placeholder="John Doe"
        />
        {errors.cardName?.type === "required" && (
          <p style={{ color: "red" }} role="alert">
            Card Name is required
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expMonth">Expiration Month</label>
          <select
            {...register("cardExpirationMonth", { required: true })}
            id="expMonth"
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          {errors.cardExpirationMonth?.type === "required" && (
            <p style={{ color: "red" }} role="alert">
              Expiration month is required
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="expYear">Expiration Year</label>
          <select
            {...register("cardExpirationYear", { required: true })}
            id="expYear"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.cardExpirationYear?.type === "required" && (
            <p style={{ color: "red" }} role="alert">
              Expiration year is required
            </p>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="cvc">CVC</label>
        <input
          {...register("cvc", { required: true })}
          id="cvc"
          type="text"
          placeholder="123"
        />
        {errors.cvv?.type === "required" && (
          <p style={{ color: "red" }} role="alert">
            CVC is required
          </p>
        )}
      </div>
    </div>
  );
};
