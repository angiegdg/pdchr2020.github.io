/*

Script  : Contact Form
Version : 1.0
Author  : Surjith S M
URI     : http://themeforest.net/user/surjithctly

Copyright © All rights Reserved
Surjith S M / @surjithctly

*/

$(function() {

    "use strict";

    /* 
    VALIDATE
    -------- */

    $("#phpcontactform").submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                number: true
            },
            message: "required",
        },
        messages: {
            first_name: "Your first name please",
            last_name: "Your last name please",
            email: "We need your email address",
            phone: "Please enter your phone number",
            message: "Please enter your message",
        },
        submitHandler: function(form) {

            $("#js-contact-btn").attr("disabled", true);

            /* 
            CHECK PAGE FOR REDIRECT (Thank you page)
            ---------------------------------------- */

            var redirect = $('#phpcontactform').data('redirect');
            var noredirect = false;
            if (redirect == 'none' || redirect == "" || redirect == null) {
                noredirect = true;
            }

            $("#js-contact-result").html('<p class="help-block">Please wait...</p>');

            /* 
            FETCH SUCCESS / ERROR MSG FROM HTML DATA-ATTR
            --------------------------------------------- */

            var success_msg = $('#js-contact-result').data('success-msg');
            var error_msg = $('#js-contact-result').data('error-msg');

			var name_1 = $("#first_name").val();
			var name_2 = $("#last_name").val();
			var email = $("#email").val();
			var phone = $("#phone").val();
			var message = $("#message").val();
			var data = {
			  first_name : name_1,
			  last_name : name_2,
			  phone : phone,
			  email : email,
			  message : message
			};
            
            /* 
             AJAX POST
             --------- */
                             
            $.ajax({
                url: "https://xb831en76l.execute-api.us-east-1.amazonaws.com/beta/contact-us",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: "true",
                data: JSON.stringify(data),                
                success: function(e) {
                    $(".form-group").removeClass("has-success");
                    
                        if (noredirect) {
                            $('#js-contact-result').fadeIn('slow').html('<div class="alert alert-success top-space">Sent Email</div>').delay(3000).fadeOut('slow');
                        } else {
                            window.location.href = redirect;
                        }
                    
                    $("#js-contact-btn").attr("disabled", false);
                },
                error: function (e) {
		            $('#js-contact-result').fadeIn('slow').html('<div class="alert alert-danger top-space">At this time it is not possible to send your mail.</div>').delay(3000).fadeOut('slow');
		        	$("#js-contact-btn").attr("disabled", false);
		        }
            });
            return false;

        }
    });

})
