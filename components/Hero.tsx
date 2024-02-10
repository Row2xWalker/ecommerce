import Image from "next/image"

const Hero = () => {
    return (
        <>
            <div className="relative h-[300px] md:h-[630px]  z-0 font-serif text-white">
                <Image src="https://res.cloudinary.com/digbmnogn/image/upload/v1687751702/samples/ecommerce/analog-classic.jpg" alt="hero-image" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
                <section className="relative ">
                    <p className="text-xl md:text-4xl p-8 md:p-16 "> Time Waits for No One – <br></br>Shop Now and Redefine Your Style!</p>
                </section>
            </div>
            
            <div className="text-4xl pt-16">
                Browse All Products
            </div>
        </>
    )
}

export default Hero