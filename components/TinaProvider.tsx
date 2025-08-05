'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TinaProvider() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the TinaCMS admin
    router.push('/admin/index.html')
  }, [router])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to TinaCMS admin...</p>
    </div>
  )
}