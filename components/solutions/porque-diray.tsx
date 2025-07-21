
"use client"
import * as Icons from "lucide-react"

const features = [
	{
		icon: "Rocket",
		title: "Agilidade e Foco",
		description:
			"Soluções rápidas e diretas, sem burocracia, focadas no que realmente importa para o seu negócio.",
	},
	{
		icon: "BrainCircuit",
		title: "Inovação com IA",
		description:
			"Uso de inteligência artificial para diagnósticos precisos e soluções personalizadas e eficientes.",
	},
	{
		icon: "Users",
		title: "Parceria Estratégica",
		description:
			"Mais que uma consultoria, uma parceria para capacitar sua equipe e garantir autonomia a longo prazo.",
	},
	{
		icon: "Target",
		title: "Resultados Mensuráveis",
		description:
			"Foco em métricas claras e resultados tangíveis que impactam diretamente seus objetivos de negócio.",
	},
]

export function PorqueDiRay() {
	return (
		<section className="py-20 md:py-32 bg-gradient-to-b from-dark to-gray-900 section-illumination-purple">
			<div className="container mx-auto px-6 md:px-8 relative z-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2
						className="text-3xl md:text-4xl font-bold mb-4 text-white"
					>
						Por que escolher a Di.Ray?
					</h2>
					<p
						className="text-lg text-white/80"
					>
						Transformamos desafios em oportunidades com agilidade, inovação e uma parceria estratégica focada em resultados.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => {
						const Icon = Icons[feature.icon]
						return (
							<div
								key={index}
								className="text-center p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
							>
								<div className="flex justify-center mb-4">
									<div className="icon-container p-4 bg-primary/20 rounded-full">
										{Icon ? <Icon className="text-primary" size={32} /> : null}
									</div>
								</div>
								<h3 className="text-xl font-bold mb-2 text-white">
									{feature.title}
								</h3>
								<p className="text-white/70">{feature.description}</p>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
