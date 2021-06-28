import Link from 'next/link'

export default function Header() {
	
	const showAlert = (msg) => {
		console.log(msg)
	}
	
	return (<header>
			<div id = "logo">
				<a href="#">LOGO</a>
			</div>
			<nav>
				<ul>
					<li><Link href="/" onClick={(e) => showAlert("HOME")}>
						<a className="hover:underline" >Home</a>
					</Link></li>
					<li><Link href="/">
						<a className="hover:underline">Closet</a>
					</Link></li>
					<li><Link href="/">
						<a className="hover:underline">Product</a>
					</Link></li>
				</ul>
			</nav>
			<div id = "top_menu">
				<Link href="/">
					<a><img src="images/cart.png"/></a>
				</Link>
				<Link href="/">
					<a><img src="images/my page.png"/></a>
				</Link>
				<Link href="/">
					<a><img src="images/log in.png"/></a>
				</Link>
			</div>
		</header>
	)
}