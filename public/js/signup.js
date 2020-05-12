$(document).ready(function () {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstNameInput = $("input#first-name-input");
  const lastNameInput = $("input#last-name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  // const confirmPasswordInput = $("input#confirm-password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    // check if email and password has value
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have a first name, last name, email and password, run the signUpUser function
    signUpUser(
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password
    );
    // set values of inputs to empty
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  async function signUpUser(first_name, last_name, email, password) {
    try {
      const newUser = await $.post("/api/signup", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      });
      window.location.replace("/members");
    } catch (err) {
      handleLoginErr(err);
    }
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
