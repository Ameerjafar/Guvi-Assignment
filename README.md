# Guvi-Assignment

# Profile Management PHP Script
This PHP script is designed to handle profile management functionality using MongoDB as the database backend. It allows users to perform the following operations:

Insert new profile data into the database.
Retrieve profile data based on a provided username.
Update existing profile data in the database.
# Requirements
PHP (version 7.0 or higher)
MongoDB PHP extension
MongoDB server
# Installation
Clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
Install Composer dependencies:

Copy code
composer install
Make sure MongoDB server is running and accessible from your PHP environment.

# Usage
Insert Profile Data
To insert new profile data into the database, send a POST request with JSON data to the profile.php script URL. The JSON data should contain the profile information in the following format:

json
Copy code
{
  "name": "John Doe",
  "age": 30,
  "dob": "1992-05-15",
  "email": "john@example.com",
  "contact": "1234567890",
  "place": "New York"
}
# Retrieve Profile Data
To retrieve profile data based on a provided username, send a GET request to the profile.php script URL with the username parameter. For example:

sql
Copy code
GET /profile.php?username=john@example.com
Update Profile Data
To update existing profile data in the database, send a POST request with form data containing the updated profile information to the profile.php script URL. Make sure to include the update parameter in the form data to trigger the update process. Example form fields:

name
age
dob
email
contact
place
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.