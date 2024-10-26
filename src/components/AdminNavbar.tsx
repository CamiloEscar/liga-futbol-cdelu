// src/components/AdminNavbar.tsx
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useAuth } from '../context/AuthContext'

export default function AdminNavbar() {
  const { logout } = useAuth()

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">
              League Manager
            </Link>
          </div>
          <div>
            <Link to="/">
              <Button variant="secondary" className="mr-2">Back to Public Site</Button>
            </Link>
            <Button onClick={logout} variant="secondary">Logout</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}