export const ShippingInfo = ({ register, errors }) => {
  return (
    <div className="form-container">
      <h2>CONTACT INFORMATION</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: true })}
          id="email"
          type="text"
          placeholder="John@demo.com"
        />
        {errors.email?.type === "required" && (
          <p style={{ color: "red" }} role="alert">
            Email is required
          </p>
        )}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", { required: true })}
            id="firstName"
            type="text"
            placeholder="John"
          />
          {errors.firstName?.type === "required" && (
            <p style={{ color: "red" }} role="alert">
              First name is required
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName", { required: true })}
            id="lastName"
            type="text"
            placeholder="Doe"
          />
          {errors.lastName?.type === "required" && (
            <p style={{ color: "red" }} role="alert">
              Last name is required
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="addressLine1">Address</label>
        <input
          {...register("addressLine1", { required: true })}
          id="addressLine1"
          type="text"
          placeholder="123 Main St."
        />
        {errors.addressLine1?.type === "required" && (
          <p style={{ color: "red" }} role="alert">
            Address is required
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="addressLine2">Address</label>
        <input
          {...register("addressLine2", { required: false })}
          id="addressLine2"
          type="text"
          placeholder="PO BOX 123"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          {...register("city", { required: true })}
          id="city"
          type="text"
          placeholder="New York"
        />
        {errors.city?.type === "required" && (
          <p style={{ color: "red" }} role="alert">
            City is required
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            {...register("state", { required: true })}
            id="state"
            type="text"
            placeholder="NY"
          />
          {errors.state?.type === "required" && (
            <p style={{ color: "red" }} role="alert">
              State is required
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input
            {...register("zip", { required: true })}
            id="zip"
            type="text"
            placeholder="10001"
          />
          {errors.zip?.type === "required" && (
            <p style={{ color: "red" }} role="alert">
              Zip is required
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
