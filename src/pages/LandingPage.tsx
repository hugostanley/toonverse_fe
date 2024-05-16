import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<main>
			<h1 className='3xl font-bold'>
				This is the Landing Page.
			</h1>

			<Link
				to='/login'
			>
				<h2>Login</h2>
			</Link>
	

		</main>
	)
}

export default LandingPage;
