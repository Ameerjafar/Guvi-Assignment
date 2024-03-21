$(document).ready(function(){
    $('#submitButton').click(function(){
        var name = $('#nameInput').val();
        var email = $('#emailInput').val();
        var password = $('#passwordInput').val();

        $.ajax({
            url: './php/register.php',
            method: 'POST',
            data: {
                name: name,
                email: email,
                password: password
            },
            success: function(response){
                alert(response);
                window.location.href = 'login.html';
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
                alert('An error occurred while processing your request. Please try again.');
            }
        });
    });
});