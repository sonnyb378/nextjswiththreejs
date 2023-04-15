import Link from "next/link"

function Footer() {
    const year = new Date()
    const startYear = "2021"
    const fullYear = year.getFullYear()
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <div>
                <p>Copyright © { +startYear === fullYear  ? fullYear : `${startYear} - ${fullYear}` } . All Right Reserved</p>
            </div>
        </footer>
        
    )
}

export default Footer;