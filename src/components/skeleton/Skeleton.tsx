
import styles from './skeleton.module.css';

const Skeleton = ({ type }:any) => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={`${styles.skeletonElement} ${styles[type]}`} />
    </div>
  );
};

export default Skeleton;