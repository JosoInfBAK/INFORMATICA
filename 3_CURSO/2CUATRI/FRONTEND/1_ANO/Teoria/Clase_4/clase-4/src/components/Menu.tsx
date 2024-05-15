import Link from "next/link"
import HomeLink from "@/src/components/HomeLink"

const Menu = () =>{

return(
    <div className="menu">
    <Link href={'/Persona_1'}>Persona 1</Link>
    <Link href={'/Persona_2'}>Persona 2</Link>
    <Link href={'/Persona_3'}>Persona 3</Link>
    <HomeLink href={'/'}>Home</HomeLink>
    </div>
)
}

export default Menu