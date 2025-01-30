"use client";

import Link from "next/link";
import { Menu, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import styles from "./Header.module.css";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          KABSOLA
        </Link>
        <nav className={styles.desktopNav}>
          <Link href="#features" className={styles.navLink}>
            Features
          </Link>
          <Link href="#chatbot" className={styles.navLink}>
            AI Chatbot
          </Link>
          <Link href="#medication" className={styles.navLink}>
            Medication Scheduler
          </Link>
          <Link href="#pharmacy" className={styles.navLink}>
            Nearby Pharmacies
          </Link>
        </nav>
        <Link href="/profile">
          <Button>
            TRY IT NOW
            <Pill size={24} />
          </Button>
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
