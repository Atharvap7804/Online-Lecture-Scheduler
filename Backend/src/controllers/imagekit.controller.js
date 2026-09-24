const Imagekit = require("imagekit");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


exports.getAuthParams=(req,res)=>{
 try{
  const authParams = imagekit.getAuthenticationParameters();
  res.status(200).json(authParams);
 }catch(err){
  console.error(err);
  res.status(500).json({ success: false, message: "Error occurred while fetching authentication parameters" });
 }
}