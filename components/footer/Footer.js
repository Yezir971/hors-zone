import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'
const Footer = () => {
    return (
        <>
            <footer className="border-t text-[var(--text-color-footer)] bg-[var(--background-color-footer)] border-[var(--text-color-footer)] py-6 text-center">
                <div className="flex justify-center gap-6 mb-4 text-2xl ">
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="text-[var(--text-color-footer)]"
                    >
                        <FaInstagram size={22} />
                    </a>
                    <a
                        href="#"
                        aria-label="TikTok"
                        className="text-[var(--text-color-footer)]"
                    >
                        <SiTiktok size={22} />
                    </a>
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="text-[var(--text-color-footer)]"
                    >
                        <FaFacebookF size={22} />
                    </a>
                </div>
                <div className="flex justify-center gap-4  text-[12px] font-normal ">
                    <a href="#">Contact</a>
                    <span>|</span>
                    <a href="#">Politique de confidentialité</a>
                    <span>|</span>
                    <a href="#">Mentions légales</a>
                </div>
            </footer>
        </>
    )
}

export default Footer
