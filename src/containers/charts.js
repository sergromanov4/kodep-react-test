import React from 'react';
import PaymentChart from '../components/charts/paymentChart.js'
import IncomeChart from '../components/charts/incomeChart.js'

export default function Charts(){
  return(
    <React.Fragment>
      <PaymentChart />
      <IncomeChart />
    </React.Fragment>
    )
}