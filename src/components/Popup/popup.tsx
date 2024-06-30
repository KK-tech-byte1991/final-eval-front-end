
import styles from './popup.module.css';


const Popup = ({ isOpen, onClose, children, mode }: any) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={mode == "filter" ? styles.popupFilterMode : styles.popup}>
        {children}
      </div>
    </>
  );
};

export default Popup;
