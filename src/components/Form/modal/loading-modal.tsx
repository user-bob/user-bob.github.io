import React from "react";
import { OpenInterface } from "@/utils/interfaces";
import Modal from "@/components/Form/modal";
import Loa from "@/lotties/loading-animation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const LoadingModal = ({ isOpen, setIsOpen }: OpenInterface) => {
  return (
    <Modal isLoader>
      {isOpen && (
        <div
          tabIndex={-1}
          className="relative items-center justify-center w-full h-full bg-white shadow rounded-xl dark:bg-gray-900"
        >
          <Player
            autoplay
            speed={1.5}
            loop
            src={Loa}
            style={{ height: "200px", width: "200px" }}
          />
        </div>
      )}
    </Modal>
  );
};

export default LoadingModal;
