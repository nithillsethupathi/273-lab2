import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Link from 'next/link'
import { useState, useEffect } from "react"
import Router from 'next/router'
import { create } from "domain"

export default function cart() {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/cart/getCart')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return signIn()
    }

    const deleteCart = async e => {
        e.preventDefault()
        const val = e.target.getAttribute('id')
        const response = await fetch(`/api/cart/deleteCart`, {
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

    async function deleteAll(){
        const response = await fetch(`/api/cart/deleteAll`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: (session?.user?.email)
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    async function createOrder(data){
        const response = await fetch(`/api/orders/createOrderNumber`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const orderNo = await response.json();
        console.log(orderNo)

        await data.map((item) => {
            console.log(item.id)
            fetch(`/api/orders/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    productId: String(item.id),
                    orderNumber: parseInt(JSON.stringify(orderNo.orderNumber)),
                    title: String(item.title),
                    image: String(item.image),
                    email: String(session?.user?.email),
                    price: Number(item.price),
                    user: {connect: {email: session?.user?.email}}
                })
            });
        })

        await deleteAll()

        Router.push('/profile')
    }  
    
    return (
        <div className="mx-[20%]">
            <p className="text-3xl font-semibold mt-5 mb-5">Cart</p>
            {data?.map(item => (
                <div className="flex flex-wrap overflow-hidden mt-8 mb-8">
                    
                        <div className="w-1/4 overflow-hidden">
                        <button id={item.id} onClick={(e) => deleteCart(e)} className=" mt-[15%] bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Remove
                        </button>
                    </div>
                    <div className="w-1/4 overflow-hidden">
                        <img className="rounded-sm h-36 w-36" src={String(item.image)} />
                    </div>

                    <div className="w-1/4 overflow-hidden">
                        <Link href={String("products/" + (item.productId))}>
                            <a className='text-center justify-center text-2xl text-orange-400'>
                                {item.title}
                            </a>
                        </Link>
                    </div>

                    <div className="w-1/4 overflow-hidden">
                    <p className="mt-[15%] text-2xl font-medium">
                            ${item.price}
                        </p>
                    </div>
                </div>
            ))
            }
            <input onClick={() => createOrder(data)} type="submit" className="mb-8 mt-8 ml-[40%]  px-6 py-2 border-2 border-orange-500 text-orange-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" value="Complete Purchase"/>
        </div>
    )

}