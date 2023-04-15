
type ArrowRightProps = {
    htmlFor?: string
    className: string
}
const ArrowRight: React.FC<ArrowRightProps> = ({ htmlFor, className }) => {
    return (
        <svg 
            width="800px" 
            height="800px" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >

            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"  strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="F-Chevron"> <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/> </g> </g> </g>

        </svg>
    )
}

export default ArrowRight;