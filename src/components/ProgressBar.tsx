interface ProgressBarProps {
	progress: number;
}

export default function ProgressBar({ progress = 0 }: ProgressBarProps) {
	return (
		<div className="container">
			<div className="flex justify-center">
				<div className="flex border-2 border-amber-400 h-5 rounded-2xl my-20 mx-20 shadow-md">
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className={`border-1 border-amber-400 mx-0.5 w-40 rounded-2xl shadow-sm ${
								index < progress ? "bg-amber-200" : "bg-transparent"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
