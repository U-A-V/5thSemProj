const express = require("express");
const ethers = require("ethers");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const { provider } = require("./src/loadWallet");
const { contract } = require("./src/loadContract");
const { storeFiles, funcStoreFiles, verifySignature } = require("./controllers/store");

async function getGasPrice(mul) {
  const price = await provider.getGasPrice();
  const str = ethers.utils.formatEther(price);
  const eth = str * mul;
  return ethers.utils.parseEther(eth.toFixed(18));
}

app.use(express.json());

app.post("/compare-ipfs", verifySignature);

app.post("/show-ipfs", storeFiles);

app.get("/mint/:address", (req, res) => {
  const { address } = req.params;
  const obj = funcStoreFiles(res, res);

  contract.getBalance(address).then((balance) => {
    if (balance.toString() === "0") {
      contract
        .mint(address, obj.cid, obj.signature, {
          gasPrice: getGasPrice(1.1),
          gasLimit: 177302,
        })
        .then(() => {
          console.log("Minted for address:", address);
          res.json({
            minted: true,
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({
            minted: false,
            error: err.message,
          });
        });
    } else {
      res.status(500).json({
        minted: false,
        error: "Vous avez déjà récupéré votre NFT",
      });
    }
  });
});

app.get("/kfjzklajrkvjbezjerguyihyohkjgfrekj/:adddress", (req, res) => {
  const { address } = req.params;
  contract
    .dropForBuilders(address)
    .then(() => {
      console.log("Minted for address:", address);
      res.json({
        minted: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        minted: false,
        error: err.message,
      });
    });
});

app.use(express.static("../client/build"));

app.listen(port, () => console.log(`LaCity AW 24/06/22 listening on port ${port}!`));
