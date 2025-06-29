"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto bg-gradient-to-b from-amber-50 to-white p-8">
			<div className="mt-5 mx-auto">
				<h1 className="text-4xl font-bold text-black text-shadow-lg mb-8">
					{language === "en" ? "Privacy Policy" : "Политика конфиденциальности"}
				</h1>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-amber-400 mb-4 text-shadow-md">
						{language === "en" ? "Information Collection" : "Сбор информации"}
					</h2>
					<p className="mb-4">
						{language === "en"
							? "Our resume builder collects only the information you voluntarily provide when creating your resume. This may include personal details, work experience, education, and skills."
							: "Наш конструктор резюме собирает только ту информацию, которую вы добровольно предоставляете при создании резюме. Это может включать личные данные, опыт работы, образование и навыки."}
					</p>
					<p>
						{language === "en"
							? "We do not collect any sensitive information without your explicit consent."
							: "Мы не собираем конфиденциальную информацию без вашего явного согласия."}
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-amber-400 mb-4 text-shadow-md">
						{language === "en" ? "Data Usage" : "Использование данных"}
					</h2>
					<p className="mb-4">
						{language === "en"
							? "The information you provide is used solely for the purpose of generating your resume. We do not share, sell, or distribute your personal data to third parties."
							: "Предоставленная вами информация используется исключительно для создания вашего резюме. Мы не передаем, не продаем и не распространяем ваши персональные данные третьим лицам."}
					</p>
					<p>
						{language === "en"
							? "Your data is stored securely and can be deleted at any time through your account settings."
							: "Ваши данные хранятся безопасно и могут быть удалены в любое время через настройки аккаунта."}
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-amber-400 mb-4 text-shadow-md">
						Cookies
					</h2>
					<p>
						{language === "en"
							? "We use cookies to enhance your experience and for analytics purposes. You can disable cookies in your browser settings if you prefer."
							: "Мы используем cookies для улучшения вашего опыта и в аналитических целях. Вы можете отключить cookies в настройках браузера, если предпочитаете."}
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-amber-400 mb-4 text-shadow-md">
						{language === "en"
							? "Changes to This Policy"
							: "Изменения в политике"}
					</h2>
					<p>
						{language === "en"
							? "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
							: "Мы можем время от времени обновлять нашу Политику конфиденциальности. Мы уведомим вас о любых изменениях, опубликовав новую Политику конфиденциальности на этой странице."}
					</p>
				</section>
			</div>
		</div>
	);
}
