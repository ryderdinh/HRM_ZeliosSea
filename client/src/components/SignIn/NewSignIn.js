import { useState } from 'react';
import { actSignIn } from 'actions';
import { useDispatch } from 'react-redux';
import SwiperCore, {
	Pagination,
	Autoplay,
	Parallax,
	EffectCoverflow
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import './NewSignin.css';
import toast from 'react-hot-toast';
import GoogleIcon from 'components/Icon/GoogleIcon';

function NewSignIn() {
	// Install Swiper modules
	SwiperCore.use([Pagination, Autoplay, EffectCoverflow, Parallax]);

	// Create state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState({
		text: '',
		isShow: false,
		isReadOnly: true
	});

	// Create dispatch
	const dispatch = useDispatch();

	// Create function
	const handleUsername = e => {
		setEmail(e.target.value);
	};

	const handlePassword = e => {
		setPassword(prevState => ({ ...prevState, text: e.target.value }));
	};

	const handleShowPassword = () => {
		setPassword(prevState => ({
			...prevState,
			isShow: !prevState.isShow
		}));
	};

	const handleUnReadOnlyPassword = () => {
		setPassword(prevState => ({
			...prevState,
			isReadOnly: false
		}));
	};

	const handleSignIn = () => {
		if (email && password.text) {
			dispatch(actSignIn({ username: email, password: password.text }));
			return;
		}

		toast.error('Khum được để trống email hoặc mật khẩu');
	};

	const handleKeyUp = event => {
		if (event.key === 'Enter') {
			handleSignIn();
		}
	};

	// change title
	document.title = 'Đăng nhập';

	return (
		<>
			<div className='login-container'>
				<div className='login-form'>
					<div className='login-form-inner'>
						<div className='logo'>
							<Logo />
						</div>
						<h1>Login</h1>
						<p className='body-text'>
							See your growth and get consulting support!
						</p>

						<div className='rounded-button google-login-button'>
							<span className='google-icon'>
								<GoogleIcon />
							</span>
							<span>Sign in with Google</span>
						</div>

						<div className='sign-in-seperator'>
							<span>or Sign in with Email in Company</span>
						</div>

						<div className='login-form-group'>
							<label htmlFor='email'>
								Email <span className='required-star'>*</span>
							</label>
							<div className='login-input-group'>
								<input
									type='text'
									placeholder='email@website.com'
									id='email'
									value={email}
									onChange={handleUsername}
								/>
							</div>
						</div>
						<div className='login-form-group'>
							<label htmlFor='pwd'>
								Password <span className='required-star'>*</span>
							</label>
							<div className='login-input-group'>
								<input
									className='password-input'
									autoComplete='false'
									type={password.isShow ? 'text' : 'password'}
									placeholder='Minimum 6 characters'
									id='pwd'
									value={password.text}
									onFocus={handleUnReadOnlyPassword}
									onChange={handlePassword}
									onKeyUp={handleKeyUp}
									readOnly={password.isReadOnly}
								/>
								<FontAwesomeIcon
									icon={
										password.isShow
											? 'fa-solid fa-eye-low-vision'
											: 'fa-solid fa-eye'
									}
									className='eye-icon'
									onClick={handleShowPassword}
								/>
							</div>
						</div>

						<div className='login-form-group single-row'>
							{/* <div className='custom-check'>
								<input autoComplete='off' type='checkbox' id='remember' />
								<label htmlFor='remember'>Remember me</label>
							</div> */}
							<div className='link forgot-link'>Forgot Password ?</div>
						</div>

						<div
							href='#'
							className='rounded-button login-cta'
							onClick={handleSignIn}
						>
							Login
						</div>

						{/* <div className='register-div'>
							Not registered yet?
							<div className='link create-account'>Create an account ?</div>
						</div> */}
					</div>
				</div>
				<div className='onboarding'>
					<Swiper
						pagination={{ clickable: true }}
						speed={1000}
						effect={'coverflow'}
						parallax={true}
						loop={true}
						autoplay={{ delay: 3500, disableOnInteraction: false }}
						grabCursor={true}
						onSwiper={() => console.log('Start slide')}
					>
						<SwiperSlide className='color-1'>
							<div className='slide-image'>
								<img
									src={require('assets/images/banner-logo.png').default}
									alt='Slide'
								/>
							</div>
							<div className='slide-content'>
								<h2>Thunder Space</h2>
								<p>
									Consistent quality and eperience across all platform and
									devices
								</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='color-1'>
							<div className='slide-image'>
								<img
									src='https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/startup-launch.png'
									loading='lazy'
									alt='Slide'
								/>
							</div>
							<div className='slide-content'>
								<h2>Turn your ideas into reality.</h2>
								<p>
									Consistent quality and eperience across all platform and
									devices
								</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='color-1'>
							<div className='slide-image'>
								<img
									src='https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/cloud-storage.png'
									loading='lazy'
									alt='Slide'
								/>
							</div>
							<div className='slide-content'>
								<h2>Turn your ideas into reality.</h2>
								<p>
									Consistent quality and eperience across all platform and
									devices
								</p>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</>
	);
}

export default NewSignIn;

function Logo() {
	return (
		<svg
			width='256'
			height='256'
			viewBox='0 0 256 256'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_620:163)'>
				<g filter='url(#filter0_d_620:163)'>
					<path
						d='M201.791 142.85C220.717 168.246 229.747 192.373 217.208 204.22C208.938 212.033 194.517 212.092 174.341 204.394C172.635 203.738 172.235 201.734 173.463 199.904C174.689 198.079 177.069 197.128 178.782 197.779C194.92 203.932 207.532 204.792 212.518 200.083C223.993 189.242 203.642 147.948 156.08 106.041C134.09 86.6587 110.641 71.111 90.0536 62.2631C67.959 52.7621 55.4573 53.7553 51.1288 57.8501C46.5836 62.141 47.1351 72.6368 53 85.5C53.7205 87.0719 52.9388 89.0146 50.9599 90.1494C48.9777 91.2867 46.7844 90.9515 46.0768 89.3622C38.6058 72.9877 38.7268 60.9937 46.4339 53.713C57.6957 43.0724 78.9002 48.938 94.7091 55.7347C115.787 64.7962 139.72 80.6444 162.094 100.361C177.089 113.577 191.039 128.422 201.791 142.85Z'
						fill='#141432'
					/>
				</g>
				<g filter='url(#filter1_d_620:163)'>
					<path
						d='M204.627 111.565C205.42 110.064 204.33 108.263 202.636 108.263H148.829H128.773C127.451 108.263 126.412 107.128 126.53 105.812L135.543 4.42309C135.761 1.97239 132.456 0.997711 131.308 3.17393L56.77 144.435C55.9774 145.936 57.0669 147.737 58.7614 147.737H112.568H132.624C133.946 147.737 134.985 148.872 134.868 150.188L125.855 251.577C125.636 254.028 128.941 255.002 130.089 252.826L204.627 111.565Z'
						fill='#FFC700'
					/>
				</g>
				<g filter='url(#filter2_d_620:163)'>
					<path
						d='M62.2858 115.494C43.3598 90.0981 34.258 65.8474 46.7972 54C55.067 46.1878 69.6211 45.8018 89.797 53.5C89.9794 53.5701 101 58.5 101.797 59C101 60 100.5 61 100 62.5C98.8601 64.197 99.5 63.5 98 66C97.5 65.5 85.9175 60.5457 85.7971 60.5C69.6591 54.3464 56.5447 53.5525 51.5589 58.2607C40.0842 69.1024 60.4353 110.396 107.997 152.304C129.986 171.685 154.21 187.152 174.797 196C196.892 205.501 208.619 204.589 212.948 200.494C217.493 196.203 217.162 186.363 211.297 173.5C211.288 173.479 206.739 164.809 201.5 156.5C196.105 147.944 189.5 140.5 189.5 140C190 139.5 192.5 134.5 193.5 133C194 131.5 208.773 152.66 211 156C211.49 156.736 212.227 157.643 215 163C216.727 166.143 217.987 168.953 218 168.982C225.471 185.356 225.35 197.35 217.643 204.631C206.381 215.272 185.177 209.406 169.368 202.609C148.29 193.548 124.357 177.7 101.983 157.983C86.9874 144.767 73.0378 129.922 62.2858 115.494Z'
						fill='#141432'
					/>
				</g>
			</g>
			<defs>
				<filter
					id='filter0_d_620:163'
					x='15.5621'
					y='22.8701'
					width='232.44'
					height='212.254'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset />
					<feGaussianBlur stdDeviation='12.5' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_620:163'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_620:163'
						result='shape'
					/>
				</filter>
				<filter
					id='filter1_d_620:163'
					x='46.5062'
					y='-8.03406'
					width='168.385'
					height='272.068'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset />
					<feGaussianBlur stdDeviation='5' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 0.780392 0 0 0 0 0 0 0 0 0.75 0'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_620:163'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_620:163'
						result='shape'
					/>
				</filter>
				<filter
					id='filter2_d_620:163'
					x='16.02'
					y='22.9289'
					width='232.495'
					height='212.545'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset />
					<feGaussianBlur stdDeviation='12.5' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_620:163'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_620:163'
						result='shape'
					/>
				</filter>
				<clipPath id='clip0_620:163'>
					<rect width='256' height='256' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
}
