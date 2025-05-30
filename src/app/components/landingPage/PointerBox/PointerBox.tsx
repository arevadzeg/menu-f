import { useEffect, useRef } from 'react';
import { frame, motion, useMotionValue, useSpring } from 'framer-motion';

export function useFollowPointer(ref: React.RefObject<HTMLElement>) {
  const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return { x, y };
}

export default function PointerBox() {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  // TODO REFACTOR
  return (
    <motion.div
      className="bg-black rounded-2xl"
      style={{
        height: 'calc(100vh - 90px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <motion.div
        ref={ref}
        className="box"
        style={{
          x,
          y,
          background: '#4e5f3f',
          height: '200px',
          width: '200px',
          opacity: 0.8,
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
    </motion.div>
  );
}
