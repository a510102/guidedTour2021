import ptxLogo from '../../../images/footer/ptxlogo.jpg';

export function Footer() {
	const year = new Date().getFullYear();
	return(
		<footer>
			<p>Taiwan Tourguide © {year} Code: Jay/ Design: KT</p>
			<p><img src={ptxLogo} alt="ptx logo" /> 交通部PTX服務平臺</p>
		</footer>
	);
};