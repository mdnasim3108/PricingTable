import { Fragment } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Form from "./form"
const stripeContainer=()=>{
    const stripePromise=loadStripe('pk_test_51Lw56vSFAyIqkgIK6c0GtBTG5Pa1QNWvVsoLLNdAkY15HHcKtmcoTdiqr9XxrrymLnoE4lqgG6znjO3oMTiYoHKe001yOrYCkS')
    return(
        <Fragment>
                <Elements stripe={stripePromise}>
                        <Form/>
                </Elements>
        </Fragment>
    )
}
export default stripeContainer