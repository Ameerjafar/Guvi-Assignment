$(document).ready(function(){
    $('#loginForm').submit(function(e){
        e.preventDefault(); 
        var username = $('#username').val(); 
        var password = $('#password').val(); 
        $.ajax({
            method: 'POST',
            url: './php/login.php',
            data: {
                username: username,
                password: password
            },
            success: function(response){
                if(response === 'success') {
                    alert("Login successful!");
                    localStorage.setItem('email', username);
                    window.location.href = "profile.html";
                } else {
                    $('#message').html('Invalid username or password.');
                }
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
                alert('An error occurred while processing your request. Please try again.');
            }
        });
    });
});
