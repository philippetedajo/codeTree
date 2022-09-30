import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  modal_state,
  close_modal,
  ModalEnum,
} from "../../store/features/modalSlice";
import { AuthModal } from "./AuthModal";

import { motion, AnimatePresence } from "framer-motion";

export const RootModal = () => {
  const { type, visible } = useAppSelector(modal_state);
  const dispatch = useAppDispatch();

  const renderModal = (type: ModalEnum) => {
    switch (type) {
      case ModalEnum.AUTH:
        return <AuthModal />;

      case ModalEnum.IDLE:
        return <div />;
    }
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop"
          onClick={() => dispatch(close_modal())}
        >
          {renderModal(type)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};