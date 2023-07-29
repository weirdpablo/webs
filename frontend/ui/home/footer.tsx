const Footer = () => {
    return(
        <div className="px-[1.1rem] font-inter py-[1.1rem] text-left bg-[#1d1d1f] text-[#a1a1a6] text-[.9rem]">
            <div className="mb-[1.2rem]">
                <p><b>Disclaimer:</b> We're really just trying things out. Please read and agree to the following terms before joinning the beta program:</p>
                <ol className="pl-[.5rem]">
                    <li className="mb-[.9rem]">
                        1. Beta Software Status: This software is a pre-release beta version under active development. It may have bugs and undergo changes without prior notice.
                    </li>
                    <li className="mb-[.9rem]">2. Limited Warranty: The beta version is provided "as-is" without any warranties or guarantees. You use it at your own risk.</li>
                    <li className="mb-[.9rem]">3. Feedback and Reporting: Share feedback, bug reports, and suggestions to help improve the software.</li>
                    <li className="mb-[.9rem]">4. Confidentiality: Keep all confidential information about the beta version private and not share it with others.</li>
                    <li className="mb-[.9rem]">5. Termination of Beta Access: We may terminate your beta access at any time, and you can leave the beta program at your discretion.</li>
                </ol>
                <p className="my-[1.3rem]">Participation is voluntary</p>
            </div>
            <div className="border-t border-[#424245] pt-[1.2rem]">
                <p>Made in Lagos, Nigeria.</p>
                <p>Copyright &copy; {new Date().getFullYear()} <span className="text-[#fff]">Something, Inc.</span> All rights reserved</p>
            </div>
        </div>     
    )
}
export default Footer;