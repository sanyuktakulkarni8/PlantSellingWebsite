import React, { useRef, useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const Payment = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const payBtn = useRef(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    payBtn.current.disabled = true;

    try {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`, // change to /order
        },
      });

      if (error) {
        payBtn.current.disabled = false;
        setErrorMessage(error.message);
      }

    } catch (error) {
      console.log(error);
      payBtn.current.disabled = false;
    }
  };



  return (
    <>

      <div className="py-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className="col col-md-9 col-lg-6 p-2 p-3 rounded bg-dark">
            <h4 className='h4 text-center text-warning'>Card Information</h4>
            {errorMessage && <div className='text-center mt-2 p-2 text-danger'>{errorMessage}</div>}
            <form onSubmit={handleSubmit} className='bg-dark rounded p-2'>
              <PaymentElement options={{
                layout: {
                  type: 'accordion',
                  defaultCollapsed: false
                },
              }} />
              <button ref={payBtn} type="submit" disabled={!stripe || !elements} className='btn btn-primary w-100 mt-2'>
                <span>Pay - ₹{(Number(amount) /  100).toFixed(2)}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>


  )
}

export default Payment