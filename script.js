const form = document.getElementById('form');
const uname = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
// Popup Modal 
const popup = document.getElementById("form");
const modal = document.getElementById("myModal");
        
// Form Close
const span = document.getElementsByClassName("modal-close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

document.getElementById("model1").addEventListener("click", function() {
    openForm("https://example.com/form1");
});

document.getElementById("model2").addEventListener("click", function() {
    openForm("https://example.com/form2");
});

document.getElementById("model3").addEventListener("click", function() {
    openForm("https://example.com/form3");
});

form.addEventListener('submit', e => {
    e.preventDefault();

    ValidateInputs();

    
});

const setError = (element, message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

    
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ValidateInputs = () => {
    const nameVal = uname.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    // const sname = "" , semail = "", sphone = "";

    if (nameVal == "") {
        setError(uname, 'Name is Required.');
    } else if (nameVal.length<3) {
        setError(uname, 'name is mininum 3 leatter add');
    }else{
        setSuccess(uname);
        if (emailVal == "") {
            setError(email, 'Email is Required.');
        } else if (!isValidEmail(emailVal)) {
            setError(email, 'Provide a valid email address');
        } else{
            setSuccess(email);
            if (phoneVal == "") {
                setError(phone, 'Phone is Required.');
            } else if (phoneVal.length < 10) {
                setError(phone, 'Phone number must be at least 10 character.')
            } else{
                setSuccess(phone);
                function openForm(redirectURL) {
                    // Display the contact form
                    modal.style.display = "block";
                
                    // Add a form submission handler
                    $(document).ready(function() {
                        $("#form").submit(function(event) {
                          // document.getElementById("myForm").addEventListener("submit", function(e) {
                          event.preventDefault(); // Prevent the default form submission
                          
                          // Get form data
                          var formData = {
                              name: $("#name").val(),
                              email: $("#email").val(),
                              phone: $("#phone").val()
                          };
                
                          // Send data to PHP script using AJAX
                            $.ajax({
                                type: "POST",
                                url: "mailer.php",
                                data: formData,
                                success: function(response) {
                                                        
                                    if (response == "ok") {
                                        
                                        // Simulate a successful form submission
                                        alert("Form submitted successfully!");
                
                                        // Clear form fields
                                        document.getElementById("name").value = "";
                                        document.getElementById("email").value = "";
                                        document.getElementById("phone").value = "";
                                        
                                        // Redirect to the specified URL
                                        window.location.href = redirectURL;
                                    } else if (response == "no") {
                                        // Simulate a successful form submission
                                        alert("Form could not be submit. Please try again later.");
                                        
                                        // Clear form fields
                                        document.getElementById("name").value = "";
                                        document.getElementById("email").value = "";
                                        document.getElementById("phone").value = "";                        
                                    }
                                }
                            });
                        });
                    });
                }
            }
        }
    }



    
}

