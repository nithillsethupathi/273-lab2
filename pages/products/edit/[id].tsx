import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Router from "next/router"
import { useEffect, useState } from "react"
// async function getAllItemsHandler(){
//     const res = await fetch('http://localhost:3000/api/store/getAllItems')
//     const pros = await res.json()
//     return pros
// }

async function getItemHandler({params}){
    const res = await fetch(`https://273-lab1.vercel.app/api/store/${params.id}`)
    const data = await res.json()
    return data
}

// export async function getStaticPaths() {
//     const pros = await getAllItemsHandler()
//     const paths = pros.map((pro) => ({
//         params: { id: String(pro.productId) },
//     }))
//     return { paths, fallback: false }
// }

export async function getServerSideProps({ params }) {
    const data = await getItemHandler({params})
    return {
        props: {
            item: data[0],
        },
    }
}



const products = ({ item }) => {

    const { data: session, status } = useSession()
    const [title, setTitle] = useState(item.title)
    const [image, setImage] = useState(item.image)
    const [category, setCategory] = useState(item.category)
    const [price, setPrice] = useState(item.price)
    const [description, setDescription] = useState(item.description)

    async function updateItem() {
        await fetch(`/api/store/updateItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: item.productId,
                title: title,
                email: session?.user?.email,
                image: image,
                category: category,
                price: price,
                description: description,
                user: {connect: {email: session?.user?.email}}
            })
        });

        alert("Item has been updated")
        Router.reload()
    }

    return (
        <div className="mx-[20%] flex flex-wrap overflow-hidden">

            <div className="my-10 px-10 w-1/2 overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                <img className="rounded-sm h-64 w-64" src={String(item.image)} />
            </div>

            <div className="w-full overflow-hidden">
                <p className="text-2xl">Update the Item here!</p>
                <form className="bg-white shadow-md rounded p-[2%] mb-[5%]">
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            title
                        </label>
                        <input onChange={e => setTitle(e.target.value)} id="title" type="text" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder={title}></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            price
                        </label>
                        <input type="text" onChange={e => setPrice(e.target.value)} id="price" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder={price}></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            description
                        </label>
                        <input type="text" onChange={e => setDescription(e.target.value)} id="description" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder={description}></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            category
                        </label>
                        <input type="text" onChange={e => setCategory(e.target.value)} id="category" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder={category}></input>
                    </div>
                    <div className="flex mb-6">
                        <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                            image
                        </label>
                        <input type="text" onChange={e => setImage(e.target.value)} id="image" className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder={image}></input>
                    </div>
                    <div className="items-center text-center justify-center">
                        <button onClick={() => updateItem()} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Update Item
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default products