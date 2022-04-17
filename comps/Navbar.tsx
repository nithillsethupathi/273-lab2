import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Navbar(){
  const { data: session } = useSession()
    return(
      <div className="flex min-h-full flex-col items-center">
        <nav className="mx-[20%] flex justify-center p-4">
          <div className="w-[150%] flex flex-shrink-0">
            <Link href="/">
            <svg className="w-[20%] ]mr-2 fill-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 24" aria-hidden="true"><path d="M6.547 3.125v6.008s2.117 0 3.25-.086c.891-.156 1.055-.242 1.219-1.133l.328-1.305h.969l-.164 2.852.086 2.922h-.977l-.242-1.141c-.242-.812-.57-.977-1.219-1.055-.812-.086-3.25-.086-3.25-.086v5.039c0 .969.492 1.383 1.625 1.383h3.414c1.055 0 2.109-.086 2.766-1.625l.883-1.953h.82c-.086.406-.492 3.984-.57 4.789 0 0-3.086-.078-4.383-.078H5.25l-3.492.078v-.883l1.133-.25c.82-.164 1.062-.406 1.062-1.055 0 0 .086-2.195.086-5.852 0-3.648-.086-5.844-.086-5.844 0-.727-.242-.891-1.062-1.055l-1.133-.24v-.891l3.414.07h6.5c1.297 0 3.484-.234 3.484-.234s-.078 1.375-.164 4.625h-.891l-.328-1.141c-.32-1.461-.805-2.188-1.703-2.188H6.961c-.414.001-.414.079-.414.329zm13.156.641h.977V7.18l3.336-.164-.164 1.547-3.25-.25v6.016c0 1.703.57 2.359 1.547 2.359.883 0 1.539-.492 1.781-.898l.484.57c-.484 1.133-1.859 1.703-3.164 1.703-1.617 0-2.93-.969-2.93-2.836V8.398h-1.938v-.812c1.626-.164 2.837-1.141 3.321-3.82zm6.992 10.476.648 1.547c.242.648.812 1.305 2.109 1.305 1.383 0 1.953-.734 1.953-1.625 0-2.766-5.445-1.953-5.445-5.688 0-2.109 1.703-3.094 3.898-3.094.977 0 2.438.164 3.172.492-.164.812-.25 1.867-.25 2.68l-.805.078-.57-1.625c-.164-.398-.82-.727-1.625-.727-.977 0-1.953.406-1.953 1.461 0 2.516 5.609 1.953 5.609 5.688 0 2.117-1.867 3.25-4.148 3.25-1.703 0-3.414-.656-3.414-.656.164-.969.086-2.023 0-3.086h.821zm6.336 7.797c.242-.891.406-2.023.57-3.086l.891-.078.328 1.703c.078.406.32.734.969.734 1.055 0 2.438-.648 3.742-2.922-.578-1.383-2.281-5.844-3.828-9.258-.406-.898-.484-.977-1.047-1.141l-.414-.156v-.82l2.445.086 3-.164v.813l-.734.164c-.57.078-.805.398-.805.727 0 .086 0 .164.078.328.156.492 1.461 4.141 2.438 6.578.805-1.703 2.352-5.523 2.594-6.172.086-.328.164-.406.164-.648 0-.414-.242-.656-.805-.812l-.578-.165v-.812l2.281.078 2.109-.078v.812l-.406.32c-.812.328-.898.406-1.219 1.062l-3.57 8.359c-2.117 4.797-4.312 5.203-5.852 5.203-.976.001-1.71-.249-2.351-.655z" /></svg>
            </Link>
            <div className="relative w-[190%]">
              <input type="text" className="w-full border-2 border-black bg-gray-200 h-12 px-5 pr-20 rounded-full text-md focus:outline-none" placeholder="Search for Everything" />
              <div className="absolute top-2 right-3">
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path></svg>
                </button>
              </div>
            </div>
            {!session && (
              <button onClick={() => signIn()} type="submit" className="w-[20%] mt-3 ml-4 flex rounded-full border-white hover:bg-gray-200">Sign in</button>
            )}
            {session && (
              <div className="flex">
              <button onClick={() => signOut()} type="submit" className="w-[30%] mt-3 ml-4 flex rounded-full border-white hover:bg-gray-200">Sign Out</button>
              <Link href="/profile">
              <a type="submit" className="w-[20%] mt-3 ml-4 flex rounded-full border-white">Profile</a>
              </Link>
              <Link href="/sell">
              <a type="submit" className="w-[20%] mt-3 ml-4 flex rounded-full border-white">Sell</a>
              </Link>
              <Link href="/shop">
              <a type="submit" className="w-[20%] mt-3 ml-4 flex rounded-full border-white">Shop</a>
              </Link>
              </div>
            )}
            <Link href="/cart">
            <button type="submit" className="w-[15%] mx-auto flex justify-center items-center rounded-full border-white hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 0 50 25" aria-hidden="true" focusable="false">
                <path d="M9 22a2 2 0 100-4 2 2 0 000 4zm7 0a2 2 0 100-4 2 2 0 000 4zm5-17H5.665l-.687-3.21A1 1 0 004 1H1a1 1 0 000 2h2.191l2.831 13.21a.962.962 0 00.064.159c.017.053.038.105.063.155a.979.979 0 00.133.153.926.926 0 00.088.1c.058.041.12.077.185.105.034.022.07.042.107.06A.993.993 0 007 17h11a1 1 0 00.958-.713l3-10A1.001 1.001 0 0021 5zm-2.244 5H16V7h3.656l-.9 3zM7.819 15l-.6-3H9v3H7.819zM11 12h3v3h-3v-3zm0-2V7h3v3h-3zM9 7v3H6.82l-.6-3H9zm8.256 8H16v-3h2.156l-.9 3z"></path>
              </svg>
            </button>
            </Link>
          </div>
        </nav>
  
        <div className="flex w-full justify-center items-center flex-shrink-0 border-2 border-white border-b-gray-200">
          <p className="flex justify-between flex-wrap p-4">Home Favorites</p>
          <p className="flex justify-between flex-wrap p-4">Jewelery & Accessories</p>
          <p className="flex justify-between flex-wrap p-4">Clothing & Shoes</p>
          <p className="flex justify-between flex-wrap p-4">Home & Living</p>
          <p className="flex justify-between flex-wrap p-4">Toys & Entertainment</p>
          <p className="flex justify-between flex-wrap p-4">Craft Supplies</p>
          <p className="flex justify-between flex-wrap p-4">Gifts & Gift Cards</p>
        </div>
        </div>
    )
}