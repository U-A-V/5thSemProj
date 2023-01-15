const nft = {
  nft1: {
    nftId: "#6342",
    title: "Grid",
    media: require("../public/nft1.jpg"),
    collectionId: "0xab213123122bf1e14eba9801ba12fc0",
    discription: "collection made for testing credegible contract",
    add: "0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20",
  },
  nft2: {
    nftId: "#2561",
    title: "Picture On Wall",
    media: require("../public/nft2.jpg"),
    collectionId: "0xab213123122bf1e14eba9801ba12fc0",
    discription: "collection made for testing credegible contract",
    add: "0xb0aef3bfde9a2f130181dbfe4fcb7ea730d81a61",
  },
};
const Blockchain = {
  "0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20": {
    collection: [
      {
        nft: [
          nft.nft1,
          nft.nft2,
          nft.nft1,
          nft.nft2,
          nft.nft1,
          nft.nft2,
          nft.nft1,
          nft.nft2,
        ],
        collectionMedia: require("../public/collection.jpg"),
        name: "Abstract",
        collectionTag: "#7631",
        collectionId: "0xab213123122bf1e14eba9801ba12fc0",
        description: "collection made for testing credegible contract",
        dist: [
          "0xd02e6c85fe9aaf150181dbf84f4b7ee7a0c83a20",
          "0xb0aef3bfde9a2f130181dbfe4fcb7ea730d81a61",
        ],
      },
    ],
    nft: [nft.nft1],
  },
  "0xb0aef3bfde9a2f130181dbfe4fcb7ea730d81a61": {
    collection: [],
    nft: [nft.nft2],
  },
};

export { Blockchain };
