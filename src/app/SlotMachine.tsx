import { useRef, useState } from "react";

const zaza:JSX.Element = <div>asd</div>;

// Slot symbols (you can add more if you want)
const symbols = ["🍒", "🍋", "🍉", "🍊", "🍇", "🍀", "⭐"];

const SlotMachine = () => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState([0, 0, 0]); // Holds the result of the three reels
  const [spinResult, setSpinResult] = useState("");
  const [spinTimeout, setSpinTimeout] = useState(null);

  // Draw the reels and symbols on the canvas
  const drawReels = (ctx, reels, isSpinning) => {
    const reelWidth = 80;
    const reelHeight = 200;
    const padding = 20;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw three reels
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = "lightgrey";
      ctx.fillRect(i * (reelWidth + padding), 0, reelWidth, reelHeight);

      // Draw symbols
      ctx.font = "48px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        symbols[reels[i]],
        i * (reelWidth + padding) + reelWidth / 2,
        reelHeight / 2
      );
    }

    // If there's a win, draw a line
    if (!isSpinning && reels.every((reel) => reel === reels[0])) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, reelHeight / 2);
      ctx.lineTo(3 * (reelWidth + padding), reelHeight / 2);
      ctx.stroke();
    }
  };

  const spinReels = () => {
    setSpinning(true);
    setSpinResult("");

    // Randomize the reels over a period of time to simulate spinning
    const spinDuration = 1000; // Spin for 1 second
    const spinInterval = 100; // Update reels every 100ms
    const spinCount = spinDuration / spinInterval;

    let counter = 0;
    const spinEffect = () => {
      // Randomize each reel for animation effect
      const newReels = [
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ];
      setReels(newReels);
      counter++;

      if (counter >= spinCount) {
        clearInterval(spinIntervalId);
        setFinalResult(newReels); // Stop at final random result
      }
    };

    const spinIntervalId = setInterval(spinEffect, spinInterval);

    const setFinalResult = (finalReels) => {
      setReels(finalReels);
      setSpinning(false);

      // Check for winning condition (same symbols in all reels)
      if (finalReels.every((reel) => reel === finalReels[0])) {
        setSpinResult("You Win!");
      } else {
        setSpinResult("Try Again");
      }
    };
  };

  const handleSpinClick = () => {
    if (!spinning) {
      spinReels();
    }
  };

  // Draw on canvas after each state change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawReels(ctx, reels, spinning);
  }, [reels, spinning]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <canvas
        ref={canvasRef}
        width={280}
        height={220}
        style={{ border: "2px solid #000" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSpinClick}
          disabled={spinning}
          style={{ fontSize: "18px", padding: "10px 20px" }}
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
      {spinResult && (
        <div style={{ marginTop: "20px", fontSize: "24px" }}>{spinResult}</div>
      )}
    </div>
  );
};

export default SlotMachine;
