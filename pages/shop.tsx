import { create } from "domain"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Router from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"


const shop = () => {
    const [data, setData] = useState('')
    const [items, setItems] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        try{
        setLoading(true)
        fetch('/api/shop/getName')
            .then((res) => res.text())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
        } catch{
            setData('')
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch('/api/store/getItem')
            .then((res) => res.json())
            .then((items) => {
                setItems(items)
                setLoading(false)
            })
    }, [])

    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return signIn()
    }

    async function createItem() {

        const response = await fetch('/api/store/createItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                email: session?.user?.email,
                image: image,
                category: category,
                price: price,
                description: description,
                user: {connect: {email: session?.user?.email}}
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        Router.push('/')
    }
    return (
        <div className="mx-[20%] flex flex-wrap overflow-hidden">

            <div className="w-full overflow-hidden">
                <img className="h-64 w-64 rounded-md" src="https://cdn.pixabay.com/photo/2013/07/13/11/31/shop-158317_960_720.png" />
                <p className="text-3xl font-semibold">
                    <span>{data}</span>
                </p>
            </div>
            <div className="w-full overflow-hidden">
                <p className="text-2xl">Items for sale from {session?.user?.name}</p>
                <div className=" my-8 flex flex-wrap overflow-hidden">
                    {items && items.map(item => (
                        <div id={item.productId} className="my-3 mx-5 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">

                            <img className="rounded-sm h-48 w-48" src={String(item.image)} />
                            <p className="text-1xl font-medium">
                                {item.title}
                            </p>
                            <p>
                                ${item.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full overflow-hidden">
                <p className="text-2xl">Create an Item here!</p>
                <form className="bg-white shadow-md rounded p-[2%] mb-[5%]">
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            title
                        </label>
                        <input onChange={e => setTitle(e.target.value)} id="title" type="text" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            price
                        </label>
                        <input type="text" onChange={e => setPrice(e.target.value)} id="price" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            description
                        </label>
                        <input type="text" onChange={e => setDescription(e.target.value)} id="description" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            category
                        </label>
                        <input type="text" onChange={e => setCategory(e.target.value)} id="category" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            image
                        </label>
                        <input type="text" onChange={e => setImage(e.target.value)} id="image" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></input>
                    </div>
                    <div className="items-center text-center justify-center">
                        <button onClick={() => createItem()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Create a new Item
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default shop;