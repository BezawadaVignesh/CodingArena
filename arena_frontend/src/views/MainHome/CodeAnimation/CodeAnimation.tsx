import { motion } from "framer-motion";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface CodeScrollAnimationProps {
  codeLines: string[];
  scrollSpeed?: number;
  containerStyle?: CSSProperties;
  lineStyle?: CSSProperties;
}

const CodeScrollAnimation: React.FC<CodeScrollAnimationProps> = ({
  codeLines,
  scrollSpeed = 50,
  containerStyle,
  lineStyle,
}) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight)
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerY = containerRect.top;
      
      const scrolledRatio = containerY < 0 ? -containerY / 500: 0;
      const newVisibleLines = Math.min(
        Math.floor(scrolledRatio * codeLines.length),
        codeLines.length
      );
      setVisibleLines(newVisibleLines);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      console.log("Attaching scroll event listener"); // Debugging log
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        console.log("Removing scroll event listener"); // Debugging log
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollSpeed, codeLines.length]);

  const lineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "400px", // Set the height of the scrollable container
        // overflowX: "hidden",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        ...containerStyle, // Customizable container styling
      }}
    >
      <div
        style={{
          backgroundColor: "#282c34",
          color: "#61dafb",
          fontFamily: "monospace",
          fontSize: "1.2rem",
          position: 'sticky',
          borderRadius: "8px",
          padding: "1rem",
          top :60,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          whiteSpace: "pre",
          overflowX: 'auto',
          minHeight: "600px", // Ensure scrollable area
        }}
      >
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{ marginBottom: "0.3rem", ...lineStyle }} // Customizable line styling
          >
            {line}
          </motion.div>
        ))}
        <motion.div
            key={"|asfds"}
            initial={{opacity: 1}}
            animate={{opacity: [1,0,0,1]}}
            transition={{ delay: 0.15, repeatDelay: 0.35, repeat: Infinity }}
          >
            |
          </motion.div>
      </div>
    </div>
  );
};

export default CodeScrollAnimation;