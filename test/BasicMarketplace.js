const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BasicMarketplace", function () {
  it("Should return a new product once deployed", async function () {
    const Product = await ethers.getContractFactory("BasicMarketplace");
    const product = await Product.deploy();
    await product.deployed();

    expect(await product.numProduct()).to.equal(1);
  });
  it("Should create a new product", async function () {
    const Product = await ethers.getContractFactory("BasicMarketplace");
    const product = await Product.deploy();
    await product.deployed();

    const addProductTx = await product.addProduct(
      "Test Product",
      "This is a test product",
      100
    );

    // wait until the transaction is mined
    await addProductTx.wait();

    expect(await product.numProduct()).to.equal(2);
  });
});
