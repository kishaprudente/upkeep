$(document).ready(function () {
	// Getting references to our form and input
	const signUpForm = $("form.signup");
	const firstNameInput = $("input#first-name-input");
	const lastNameInput = $("input#last-name-input");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");
	// const confirmPasswordInput = $("input#confirm-password-input");

	function handleSignUpErr(err) {
		$("#alert .msg").text(err);
		$("#alert").fadeIn(500);
	}

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	async function signUpUser(firstName, lastName, email, password) {
		try {
			await $.post("/api/signup", {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			});
			window.location.replace("/dashboard");
		} catch {
			handleSignUpErr("Invalid entry. Try again ");
		}
	}

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on("submit", function (event) {
		event.preventDefault();
		const userData = {
			firstName: firstNameInput.val().trim(),
			lastName: lastNameInput.val().trim(),
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};

		// check if email and password has value
		if (!userData.email || !userData.password) {
			handleSignUpErr("Email or Password cannot be empty.");
			return;
		}

		// If we have a first name, last name, email and password, run the signUpUser function
		signUpUser(
			userData.firstName,
			userData.lastName,
			userData.email,
			userData.password
		);
		console.log("USER DATA", userData);
		// set values of inputs to empty
		firstNameInput.val("");
		lastNameInput.val("");
		emailInput.val("");
		passwordInput.val("");
	});
});
