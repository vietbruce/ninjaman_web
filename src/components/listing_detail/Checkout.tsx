import React from 'react'
import Container from '../Container'
import {appContext} from '../../App'
import {CardElement, injectStripe} from 'react-stripe-elements'
import './Checkout.css'
import {Link} from 'react-router-dom'
import * as Page from '../../context/navigation'
import useRouter from 'use-react-router'

enum PaymentMethod {
  Cash = 0,
  CreditCard = 1
}

const Checkout: React.FC = () => {
  const context = React.useContext(appContext)
  const {history} = useRouter()
  const service = context.data.service.get.info

  const [selectedMethod, setMethod] = React.useState(PaymentMethod.Cash)

  console.log('Checkout', context) // REMOVE

  const items = context.data.query.answers.map(a => a.get)
  const purchase = items.reduce((prev, cur) => prev + ' > ' + cur)

  const onBackClick = () => {
    history.goBack()
  }

  const onMethodClick = (method: PaymentMethod) => {
    if (selectedMethod !== method) {
      setMethod(method)
    }
  }

  const paymentMethodSelect = () => {
    const mkMethod = (m: PaymentMethod, isActive: boolean = false) => {
      return (
        <li key={m} className={isActive ? 'is-active' : ''}>
          <a onClick={() => onMethodClick(m)}>
            <span className="icon is-small">
              <i className="fas fa-image" aria-hidden="true"/>
            </span>
            <span>Cash</span>
          </a>
        </li>
      )
    }

    const methods = [PaymentMethod.Cash, PaymentMethod.CreditCard].map(m => {
      return mkMethod(m, m === selectedMethod)
    })

    return (
      <div className="tabs is-boxed">
        <ul>
          {methods}
        </ul>
      </div>
    )
  }

  const renderMethod = () => {
    if(selectedMethod === PaymentMethod.Cash) {
      return "Cash payment"
    }
    else {
      return <CardElement/>
    }
  }

  return (
    <div className="Checkout v_padding_80">
      <Container isSmall={true}>
        <h1 className="title text_centered">Time to pay mate :)</h1>

        <div className="margin_top_80">
          <h1 className="title is-5">Your booking</h1>

          <div className="columns">
            <div className="column">
              {purchase}
            </div>

            <div className="column is-narrow">
              <p className="text_right"><b>99.000 VND</b></p>
            </div>
          </div>
        </div>

        <hr className="margin_top_80"/>

        <div>
          <h1 className="title is-5">Payment method</h1>

          {paymentMethodSelect()}

          {renderMethod()}

          <hr className="margin_top_40"/>

          <div className="columns v_margin_20">
            <div className="column is-narrow">
              <button className="button" onClick={() => onBackClick()}>
                Back
              </button>
            </div>

            <div className="column"/>

            <div className="column is-narrow">
              <Link to={Page.checkout(service).path}>
                <button className="button is-info">
                  Pay
                </button>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default injectStripe(Checkout)
