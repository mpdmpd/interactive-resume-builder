import type { Metadata } from "next";
import "@/style/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ResumeProvider } from "@/context/ResumeContext";
import { DynamicMetadata } from "@/components/DynamicMetadata";

export const metadata: Metadata = {
	title: "Interactive resume builder",
	description: "Resume builder",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="flex flex-col min-h-screen">
				<LanguageProvider>
					<ResumeProvider>
						<DynamicMetadata />
						<Header />
						<main className="container mx-auto flex mt-15">{children}</main>
						<Footer />
					</ResumeProvider>
				</LanguageProvider>
			</body>
		</html>
	);
}
