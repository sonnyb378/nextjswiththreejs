import Image from "next/image"

export default function Home() {
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4">
        <div className='flex flex-1 flex-grow items-center justify-center space-x-2 w-full h-[100%] border-0'>
          <Image src='/assets/nextjs-logo.svg' priority={true} alt='NextJS Logo' width={200} height={200} className='object-fit w-[200px] h-[200px]' />
          <Image src='/assets/plus_sign.svg' priority={true} alt='Plus' width={100} height={100} className='object-fit w-[100px] h-[100px]' />
          <Image src='/assets/threejs-logo.svg' alt='ThreeJS Logo' width={200} height={200} className='object-contain w-[200px] h-[200px]' />
        </div>
    </section>
  )
}
