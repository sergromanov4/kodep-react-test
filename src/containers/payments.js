import React from 'react';
import NewPayment from '../components/payments/newPayment.js'
import List from '../components/payments/paymentsList.js'

export default function Payments(){
  return(
    <div>
      <NewPayment />
      <List />
    </div>
    )
}