import styles from "./AddNft.module.scss"

export default function AddNft(){
    return <div>
        <input type="file" name="nftMedia" id="nftMedia" placeholder="Nft Media" />
        <input type="text" name="title" id="title" placeholder="title"/>
        <input type="text" name="address" id="address" placeholder="address"/>
    </div>
}