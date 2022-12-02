import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html className='no-js' lang='nl'>
				<Head>
					{/* Loading fonts here will make sure fonts are rendered at every page */}
					{/* Google fonts */}
					<link
						href='https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&family=Montserrat:wght@300;400;500&display=swap'
						rel='stylesheet'
					/>
				</Head>

				<body id='top'>
					<Main />
					<NextScript />
					<div id='portal' />
				</body>
			</Html>
		);
	}
}
