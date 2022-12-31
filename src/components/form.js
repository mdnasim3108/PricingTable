import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import "./form.css";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const Form = () => {
  const [success,setSuccess]=useState(false)
  const elements = useElements();
  const stripe = useStripe();
  const submitHandler = async(event) => {
    
    event.preventDefault();
    const { error, paymentMethod } =await stripe.createPaymentMethod({
      type:"card",
      card: elements.getElement(CardElement),
    });
    if(!error){
        const {id}=paymentMethod
        const response=await axios.post("http://localhost:4000/payment",{
                amount:4000,
                id,
        })
        
    }
    else{
        console.log(error)
    }
  };

  return (
    <Fragment>
    { !success?
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <div className="cardelement">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </div>
        <button type="submit">pay</button>
      </form>:
      <div>
        <h1 style={{textAlign:"center"}}>Payment successfully done</h1>
      </div>
      }
    </Fragment>
  );
};
export default Form;
