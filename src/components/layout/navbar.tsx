"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Sparkles, BookOpen } from "lucide-react";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-transform hover:opacity-90"
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-subtle">
            <Sparkles className="w-5 h-5 text-accent-light" />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-lg font-bold tracking-tight text-foreground leading-tight">
              {APP_NAME}
            </span>
            <span className="text-xs text-foreground/60 font-medium">
              تعليم تفاعلي موثوق
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="القائمة الرئيسية"
          className="hidden md:flex items-center gap-1.5 lg:gap-2"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-md text-sm font-medium transition-all select-none",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-subtle"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Quick Search & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex items-center gap-2 border-border/80 text-foreground/80 hover:text-foreground hover:border-primary/50"
          >
            <Link href="/search" aria-label="البحث في المنصة">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-xs font-normal">بحث سريع...</span>
            </Link>
          </Button>

          <IconButton
            variant="ghost"
            size="default"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="pb-2">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/search">
                <Search className="w-4 h-4 text-primary" />
                <span>البحث في المنصة...</span>
              </Link>
            </Button>
          </div>

          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-md text-base font-medium transition-colors text-right flex items-center justify-between",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-foreground/80 hover:bg-secondary/70 hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && <BookOpen className="w-4 h-4 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
