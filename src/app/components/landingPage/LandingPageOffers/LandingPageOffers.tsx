import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LandingPageOffers = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
  });

  const translateXLeft = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0%", "-80%"],
  );
  const translateXRight = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0%", "80%"],
  );
  const translateYTop = useTransform(scrollYProgress, [0, 0.5], ["0%", "-80%"]);
  const translateYBottom = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0%", "80%"],
  );

  return (
    <div
      ref={containerRef}
      style={{
        paddingBottom: "10%",
        paddingTop: 100,
      }}
    >
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          height: "100vh",
        }}
      >
        <motion.img
          style={{
            position: "absolute",
            width: "30%",
            top: "50%",
            translateX: translateXLeft,
            translateY: translateYTop,
            transition: "all 200ms ease",
          }}
          src="https://www.apple.com/v/macbook-pro/am/images/overview/themes/performance/performance_screen_lightroom__dsnznus7aryq_large.png"
        />
        <motion.img
          style={{
            position: "absolute",
            width: "30%",
            top: "45%",
            translateX: translateXRight,
            translateY: translateYTop,
            transition: "all 300ms ease",
          }}
          src="https://ofoodo.com/src/prod/img/section_banners/desktop_banners/qrsystem.png"
        />
        <motion.img
          style={{
            position: "absolute",
            width: "30%",
            top: "45%",
            translateX: translateXLeft,
            translateY: translateYBottom,
            transition: "all 300ms ease",
          }}
          src="https://ofoodo.com/src/prod/img/section_banners/desktop_banners/order.png"
        />
        <motion.img
          style={{
            position: "absolute",
            width: "30%",
            top: "40%",
            translateX: translateXRight,
            translateY: translateYBottom,
            transition: "all 400ms ease",
          }}
          src="https://ofoodo.com/src/prod/img/section_banners/desktop_banners/about.png"
        />
        <motion.img
          style={{
            maxWidth: "40%",
            objectFit: "contain",
          }}
          src="https://www.apple.com/v/macbook-pro/am/images/overview/themes/performance/performance_hw__fs5zct4lwiy6_large.jpg"
        />
      </motion.div>
    </div>
  );
};

export default LandingPageOffers;
