$(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $("nav a, footer a[href='#name']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

});

/* Shrink Nav Bar */
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
// if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.querySelector("header").style.padding = "1em 3em";
//     document.querySelector(".logo").style.width = "25%";
//     document.getElementById('name').style.padding = "0";
//     document.querySelector('.name-tag h1').style.fontSize = "2.5rem";
//     document.querySelector('.name-tag h1').style.margin = "10px 0";
//     document.querySelector('.name-tag h3').style.fontSize = "1rem";
// } else {
//     document.querySelector("header").style.padding = "3em";
//     document.querySelector(".logo").style.width = "25%";
//     document.getElementById('name').style.padding = "2em";
//     document.querySelector('.name-tag h1').style.fontSize = "4rem";
//     document.querySelector('.name-tag h1').style.margin = "20px 0";
//     document.querySelector('.name-tag h3').style.fontSize = "1.6rem";
// }
// }

/* email Pop-up window */
document.querySelectorAll('.work-container .popup img').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup-image').style.display = 'block';
        document.querySelector('.popup-image img').src = image.getAttribute('src').replace("/thumbnail", "");

    }
});

document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.popup-image').style.display = 'none';
}



/* mobile burger menu */
const menuBtn = document.querySelector('.menu-btn'),
    menu = document.querySelector('nav ul'),
    exitBtn = document.querySelector('.exit-btn');

menuBtn.addEventListener('click', () => {
    menu.style.transform = 'translateX(0)';
})

exitBtn.addEventListener('click', () => {
    menu.style.transform = 'translateX(100%)';
})

//function getModal()
$.fn.getModal = function (info) {

    var info = info.toString();

    if (info == "true") {
        $("#info").html('Thank you for your comment. I will contact you soon.').css('color', '#555').slideDown();
    } else {
        $("#info").html('Could not send mail! Sorry!').css('color', '#fc5476').slideDown();
    }

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");
    //var btn = document.getElementById("#submit");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        document.getElementById("contact").reset();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("contact").reset();
        }
    }
}

//function validate()
function validate() {
    var fname = $("#firstname").val(); // First Name
    var lname = $("#lastname").val();	// Last Name
    var email = $("#email").val(); // Email
    var comment = $("#comment").val(); // Comment

    // Checking for blank fields.
    if (fname != '') {
        $("#errfirstname").text("");
    }
    if (lname != '') {
        $("#errlastname").text("");
    }
    if (email != '') {
        $("#erremail").text("");
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(mailformat)) {
            if (comment == '') {
                $("#errcomment").text("Please write something, so I can learn more about you. ");
                $("#comment").focus();
            }
        } else {
            $("#erremail").text("You have entered an invalid email address!");
            $("#email").focus();
            return false;
        }
    }
    if (comment != '') {
        $("#errcomment").text("");
    }
    // Checking for blank fields.
    if (fname == '' || lname == '' || email == '' || comment == '') {
        if (fname == '') {
            $("#errfirstname").text("First name is required");
            $("#firstname").focus();
            return false;
        }
        if (lname == '') {
            $("#errlastname").text("Last name is required");
            $("#lastname").focus();
            return false;
        }
        if (email == '') {
            $("#erremail").text("Your email address is required");
            $("#email").focus();
            return false;
        }
        if (comment == '') {
            $("#errcomment").text("Please write something, so I can learn more about you.");
            $("#comment").focus();
            return false;
        }
    }
    return true;
}

$("#submit").click(function (e) {
    var contact = $('#contact');
    e.preventDefault();
    if (validate()) {
        $.ajax({
            type: "POST",
            url: "./php/action-page.php",
            data: contact.serialize(),
            success: function (msg) {
                $.fn.getModal(true);
                return false;
                //alert("Success");
            },
            error: function (msg) {
                $.fn.getModal(false);
                return false;
                //alert("Error " + msg.d.toString());
            }
        });
    }
});


//Slide In Elements
// $(window).scroll(function() {
//   $(".slideanim").each(function(){
//     var pos = $(this).offset().top;

//     var winTop = $(window).scrollTop();
//     if (pos < winTop + 600) {
//       $(this).addClass("slide");
//     }
//   });
// });