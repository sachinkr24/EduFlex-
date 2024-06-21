import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Container, Typography, Box, Button, CircularProgress, Card, CardContent, Alert } from '@mui/material';
import UserBar from './userBar';
import Banner from './banner';
function Payment() {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    const courseId = params.courseId;
    try {
      const { data } = await axios.get(`http://localhost:3000/users/courses/${courseId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    getCourse();
  }, []);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("http://localhost:3000/users/braintree/payment", { nonce, cart }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart({});
      navigate("/users/mycourses");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setPaymentFailed(true);
    }
  };

  useEffect(() => {
    if (paymentFailed) {
      toast.error("Payment Failed");
      navigate("/users/courses");
    }
  }, [paymentFailed, navigate]);

  return (
    <div><UserBar/>
      <Banner/>
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Payment for Course
          </Typography>
          {cart.title && (
            <Typography variant="h6" gutterBottom>
              {cart.title}
            </Typography>
          )}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            clientToken && (
              <Box sx={{ mt: 3 }}>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePayment}
                  disabled={!instance || loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </Button>
              </Box>
            )
          )}
          {!clientToken && !loading && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Loading payment options...
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
    </div>
  );
}

export default Payment;
