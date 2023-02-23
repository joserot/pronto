import Container from "../components/common/Container";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
	const [mobile, setMobile] = useState(false);
	const [dates, setDates] = useState(false);
	const [saved, setSaved] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (Date) setDates(new Date(2023, 2, 15).getTime());
	}, []);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	}, [error]);

	useEffect(() => {
		if (saved) {
			setTimeout(() => {
				setSaved(null);
			}, 5000);
		}
	}, [saved]);

	useEffect(() => {
		if (screen.width <= 1024) {
			setMobile(true);
		} else {
			setMobile(false);
		}

		addEventListener("resize", (e) => {
			if (screen.width <= 1024) {
				setMobile(true);
			} else {
				setMobile(false);
			}
		});
	}, []);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		return (
			<div className="countdown">
				<article>
					<span>{days}</span>
					<p>Días</p>
				</article>

				<article>
					<span>{hours}</span>
					<p>Horas</p>
				</article>

				<article>
					<span>{minutes}</span>
					<p>Minutos</p>
				</article>

				<article>
					<span>{seconds}</span>
					<p>Segundos</p>
				</article>
			</div>
		);
	};

	const sendEmail = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;

		if (!email) return;

		try {
			const response = await axios.post(
				"https://platform.busquemostrabajo.com/api/saveProvisionalEmail",
				{ p_email: email },
			);

			if (response.status === 200 || response.status === 201) {
				setSaved(true);
				e.target.reset();
				return;
			}
		} catch (error) {
			setError(error.response.data.p_email[0]);
		}
	};

	return (
		<Container>
			<div className="home">
				<header>
					<img src={mobile ? "/img/logo-movil.svg" : "/img/logo.svg"} />
				</header>
				{/* MOBILE  */}
				<main className="main-mobile">
					<h1>Prepara tu búsqueda laboral</h1>
					<img src="/img/pronto-img.webp" />
					<p>
						Maecenas mattis justo vehicula quam dictum, a tincidunt lectus
						sodales.
					</p>
					{dates ? (
						<Countdown date={new Date(dates)} renderer={renderer} />
					) : null}
					<form onSubmit={sendEmail}>
						{error ? <span className="error"> {error} </span> : null}
						<input
							type="email"
							name="email"
							className="input"
							placeholder="Ingresa tu email "
						/>

						{saved ? (
							<span className="check">
								<FontAwesomeIcon icon={faCheck} />
							</span>
						) : (
							<button className="btn-cta">Avísame</button>
						)}
					</form>
				</main>
				{/* DESKTOP */}
				<main className="main-desktop">
					<section className="section-image">
						<img src="/img/pronto-img.webp" />
					</section>
					<section className="section-countdown">
						<h1>Prepara tu búsqueda laboral</h1>
						<p>
							Maecenas mattis justo vehicula quam dictum, a tincidunt lectus
							sodales.
						</p>
						{dates ? (
							<Countdown date={new Date(dates)} renderer={renderer} />
						) : null}
						<form onSubmit={sendEmail}>
							{error ? <span className="error"> {error} </span> : null}
							<input
								type="email"
								name="email"
								className="input"
								placeholder="Ingresa tu email "
							/>
							{saved ? (
								<span className="check">
									<FontAwesomeIcon icon={faCheck} />
								</span>
							) : (
								<button className="btn-cta">Avísame</button>
							)}
						</form>
					</section>
				</main>
				<footer>
					<p>© 2023 Busquemos Trabajo</p>
				</footer>
			</div>
		</Container>
	);
};

export default Index;
