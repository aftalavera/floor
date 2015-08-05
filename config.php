<?php
require_once('vendor/autoload.php');

$stripe = array(
//  "secret_key"      => getenv('secret_key'),
  "secret_key"      => 'sk_live_F7FNJVUQNb0eAwdgGEXSG48r',
//  "publishable_key" => getenv('publishable_key')
  "publishable_key" => 'pk_live_lMm5Q9VSV1e38fqEQHta7yW6'
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);

//var_dump($stripe);

