import Image from "next/image"
import { Nft, NftProp } from "../../data"
import styles from "./NftCard.module.scss"

export default function NftCard({nft, showpopup, setNft}:NftProp){
    const handleClick=()=>{
        setNft(nft);
        showpopup(true);
    }
    return(
        <div className={styles.nftContainer} onClick={handleClick}>
            <div className={styles.media}>

                    <div className={styles.imageContainer}>
                    <Image
                        src={nft.media}
                        alt={nft.title}
                        className={styles.image}
                    />
                    </div>
            </div>
            <div className={styles.desc}>
                <h2 className={styles.title}>{nft.title}</h2>
                <p className={styles.name}>{nft.nftId}</p>
            </div>
        </div>
    )
}
