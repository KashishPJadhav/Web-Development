const firebaseConfig = {
    apiKey: "AIzaSyDKbEyYO43oYfjmvIYsy9JkdaPte_8IxrE",
    authDomain: "job-portal-e54bf.firebaseapp.com",
    projectId: "job-portal-e54bf",
    storageBucket: "job-portal-e54bf.appspot.com",
    messagingSenderId: "621351469708",
    appId: "1:621351469708:web:6c2238035ae090a951f1a9",
    measurementId: "G-60QEXBN579"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Initialize EmailJS
(function () {
  emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
})();

document.getElementById('signinForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully signed in
      console.log('Login successful');
      
      const user = userCredential.user;
      localStorage.setItem('userEmail', user.email); // Store email in localStorage

      // Send Welcome Email via EmailJS
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: user.email,
        user_name: user.email.split('@')[0]  // Customize this if needed
      })
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Email sending error:', error);
      });

      alert('Login successful!');
      window.location.href = 'student_dashboard.html'; // Redirect to dashboard
    })
    .catch((error) => {
      console.error('Login failed:', error);
      alert(error.message);
    });
});
