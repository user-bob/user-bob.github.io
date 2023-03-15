import Head from 'next/head'
import {useAuth} from '@/context/authContext';
import React, {useEffect} from 'react';
// import {doc, getFirestore, setDoc} from 'firebase/firestore'
import type {NextPage} from "next";
import Item from '@/components/Card/Item';

const Home: NextPage = () => {
    const {user, loading} = useAuth();
    // const profile = {username: 'nextjs_user', message: 'Awesome!!'}

    // if (loading) return <h1>Loading...</h1>;
    useEffect(() => {
        if (!loading) {
            // You know that the user is loaded: either logged in or out!
            console.log(user)
        }
        // You also have your firebase app initialized
    }, [loading, user])

    // const createUser = async () => {
    //     const db = getFirestore()
    //     await setDoc(doc(db, 'profile', profile.username), profile)
    //
    //     alert('User created!!')
    // }

    let items = []
    for (let i = 1; i < 10; i++) {
        items.push(<Item key={i} image={`https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${i}.jpg`}/>)
    }
    return (
        <>
            <Head>
                <title>ElecPrice</title>
                <meta name="description" content="My home page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={'w-full py-4 px-6 md:px-8'}>
                <div className={'grid grid-flow-row gap-4'}>
                    <div className={'grid grid-flow-col gap-4 overflow-auto hover:overflow-x-scroll scrollbar-hide'}>
                        {items}
                    </div>
                    <div className="grid grid-cols lg:grid-cols-4 md:grid-cols-3 gap-4">
                        {items}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home