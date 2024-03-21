
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
    alert("bye"),
    localStorage.removeItem('email');
}
function checkUsernameInMongoDB() {
    alert("hello");
    const email = localStorage.getItem('email');
    if (email) {
      $.ajax({
        url: './php/profile.php',
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        data: { email: email },
        success: function(response) {
          var responseData = JSON.parse(response);
          console.log(responseData.usedredis);
          if (responseData.exists) {
            var data = responseData.data;
            console.log(data);
            $('#name').text('Name: ' + data.fullname);
            $('#gender').text('gender' + data.gender)
            $('#bio').text('Bio: ' + data.dob);
            $('#age').text('age: ' + data.age);
            $('#contactInfo').html('Phone: ' + data.contact + '<br>Email: ' + data.email);
            $('#state').text('state: ' + data.state);
            $('#education').text('Education: ' + data.education);
            $('#occupation').text('state: ' + data.occupation);
          } else {
            console.log('Username does not exist in MongoDB.');
          }
        },
        error: function(xhr, status, error) {
          console.error('Error:', status, error);
        }
      });
    } else {
        alert("Kindly update user profile");
      }
    }
checkUsernameInMongoDB();
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

