import React, { Component ,useEffect,useState} from 'react'
import GPayButton from 'react-google-pay-button'
const withQuery = require('with-query').default
const stringifyObject= require('stringify-object')


const GooglePay =(props)=> {
  
  const [paymentMethods,setPaymentMethods] = useState(
    [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            'gateway': 'stripe',
            'stripe:version': '2019-03-14',
            'stripe:publishableKey': ''
            //'stripe:publishableKey': info.stripepublickey
           
          }
        }
      },
      {
        type: 'PAYPAL',
        parameters: {
          'purchase_context': {
            'purchase_units': [{
              'payee': {
                'merchant_id':''
                // 'merchant_id': info.paypalid
                
              }
            }]
          }
        },
        tokenizationSpecification: {
          type: 'DIRECT'
        }
      }
    ]
  )
  const [info,setInfo]=useState(null)
  
  useEffect(()=>{
    
    if (info!=null){
      console.log(stringifyObject(info))
      setPaymentMethods(
        [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                'gateway': 'stripe',
                'stripe:version': '2019-03-14',
                'stripe:publishableKey':''
                //'stripe:publishableKey': info.stripepublickey
                
              }
            }
          },
          {
            type: 'PAYPAL',
            parameters: {
              'purchase_context': {
                'purchase_units': [{
                  'payee': {
                    'merchant_id':''
                    // 'merchant_id': info.paypalid
                   
                  }
                }]
              }
            },
            tokenizationSpecification: {
              type: 'DIRECT'
            }
          }
        ]
      )
      
    }
    console.log(paymentMethods)
  },[info])
  
  useEffect(()=>{
    fetch(withQuery('https://squwbs.herokuapp.com/getgooglepayliveready', {
    //fetch(withQuery('https://squwbs.herokuapp.com/getgooglepaysandboxready', {
    
      mode:'cors'
    }))
    .then(result=>{
      console.log('got result from getgooglepayready')
      return result.json()
    })
    .then((json)=>{
      //setState({...state,userData:{...json}})
      
      //console.log(stringifyObject(json))
      //setpaypalID(json.paypalid)
      //return json
      setInfo(json)
    })
    .catch((err)=>{
      console.error(err)
    })
  },[])

  
  const loadPaymentDataHandler = (paymentData) => {
    const paymentToken = paymentData.paymentMethodData.tokenizationData.token
  }
  if (info!=null){
    return (
      <GPayButton
 
        totalPriceStatus={'FINAL'}
        totalPrice={'49.99'}
        currencyCode={'USD'}
        countryCode={'US'}
        allowedPaymentMethods={paymentMethods}
        development={true}
        merchantInfo={{
          merchantName: info.googlepaymerchantname,
          
          //merchantName:'',
          // A Google merchant identifier issued after your website is approved by Google ✅
          merchantId: info.googlepaymerchantid
         
          //merchantId:''
        }}
        onLoadPaymentData={loadPaymentDataHandler}
      />
    )
  }
  else{
    return(null)
  }
  
}
export default GooglePay