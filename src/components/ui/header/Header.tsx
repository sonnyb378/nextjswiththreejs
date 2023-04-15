import Link from "next/link"
import Image from "next/image";

function Header() {
    return (
        <header>
            <div className="navbar bg-base-100 space-x-2">
                <div className="flex-1">                    
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        <Image src='/assets/threejs-logo.svg' alt='ThreeJS Logo' width={30} height={30} className='object-contain mr-1 w-[30px] h-[30px]' />
                        ThreeJS + Next.JS
                    </Link>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn">
                        Examples
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                        <li><Link href="/geometry/box">Box</Link></li>
                        <li><Link href="/geometry/torus">Torus</Link></li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn">
                        Topics
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                        <li><Link href="/r3f">R3F</Link></li>
                        <li><Link href="/drei">Drei</Link></li>
                        <li><Link href="/r3f/debug">Debug</Link></li>
                        <li><Link href="/r3f/environment-and-staging">Environment and Staging</Link></li>
                        <li><Link href="/r3f/load-models">Load Models</Link></li>
                        <li><Link href="/r3f/3d-text">3D Text</Link></li>
                        <li><Link href="/r3f/portal-scene">Portal Scene</Link></li>
                        <li><Link href="/r3f/mouse-events">Mouse Events</Link></li>
                        <li><Link href="/r3f/post-processing">Post Processing</Link></li>
                        <li><Link href="/r3f/physics">Physics</Link></li>
                    </ul>
                </div>
                <button className="btn"><Link href="/portfolio">Portfolio</Link></button>
                <button className="btn"><Link href="/game">Game</Link></button>
                
            </div>
        </header>
        
    )
}

export default Header;