import Image from "next/image";
import { collection, collectionProp } from "../../data";
import styles from "./CollectionCard.module.scss";

export default function CollectionCard({
  collection,
  showpopup,
  setCollection,
}: collectionProp) {
  // console.log(collection);

  const handleClick = () => {
    setCollection(collection);
    showpopup(true);
  };
  return (
    <div className={styles.nftContainer} onClick={handleClick}>
      <div className={styles.media}>
        <div className={styles.imageContainer}>
          <Image
            src={collection.collectionMedia}
            alt={collection.name}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.desc}>
        <h2 className={styles.title}>{collection.name}</h2>
        <p className={styles.tag}>{collection.collectionTag}</p>
      </div>
    </div>
  );
}
