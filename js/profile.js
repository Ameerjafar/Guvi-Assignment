// Define the sendData function
function sendData() {
    var email = localStorage.getItem('username');
    // Serialize form data
    var formData = $('#update-profile-form').serializeArray();

    // Convert serialized form data to JSON format
    var jsonData = {};
    $.each(formData, function (index, field) {
        jsonData[field.name] = field.value;
    });
    jsonData['email'] = email;
    
    //Send AJAX request
    $.ajax({
        method: 'POST',
        url: './php/profile.php', // Change this to your PHP script URL
        data: JSON.stringify(jsonData), // Send JSON data
        contentType: 'application/json', // Set content type to JSON
        success: function (response) {
            // Handle success response here
            alert('Data stored successfully into the database');
            console.log('Data sent successfully');
            console.log(response); // You can optionally do something with the response
            window.location.href = "profile.html";
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error('Error sending data:', error);
        }
    });
}
function logout() {
    window.location.href = "login.html";
    alert("hello"),
    localStorage.removeItem('username');
}
// Attach the sendData function to the form submission
$(document).ready(function () {
    $('#logout').click(function() {
        logout();
    })
    // Check if the event handler is already attached
    if (!$._data($('#update-profile-form')[0], 'events')) {
        $('#update-profile-form').submit(function (event) {
            event.preventDefault(); // Prevent default form submission
            sendData(); // Call the sendData function
        });
    }
});

