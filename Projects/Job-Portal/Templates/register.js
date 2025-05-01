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
const db = firebase.firestore();

// Initialize EmailJS
(function () {
  emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
})();

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value.trim();
  const skills = document.getElementById('skills').value.trim();

  // Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully registered
      const user = userCredential.user;
      localStorage.setItem('userEmail', email); // Store email in localStorage

      // Add user data to Firestore
      const userRef = db.collection('students').doc(email);
      return userRef.set({
        name: name,
        email: email,
        phone: phone,
        skills: skills,
        resumeLink: "" // Empty initially, will be updated later
      });
    })
    .then(() => {
      alert('Registered Successfully! Please sign in.');
      window.location.href = 'signin.html'; // Redirect to signin page
    })
    .catch((error) => {
      console.error('Registration failed:', error);
      alert(error.message);
    });
});
