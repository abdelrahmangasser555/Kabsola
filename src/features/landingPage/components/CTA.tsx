import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from "./CTA.module.css";
import { LogIn } from "lucide-react";

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>Ready to take control of your health?</span>
          <span>Start using Kabsola today.</span>
        </motion.h2>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of users who have already improved their health and
          well-being with our AI-powered healthcare app.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/profile">
            <Button variant="default" size="lg">
              <LogIn size={24} />
              Sign up for free
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
