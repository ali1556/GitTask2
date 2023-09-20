var users = [];

// Check if users array exists in localStorage
if (localStorage.getItem('users')) {
  try {
    // Retrieve users array from localStorage
    users = JSON.parse(localStorage.getItem('users'));
  } catch (error) {
    console.error('Error parsing users from localStorage:', error);
    // Handle the error as per your requirement
  }
}

function saveUsers() {
  // Save users array to localStorage
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
    // Handle the error as per your requirement
  }
}

function signup(event) {
  event.preventDefault();

  // Get input values
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var country = document.getElementById('country').value;

  // Check if username already exists
  if (users.find(user => user.username === username)) {
    alert('این نام کاربری از قبل وجود دارد');
    return;
  }

  // Create user object
  var user = {
    username: username,
    password: password,
    country: country
  };

  // Add user object to the array
  users.push(user);
  console.log(users);

  // Save users array to localStorage
  saveUsers();

  window.location.href = "login.html";
}

function login(event) {
  event.preventDefault();

  // Get input values
  var loginUsername = document.getElementById('login-username').value;
  var loginPassword = document.getElementById('login-password').value;

  // Find user object with matching username
  var user = users.find(user => user.username === loginUsername);

  // Check if user exists and password is correct
  if (user && user.password === loginPassword) {
    // Redirect to home page
    alert("با موفقیت وارد شدید")
    window.location.href = "index.html";
  } else {
    alert('نام کاربری و رمز عبور شما اشتباه است');
  }
}
async function getData() {
  try {
    var location = document.getElementById('weather').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ca65993e29378009ab3e480920539058`);
    const data = await response.json();

    const temperature = data.main.temp;
    const description = data.weather[0].description;

    const weatherDiv = document.getElementById('weather-info');
    weatherDiv.innerHTML = `Temperature: ${Math.floor(temperature - 273)} C<br>Description: ${description}`;
  } catch (error) {
    console.error('Error:', error);
  }
}