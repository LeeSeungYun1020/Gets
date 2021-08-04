module.exports = {
	isOwner: function (request, response) {
		if (request.user) {
			return true;
		} else {
			return false;
		}
	},
	statusUI: function (request, response) {
		var authStatusUI = `<a href="/account/signin">signin</a>`
		if (this.isOwner(request, response)) {
			authStatusUI = `${request.user.name} | <a
			href="/account/signout">signout</a>`
		}
		return authStatusUI
	}
}