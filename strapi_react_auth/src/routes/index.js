import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Product from '../pages/Product';
import Error from "../pages/Error";



export const router = [

	{
		path: '/',
		component: Home,
		isAuth: false,
	},
	{
		path: '/home',
		component: Home,
		isAuth: false,
	},
	{
		path: '/login',
		component: Login,
		isAuth: false,
	},
	{
		path: '/register',
		component: SignUp,
		isAuth: false
	},
	{
		path: '/product',
		component: Product,
		isAuth: true
	},
	{
		path: '*',
		component: Error
	},

]