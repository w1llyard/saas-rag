"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Settings, HelpCircle, User } from "lucide-react"
import { motion } from "framer-motion"

export function MobileNavBar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      current: pathname === "/dashboard",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
    {
      name: "Help",
      href: "/dashboard/help",
      icon: HelpCircle,
      current: pathname === "/dashboard/help",
    },
    {
      name: "Account",
      href: "/dashboard/settings",
      icon: User,
      current: pathname.includes("/dashboard/account"),
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-10">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center py-2 px-3 relative">
            <div className={`relative ${item.current ? "text-purple-600" : "text-muted-foreground"}`}>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{
                  scale: item.current ? 1 : 0.9,
                  y: item.current ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="h-6 w-6" />
              </motion.div>

              {item.current && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-purple-600 rounded-full -translate-x-1/2"
                  layoutId="navDot"
                  transition={{ type: "spring", duration: 0.3 }}
                />
              )}
            </div>

            <span
              className={`text-xs mt-1 ${
                item.current ? "text-purple-600 font-medium" : "text-muted-foreground font-normal"
              }`}
            >
              {item.name}
            </span>

            {item.current && (
              <motion.div
                className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-md -z-10"
                layoutId="navBackground"
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
