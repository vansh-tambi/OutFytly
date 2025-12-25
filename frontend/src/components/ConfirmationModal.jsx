import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-plum border border-lavender/20 rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div 
              className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="text-red-400" size={32} />
              </motion.div>
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className="text-lavender/70 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.p>
            <motion.div 
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-ink/50 text-white font-semibold hover:bg-ink"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={onConfirm}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm Delete
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;