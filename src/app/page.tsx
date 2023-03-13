'use client'
import styles from '@/styles/page.module.css'
import { useAuth } from '../lib/authContext';

export default function Home() {
  const { user, loading } = useAuth();

  // if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1 className='items-center justify-center w-full min-h-screen text-7xl'>U need to login</h1>;

  return (
    <main className={styles.main}>
      <h1 className='items-center justify-center text-7xl'>Hello {user?.claims.email}</h1>
    </main>
  )
}
