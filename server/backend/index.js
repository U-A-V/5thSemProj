const express = require("express");
const ethers = require("ethers");
const cors = require("cors");
const ContractJSON = require("./src/CredigibleCertificateFactory.json");
const CollectionContractJSON = require("./src/CredigibleCertificateCollection.json");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const { provider, signer } = require("./src/loadWallet");
const { contract } = require("./src/loadContract");
const { storeFiles, funcStoreFiles, verifySignature } = require("./controllers/store");

async function getGasPrice(mul) {
  const price = await provider.getGasPrice();
  const str = ethers.utils.formatEther(price);
  const eth = str * mul;
  return ethers.utils.parseEther(eth.toFixed(18));
}

app.use(cors());
app.use(express.json());

app.post("/compare-ipfs", verifySignature);

app.post("/show-ipfs", storeFiles);

app.post("/create-collection", async (req, res) => {
  //console.log(contract.userCollections('0x841a9457e6a82c2605f9BfD9A33ec598Dc97Eb5d')

  tx = await contract.create(req.body.name, req.body.symbol);
  re = await tx.wait(0);
  e = re.events.pop();
  //console.log(e.args)
  res.status(200).json({
    collectionAddress: e.args[0],
  });
});

app.get("/collection-info", async (req, res) => {
  collectionContract = new ethers.Contract(
    req.body.collectionAddress,
    CollectionContractJSON.abi,
    signer
  );
  res.status(200).json({ name: await collectionContract.name() });
});

app.post("/mint", async (req, res) => {
  //res.json(req.body)
  collectionContract = new ethers.Contract(
    req.body.collectionAddress,
    CollectionContractJSON.abi,
    signer
  );
  //console.log(await collectionContract.symbol())
  tx = await collectionContract.mint(
    req.body.targetAddress,
    req.body.title,
    req.body.description,
    Date.now()
  );
  re = await tx.wait(0);
  res.status(200).json({ j: 2 });
});

app.post("/collection/NFT", async (req, res) => {
  collectionContract = new ethers.Contract(
    req.body.collectionAddress,
    CollectionContractJSON.abi,
    signer
  );
  res
    .status(200)
    .json({ name: await collectionContract.getCertificatesOfUser(req.body.targetAddress) });
});

app.get("/users-collection", async (req, res) => {
  res
    .status(200)
    .json({ collections: await contract.getUserCollection(req.body.targetAddress) });
});

app.use(express.static("../client/build"));

app.listen(port, () => console.log("Credigible Backend Started"));
