<?php
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$message = $_POST["message"];

$EmailTo = 'pushkarkhedekar@gmail.com';
$Subject = 'Message for Pushkar';

$Body = "<strong>Name: </strong> $name<br/>";
$Body .= "<strong>Email: </strong> $email<br/>";

if ($phone != NULL){
$Body .= "<strong>Phone Number: </strong> $phone<br/>";
}
$Body .= "<strong>Message: </strong> $message<br/>";



$headers = 'From: '.$email."\r\n" ;
$headers .='Reply-To: '.$email. "\r\n" ;
$headers .='X-Mailer: PHP/' . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

// send email
$success = mail($EmailTo, $Subject, $Body, $headers );

// redirect to success page
if ($success){
   echo "success";
}else{
    echo "invalid";
}

?>
