<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    $nameVal = strlen($name);
    $phoneVal = strlen($phone);

    
    
    if ($nameVal < 3) {
    }else{
        if (!valid_email($email)) {
        }else{
            if ($phoneVal < 10) {
            } else {
                // Set the recipient email address
                $to = "shridharkengar@example.com"; // Replace with your email address
                
                // Subject and phone body
                $subject = "Contact Form Submission from $name";
                $msg = "Name: $name\nEmail: $email\nphone: $phone";
                
                // Additional headers
                $headers = "From: $email\r\n";
                
                // Send the email
                if (mail($to, $subject, $msg, $headers)) {
            
                    echo 'ok';
                    exit();
                    // echo "Email sent successfully!";
                    //  "Email sent successfully!";
                } else {
                    echo 'no';
                    exit();
                    // echo "Email could not be sent. Please try again later.";
                }
            }
        }
    }
    
    
}

function valid_email($email) {
    return (!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $email)) ? FALSE : TRUE;
}
?>
