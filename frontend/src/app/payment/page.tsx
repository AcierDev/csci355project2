"use client"
import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from "../../components/PaymentForm";
import Navbar from "../../components/Navbar";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
    return (
        <>
            <Navbar/>
            <Elements stripe={stripePromise}>
                <PaymentForm/>
            </Elements>
        </>

    );
};
