import React, { useState } from "react"
import { Facebook, Instagram, Menu, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LoginModal from "./LoginModal"

const navItems = [
  { href: "#teams", text: "Equipos" },
  { href: "#fixtures", text: "Fixture" },
  { href: "#standings", text: "Posiciones" },
  { href: "#news", text: "Noticias" },
]

const categories = [
  { text: "Primera Masc", href: "#mens" },
  { text: "Primera Fem", href: "#womens" },
  { text: "Tercera", href: "#reserve" },
  { text: "Cuarta", href: "#youth" },
]

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-14 items-center justify-between py-2">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a href="tel:+3442232323" className="hover:text-foreground">
              +3442232323
            </a>
            <a href="mailto:info@ligacdelu.com" className="hover:text-foreground">
              info@ligacdelu.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <SocialLink href="https://www.facebook.com/ligadefutbolcdelu.com.ar/?_rdr" icon={<Facebook className="h-4 w-4" />} label="Facebook" />
            <SocialLink href="https://www.instagram.com/ligadefutbolcdelu.oficial/?hl=es" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
            <SocialLink href="https://www.youtube.com" icon={<Youtube className="h-4 w-4" />} label="YouTube" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src="/logos/Liga.png" alt="" className="h-10 w-10" />
            <span className="text-xl font-bold">Liga Concepcion del Uruguay</span>
          </a>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            <NavDropdown text="Categorias" items={categories} />
            <Button onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:underline"
                  >
                    {item.text}
                  </a>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-left text-lg font-medium hover:underline">
                    Categorias
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <a href={item.href}>{item.text}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  )
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="text-sm font-medium hover:underline">
      {text}
    </a>
  )
}

function NavDropdown({ text, items }: { text: string; items: { text: string; href: string }[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-medium hover:underline">{text}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <a href={item.href}>{item.text}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="text-muted-foreground transition-colors hover:text-foreground"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  )
}