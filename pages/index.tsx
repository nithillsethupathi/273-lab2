import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react"

function MyLink(props: any) {
  let { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}


const home = () => {

  const [data, setData] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('/api/store/getAllItems')
        .then((res) => res.json())
        .then((items) => {
            setItems(items)
            setLoading(false)
        })
}, [])


  const { data: session } = useSession()
  return (
      <div>
      <div className="w-full flex-auto bg-[#FDEBD2]">
        <div className="w-full flex-auto flex-col justify-center px-20 text-center">
          {!session && (
            <>
            <h3 className="text-5xl font-serif ">
            Explore one-of-a-kind finds from independent makers
          </h3>
            </>
          )}
          {session && (
            <>
            <h3 className="text-5xl font-serif ">
            Hi {session.user?.name}, Explore one-of-a-kind finds from independent makers
          </h3>
            </>
          )}
          
        </div>
        
        <div className="mt-4 flex w-full justify-center items-center flex-shrink-0">
          <img className="rounded-full h-40 w-40 mr-10" src="https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_300x300.2426681051_mocv.jpg" />
          <img className="rounded-full h-40 w-40 mr-10" src="https://i.etsystatic.com/29669210/r/il/48a8a1/3619807266/il_300x300.3619807266_4hg4.jpg" />
          <img className="rounded-full h-40 w-40 mr-10" src="https://i.etsystatic.com/8928370/r/il/f32f25/3376320499/il_300x300.3376320499_7sqq.jpg" />
          <img className="rounded-full h-40 w-40 mr-10" src="https://i.etsystatic.com/5395361/r/il/5bb896/3641190222/il_300x300.3641190222_fydq.jpg" />
          <img className="rounded-full h-40 w-40 mr-10" src="https://i.etsystatic.com/10115319/r/il/b2ab7a/3171926331/il_300x300.3171926331_p6i7.jpg" />
          <img className="rounded-full h-40 w-40 mr-10" src="https://i.etsystatic.com/10448437/r/il/8d7c57/1985247369/il_300x300.1985247369_d33t.jpg" />
        </div>
        </div>
      <main className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-3 overflow-hidden">
            {
                items.map(item => (
                    <div key={item.id} className="my-3 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                      
                      <img className="rounded-sm h-64 w-64" src={String(item.image)}/>
                      <Link href={String("products/"+(item.productId))}>
                        <a className='text-2xl text-orange-400'>
                            {item.title}
                        </a>
                      </Link>
                      <p>
                </p>
                        <p>
                            ${item.price}
                        </p>
                    </div>
                ))

            }
        </div>
      </main>
      <div className="w-full flex-auto">
      <div className="mt-[5%]">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#FDEBD2] rotate-180" viewBox="0 0 1400 48" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="m1400 0-55 12-23 10-23 4-6-1-9 1-5 2-24 8h-11l-18-5-11-1-10-1h-7l-8 3-8 1-14-4v1l-3 1-9-5-3-1-17 2-10-1-9-1-8 1-7 1-2 1h-13l-2-1-13-2h-20l-11 2-14 3h-18l-10 1-3-1-2-1-4-1h-4l-16 1h-2l-7-1h-6l-8 1-6-2-5-1-2 1-20-1-10 2h-6l-11-1-9-1h-4l-3 1-19 1h-19l-3-1-11 1h-2l-7 3h-23l-3 1h-19l-16-1-17 1h-8l-2-1-20-2-4 1-4-1h-2l-12 1-2 1h-13l-9 1h-4l-6-1-10 1-9-1h-15l-9 2-12-2-12-2-3 2-5 2-11-3-6 1h-6l-28 1-5 2h-33l-3 1-4 2h-17l-5 1-4-1-7-1h-5l-4 1-13 3-2-2-2-1h-15l-22-1h-2l-11 1h-5l-2-1h-19l-9 1-6-1h-2l-9 2-15 2h-4l-12 1h-25l-12 1-7 1h-4l-4 1h-4l-4 1h-20l-3-1h-7l-1-1v-4l-1 1h-2l-9 1-2 2-6 2-7 1-5 2h-2l-3-2-8-1h-4l-11 3h-1l-3-2-11-3-20-6-9-3h-3l-9 2h-5l-11-4-13-3-11-15-21-4L0 0h1400z" /></svg>
      </div>
      <div className= "bg-[#FDEBD2] min-h-full">
      <div className="w-full flex-auto">
        <div className="flex w-full items-center flex-auto flex-col px-20">
          <h3 className="text-5xl italic font-semibold">
            What is Etsy?
          </h3>
          <div className="mx-[10%] mb-8 grid text-center grid-cols-3 gap-12 mt-5">
            <div>
              <p className="text-3xl font-semibold">A community doing good</p>
              <p className="text-2xl font-light">Etsy is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We’re also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we’re making a positive impact, together.</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Support independent creators</p>
              <p className="text-2xl font-light">There’s no Etsy warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Support independent creators</p>
              <p className="text-2xl font-light">Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default home;