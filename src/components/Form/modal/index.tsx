import classNames from "@/utils/class-names";

interface Props {
    isLoader?: boolean
  children: React.ReactNode;
}

const Modal = ({ isLoader,children }: Props) => {
  return (
    <div className={"relative z-10"} aria-modal="true">
      <div className= {classNames(
        isLoader ? 'dark:bg-opacity-95 bg-opacity-95':'dark:bg-opacity-80 bg-opacity-80',"fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-800" 
      )}/>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 sm:p-0">
          <div className={classNames(
            isLoader ? 'w-44':'w-3/4 sm:w-full', "relative max-w-md overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl sm:my-8 min-w-min md:max-w-lg"
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
