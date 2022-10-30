import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../Button/Button";
import "./PaymentForm.scss";
import { useState, useContext } from "react";
import { CartContext } from "../../App";
import { AppContext } from "../../App";

export const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const {cartTotal} = useContext(CartContext);
    // const {currentUser} = useContext(AppContext);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: cartTotal*100})
        }).then(res=> res.json());

        const clientSecret = response.paymentIntent.client_secret;
        
        const paymentResult = stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "guest",
                }
            }
        })

        if((await paymentResult).error){
            alert((await paymentResult).error.message)
        }else{
            if((await paymentResult).paymentIntent.status==='succeeded'){
                alert('Payment Successful')
            }
        }
    }

  return (
    <>
      <div className="payment-form-container">
        <form className="payment-form" onSubmit={paymentHandler}>
          <h2>Credit card payment</h2>
          <CardElement />
          <Button disabled={isProcessingPayment} title="Pay now" id="payment-btn"/>
        </form>
      </div>
    </>
  );
};
