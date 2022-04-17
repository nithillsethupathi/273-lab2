import ReactStars from "react-rating-stars-component";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

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
    async function createFavorites() {
        await fetch(`/api/user/createFavorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: String(item.id),
                title: String(item.title),
                price: Number(item.price),
                image: String(item.image),
                email: String(session?.user?.email),
                user: { connect: { email: session?.user?.email } }
            })
        });
        alert("Added to your favorites")
    }

    async function createCart() {
        await fetch(`/api/cart/createCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: String(item.id),
                title: String(item.title),
                price: Number(item.price),
                image: String(item.image),
                email: String(session?.user?.email),
                user: { connect: { email: session?.user?.email } }
            })
        });
        alert("Item added to your Cart")
    }

    return (
        <div className="mx-[20%] flex flex-wrap overflow-hidden">

            <div className="my-10 px-10 w-1/2 overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                <img className="rounded-sm h-64 w-64" src={String(item.image)} />
            </div>

            <div className="my-10 px-10 w-1/2 overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                <p className='mt-5 text-2xl text-orange-400 font-semibold'>
                    {item.title}
                </p>
                <p className='mt-5 text-1xl'>
                    ${item.price}
                </p>
                <p className='mt-5 text-1xl'>
                    <span className="font-semibold">Category: </span>{item.category}
                </p>
                <p className='mt-5 text-1xl'>
                    {item.description}
                </p>
                {session && (
                    <div>
                        <div>
                        <button onClick={() => createFavorites()} className="mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Add to your Favorites
                        </button>
                        </div>
                        <div>
                        <button onClick={() => createCart()} className="mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Add to your Cart
                        </button>
                        </div>
                        <div>
                        <Link href={String("edit/" + (item.productId))}>
                        <button className="mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Edit Item
                        </button>
                        </Link>
                        </div>
                    </div>

                )
                }
            </div>

        </div>
    )
}
export default products