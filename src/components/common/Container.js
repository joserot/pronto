import Head from "next/head";

const Container = (props) => {
	return (
		<div className="container">
			<Head>
				<title>Busquemos Trabajo</title>
				<link rel="shortcut icon" href="/img/logo-movil.svg" />
				{/* Google tag (gtag.js) */}
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-9G5D7DMYK8%22%3E"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
          window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-9G5D7DMYK8');
            `,
					}}
				/>
				{/* GOOGLE FONTS */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
					rel="stylesheet"
				></link>
				{/* FONTASTIC */}
				<link
					href="https://file.myfontastic.com/iAXdfSo9h4Sgqh4MmBKJUS/icons.css"
					rel="stylesheet"
				/>
			</Head>
			<div className="container">{props.children}</div>
		</div>
	);
};

export default Container;
