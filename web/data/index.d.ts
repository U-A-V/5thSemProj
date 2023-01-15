import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

interface collection {
  nft: Nft[];
  collectionMedia: string;
  name: string;
  collectionTag: string;
  collectionId: string;
  description: string;
  dist: string[];
  collectionAddress?: string;
}
interface Nft {
  nftId: string;
  title: string;
  media: string;
  collectionId: string;
  discription: string;
  add: string;
}
interface collectionProp {
  collection: collection;
  setCollection: Function;
  showpopup: Function;
}

interface collectionPop {
  collection: collection;
  showPopup: Function;
}

interface NftProp {
  nft: Nft;
  showpopup: Function;
  setNft: Function;
}

interface nftPop {
  nft: Nft;
  showPopup: Function;
}

interface localStorage {
  name: string;
  sumbol: string;
}
