<?php

  require_once('./config.php');

  $token  = $_POST['stripeToken'];
  $email  = $_POST['email'];
  $number   = $_POST['number'];


try {
  $customer = \Stripe\Customer::create(array(
      'email' => $email,
      'card'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => 50000,
      'currency' => 'usd',
      'description' => 'Reservation booth #' . $number
  ));
}

catch (Exception $e) {
    $error = $e->getMessage();
}

if ($error) {
  echo $error;
} 
else {
  echo 'success';
}
