import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState, useEffect } from "react"
import Router from 'next/router'

const profile = () => {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [items, setItems] = useState<any[]>([])
    useEffect(() => {
        setLoading(true)
        fetch('/api/user/getFavorites')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch('/api/orders/orderTotal')
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
                setLoading(false)
            })
    }, [])
    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return signIn()
    }

    const deleteFavorites = async e => {
        e.preventDefault()
        const val = e.target.getAttribute('id')
        const response = await fetch(`/api/user/deleteFavorites`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: val
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        Router.reload()
    }
    var price = 0
    return (
        <div className="ml-[20%]">
            <div className="flex w-full justify-items-stretch">
                <img className="rounded-full h-25 w-25 mt-4 ml-[5%]" src={String(session?.user?.image)} />
                <span className="text-2xl ml-[1%] mt-[1.8%] font-light font-mono">{session?.user?.name}
                    <p className="text-sm font-thin">0 followers &nbsp;&nbsp; 0 following</p>
                </span>
                <Link href="/profile_edit">
                    <button className="ml-[0.5%] -mt-[0.5%]">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48"><path fill="#c94f60" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718	C43.139,10.526,43.139,9.625,42.583,9.067"></path><path fill="#f0f0f0" d="M6.905,35.43L5,43l7.571-1.906l0.794-6.567L6.905,35.43z"></path><path fill="#edbe00" d="M36.032,17.632l-23.46,23.461l-5.665-5.665l23.46-23.461L36.032,17.632z"></path><linearGradient id="YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1" x1="35.612" x2="35.612" y1="7.494" y2="17.921" gradientUnits="userSpaceOnUse"><stop offset="0"></stop><stop offset="1"></stop></linearGradient><path fill="url(#YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1)" d="M30.363,11.968l4.832-4.834l5.668,5.664l-4.832,4.834L30.363,11.968z"></path><path fill="#787878" d="M5.965,39.172L5,43l3.827-0.965L5.965,39.172z"></path></svg>
                    </button>
                </Link>
            </div>

            <div>
                <p className=" mt-[5%] ml-[5%] text-3xl font-medium">Favorite Items
                    <button className="ml-[0.5%] -mt-[0.5%]">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48"><path fill="#c94f60" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718	C43.139,10.526,43.139,9.625,42.583,9.067"></path><path fill="#f0f0f0" d="M6.905,35.43L5,43l7.571-1.906l0.794-6.567L6.905,35.43z"></path><path fill="#edbe00" d="M36.032,17.632l-23.46,23.461l-5.665-5.665l23.46-23.461L36.032,17.632z"></path><linearGradient id="YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1" x1="35.612" x2="35.612" y1="7.494" y2="17.921" gradientUnits="userSpaceOnUse"><stop offset="0"></stop><stop offset="1"></stop></linearGradient><path fill="url(#YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1)" d="M30.363,11.968l4.832-4.834l5.668,5.664l-4.832,4.834L30.363,11.968z"></path><path fill="#787878" d="M5.965,39.172L5,43l3.827-0.965L5.965,39.172z"></path></svg>
                    </button>
                    <input type="text" className="ml-[20%] -mr-[3%] border-2 border-black bg-gray-100 h-10 px-5 pr-20 rounded-full text-sm focus:outline-none" placeholder="Search" />
                </p>
            </div>
            <main className="container mx-auto p-4">
                <div className="flex flex-wrap -mx-3 overflow-hidden">
                    {data?.map(item => (
                        <div id={item.productId} className="my-3 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">

                            <img className="rounded-sm h-64 w-64" src={String(item.image)} />
                            <Link href={String("products/" + (item.productId))}>
                                <a className='text-2xl text-orange-400'>
                                    {item.title}
                                </a>
                            </Link>
                            <p>
                            </p>
                            <p>
                                ${item.price}
                            </p>
                            <button id={item.id} onClick={(e) => deleteFavorites(e)} className="mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Delete from your Favorites
                            </button>
                        </div>
                    ))
                    }
                </div>
            </main>
            <div>
                <p className=" mt-[5%] ml-[5%] text-3xl font-medium">My Orders
                    <button className="ml-[0.5%] -mt-[0.5%]">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48"><path fill="#c94f60" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718	C43.139,10.526,43.139,9.625,42.583,9.067"></path><path fill="#f0f0f0" d="M6.905,35.43L5,43l7.571-1.906l0.794-6.567L6.905,35.43z"></path><path fill="#edbe00" d="M36.032,17.632l-23.46,23.461l-5.665-5.665l23.46-23.461L36.032,17.632z"></path><linearGradient id="YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1" x1="35.612" x2="35.612" y1="7.494" y2="17.921" gradientUnits="userSpaceOnUse"><stop offset="0"></stop><stop offset="1"></stop></linearGradient><path fill="url(#YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1)" d="M30.363,11.968l4.832-4.834l5.668,5.664l-4.832,4.834L30.363,11.968z"></path><path fill="#787878" d="M5.965,39.172L5,43l3.827-0.965L5.965,39.172z"></path></svg>
                    </button>
                    <input type="text" className="ml-[20%] -mr-[3%] border-2 border-black bg-gray-100 h-10 px-5 pr-20 rounded-full text-sm focus:outline-none" placeholder="Search" />
                </p>
            </div>
            <main className="container mx-auto p-4">
                <div className="flex flex-wrap -mx-3 overflow-hidden">
                    {items?.map(i => (
                        <div className="flex flex-wrap overflow-hidden mt-8 mb-8">
                            <div className="w-1/4 overflow-hidden">
                                <img className="rounded-sm h-36 w-36" src={String(i.image)} />
                            </div>

                            <div className="w-1/4 overflow-hidden">
                                <Link href={String("products/" + (i.productId))}>
                                    <a className='text-center justify-center text-2xl text-orange-400'>
                                        {i.title}
                                    </a>
                                </Link>
                            </div>

                            <div className="w-1/4 overflow-hidden">
                                <p className="mt-[15%] text-2xl font-medium">
                                    ${i.price}
                                </p>
                            </div>
                            <p className="invisible">{price = price + i.price}</p>
                        </div>
                        
                    ))
                    }
                    
                </div>
                {items && (
                    <div className="flex items-center text-center justify-center overflow-hidden">
                        <p className="text-center text-2xl font-bold"> Order Total={price}</p>
                    </div>
                )
                }
            </main>
        </div>
    )
}

export default profile
