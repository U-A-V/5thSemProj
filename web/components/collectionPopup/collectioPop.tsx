import Image from "next/image";
import { useEffect, useState } from "react";
import { collectionPop, Nft } from "../../data";
import NftCard from "../nftCard/nftCard";
import styles from "./CollectionPop.module.scss";
import cross from "../../public/cross.svg";
import axios from "axios";

export default function CollectionPop({ collection, showPopup }: collectionPop) {
  const [nftArray, setNftArray] = useState([]);
  const [nft, setNft] = useState<Nft>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let body = {
      name: data.get("title"),
      symbol: data.get("description"),
    };

    const provider = window.ethereum;
    const userAddress = (await provider.request({
      method: "eth_accounts",
    })) as string[];

    console.log(userAddress, body);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mint`, {
        collectionAddress: collection.collectionAddress,
        targetAddress: userAddress[0],
        title: body.name,
        description: body.symbol,
      });

      showPopup(false);
    } catch (error) {}
  };

  const getNfts = async () => {
    const provider = window.ethereum;
    const userAddress = (await provider.request({
      method: "eth_accounts",
    })) as string[];

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/collection/NFT`,
        {
          collectionAddress: collection.collectionAddress,
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
          <Image
            src={collection.collectionMedia}
            alt={collection.name}
            className={styles.image}
          />
        </section>
        <section className={styles.topright}>
          <Image
            src={cross}
            alt="cross"
            className={styles.cross}
            onClick={() => showPopup(false)}
          />
          <h2>{collection.name}</h2>
          <p>{collection.collectionTag}</p>
          <p>{collection.description}</p>
        </section>
        <section></section>
      </div>
      <div className={styles.bottom}>
        {collection.nft &&
          collection.nft.map((nft, index) => {
            return <NftCard key={index} nft={nft} showpopup={showPopup} setNft={setNft} />;
          })}

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
            return (
              <NftCard key={index} nft={localnft} showpopup={showPopup} setNft={setNft} />
            );
          })}
      </div>

      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
          <input type="submit" value="Mint Nft" />
        </form>
      </div>
    </div>
  );
}
