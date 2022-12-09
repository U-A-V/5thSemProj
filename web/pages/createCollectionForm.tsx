import { useState } from "react"
import AddNft from "../components/addNft/addNft";
import styles from "../styles/CreateCollectionForm.module.scss"

export default function CreateCollectionForm(){
    const [count,setCount]=useState<number>(1);
    const handleCount=(pm:boolean)=>{
        if(pm)  setCount(count+1)
        else{
            if(count-1>=0)  setCount(count-1);
        }
    }
    return <div className={styles.container}>
        <div className={styles.form}>

        <form action="#">
            <label htmlFor="collectionMedia">Collection Media</label>
            <input type="file" name="collectioMedia" id="collectionMedia"/>
            <label htmlFor="name">Collection Title</label>
            <input type="text" name="name" id="name"/>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <input type="submit" value="Create Collection" />
        </form>
            <div className={styles.btncont}>
                <button onClick={()=>handleCount(true)}>+</button>
                <button onClick={()=>handleCount(false)}>-</button>
                <h3>Add Nft</h3>
            </div>
        <div>
            {
                [...Array(count)].map((index)=>{
                    return <AddNft key={index} />
                })
            }
        </div>
        </div>
    </div>
}