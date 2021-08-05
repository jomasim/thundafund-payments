import React, { useState, useEffect } from "react";
// @ts-ignore
import { useLocation } from "react-router-dom";
// @ts-ignore
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Swal from 'sweetalert2'
// @ts-ignore
import withReactContent from 'sweetalert2-react-content'
// @ts-ignore
import ScrollAnimation from 'react-animate-on-scroll';
import classnames from 'classnames'

import 'sweetalert2/src/sweetalert2.scss'
import { Button, Card, Col, Container, Form, FormControl, InputGroup, ListGroup, Row } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineCalendar, AiFillCaretRight , AiFillCaretUp , AiFillCaretDown} from "react-icons/ai";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import Image, { Shimmer } from 'react-shimmer'
import { FiTruck } from "react-icons/fi";
import { get_payments, get_exhangeRates, submit_bucking } from "../../API/payments_api";
import { loadStripe } from '@stripe/stripe-js';
import "../PaymentsPage.scss";
const MainComponent = (props:any) => {
  const [showGiveMore, setShowGiveMore] = useState(false);
  const [projectData, setprojectData] = useState([]);
  const [payAmount, setPayAmount] = useState(1)
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rewardQuantity, setRewardQuantity] = useState(1);
  const [selectedProjectID, setselectedProjectID] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkedCustomReward, setcheckedCustomReward] = useState(false)
  const [addAditionalAmount, setAdditionalAmount] = useState(0)
  const [deliveryPossible, setDeliveryPossible] = useState(false)
  const NewSwal = withReactContent(Swal)

  const location = useLocation();

  const [exchangeParams, setExchangeParams] = useState({
    'exchange_currency_code': 0,
    'home_currency_rate': 0,
    'away_currency_rate': 0,
    "country_name": '',
    "country_code":''
  })
  const [metadata, setMetaData] = useState({
    "creator": '',
    "project_currency_symbol": '',
    "project_currency_code": '',
    "project_name": '',
    "project_id":'',
    "rfr_doc_link":'',
  })
  const [rewardID, setRewardID] = useState("");
  const [projectID, setProjectID] = useState("");
  const [projectTFCode, setprojectTFCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [personalMessage, setpersonalMessage] = useState("");
  const [deliverAmount, setDeliveryAmount] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");
  const [topValue, settopValue] = useState("80vh");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [env, setEnv]=useState("production");
  const  [currency, setCurrency] =  useState("USD"); 
  const [PaypalPaymentID, setPaypalPaymentID] = useState("");
  const [PaypalEmail, setPaypalEmail] = useState("");
  const [PaypalAmount, setPaypalAmount] = useState("");
  const [PaypalExchangeRate, setPaypalExchangeRate] = useState("");

  //rfr checkbox
  const [rfr, setRfr] =useState(false)
 
  const onSuccess = (payment: any) => {
    var newData = JSON.parse(JSON.stringify(payment));
    var PaypalPaymentID = newData["paymentID"];
    var PayPalemail = newData["email"];
    var PayPalAmount = (((payAmount * rewardQuantity) + +addAditionalAmount+ +deliverAmount) / exchangeParams.home_currency_rate).toFixed(2);
    var exchangeRate = 1 / exchangeParams.home_currency_rate;
    // setPaypalPaymentID(PaypalPaymentID);
    // setPaypalEmail(PayPalemail);
    // setPaypalAmount(PayPalAmount);
    // setPaypalExchangeRate(exchangeRate.toString());
    // SubmitProject();

    // ^ wont work

    if(projectTFCode === ""){
      show_error("Project method is required")
    }
    else if (emailAddress === "") {
      show_error("Email is required")
    } else if (fullName === "") {
      show_error("Full Name is required")
    }
    else if(metadata.rfr_doc_link && !rfr){
      show_error('Agree to Terms and Conditions first!')
    }
    else {
      var total_amount_add = (payAmount * rewardQuantity) + +addAditionalAmount + +deliverAmount;
      var total_amount = total_amount_add.toString();
      var data = new FormData();
      data.append("paypal_payment_id", PaypalPaymentID);
      data.append("paypal_email", PayPalemail);
      data.append("paypal_amount", PayPalAmount);
      data.append("paypal_exchange_rate", exchangeRate.toString());
      data.append("total_amount", total_amount);
      data.append("reward_id", rewardID);
      data.append("reward_quantity", rewardQuantity.toString());
      data.append("project_id", metadata.project_id);
      data.append("provider_tf_code", projectTFCode);
      data.append("email_address", emailAddress);
      data.append("display_name", fullName);
      data.append("phone_number", phoneNumber);
      data.append("personal_message", personalMessage);
      data.append("delivery_amount", deliverAmount.toString());
      data.append("additional_amount", addAditionalAmount.toString());
      data.append("address_1", address1);
      data.append("address_2", address2);
      data.append("city", city);
      data.append("country", exchangeParams.country_name);
      data.append("postcode", postalCode);
      data.append("project_currency_code", metadata.project_currency_code);
      data.append("region", region);

     
      submit_bucking(data).then((res: any) => {
        var resp = JSON.parse(JSON.stringify(res));
        if (resp["redirect"] === true) {
          var url = resp["redirect_url"];
          window.location.replace(url);
        } else {
          if (resp["stripe_session_id"]) {
            var session_id = resp["stripe_session_id"];
            process_stripe(session_id);
          } else {
            NewSwal.fire({
              title: <p>  Your Payment Was Succesful  </p>,
              html: <p> Success. We have recieved your funding</p>,
              icon: "success",
              footer: 'With love. ThundaFund',
              didOpen: () => {

                NewSwal.clickConfirm()
              }
            }).then(() => {

            })
          }
        }

      });
    }


  };

  const onCancel = (data:any) => {
      // console.log('The payment was cancelled!', data);
  }

  const onError = (err:any) => {
      // console.log("Error!", err);
     
  }
  const client = {
      sandbox:    'AWCfRfNF1lRP1WzaPT-QP4-aMiHS957Sru539iQC7ikaqo2g2WxvNdmfKjHWwzJhh4NCcUOd39f7Pq1u',
      production: 'AQTyFF_55yeqGBSawznBkAV-aTBa_VwuPTHNUopG_Qyw-5C6d-NYQ9-J6aSQlWEGxaazhjD4ATOvRUeM',
  }
  useEffect(()=>{
    get_parameters(call_exchangeRate);
   
  }, []);
  
  useEffect(()=>{
    const query = new URLSearchParams(location.search)
    const rewardId = query.get('reward') || ''
    const el = document.querySelector(`input[value="${rewardId}"]`)
    if(rewardId && el){
      // @ts-ignore
      el.click()
    }
  }, [exchangeParams])
  
  const get_parameters = (callback:any) => {
    var projectID = props.projectid;
    get_payments(projectID).then((res: any) => {
      var payment_data = JSON.parse(JSON.stringify(res));
      // sort rewards according to reward amount
      const data = payment_data["project_data"]["rewards"].sort((a:any, b:any)=> a.reward_amount - b.reward_amount)
      setprojectData(data);
      var json_node = payment_data["project_data"]
      setMetaData({
        ...metadata,
        "creator": json_node["creator"],
        "project_currency_symbol": json_node["project_currency_symbol"],
        "project_currency_code": json_node["project_currency_code"],
        "project_name": json_node["project_name"],
        "project_id": json_node["project_id"],
        "rfr_doc_link": json_node["rfr_doc_link"],
      })
      callback(json_node["project_currency_code"]);
    })
  }

  async function call_exchangeRate(country_code:any) {
    var exchange_params = await get_exchangeRate();
     // @ts-ignore
     var home_curr_rate = exchange_params["exchange_rates"]["rates"][country_code];
    // @ts-ignore
    var home_curr_code = exchange_params["currency_code"];
     // @ts-ignore
     var country_code = exchange_params["country_code"];

     // @ts-ignore
    var away_crr_rate = exchange_params["exchange_rates"]["rates"][home_curr_code]
    var converted_amount = Math.trunc(1 / home_curr_rate * away_crr_rate * payAmount);
     // @ts-ignore
    var country_name = exchange_params["country_name"];
    setConvertedAmount(converted_amount);
    setExchangeParams({
      ...exchangeParams,
      "exchange_currency_code": home_curr_code,
      "home_currency_rate": home_curr_rate,
      "away_currency_rate": away_crr_rate,
      "country_name": country_name,
      "country_code":country_code
    })
  }
  async function get_exchangeRate() {
    return new Promise(function (resolve, reject) {
      get_exhangeRates().then((response) => {
        var resp = JSON.parse(JSON.stringify(response));
        // rate = resp["exchange_rates"]["rates"][currency_code];
        resolve(resp);
      })
    })
  }

  const reduceRewards = (projectId: any) => {
    if(selectedProjectID !== projectId){
      const el = document.querySelector(`input[value="${projectId}"]`)
      // @ts-ignore
      el.click()
      setRewardQuantity(1);
    }else if(rewardQuantity > 1){
      setRewardQuantity(rewardQuantity - 1);
    }
   
  }
  const increaseRewards =(projectId:any)=>{
    if(selectedProjectID !== projectId){
      const el = document.querySelector(`input[value="${projectId}"]`)
      // @ts-ignore
      el.click()
      setRewardQuantity(2);
    }else{
      setRewardQuantity(rewardQuantity + 1);
    }
   
  }
  const setPayoutValues = (e:any) => {
    setcheckedCustomReward(true);
    // select custom option on change
    setcheckedCustomReward(true)
    setPayAmount(e);
  }
  const helpWithOutRewards = () => {

    var el = document.getElementById("projectFunding");
    // @ts-ignore
    el.classList.add("animate__animated");
    // @ts-ignore
    el.classList.add("animate__bounce");
    // @ts-ignore
    el.classList.add("animate__repeat-2");

    setcheckedCustomReward(true);
    setDeliveryPossible(false);
    setDeliveryAmount(0)
    setAdditionalAmount(0);
    setRewardID("1");
    setPayAmount(1);
    setRewardQuantity(1);
  }
  const helpWithRewards = (id:any,amount:any, international_shipping_cost:any , local_shipping_const:any) => {

    setRewardQuantity(1);
    setselectedProjectID(id);
    setcheckedCustomReward(false);
    setPayAmount(amount);
    setDeliveryPossible(true);
    setRewardID(id);
    var el = document.getElementById("projectFunding");
    // @ts-ignore
    el.classList.add("animate__animated");
    // @ts-ignore
    el.classList.add("animate__bounce");
    // @ts-ignore
    el.classList.add("animate__repeat-2");
    if (`${exchangeParams.exchange_currency_code}` === metadata.project_currency_code) {
      setDeliveryAmount(local_shipping_const);
    }else{
      setDeliveryAmount(international_shipping_cost);
    }

  }
  const setAddAmount = (e:any) => {
    setAdditionalAmount(e);
  }
  const moveToFund = (e: any) => {
    e.preventDefault();

    // window.location.href = "#projectFunding";
  }
  const show_error = (error_message: any) => {
    Swal.fire(
      error_message,
      'Please fill in this field',
      'error'
    )
}
const formIsValid = () => {
  return projectTFCode && emailAddress && fullName
}
  const SubmitProject = () => {
    // e.preventDefault();
    if(projectTFCode === ""){
      show_error("Project method is required")
    }
    else if (emailAddress === "") {
      show_error("Email is required")
    } else if (fullName === "") {
      show_error("Full Name is required")
    } else if(metadata.rfr_doc_link && !rfr){
      show_error('Agree to Terms and Conditions first!')
    }
     else {
      var total_amount_add = (payAmount * rewardQuantity) + +addAditionalAmount + +deliverAmount;
      var total_amount = total_amount_add.toString();
      var data = new FormData();
      data.append("paypal_payment_id", PaypalPaymentID);
      data.append("paypal_email", PaypalEmail);
      data.append("paypal_amount", PaypalAmount);
      data.append("paypal_exchange_rate", PaypalExchangeRate);
      data.append("total_amount", total_amount);
      data.append("reward_id", rewardID);
      data.append("reward_quantity", rewardQuantity.toString());
      data.append("project_id", metadata.project_id);
      data.append("provider_tf_code", projectTFCode);
      data.append("email_address", emailAddress);
      data.append("display_name", fullName);
      data.append("phone_number", phoneNumber);
      data.append("personal_message", personalMessage);
      data.append("delivery_amount", deliverAmount.toString());
      data.append("additional_amount", addAditionalAmount.toString());
      data.append("address_1", address1);
      data.append("address_2", address2);
      data.append("city", city);
      data.append("country", exchangeParams.country_name);
      data.append("postcode", postalCode);
      data.append("project_currency_code", metadata.project_currency_code);
      data.append("region", region);
      // @ts-ignore
      console.log('data', data.get('postcode'))

      submit_bucking(data).then((res: any) => {
        var resp = JSON.parse(JSON.stringify(res));
        if (resp["redirect"] === true) {
          var url = resp["redirect_url"];
          window.location.replace(url);
        } else {
          if (resp["stripe_session_id"]) {
            var session_id = resp["stripe_session_id"];
            process_stripe(session_id);
          } else {
            NewSwal.fire({
              title: <p>  Your Payment Was Succesful  </p>,
              html: <p> Success. We have recieved your funding</p>,
              icon: "success",
              footer: 'With love. ThundaFund',
              didOpen: () => {

                NewSwal.clickConfirm()
              }
            }).then(() => {

            })
          }
        }

      });
    }
  };
  async function process_stripe(session_id: any) {
    const stripePromise = loadStripe('pk_live_vW1WVfbN38obaistg11z86Yl00aPoYvVn4');
    const stripe = await stripePromise;
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await stripe.redirectToCheckout({
      sessionId: session_id,
    });
  }
  const setProjectFunding = (is_open: any) => {
    if (is_open) {
      settopValue("90vh");
      setCheckoutOpen(false);
    } else {
      setCheckoutOpen(true);
      var el = document.getElementById("projectFunding");
      settopValue("0vh")
       // @ts-ignore
      el.style.zIndex = 1;
         // @ts-ignore
      el.style.bottom = 0;
    }

  }

  const cancel_amount = () => {
    setShowGiveMore(false);
    setAdditionalAmount(0);
  }
    
  return <div className="MainComponent">

    <Container>
      <Row>
        <Col sm={12} lg={12} md={12} className="MainComponent_header">
          <h5> {metadata.project_name} </h5>
          <h6> <span>by </span>  <a href="/#"> {metadata.creator} </a>  </h6>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={8} md={7} className="MainComponent_content">
          <Form>
            <ul>
              <li >
                <Card className="shadow">
                  <Card.Body>
                    <p>
                      <Form.Check type="radio"
                        name="rewards"
                        checked={checkedCustomReward}
                        id="customReward"
                        onChange={()=>helpWithOutRewards()}
                        label="Help Fund without recieving a reward" />
                    </p>
                    <p>
                      <div className="input_enter">
                       
                        <Col sm={12} md={6} lg={6} xs={12} className="pledge_box">
                        <span> Custom Pledge </span>
                        <div className="clear-fix"></div>
                          <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                            Amount
                            </Form.Label>
                          <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                              <InputGroup.Text>{metadata.project_currency_symbol}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="inlineFormInputGroup" disabled={false}   value={checkedCustomReward ? payAmount : 1}  onChange={(e)=>setPayoutValues(e.target.value)} placeholder="Amount" type="number" />
                          </InputGroup>
                          <span className={convertedAmount === 0 ? "d-none " : "d-block converted_amt"}  >  <CgArrowsExchangeAlt style={{fontSize:20}}/> {exchangeParams.exchange_currency_code}:
              {checkedCustomReward ? Math.trunc(1 / exchangeParams.home_currency_rate * exchangeParams.away_currency_rate * payAmount): 1 }  </span>
                        </Col>
                        
                     </div>
                    </p>

                </Card.Body>
                </Card>
              </li>
              {projectData && //check for rewards not null
                  projectData.map((value: any, index: any) => {
                    return (<ScrollAnimation animateIn = "fadeIn" >
                      <li key={index}>
                <Card className="shadow">
                  <Card.Body>
                    <Row className="mb-3">
                              <Col lg={9} md={9} sm={9} xs={12}>
                                <Form.Check type="radio"
                                  name="rewards"
                                  defaultChecked={false}
                                onClick={() => helpWithRewards(value.id, value.reward_amount,  value.intl_shipping_cost, value.local_shipping_cost )}
                                value={value.id}
                                label={value.reward_currency+ " "+value.reward_amount+ " "+  value.name} />  </Col>
                      <Col lg={3} md={6} sm={6} xs={6} className="increase_decrease">
                               
                      <div className="input-group cart_controller">
          <span className="input-group-btn">
              <button type="button" onClick={()=>reduceRewards(value.id)} className="btn btn-default btn-number"  data-type="minus" data-field="quant[1]">
                 <AiOutlineMinus/>
              </button>
          </span>
                                  <input type="number" className="form-control input-number" value={selectedProjectID === value.id ? rewardQuantity : 1 } min="1" max="10"/>
          <span className="input-group-btn">
              <button onClick={()=>increaseRewards(value.id)}  type="button" className="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                 <AiOutlinePlus/>
              </button>
          </span>
      </div>
                      </Col>
                    </Row>

                    <Row className="reward_story">
                      <Col xs={12} md={3} sm={3} lg={3}>
                      <Image src={value.image_url}  fallback={<Shimmer width={100} height={100} duration={30} />} />
                      </Col>
                      <Col xs={12} md={9} sm={12} lg={9}>
                                <p> {value.rewarddescription} 
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} lg={12} className="border-top  border-bottom pt-1 pb-1">
                        <Row className="time_estimates">
                                  <Col xs={6} md={6} lg={6} sm={6}>  <AiOutlineCalendar />  &nbsp;   <span> Estimated  { value.delivery_date} </span></Col> 
                                  <Col xs={6} md={6} lg={6} sm={6}>  <FiTruck /> &nbsp;   <span> Delivery To   {value.shipping_details === "local" ?  <> Local</> : <> Local and International </>}      </span></Col>
                        </Row>

                      </Col>
                    </Row>


                    <div className="clearfix"> </div>
                    <Row className="mt-2">

                              {showGiveMore ? <>
                                {selectedProjectID === value.id ? <>
                                  <Col xs={12} md={12} lg={12}>
                          <InputGroup className="mb-3">
                                      <FormControl
                                        onChange={(e)=>setAddAmount(e.target.value)}
                              placeholder="Enter Amount"
                              aria-label="Amount"
                                        aria-describedby="basic-addon2"
                                        type="number"
                            />
                            <InputGroup.Append>
                              <Button onClick={()=>cancel_amount()} variant="danger">Cancel</Button>
                            </InputGroup.Append>
                          </InputGroup>
                      </Col>
                                </> : <> </>}
                       
                      </> : <>
                        <Col xs={12} md={12} lg={12} className="give_more">
                        <span>Want to give More?</span> 
                                    <div className="clearfix"> </div>
                                    <>   {selectedProjectID === value.id ?  
                                         <span className="sp" onClick={()=>setShowGiveMore(true)}> <AiOutlinePlus/> Additional Amount  </span>
                                      :
                                      <span className="sp" > <AiOutlinePlus/> Additional Amount  </span>
                                         }    </>
                     
                      </Col>
                      
                      </>}
                  
                   </Row>

                </Card.Body>
                </Card>
              </li> </ScrollAnimation>);
                  })}




              
            </ul>
        </Form>
        </Col>
        

        <Col sm={12} lg={4} md={5} xs={12} style={{ top: topValue }}  id="projectFunding" className="projectFunding">
          <Card style={{ width: '100%' }}>
            <Card.Header>Total Cost: {metadata.project_currency_symbol} {(payAmount * rewardQuantity) + +addAditionalAmount + +deliverAmount} &nbsp;
            <span className="float-right open_icons">  {checkoutOpen ? <> <AiFillCaretDown  onClick={(e:any)=>setProjectFunding(checkoutOpen)} /> </> : <>  <AiFillCaretUp onClick={(e:any)=>setProjectFunding(checkoutOpen)}  /> </>}   </span>
              <div className="clearfix"></div>
              <span className="converted_amt">  + Addtional Amount {addAditionalAmount}   </span> <br />
              <span className="converted_amt">  + Delivery Amount { deliverAmount}   </span>
              
             </Card.Header>
            <Card.Subtitle className="mb-2 mt-3 pl-3 text-muted">Select Payment Method</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>       <Form.Check  onClick={(e:any)=>setprojectTFCode(e.target.value)} type="radio" value="TFP-SP3" name="paymentoption"  label="Visa/Master Card (International)" /> </ListGroup.Item>

              <ListGroup.Item>       <Form.Check onClick={(e:any)=>setprojectTFCode(e.target.value)}  type="radio" value="TFP-SP2" name="paymentoption"  label="EFT Bank Transfer" /> </ListGroup.Item>
              <ListGroup.Item>       <Form.Check onClick={(e:any)=>setprojectTFCode(e.target.value)}  type="radio" value="TFP-SP1" name="paymentoption" label="Mpesa (Mobile Money)" /> </ListGroup.Item>
              <ListGroup.Item>       <Form.Check onClick={(e:any)=>setprojectTFCode(e.target.value)}   type="radio" value="TFP-SP5" name="paymentoption"   label="Paypal" /> </ListGroup.Item>

            </ListGroup>
          </Card>

          <Card className="mt-3" style={{ width: '100%' }}>
            <Card.Header>Personal Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={emailAddress} onChange={(e:any)=>setEmailAddress(e.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Full Names</Form.Label>
                  <Form.Control value={fullName} onChange={(e:any)=>setFullName(e.target.value)}  type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="formBasicDisplayName">
                  <Form.Label>Display Name (optional)</Form.Label>
                  <Form.Control value={displayName} onChange={(e:any)=>setDisplayName(e.target.value)}  type="text" placeholder="Anonymous if blank" />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control value={phoneNumber} onChange={(e:any)=>setPhoneNumber(e.target.value)}  type="text" placeholder="Mobile Number" />
                </Form.Group>

                <Form.Group controlId="formBasicmessage">
                  <Form.Label>Personal Message (Optional)</Form.Label>
                  <Form.Control value={personalMessage} onChange={(e:any)=>setpersonalMessage(e.target.value)}  type="text" placeholder="Your  Message" />
                  <Form.Text className="text-muted">
                    This will be displayed on the campaign page.
                    </Form.Text>
                </Form.Group>
                { metadata.rfr_doc_link && 
                  <Card style={{ width: '18rem', marginBottom: '10px' }}>
                    <Card.Body>
                      <Card.Title>Terms and Conditions</Card.Title>
                      <Card.Text>
                      By contributing to this campaign you agree to Thundafunds Terms and Conditions
                      </Card.Text>
                      <Card.Link href={metadata.rfr_doc_link} target="_blank">Terms and Conditions</Card.Link>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Agree" onChange={(e:any)=> setRfr(e.target.checked)} />
                      </Form.Group>
                    </Card.Body>
                  </Card> 
                }
                <div className={ deliveryPossible ? "d-none " : "d-block"} > 
                {projectTFCode === "TFP-SP5" ? <>
  <PaypalExpressBtn env={env}
  client={client} 
  currency={currency}
  total={(((payAmount * rewardQuantity) + +addAditionalAmount + +deliverAmount)/exchangeParams.home_currency_rate).toFixed(2)}
  onError={onError} 
  onSuccess={onSuccess}
  paymentOptions={{transactions:[{custom: `${metadata.project_id}-${rewardID}`, amount:{ total: (((payAmount * rewardQuantity) + +addAditionalAmount+ +deliverAmount)/exchangeParams.home_currency_rate).toFixed(2), currency}}]}}
  style={
    {
      size: 'responsive',
      color: "blue",
      shape: "rect"

    }
  }
  onCancel={onCancel} />
</> : <> 

  <Button  type="button" onClick={()=>SubmitProject()} className={classnames("mb-2", {"next-pay": formIsValid()})} variant="secondary" size="lg" block>
                  Next Pay  &nbsp; <AiFillCaretRight/>
                   </Button>
</>}
              {!metadata.rfr_doc_link &&
                (<span className="text-center pt-2">
                  By contributing to this campaign you agree to Thundafunds Terms and Conditions
                </span>)}
                </div>

              </ListGroup.Item>
    </ListGroup>
          </Card>
          
          <Card className={ deliveryPossible ? "d-block mt-3" : "d-none"}  style={{ width: '100%' }}>
            <Card.Header>Delivery Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Address 1</Form.Label>
                  <Form.Control  value={address1} onChange={(e:any)=>setAddress1(e.target.value)}  type="text" placeholder="Address Line 1" />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control  value={address2} onChange={(e:any)=>setAddress2(e.target.value)} type="text" placeholder="Address 2" />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Country </Form.Label>
                  <Form.Control  value={country} onChange={(e:any)=>setCountry(e.target.value)} type="text" placeholder="Country" />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control  value={postalCode} onChange={(e:any)=>setPostalCode(e.target.value)} type="text" placeholder="Postal Code" />
                </Form.Group>


                <Form.Group controlId="formBasicName">
                  <Form.Label>City</Form.Label>
                  <Form.Control  value={city} onChange={(e:any)=>setCity(e.target.value)} type="text" placeholder="City" />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Province</Form.Label>
                  <Form.Control  value={region} onChange={(e:any)=>setRegion(e.target.value)} type="text" placeholder="Province" />
                </Form.Group>
                <div> 
                {projectTFCode === "TFP-SP5" ? <>
  <PaypalExpressBtn env={env}
  client={client} 
  currency={currency}
  total={(((payAmount * rewardQuantity) + +addAditionalAmount+ +deliverAmount)/exchangeParams.home_currency_rate).toFixed(2)}
  onError={onError} 
  onSuccess={onSuccess}
                    description={projectID}
                    custom={rewardID}
                    paymentOptions={{transactions:[{custom: `${metadata.project_id}-${rewardID}`, amount:{ total: (((payAmount * rewardQuantity) + +addAditionalAmount+ +deliverAmount)/exchangeParams.home_currency_rate).toFixed(2), currency}}]}}
  onCancel={onCancel} />
</> : <> 

  <Button  type="button" onClick={()=>SubmitProject()} className="mb-2 next-pay" variant="secondary" size="lg" block>
                  Next Pay  &nbsp; <AiFillCaretRight/>
                   </Button>
</>}

                <span className="text-center mt-2">
                  By contributing to this campaign you agree to Thundafunds Terms and Conditions
                </span>
                </div>
              </ListGroup.Item>
    </ListGroup>
</Card>
        
        
        </Col>

    
      </Row>
    </Container>
  </div>
};

export default MainComponent; 