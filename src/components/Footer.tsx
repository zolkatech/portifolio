import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer id="contato" className="relative border-t border-white/5 bg-black/20">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-sm text-white/40 leading-relaxed">
                            Gustavo Mendonça — Arquiteto de soluções com IA.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a
                                href="mailto:contato@zolka.tech"
                                className="flex items-center gap-2 text-sm text-white/40 hover:text-[#FACC15] transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                gustavo.zolkatech@gmail.com
                            </a>
                            <div className="flex items-center gap-2 text-sm text-white/40">
                                <MapPin className="w-4 h-4" />
                                Toledo, PR - Brasil
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-6">
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: 'https://www.instagram.com/gusstavo.ai/', label: 'Instagram' },
                                { icon: MessageCircle, href: 'https://api.whatsapp.com/send?phone=554588404239', label: 'WhatsApp' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-[#FACC15]/10 hover:border-[#FACC15]/20 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4 text-white/40" />
                                </a>
                            ))}
                        </div>
                        <p className="text-sm text-white/25">
                            © {new Date().getFullYear()} Gustavo Mendonça. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
