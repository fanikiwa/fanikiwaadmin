$(document).ready(
		function() {
			if (sessionStorage.getItem("loggedinuser") === null
					|| sessionStorage.getItem("loggedinuser") === undefined) {
				window.location.href = "/Views/Account/Login.html";
			} else {
				$('#lnkloggedinuser').text(
						sessionStorage.getItem('loggedinuser'));
			}
		});
