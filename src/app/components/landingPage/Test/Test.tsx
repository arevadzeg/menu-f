import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const Test = ({ item }: any) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <div ref={containerRef}>
      <motion.div
        className="sticky-image"
        style={{
          position: 'sticky',
          top: '20vh',
          scale,
          // opacity,
        }}
      >
        <motion.img
          src={item}
          style={{
            width: '100%',
            borderRadius: '12px',
          }}
        />
      </motion.div>
    </div>
  );
};

export default Test;
