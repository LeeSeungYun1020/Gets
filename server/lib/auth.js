module.exports = {
	isOwner: function (request, response) {
		return !!request.user;
	},
	statusUI: function (request, response) {
		let authStatusUI = `<a href="/account/signin">signin</a>`
		if (this.isOwner(request, response)) {
			authStatusUI = `${request.user.name} | <a
			href="/account/signout">signout</a>`
		}
		return authStatusUI
	}
}