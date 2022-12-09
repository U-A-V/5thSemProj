import Image from "next/image"
import { useState } from "react"
import { collectionPop, Nft } from "../../data"
import NftCard from "../nftCard/nftCard"
import styles from "./CollectionPop.module.scss"
import cross from "../../public/cross.svg"

export default function CollectionPop({collection, showPopup}:collectionPop){
    const [nft,setNft]=useState<Nft>()
    return <div className={styles.popup}>
        <div className={styles.top}>
            <section className={styles.topleft}>
                <Image 
                    src={collection.collectionMedia}
                    alt={collection.name}
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
                <h2>{collection.name}</h2>
                <p>{collection.collectionTag}</p>
                <p>{collection.description}</p>
            </section>
            <section></section>
        </div>
            <div className={styles.bottom}>
                {
                    collection.nft.map((nft,index)=>{
                        return <NftCard key={index} nft={nft} showpopup={showPopup} setNft={setNft}/>
                    })
                }
            </div>
    </div>
}