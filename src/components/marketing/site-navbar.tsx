import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../brand/logo";
import { ThemeToggle } from "../common/theme-toggle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useAuth } from "../../context/AuthContext"; // <--- YEH LINE ADD KARO

const links = [
  { label: "Features", to: "/#features" },
  { label: "Resume Builder", to: "/#resume-builder" },
  { label: "Portfolio Builder", to: "/#portfolio-builder" },
  { label: "AI Career Coach", to: "/#ai-coach" },
  { label: "Pricing", to: "/#pricing" },
  { label: "FAQ", to: "/#faq" },
] as const;

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth(); // <--- YEH LINE ADD KARO

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 glass">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-5 lg:px-8"
      >
        <Link to="/" className="min-w-0 shrink-0" aria-label="CareerOS AI home">
          <Logo />
        </Link>

        <ul className="hidden flex-1 items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          {/* AGAR USER LOGGED IN HAI TOH YEH DIKHEGA */}
          {user ? (
            <>
              <span className="hidden sm:inline-flex items-center text-sm font-medium text-foreground">
                Welcome, {user.name || user.email}
              </span>
              <Button 
                variant="outline" 
                onClick={logout}
                className="hidden sm:inline-flex"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button asChild variant="hero" className="hidden sm:inline-flex">
                <Link to="/auth/register">Get Started Free</Link>
              </Button>
            </>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-6">
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </Button>
              </div>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-2">
                {/* MOBILE MENU - AGAR USER LOGGED IN HAI */}
                {user ? (
                  <>
                    <span className="text-center text-sm font-medium text-foreground py-2">
                      Welcome, {user.name || user.email}
                    </span>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                      <Link to="/auth/login">Login</Link>
                    </Button>
                    <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
                      <Link to="/auth/register">Get Started Free</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}







// CORRECT



// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import { Logo } from "../brand/logo";
// import { ThemeToggle } from "../common/theme-toggle";
// import { Button } from "../ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

// const links = [
//   { label: "Features", to: "/#features" },
//   { label: "Resume Builder", to: "/#resume-builder" },
//   { label: "Portfolio Builder", to: "/#portfolio-builder" },
//   { label: "AI Career Coach", to: "/#ai-coach" },
//   { label: "Pricing", to: "/#pricing" },
//   { label: "FAQ", to: "/#faq" },
// ] as const;

// export default function SiteNavbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 border-b border-border/70 glass">
//       <nav
//         aria-label="Main"
//         className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-5 lg:px-8"
//       >
//         <Link to="/" className="min-w-0 shrink-0" aria-label="CareerOS AI home">
//           <Logo />
//         </Link>

//         <ul className="hidden flex-1 items-center gap-0.5 lg:flex">
//           {links.map((link) => (
//             <li key={link.label}>
//               <Link
//                 to={link.to}
//                 className="rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="ml-auto flex items-center gap-2">
//           <ThemeToggle />
//           <Button asChild variant="ghost" className="hidden sm:inline-flex">
//             <Link to="/auth/login">Login</Link>
//           </Button>
//           <Button asChild variant="hero" className="hidden sm:inline-flex">
//             <Link to="/auth/register">Get Started Free</Link>
//           </Button>

//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
//                 <Menu />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[86vw] max-w-sm p-6">
//               <div className="mb-8 flex items-center justify-between">
//                 <Logo />
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setOpen(false)}
//                   aria-label="Close menu"
//                 >
//                   <X />
//                 </Button>
//               </div>
//               <ul className="space-y-1">
//                 {links.map((link) => (
//                   <li key={link.label}>
//                     <Link
//                       to={link.to}
//                       onClick={() => setOpen(false)}
//                       className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-8 grid gap-2">
//                 <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
//                   <Link to="/auth/login">Login</Link>
//                 </Button>
//                 <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
//                   <Link to="/auth/register">Get Started Free</Link>
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </nav>
//     </header>
//   );
// }