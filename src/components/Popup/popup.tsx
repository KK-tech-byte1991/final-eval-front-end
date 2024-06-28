
import styles from './popup.module.css';


const Popup = ({ isOpen, onClose, children }:any) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>        
        {children}
      </div>
    </>
  );
};

export default Popup;
