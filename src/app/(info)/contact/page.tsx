"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
	const { language } = useLanguage();

	return (
		<div className="mx-auto bg-gradient-to-b from-amber-50 to-white p-8">
			<div className="max-w-4xl mt-5 mx-auto">
				<h1 className="text-4xl font-bold text-black text-shadow-lg mb-8">
					{language === "en" ? "Contact Us" : "Контакты"}
				</h1>

				<div className="bg-amber-50 p-8 rounded-lg shadow">
					<h2 className="text-2xl font-semibold text-amber-400 mb-6 text-shadow-md">
						{language === "en" ? "Get in Touch" : "Свяжитесь с нами"}
					</h2>

					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-medium text-amber-600 mb-2">Email</h3>
							<a
								href="mailto:maksim_mpd@mail.ru"
								className="text-amber-700 hover:text-amber-900 transition-colors"
							>
								maksim_mpd@mail.ru
							</a>
						</div>

						<div>
							<h3 className="text-xl font-medium text-amber-600 mb-2">
								GitHub
							</h3>
							<a
								href="https://github.com/mpdmpd"
								target="_blank"
								rel="noopener noreferrer"
								className="text-amber-700 hover:text-amber-900 transition-colors"
							>
								github.com/mpdmpd
							</a>
						</div>

						<div>
							<h3 className="text-xl font-medium text-amber-400 text-shadow-md mb-2">
								{language === "en" ? "Feedback" : "Обратная связь"}
							</h3>
							<p>
								{language === "en"
									? "We welcome your feedback and suggestions for improving our resume builder. Please don't hesitate to reach out with any questions or comments."
									: "Мы приветствуем ваши отзывы и предложения по улучшению нашего конструктора резюме. Пожалуйста, не стесняйтесь обращаться с любыми вопросами или комментариями."}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
