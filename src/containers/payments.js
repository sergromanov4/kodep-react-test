import React from 'react';
import NewPayment from '../components/newPayment.js'
import List from '../components/paymentsList.js'

export default function Payments(){
  return(
    <div>
      <NewPayment />
      <List />
    </div>
    )
}