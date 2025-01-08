import { motion } from "framer-motion";
import type { Transition } from "framer-motion"
import "./LandingPageIntro.scss";

const transitionSettings: Transition = {
    duration: 3,
    repeat: Infinity,
    repeatType: 'reverse',
};

const buttonHoverSettings = {
    scale: 1.1,
    backgroundColor: "#FE05F7",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.2 },
};

const buttonTapSettings = {
    scale: 0.85,
    backgroundColor: "#F05A28",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2 },
};

const featureCards = [
    {
        title: "Easy Product Setup",
        description: "Add your products, descriptions, and prices in just a few clicks.",
        textClass: "text-primary",
        animation: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
    },
    {
        title: "Simple QR Code Generation",
        description: "Generate unique QR codes to display your menu anywhere.",
        textClass: "text-secondary",
        animation: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
    },
    {
        title: "Filtering Made Easy",
        description: "Enable customers to filter products by category, price, or availability.",
        textClass: "text-primary",
        animation: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    },
];

const LandingPageIntro = () => (
    <div className="landing-container">
        <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{
                opacity: 1,
                y: 0,
                color: ["#FE05F7", "#F2562F", "#FE05F7"],
            }}
            transition={transitionSettings}
            className="landing-title"
        >
            Build Your QR Menu with Ease
        </motion.h1>

        <motion.p
            className="landing-subtitle"
            initial={{ opacity: 0, y: -14 }}
            animate={{
                opacity: 1,
                y: 0,
                color: ["#FE05F7", "#F2562F", "#FE05F7"],
            }}
            transition={transitionSettings}
        >
            Create, Customize, and Share Your Menu Instantly.
        </motion.p>

        <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="cta-button"
            whileHover={buttonHoverSettings}
            whileTap={buttonTapSettings}
        >
            Get Started
        </motion.button>

        <div className="features-container">
            {featureCards.map(({ title, description, textClass, animation }, index) => (
                <motion.div
                    key={index}
                    initial={animation.initial}
                    animate={animation.animate}
                    transition={{ duration: 0.8 }}
                    className="feature-card"
                >
                    <h3 className={`feature-title ${textClass}`}>{title}</h3>
                    <p className="feature-description">{description}</p>
                </motion.div>
            ))}
        </div>
    </div>
);

export default LandingPageIntro;
