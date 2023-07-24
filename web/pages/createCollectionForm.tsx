import axios from "axios";
import { useState } from "react";
import AddField from "../components/addField/addField";
import styles from "../styles/CreateCollectionForm.module.scss";
import { useRouter } from "next/router";

export default function CreateCollectionForm() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
    const handleCount = (pm: boolean) => {
      if (pm) setCount(count + 1);
      else {
        if (count - 1 >= 0) setCount(count - 1);
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let body = {
      name: data.get("name"),
      symbol: data.get("description"),
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/create-collection`,
        body
      );

      const localBody = {
        name: body.name,
        collectionAddress: res.data.collectionAddress,
      };
      let address = JSON.parse(localStorage.getItem("collectionAddress") as string);
      console.log(address);
      if (address) {
        localStorage.setItem(
          "collectionAddress",
          JSON.stringify([...address, { ...localBody }])
        );
      } else {
        localStorage.setItem("collectionAddress", JSON.stringify([localBody]));
      }

      router.push("/dashBoard?mode=org");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form action="#" onSubmit={handleSubmit}>
          {/* <label htmlFor="collectionMedia">Collection Media</label>
          <input type="file" name="collectioMedia" id="collectionMedia" /> */}
          <label htmlFor="name">Collection Title</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="description">Symbol</label>
          <input type="text" name="description" id="description" />
          <div>
            <div className={styles.btncont}>
              <h3>Add custom fields</h3>
              <button onClick={() => handleCount(true)}>+</button>
              <button onClick={() => handleCount(false)}>-</button>
            </div>
            <div className={styles.customFld}>
              {
                [...Array(count)].map((num,index)=>{
                  return <AddField indx={index+1} key={index} />
                })
              }
            </div>
          </div>

          <input type="submit" value="Create Collection" />
        </form>
        {/* <div className={styles.btncont}>
          <button onClick={() => handleCount(true)}>+</button>
          <button onClick={() => handleCount(false)}>-</button>
          <h3>Add Nft</h3>
        </div>
        <div>
          {
                [...Array(count)].map((index)=>{
                    return <AddNft key={index} />
                })
            }
        </div> */}
      </div>
    </div>
  );
}
