// Initialize Firebase
var config = {
    apiKey: "AIzaSyDw8MNmUFyimMgQmR4LaZNqemF1HmD1J-Q",
    authDomain: "thedankoe-contact.firebaseapp.com",
    databaseURL: "https://thedankoe-contact.firebaseio.com",
    projectId: "thedankoe-contact",
    storageBucket: "thedankoe-contact.appspot.com",
    messagingSenderId: "304963397175"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contact-form').addEventListener('submit', submitForm);

// Submit form
function submitForm(event) {
    event.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    // Save message
    saveMessage(name, email, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('contact-form').reset();
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message
    });
}