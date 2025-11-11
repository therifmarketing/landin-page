import React, { useState, useEffect, useRef } from 'react';
import AccordionItem from './ui/AccordionItem.tsx';

// --- Icon Components ---
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 text-primary-blue" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.182l-.341 1.236 1.241-.328z" />
    </svg>
);

// --- Reusable Components ---
const CTAButton: React.FC<{ children: React.ReactNode, className?: string, href?: string }> = ({ children, className, href = "https://pay.cakto.com.br/534Mbmi" }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-block text-center bg-primary-blue text-white font-bold tracking-wider uppercase py-4 px-8 rounded-lg shadow-lg hover:bg-sky-blue transition-all duration-300 transform hover:scale-105 ${className}`}>
        {children}
    </a>
);

const CountdownTimer = () => {
    const [expiryDate] = useState(() => {
        const date = new Date();
        date.setHours(date.getHours() + 5); // Set expiry for 5 hours from now
        return date;
    });

    const calculateTimeLeft = () => {
        const difference = +expiryDate - +new Date();
        let timeLeft: { hours: number, minutes: number, seconds: number };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const formatTime = (time: number) => String(time).padStart(2, '0');
    
    return (
        <div className="flex justify-center space-x-2 sm:space-x-4 text-center">
            <div>
                <div className="text-4xl md:text-5xl font-bold bg-white text-navy rounded-lg p-2 sm:p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">{formatTime(timeLeft.hours)}</div>
                <div className="text-sm uppercase tracking-wider mt-2">Horas</div>
            </div>
            <div>
                <div className="text-4xl md:text-5xl font-bold bg-white text-navy rounded-lg p-2 sm:p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">{formatTime(timeLeft.minutes)}</div>
                <div className="text-sm uppercase tracking-wider mt-2">Min.</div>
            </div>
            <div>
                <div className="text-4xl md:text-5xl font-bold bg-white text-navy rounded-lg p-2 sm:p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">{formatTime(timeLeft.seconds)}</div>
                <div className="text-sm uppercase tracking-wider mt-2">Seg.</div>
            </div>
        </div>
    );
};

// Custom hook for animations
const useAnimateOnScroll = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { ref, style: { transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }, className: 'opacity-0 translate-y-10' };
};


// --- Section Components ---

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => {
    const animationProps = useAnimateOnScroll();
    return (
        <section id={id} {...animationProps} className={`${className || ''} ${animationProps.className}`} style={animationProps.style}>
            {children}
        </section>
    );
};


const InfoproductHero = () => (
    <section className="bg-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-light-blue max-w-3xl mx-auto mb-4">
                Desconto + 02 Bônus Especiais!
            </h2>
             <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
                Domine a linguagem certa<br />
                para atrair leads qualificados<br />
                e prontos para comprar.
            </h1>
            <p className="text-md md:text-lg font-light text-gray-200 bg-primary-blue/20 rounded-lg max-w-3xl mx-auto p-4 mb-8 italic">
                "Mais importante que gerar mil leads é gerar dez leads prontos para comprar."
            </p>
            <p className="text-lg font-semibold tracking-wider text-gray-300 mb-4">Livro Digital Download Imediato</p>
             <div className="my-8">
                 <img 
                    src="https://therifmarketingdigital.net/wp-content/uploads/2025/09/OIG3-2-1.jpeg" 
                    alt="Capa do Livro Digital Geração de Leads Descomplicada e Eficaz" 
                    className="mx-auto rounded-lg shadow-2xl w-full max-w-sm md:max-w-md"
                />
            </div>
             <p className="mt-[-1rem] mb-10 text-lg text-gray-300 max-w-3xl mx-auto">
                Não é sobre quantidade de leads, é sobre qualidade de conexões.
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-4">Oferta Especial Liberada</h3>
            <p className="text-gray-400 mb-4">Encerra em...</p>
            <div className="mb-8 flex justify-center">
                <CountdownTimer />
            </div>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 border-l-4 border-sky-blue pl-4 italic">
                "Todo mundo que consegue lucros consistentes geralmente é porque dominou a arte da qualificação de leads. Não tem segredo, se você conseguir qualificar, você alcança a venda." - <span className="font-semibold text-white">Therif</span>
            </p>

            <CTAButton className="text-lg">
                Garanta Agora Mesmo Sua Cópia!
            </CTAButton>
        </div>
    </section>
);

const ProblemAgitation = () => (
    <AnimatedSection className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 text-center">Por Que a Maioria dos Empreendedores Falha na Geração de Leads — E Como Você Pode se Diferenciar</h2>
                <div className="text-lg text-slate-700 space-y-4 leading-relaxed">
                    <p>Todo mundo quer gerar leads, mas poucos realmente conseguem transformá-los em vendas consistentes. Enquanto a maioria se concentra em acumular números — mais seguidores, mais tráfego, mais nomes na lista —, você provavelmente já percebeu que isso não se traduz em resultados reais.</p>
                    <p>A frustração surge quando os leads não convertem, quando o funil vaza e quando o esforço não se reflete em lucro. Isso acontece porque a geração de leads não é uma questão de volume, mas de <span className="font-semibold text-primary-blue">conexão</span>.</p>
                    <p>Se você não domina a arte de qualificar e nutrir leads de forma estratégica, está apenas alimentando uma ilusão. E o pior: perdendo oportunidades reais de crescimento.</p>
                </div>
            </div>

            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 text-center">A Raiz Oculta da Falha na Geração de Leads — E Como Eliminá-la</h2>
                <div className="text-lg text-slate-700 space-y-4 leading-relaxed">
                    <p>A verdadeira causa da frustração na geração de leads não está na falta de tentativas, mas na <span className="font-semibold text-primary-blue">ausência de uma conexão genuína</span> com o público. Enquanto a maioria se concentra em números, o cerne do problema permanece intocado: a incapacidade de transformar interesse em confiança.</p>
                    <p>Leads não são meros dados; são pessoas com dores, desejos e medos. Ignorar essa humanidade é como tentar construir um castelo na areia — por mais esforço que se faça, a base sempre desmorona.</p>
                    <p>A solução não está em mais uma tática milagrosa, mas em uma mudança de perspectiva estratégica. É parar de correr atrás de volume e começar a construir relacionamentos — onde cada interação é pensada para mover o lead em direção à venda, com base em confiança e valor genuíno.</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const Solution = () => {
    const pillars = [
        { name: "Segmentação Inteligente", description: "Em vez de tratar todos os leads da mesma forma, você vai aprender a dividi-los com base em comportamentos, interesses e estágios no funil para criar uma conexão emocional que transcende a transação." },
        { name: "Automação Humanizada", description: "Utilize ferramentas para nutrir leads de forma consistente, mas sem perder o toque pessoal. Sequências de e-mails personalizadas e conteúdo relevante farão seus leads sentirem-se valorizados." },
        { name: "Conteúdo de Valor Contínuo", description: "Ofereça insights, soluções e educação antes mesmo de pedir algo em troca. Isso constrói confiança e posiciona você como autoridade, não como mais um vendedor." },
    ];

    return (
        <AnimatedSection className="bg-pale-blue/40 py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">Três Pilares para Transformar Leads em Clientes — Agora Mesmo</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pillars.map((pillar, index) => (
                        <div key={pillar.name} className="bg-white p-8 rounded-lg shadow-md text-left">
                             <span className="text-5xl font-black text-sky-blue/20">0{index+1}</span>
                            <h3 className="text-xl font-bold text-navy mt-2 mb-3">{pillar.name}</h3>
                            <p className="text-slate-600">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}

const BookDetails = () => (
    <AnimatedSection className="bg-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10">Como vai ser a sua experiência nessa leitura? <span className="text-light-blue">Memorável.</span></h2>
            <p className="text-lg text-gray-300 text-center mb-12">
                Imagine ter um sistema prático que finalmente descomplica a geração de leads. Um método que não exige budget gigantesco, mas sim ações precisas. Este é o livro <span className="font-bold">"Descubra os Segredos dos Profissionais: Geração de Leads Descomplicada e Eficaz!"</span> — um guia direto que corta o ruído e entrega o essencial.
            </p>
            <div className="space-y-1">
                 <AccordionItem theme="dark" title="Capítulo 1 – Domine a Arte da Geração de Leads e Potencialize Seus Lucros!">
                    Você vai aprender a explorar os instintos primitivos do cérebro para gerar leads, despertar urgência e superar obstáculos para escalar sua captação.
                 </AccordionItem>
                 <AccordionItem theme="dark" title="Capítulo 2 – Construa Confiança e Relacionamentos Sólidos">
                    Descubra como substituir a coleta agressiva de dados por relacionamentos baseados em valor, transformando leads em defensores fiéis da sua marca.
                 </AccordionItem>
                 <AccordionItem theme="dark" title="Capítulo 3 – Fundamentos e Técnicas Avançadas">
                    Aprenda a aplicar personalização, ofertas irresistíveis, automação inteligente e segmentação precisa para criar um fluxo contínuo de leads qualificados.
                 </AccordionItem>
                 <AccordionItem theme="dark" title="Capítulo 4 – Estratégias de Conteúdo Persuasivas">
                    Domine a arte de contar histórias que ativam emoções e criam ligações profundas, usando os formatos de conteúdo mais eficazes para guiar leads naturalmente pelo funil.
                 </AccordionItem>
            </div>
             <p className="text-lg text-center mt-12 font-semibold">Você vai aprender tudo isso e mais, muito mais! Com a meta de dominar o método para transformar leads em clientes com conversões previsíveis e lucros consistentes.</p>
        </div>
    </AnimatedSection>
);

const Bonuses = () => (
    <AnimatedSection className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">E ainda tem mais...</h2>
            <p className="text-lg text-slate-600 mb-12">Comprando hoje, você leva <span className="font-bold">02 bônus exclusivos</span> para acelerar seus resultados:</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-pale-blue/40 border border-sky-blue/20 p-8 rounded-lg text-left">
                    <span className="text-sm font-bold text-primary-blue bg-sky-blue/20 py-1 px-3 rounded-full">BÔNUS #1</span>
                    <h3 className="text-2xl font-bold text-navy my-3">SEO que Vende: O Guia para Atrair Clientes, Não Apenas Visitantes</h3>
                    <p className="text-slate-600 mb-4">Esqueça a complexidade do SEO técnico. Neste guia prático, você vai descobrir como otimizar seu conteúdo para que o Google trabalhe para você, 24/7. Aprenda a encontrar as palavras-chave que seus clientes ideais estão buscando e crie uma base para um fluxo constante de tráfego qualificado, que chega pronto para comprar.</p>
                    <p className="font-bold text-red-500 line-through">Valor: R$47,00</p>
                </div>
                 <div className="bg-pale-blue/40 border border-sky-blue/20 p-8 rounded-lg text-left">
                    <span className="text-sm font-bold text-primary-blue bg-sky-blue/20 py-1 px-3 rounded-full">BÔNUS #2</span>
                    <h3 className="text-2xl font-bold text-navy my-3">A Arte da Conversão: Como Transformar Palavras em Vendas</h3>
                    <p className="text-slate-600 mb-4">De que adianta ter a atenção do público se você não sabe o que fazer com ela? Neste bônus exclusivo, você aprenderá os segredos da escrita persuasiva (copywriting) para criar posts, e-mails e páginas que geram ação, dominando a psicologia por trás da decisão de compra.</p>
                    <p className="font-bold text-red-500 line-through">Valor: R$97,00</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const Pricing = () => (
    <AnimatedSection id="pricing" className="bg-pale-blue/40 py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">Escolha a melhor oferta para você</h2>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
                {/* Plano Básico */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 w-full md:w-1/2 flex flex-col">
                    <h3 className="text-2xl font-bold text-navy">PLANO BÁSICO</h3>
                    <p className="text-gray-500 mt-1 mb-6">E-BOOK COMPLETO</p>
                    <p className="text-5xl font-black text-navy mb-6">R$10</p>
                    <ul className="text-left space-y-3 text-slate-600 mb-8 flex-grow">
                        <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>E-book 93 paginas: Geração de Leads Descomplicada e Eficaz!</span></li>
                        <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>Acesso vitalício.</span></li>
                        <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>7 dias Garantia.</span></li>
                    </ul>
                    <CTAButton href="https://pay.cakto.com.br/7XkBX6G" className="w-full mt-auto bg-slate-700 hover:bg-slate-800">Quero Essa Opção</CTAButton>
                </div>

                {/* Plano Completo */}
                <div className="bg-white border-2 border-sky-blue rounded-lg p-8 w-full md:w-1/2 relative flex flex-col shadow-2xl">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-sky-blue text-white text-sm font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                        Melhor Negócio
                    </div>
                    <h3 className="text-2xl font-bold text-primary-blue">PLANO COMPLETO</h3>
                    <p className="text-gray-500 mt-1 mb-4">SUPER OFERTA</p>
                     <p className="text-xl font-bold text-red-500 line-through">Valor Total: R$197</p>
                    <p className="text-5xl font-black text-navy mb-4">R$47</p>
                     <p className="font-semibold text-slate-600 mb-6">HOJE PAGAMENTO ÚNICO...</p>

                    <ul className="text-left space-y-3 text-slate-600 mb-8 flex-grow">
                         <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>E-book 93 paginas: Descubra os Segredos dos Profissionais: Geração de Leads Descomplicada e Eficaz!</span></li>
                         <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>E-book 56 páginas: Desbloqueie o Potencial do SEO e Alavanque Suas Vendas!</span></li>
                         <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>E-book 124 páginas: Persuasão Poderosa Transforme Visitantes em Seguidores Apaixonados</span></li>
                         <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>Acesso Vitalício.</span></li>
                         <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0 mt-1" /> <span>7 dias de Garantia.</span></li>
                    </ul>
                    <CTAButton className="w-full mt-auto text-lg animate-neon-pulse-blue">Sim! Quero Essa Super Oferta!</CTAButton>
                </div>
            </div>
             <p className="mt-8 font-semibold text-navy">APROVEITE AGORA: Você NÃO vai encontrar esse preço depois.</p>
        </div>
    </AnimatedSection>
);


const FinalFaq = () => (
    <AnimatedSection className="bg-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ainda tem alguma dúvida?</h2>
            <div className="bg-primary-blue/10 p-8 rounded-lg shadow-lg">
                <AccordionItem theme="dark" title="Não li tudo, pode resumir pra mim?">
                    A proposta é simples: você vai terminar a leitura deste E-book sabendo tudo o que precisa para dominar a arte da geração de leads e aumentar seus lucros. Você terá acesso ao exato caminho que nós e nossos clientes seguimos para transformar leads em vendas de forma consistente.
                </AccordionItem>
                <AccordionItem theme="dark" title="Se é tão bom, por que está tão barato?">
                    Temos duas razões. Primeiro, para que o valor não seja um obstáculo para ninguém. Segundo, para afastar curiosos que buscam apenas soluções gratuitas. Acreditamos que, ao gostar do produto, você terá vontade de comprar outros treinamentos no futuro. É uma relação ganha-ganha.
                </AccordionItem>
                <AccordionItem theme="dark" title="Em quanto tempo recebo meu acesso?">
                    Imediatamente! Logo após a aprovação do seu pagamento, você receberá no seu e-mail de compra os dados de acesso à nossa área de membros premium.
                </AccordionItem>
                <AccordionItem theme="dark" title="O pagamento é único? E se eu não gostar?">
                    Sim, o pagamento é único, não é uma assinatura. E o risco é todo nosso! Se você não gostar da leitura, pode solicitar o reembolso total em até 7 dias a partir da compra. Você não tem nada a perder.
                </AccordionItem>
            </div>
            <div className="text-center mt-12">
                 <CTAButton className="text-xl">
                    OK! ME CONVENCEU!
                 </CTAButton>
            </div>
        </div>
    </AnimatedSection>
);


const GuaranteeContact = () => (
    <AnimatedSection className="bg-white py-16">
         <div className="container mx-auto px-6 text-center max-w-4xl text-slate-700">
             <h3 className="font-bold text-xl mb-2 text-navy">INVESTIMENTO 100% SEGURO!</h3>
             <p className="mb-8">Se você não gostar da leitura pode solicitar o reembolso em até 7 dias a partir da compra.</p>
             <div className="h-px bg-gray-200 w-1/3 mx-auto my-8"></div>
             <p className="font-semibold text-lg text-navy">Ainda tem alguma dúvida?</p>
             <p className="mt-2">Fale conosco através do email: <a href="mailto:contato@therifmarketingdigital.net" className="text-primary-blue font-semibold">contato@therifmarketingdigital.net</a></p>
             <p className="my-2">...ou pelo Whatsapp abaixo:</p>
             <a href="https://wa.me/5583981578532" target="_blank" rel="noopener noreferrer" className="inline-block bg-navy text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors">
                TOQUE AQUI E ENVIE MENSAGEM!
             </a>
         </div>
    </AnimatedSection>
);


const Footer = () => (
    <footer className="bg-black text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center text-xs space-y-2">
            <p>Suporte: contato@therifmarketingdigital.net</p>
            <p>&copy; {new Date().getFullYear()} Therif Marketing Digital. Todos os direitos reservados.</p>
            <p className="text-gray-500">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.</p>
        </div>
    </footer>
);

const FloatingCTA = () => (
    <a href="https://wa.me/5583981578532" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg z-50 hover:bg-green-600 transition-all duration-300 transform hover:scale-110">
        <WhatsAppIcon />
    </a>
);


// Main Landing Page Component
const LandingPage = () => {
    return (
        <div className="font-['Montserrat'] bg-white">
            <main>
                <InfoproductHero />
                <ProblemAgitation />
                <Solution />
                <BookDetails />
                <Bonuses />
                <Pricing />
                <FinalFaq />
                <GuaranteeContact />
            </main>
            <Footer />
            <FloatingCTA />
        </div>
    );
};

export default LandingPage;