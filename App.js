import React, { useState } from "react";
import GooglePayButton from "@google-pay/button-react";
import "./style.css";

export default function App() {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example"
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant"
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US"
    },
    callbackIntents: ["PAYMENT_AUTHORIZATION"]
  };

  const [buttonColor] = useState("default");
  const [buttonType] = useState("buy");
  const [buttonSizeMode] = useState("static");
  const [buttonWidth] = useState(240);
  const [buttonHeight] = useState(40);

  const isTop = window === window.top;

  return (
    <div>
      <div className="demo">
        <h1>PAYMENT TEST</h1>
        <h3>using GooglePayButton</h3>
        <h4> </h4>
        <GooglePayButton
          environment="TEST"
          buttonColor={buttonColor}
          buttonType={buttonType}
          buttonSizeMode={buttonSizeMode}
          paymentRequest={paymentRequest}
          onLoadPaymentData={paymentRequest => {
            console.log("load payment data", paymentRequest);
          }}
          onPaymentAuthorized={() => ({ transactionState: "SUCCESS" })}
          style={{ width: buttonWidth, height: buttonHeight }}
        />
      </div>

      <div className="note" style={{ display: isTop ? "none" : "" }}>
        <p>
          Note: This page may need to open in a new window for it to function
          correctly.
        </p>
        <p>
          <a href="/" target="_blank">
            Open in new window
          </a>
          .
        </p>
      </div>
    </div>
  );
}
