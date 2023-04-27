import Link from "next/link";

type ButtonNavProps = {
    link: string,
    title: string,
    icon?: JSX.Element
}
const ButtonNav: React.FC<ButtonNavProps> = ({ icon, link, title }) => {
    return (
        <Link href={link} className={`flex btn btn-primary group cursor-pointer hover:text-yellow-500 items-center justify-start no-underline`}>     
            { icon }            
            <span className={`text-white group-hover:text-yellow-500 no-underline normal-case`}>{ title }</span>
        </Link>
    )
}

export default ButtonNav;