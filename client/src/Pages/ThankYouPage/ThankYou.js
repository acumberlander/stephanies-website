import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/orderThunks/orderThunks";
import { useNavigate } from "react-router-dom";
import "./ThankYou.scss";

const ThankYou = () => {
  const user = useSelector((state) => state.user);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBackHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    if (sessionId && user.uid) {
      dispatch(createOrder(sessionId))
        .unwrap()
        .then(() => {
          goBackHome();
        })
        .catch((error) => {
          console.error("There was a problem creating your order... ", error);
        });
    }
  }, [sessionId, dispatch, user.uid]);

  return (
    <div className="thank-you-container">
      <h1 id="thank-you-header">Thank You For Your Order!</h1>
      <p>Your order was successfully placed.</p>

      <p style={{ marginTop: "2rem" }}>
        We appreciate your business and hope to serve you again soon!
      </p>
    </div>
  );
};

export default ThankYou;
