import { MessageSquare, Calendar, MapPin, FileClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./Features.module.css";
import { motion } from "framer-motion";

const features = [
  {
    name: "Medical History Profile",
    description:
      "Store and access your medical records and history in one secure place.",
    icon: FileClock,
  },
  {
    name: "AI Healthcare Chatbot",
    description:
      "Get instant answers to your health questions from our advanced AI assistant.",
    icon: MessageSquare,
  },
  {
    name: "Medication Scheduling",
    description:
      "Never miss a dose with our smart medication reminder and scheduling system.",
    icon: Calendar,
  },
  {
    name: "Nearby Pharmacies",
    description:
      "Locate the closest pharmacies and check medication availability in real-time.",
    icon: MapPin,
  },
];

const Features = () => {
  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Everything you need for your health</h2>
          <p className={styles.description}>
            Our app combines cutting-edge AI technology with practical health
            management tools to provide you with a comprehensive healthcare
            solution.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <feature.icon className={styles.icon} />
                  <CardTitle>{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
