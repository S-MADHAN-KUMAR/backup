import React from "react";
import { motion } from "framer-motion";

const RunningText = ({setting}) => {
  return (
    <div className={`w-full whitespace-nowrap uppercase ${setting.position}`} >
      <motion.div
       className={setting.css}
        animate={{
            x: setting.runSide === 'left' ? '100%' : '-100%',
        }}
        transition={{
          x: {
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 20,
            ease: "linear", 
          },
        }}
      >
        {setting.quotes} &nbsp;&nbsp; {setting.quotes} &nbsp;&nbsp; {setting.quotes}&nbsp;&nbsp; {setting.quotes} &nbsp;&nbsp; {setting.quotes}{setting.quotes} &nbsp;&nbsp; {setting.quotes}
      </motion.div>
    </div>
  );
};

export default RunningText;
