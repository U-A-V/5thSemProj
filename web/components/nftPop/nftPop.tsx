import { nftPop } from "../../data"
import styles from "./NftPop.module.scss"
import Image from "next/image"
import cross from "../../public/cross.svg"

export default function NftPop({nft,showPopup}:nftPop){
    return <div className={styles.popup}>

        <div className={styles.top}>
            <section className={styles.topleft}>
                <Image 
                    src={nft.media}
                    alt={nft.title}
                    className ={styles.image}
                    />
            </section>
            <section className={styles.topright}>
                <Image 
                    src={cross}
                    alt="cross"
                    className={styles.cross}
                    onClick={()=>showPopup(false)}
                />
                <h2>{nft.title}</h2>
                <p>{nft.nftId}</p>
                <p>{nft.discription}</p>
            </section>
            <section></section>
        </div>

    </div>
}