import { nftPop } from "../../data";
import styles from "./NftPop.module.scss";
import Image from "next/image";
import cross from "../../public/cross.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "../nftCard/nftCard";

export default function NftPop({ nft, showPopup }: nftPop) {
  console.log(nft);

  const [nftArray, setNftArray] = useState([]);
  const getNfts = async () => {
    const provider = window.ethereum;
    const userAddress = (await provider.request({
      method: "eth_accounts",
    })) as string[];

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/collection/NFT`,
        {
          collectionAddress: nft.item,
          targetAddress: userAddress[0],
        }
      );

      console.log(res);

      setNftArray(res.data.name);
    } catch (error) {}
  };

  useEffect(() => {
    getNfts();
  }, []);
  return (
    <div className={styles.popup}>
      <div className={styles.top}>
        <section className={styles.topleft}>
          <Image src={nft.media} alt={nft.title} className={styles.image} />
        </section>
        <section className={styles.topright}>
          <Image
            src={cross}
            alt="cross"
            className={styles.cross}
            onClick={() => showPopup(false)}
          />
          <h2>{nft.title}</h2>
          <p>{nft.nftId}</p>
          <p>{nft.discription || "collection made for testing credegible contract"}</p>
        </section>
      </div>
      <section className={styles.bottom}>
        {nftArray &&
          nftArray.map((nft, index) => {
            let localnft = {
              //@ts-ignore
              ...nft,
              title: nft[2],
              description: nft[3],
              media: require("../../public/nft2.jpg"),
              nftId: `#${Math.floor(1000 + Math.random() * 9000)}`,
            };
            return <NftCard key={index} nft={localnft} showpopup={showPopup} />;
          })}
      </section>
    </div>
  );
}
