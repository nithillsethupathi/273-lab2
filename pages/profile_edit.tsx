import { useSession, signIn, signOut } from "next-auth/react"
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useState } from "react";
export default function profile_edit() {


    const [country, setCountry] = useState("United States")
    const [region, setRegion] = useState("California")
    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return signIn()
    }

    function selectCountry(val) {
        setCountry(val);
    }

    function selectRegion(val) {
        setRegion(val);
    }

    return (
        <main className="flex bg-orange-100 items-center justify-center flex-wrap h-screen">
            <form className="bg-white shadow-md rounded p-[2%] mb-[5%]">
                <div className="text-center mb-[3%] text-2xl font-bold">
                    <p>Your Public Profile</p>
                </div>
                <div className="flex mb-4 mt-5">
                    <label className="flex flex-wrap text-gray-700 text-lg font-bold mt-[10%]">
                        Profile Picture
                    </label>
                    <img className="rounded-full h-25 w-25 ml-[5%]" src={String(session?.user?.image)} />
                    {/* <button className="flex flex-wrap btn shadow appearance-none border border-orange-500 rounded w-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Choose File</button> */}
                </div>
                <div className="flex mb-6">
                    <label className="flex flex-wrap text-gray-700 mr-3 text-lg font-bold mb-2">
                        Name
                    </label>
                    <p className="flex flex-wrap shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">{session?.user?.name}</p>
                </div>
                <div className="flex mb-4 mt-5">
                    <label className="flex text-gray-700 text-lg font-bold mb-2">
                        Date Of Birth
                    </label>
                    <input className="shadow ml-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"></input>
                </div>
                <div className="flex mb-4 mt-5">
                    <label className="flex text-gray-700 text-lg font-bold mb-2">
                        City
                    </label>
                    <input className="shadow ml-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="city" placeholder="City"></input>
                </div>
                <div className="flex mb-4 mt-5">
                    <label className="flex text-gray-700 text-lg font-bold mb-2">
                        Country
                    </label>
                    <div className="shadow ml-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)} />
                    </div>
                </div>
                <div className="flex mb-4 mt-5">
                    <label className="flex text-gray-700 text-lg font-bold mb-2">
                        State
                    </label>
                    <div className="shadow ml-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => selectRegion(val)} />
                    </div>
                </div>

                <div className="flex mb-4 mt-5">
                    <label className="flex text-gray-700 text-lg items-start mt-5 font-bold mb-2">
                        About
                    </label>
                    <input className="shadow ml-5 appearance-none border rounded w-full py-8 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="about" type="about" placeholder="About"></input>
                </div>
                <div className="items-center text-center justify-center">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save Changes
                    </button>
                </div>
            </form>
        </main >
    )
}