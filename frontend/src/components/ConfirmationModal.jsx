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
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-plum border border-lavender/20 rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4">
              <AlertTriangle className="text-red-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-lavender/70 mb-6">{message}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-ink/50 text-white font-semibold hover:bg-ink"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;