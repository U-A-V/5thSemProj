import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Nft, NftProp } from "../../data";
import styles from "./NftCard.module.scss";

export default function NftCard({ nft, showpopup, setNft, user }: NftProp) {
  const handleClick = () => {
    setNft(nft);
    showpopup(true);
  };

  const [userInfo, setUserInfo] = useState("");

  const getCollectionInfo = async () => {
    const provider = window.ethereum;
    const userAddress = (await provider.request({
      method: "eth_accounts",
    })) as string[];

    try {
      console.log(user, nft);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/collection-info`,
        {
          //@ts-ignore
          collectionAddress: nft.item,
        }
      );
      console.log(res);
      setUserInfo(res.data.name);
    } catch (error) {}
  };

  useEffect(() => {
    if (user) getCollectionInfo();
  }, []);

  console.log(userInfo);
  // console.log(nft);
  return (
    <div className={styles.nftContainer} onClick={handleClick}>
      <div className={styles.media}>
        <div className={styles.imageContainer}>
          <Image src={nft.media} alt={nft.title} className={styles.image} />
        </div>
      </div>
      <div className={styles.desc}>
        <h2 className={styles.title}>{nft.title || userInfo}</h2>
        <p className={styles.name}>{nft.nftId}</p>
      </div>
    </div>
  );
}
