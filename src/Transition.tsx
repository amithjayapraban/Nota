import { motion } from "framer-motion";
const animationConfiguration = {
    // initial: { scale: 0.6 },
    // animate: { scale : 1 },
    // exit: { scale : .6 },
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1 , y: 0 },
    exit: { opacity: 0 },
};
const animationConfiguration2 = {
    initial: { opacity: 0, x: 3 },
    animate: { opacity: 1 , x: 0 },
    exit: { opacity: 0 },
};

const Transition = ({ children,animationConfiguration }:any) => {
    return (
        <motion.div  
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .4 }}
            
        >
            {children}
        </motion.div>
    );
};
export default Transition;