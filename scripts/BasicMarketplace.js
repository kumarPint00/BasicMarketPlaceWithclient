const hre = require("hardhat");

async function main(){
  const BasicMarketplace = await hre.ethers.getContractFactory(
    "BasicMarketPlace"
  );
  const basicmartketplace= await BasicMarketplace.deploy();
  await basicmartketplace.deployed();

  console.log("BasicMarketplace deployed to :"+ basicmartketplace.address)
}

main().then(()=>process.exit(0)).catch((error)=>{
  console.log(error);
  process.exit(1);
}); 