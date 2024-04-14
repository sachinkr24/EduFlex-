import React from 'react'
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Payment() {

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [cart, setCart] = useState(null);
    const [loading, setLoading]= useState(false);
    const params = useParams();

      //get payment gateway token
  const getToken = async () => {
    console.log("going to get token");
    try {
      const { data } = await axios.get("http://localhost:3000/users/braintree/token");                       // /api/v1/product/braintree/token
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    const courseId = params.courseId;
    console.log("course lene chla");
    axios.get("http://localhost:3000/users/courses/" + courseId, {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => {
        setCart(res.data);
        console.log("course received from backend - ", cart);
    });
}

  useEffect(() => {
    console.log("running useEffect");
    getToken();
    getCourse();
  }, []);


   //handle payments
   const handlePayment = async () => {
    console.log("ran handle Payment");
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();          // /api/v1/product/braintree/payment
      await axios.post("http://localhost:3000/users/braintree/payment", {
        nonce,
        cart,
      }, {
        headers : {
            'Content-Type': 'application/json',
            'authorization' : "Bearer " + localStorage.getItem("token"),
        }
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  return (
    <div className="mt-2">
              {!clientToken  ? (
                ""
              ) : 
              (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}  
                    disabled={loading ||!instance}        //loading || !instance || !auth?.user?.address
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>

  )
}

export default Payment