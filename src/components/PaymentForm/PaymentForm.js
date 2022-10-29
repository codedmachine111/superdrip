import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../Button/Button";
import "./PaymentForm.scss";

export const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
            
    }


  return (
    <>
      <div className="payment-form-container">
        <form className="payment-form">
          <h2>Credit card payment</h2>
          <CardElement />
          <Button title="Pay now" id="payment-btn" onSubmit={paymentHandler}/>
        </form>
      </div>
    </>
  );
};
