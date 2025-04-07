import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/orderThunks/orderThunks";
import { setUser } from "../../store/slices/userSlice";
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
   const processOrder = async () => {
     if (!sessionId || !user.uid) return;

     try {
       await dispatch(setUser({ ...user, newMember: false }));
       await dispatch(createOrder({ sessionId, user }));
       goBackHome();
     } catch (error) {
       console.error("There was a problem processing your order:", error);
     }
   };

   processOrder();
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
