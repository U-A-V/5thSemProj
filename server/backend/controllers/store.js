const { Web3Storage, File } = require("web3.storage");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const fs = require("fs");
const NodeRSA = require("node-rsa");

require("dotenv").config();

const encrypt = (cid) => {
  const key = new NodeRSA(
    "-----BEGIN RSA PRIVATE KEY-----\n" +
      "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJHlkvR7FsIffo\n" +
      "q64gmn4WpIzVssz6DoM5h+8NROGdwdgIqIn2+XXY2jZaFDKSmNTifGMZOnyQkLGT\n" +
      "BOvdNrJqImkvug6g/+I0JInS9rWWMR693BNS/QMp8VBvXxveAx8/HYS8FYPhlHPm\n" +
      "iY3CCgSletnuZpGUHcnEfyDygcX7XDGpvEi1Sj5zCyL5HN808+r4ckyMDBsMb3qo\n" +
      "LVohq1NB3QrXG7mgf3PKiQE5zxsilcZgGJKspMKCKpHUS/KEkYRSUe65+iiiCC13\n" +
      "Dgq07UiU01POu51A62l60Sk9JqauQJ75WRA/C1GRy97faDj9LS2ehPCXuV9QwRkG\n" +
      "Wvhy07VdAgMBAAECggEAfZb7AGBXtfu8UMoskWWISWF2JNhj0d8QKPPu3q1d6mKr\n" +
      "IjUE+norEkCp4jRspEjV35znUVDJiokgqntPQrOuVEKqxsf77KP9wKv0eQ3gtSp1\n" +
      "VQBB/PfMavurS/DreQcgEwy+36jb0xkeCx9oq3wQDLobrxjT3deAMLlmfKl3VY/Q\n" +
      "Hw9zCJDlB6fZpndh9M9Sz5eEeI7aMrvE4XLM5pHIBRyzrYgx4FM2y952z6QLwngD\n" +
      "OgBiIu5u+whweF1y0PtvZxyMjL86hpX9NvJJPfSnwIJWF6k+msfFmCW+l7mayyBX\n" +
      "sufOurCBN0k6I5c1yPB8NYbxYTpNC2mHziRkQIYM7QKBgQDuqNlihjHb7jVOdBBg\n" +
      "+1agKunmnAt6OpvJvs1NEJQsbo/Isq4U3M12wzDSUMvaSmTWPLNZFiBx2vbtqaXn\n" +
      "0GQyeNTD5HpsNcVIQXBNd1a74r5If/N64k9dtv0wEL+LLIjSZiboEFzA0Dh6mV96\n" +
      "Oc8o6Y6Mpbpo/sES5JmR9RhouwKBgQDXuzkls11vEeZ631T9aFPc8m/yFookFzSF\n" +
      "HD7jp3CMo1gDOxea4+dKGBHTOzCoiUAIuloSIJTOAEZ0RuK/sXq6KqIx4CpshkfD\n" +
      "ZLjXqvtxokymglYSl+suE3ZziARusSUn+f47zvrbMjG3082ZOVD80Z4D9lOezbb3\n" +
      "Zw6lKGAkxwKBgE5LXmWQGLNKBnriYK0wR07sRSe+cZV7vLgGvFtX4QRikREKbUmy\n" +
      "1kTr7AxTLU1DsqkF6OCE/cfcSb3WNfNCzlwwf7x0LCVrznjR3wHK8M1aqYonT700\n" +
      "mUzpR06JcA08YvaDRKhFFei7Zovx3PzAElIdrQI/LFRdnwGPtUHI4mUZAoGAHli8\n" +
      "4jvIAe7PsCsoZnk9itAjxTc8eXU2Mx9VDWspXu8/Wzz9xhEXIQofv8oMvziHZHLq\n" +
      "ZrBknlHVl1e9X9/Udsm2hTOWZCvDfo31nojz0/lTtPySpQzvzUx5lijlDrkmk+gL\n" +
      "xlgIW7tE2SoXOt2gMeA+zSnie21OtqCto7f5RlMCgYEArtgS1ymAQRHNElunEjyd\n" +
      "wKU9fiO/FaKwLe/NnVudk1cOYsw037L7xirNQY5Fr5R4f7SDjh+1CEczAOXm+7sQ\n" +
      "LOUaWORXRfs4V5ZLHOBESy7qbp1gI1R7ISxzdkqblwr+DMGOosYhEuBV2UzDwL1k\n" +
      "rpnlbM/dGBKX6w8HLQAxr70=\n" +
      "-----END RSA PRIVATE KEY-----"
  );
  const encrypted = key.encrypt(cid, "base64");

  return encrypted;
};

function decrypt(key, encrypted) {
  const decrypted = key.decrypt(encrypted, "utf8");
  return decrypted;
}

const compare = (cid, encryptedData, key) => {
  const dec = decrypt(key, encryptedData);
  return [cid === dec, dec];
};

const storeFiles = async (req, res) => {
  // try {
  const body = req.body;
  //const _id = uuidv4();
  console.log(process.env.WEB3STORAGE);

  const buffer = Buffer.from(JSON.stringify({ ...body }));

  const files = [
    //new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([buffer], "signature.json"),
  ];

  const client = new Web3Storage({ token: process.env.WEB3STORAGE });
  const cid = await client.put(files);

  //const signature = encrypt(cid);
  const signature = 'wip';
  const fileUrl = `https://${cid}.ipfs.dweb.link/`;
  res.status(200).json({ status: "success", url: fileUrl, cid, signature: signature });
  // } catch (error) {
  //   res.status(404).json({ status: "failure", message: error });
  // }
};

const verifySignature = async (req, res, next) => {
  // try {
  console.log(req.body);
  const { key, encrypted, cid } = req.body;
  const [result, dec] = compare(cid, key, encrypted);
  res.status(200).json({ status: "sucess", result });
  // } catch (error) {
  //   res.status(404).json({ status: "failure" });
  // }
};

const funcStoreFiles = async (req, res) => {
  const algorithm = "aes-256-cbc";

  try {
    const body = req.body;
    const _id = uuidv4();
    const client = new Web3Storage({ token: process.env.Web3Storage });
    const cid = await client.put({ ...body, _id });

    const { iv, signature } = encrypt(cid);
    const fileUrl = `https://${cid}.ipfs.dweb.link/`;
    return { status: "sucess", url: fileUrl, cid, signature, iv, compare };
  } catch (error) {
    res.status(404).json({ status: "failure" });
  }
};

module.exports = { storeFiles, funcStoreFiles, verifySignature };
