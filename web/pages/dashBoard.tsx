import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Blockchain } from "../data/nft";

import styles from "../styles/DashBoard.module.scss";
import CollectionCard from "../components/collectionCard/collectionCard";
import { collection, Nft } from "../data";
import NftCard from "../components/nftCard/nftCard";
import CollectionPop from "../components/collectionPopup/collectioPop";
import NftPop from "../components/nftPop/nftPop";
import axios from "axios";
export default function Dashboard() {
  const router = useRouter();
  const mode = router.query.mode as string;
  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<string>("0x1");
  const [balance, setBalance] = useState<number>();
  const [showPop, setShowPop] = useState<boolean>(false);
  const [collection, setCollection] = useState<collection>(
    Blockchain["0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20"].collection[0]
  );
  const [nft, setNft] = useState<Nft>(
    Blockchain["0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20"].nft[0]
  );
  const handleChainChanged = useCallback((_chainId: string | unknown) => {
    const chain = _chainId as string;
    setChainId(chain);
  }, []);

  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    const provider = window.ethereum;
    provider
      .request({
        method: "eth_accounts",
      })
      .then((res) => {
        const re = res as string[];
        setAccount(re[0]);
      });
    provider
      .request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
      .then((balance) => {
        const bal = balance as string;
        setBalance(parseInt(bal, 16));
      });
    provider.on("chainChanged", handleChainChanged);
    return () => {
      provider.removeListener("chainChanged", handleChainChanged);
    };
  }, [account, handleChainChanged]);

  const getCollection = async () => {
    const provider = window.ethereum;
    const userAddress = (await provider.request({
      method: "eth_accounts",
    })) as string[];

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users-collection`,
        {
          targetAddress: userAddress[0],
        }
      );
      console.log(res);
      setUserCollection(res.data.collections);
    } catch (error) {}
  };

  useEffect(() => {
    getCollection();
  }, []);
  return (
    <>
      {mode == "inde" && (
        <div>
          <p>Account: {account}</p>
          <p>Chain: {chainId}</p>
          <p>Balance: {balance}</p>
          <div className={styles.collectionSec}>
            {Blockchain["0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20"].nft.map(
              (nft: Nft, index) => {
                return (
                  <NftCard key={index} nft={nft} setNft={setNft} showpopup={setShowPop} />
                );
              }
            )}

            {userCollection &&
              userCollection.map((item, index) => {
                console.log(item);
                let localNft = {
                  //@ts-ignore
                  item,
                  media: require("../public/nft1.jpg"),
                  nftId: `#${Math.floor(1000 + Math.random() * 9000)}`,
                };
                return (
                  <NftCard
                    key={index}
                    nft={localNft}
                    setNft={setNft}
                    showpopup={setShowPop}
                    user={true}
                  />
                );
              })}
            {showPop && (
              <div className={styles.popupWin}>
                <NftPop nft={nft} showPopup={setShowPop} />
              </div>
            )}
          </div>
        </div>
      )}
      {mode == "org" && (
        <div>
          <Link className={styles.btn} href="/createCollectionForm">
            Create Collection
          </Link>
          <div className={styles.collectionSec}>
            {Blockchain["0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20"].collection.map(
              (col: collection, index) => {
                return (
                  <CollectionCard
                    key={index}
                    collection={col}
                    showpopup={setShowPop}
                    setCollection={setCollection}
                  />
                );
              }
            )}

            {localStorage.getItem("collectionAddress") &&
              JSON.parse(localStorage.getItem("collectionAddress") as string).map(
                (item: collection, index: string) => {
                  const newItem = {
                    ...item,
                    collectionMedia: require("../public/collection.jpg"),
                    collectionTag: `#${Math.floor(1000 + Math.random() * 9000)}`,
                  };
                  return (
                    <CollectionCard
                      key={index}
                      collection={newItem}
                      showpopup={setShowPop}
                      setCollection={setCollection}
                    />
                  );
                }
              )}
            {showPop && (
              <div className={styles.popupWin}>
                <CollectionPop collection={collection} showPopup={setShowPop} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
