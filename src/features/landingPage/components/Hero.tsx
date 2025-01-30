"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bot,
  Clock,
  MapPin,
  Pill,
  FileClock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const responses = [
  "How can I help you with your health today?",
  "Remember to take your medication as prescribed.",
  "Stay hydrated and get enough rest for better health.",
  "Regular check-ups are important for preventive care.",
  "Don't hesitate to ask me any health-related questions!",
];

const Hero = () => {
  const [currentResponse, setCurrentResponse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentResponse((prev) => (prev + 1) % responses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextResponse = () => {
    setCurrentResponse((prev) => (prev + 1) % responses.length);
  };

  const prevResponse = () => {
    setCurrentResponse(
      (prev) => (prev - 1 + responses.length) % responses.length
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>
            <span
              style={{
                color: "blue",
                marginRight: "5px",
              }}
            >
              Your PersonalAI
            </span>
            <span className={styles.highlight}>Health Assistant</span>
          </h1>
          <p className={styles.description}>
            Experience the future of healthcare with our AI-powered app. Get
            personalized health advice, manage your medications, and find nearby
            pharmacies all in one place.
          </p>
        </motion.div>
        <motion.div
          className={styles.carouselContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* <Card>
            <CardContent className={styles.carouselContent}>
              <div className={styles.carouselHeader}>
                <Button variant="ghost" size="icon" onClick={prevResponse}>
                  <ChevronLeft className={styles.carouselIcon} />
                </Button>
                <h2 className={styles.carouselTitle}>AI Assistant Says:</h2>
                <Button variant="ghost" size="icon" onClick={nextResponse}>
                  <ChevronRight className={styles.carouselIcon} />
                </Button>
              </div>
              <p className={styles.carouselText}>
                {responses[currentResponse]}
              </p>
            </CardContent>
          </Card> */}
        </motion.div>
        <motion.div
          className={styles.featuresGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="https://healthyhousehub.netlify.app"
            className={styles.featureCard}
          >
            <Bot className={styles.featureIcon} style={{ color: "#4F46E5" }} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>AI Medical Assistant</h3>
              <p className={styles.featureDescription}>
                Get instant medical advice and personalized health
                recommendations
              </p>
            </div>
          </Link>

          <Link href="/schedule" className={styles.featureCard}>
            <Clock
              className={styles.featureIcon}
              style={{ color: "#10B981" }}
            />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Scheduling Medicines</h3>
              <p className={styles.featureDescription}>
                Never miss a dose with smart medication reminders
              </p>
            </div>
          </Link>

          <Link href="/search" className={styles.featureCard}>
            <Pill className={styles.featureIcon} style={{ color: "#F59E0B" }} />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Medicine Finder</h3>
              <p className={styles.featureDescription}>
                Find and compare medicine prices across pharmacies
              </p>
            </div>
          </Link>

          <Link href="/order" className={styles.featureCard}>
            <MapPin
              className={styles.featureIcon}
              style={{ color: "#EF4444" }}
            />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Nearest Pharmacists</h3>
              <p className={styles.featureDescription}>
                Locate nearby pharmacies and get directions instantly
              </p>
            </div>
          </Link>
          <Link href="/profile" className={styles.featureCard}>
            <FileClock
              className={styles.featureIcon}
              style={{ color: "#6366F1" }}
            />
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Medical History Profile</h3>
              <p className={styles.featureDescription}>
                Store and access your medical records and history in one secure
                place.
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
