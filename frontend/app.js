// const { ethers } = require("hardhat");
// const { get } = require("mongoose");

// const { ethers } = require("hardhat");

App = {
  contract: {},
  init: async function () {
    console.log("init is called");

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    let userAddress = await signer.getAddress();

    document.getElementById("wallet").innerText =
      "Your wallet address is:" + userAddress;

    $.getJSON(
      "../artifacts/contracts/BasicMarketplace.sol/BasicMarketPlace.json",
      function (BasicMarketPlace) {
        console.log(BasicMarketPlace);
        const resourceAddress = "0x5BEf7f79E9659969561dBaF44A79139bD4e4D20a";

        const contract = new ethers.Contract(
          resourceAddress,
          BasicMarketPlace.abi,
          signer
        );

        App.contract=contract;
        
        contract.getProducts().then((data)=>{
            console.log(data);
        var allItemsDiv = $("#addItems");
        var itemTemplate = $("#itemTemplate");
        for (i = 0; i < data.length; i++) {
          console.log(i);
          itemTemplate.find(".itemName").text(data[i].itemName);
          itemTemplate.find(".itemOwner").text(data[i].owner);
          itemTemplate.find(".itemCreator").text(data[i].creator);
          itemTemplate.find(".askingPrice").text(data[i].askingPrice);
          itemTemplate.find(".buy_btn").attr("data-id", data[i].id);
          itemTemplate
            .find(".itemStatus")
            .text(data[i].isSold ? "Sold" : "Available");

          if (data[i].isSold) {
            itemTemplate.find(".buy_btn").hide();
          } else {
            itemTemplate.find(".buy_btn").show();
          }
          allItemsDiv.append(itemTemplate.html());
        }
        });

        
      }
    );
    return App.bindEvents();
  },
  bindEvents: function () {
    $(document).on("click", ".btn_add", App.handleAdd);
    $(document).on("click", ".buy_btn", { id: this.id }, App.handleBuy);
  },
  handleAdd: function () {
    console.log("handling add item...");

    var newItemName= $("#new_itemname").val();
    var newAskingPrice = $("#new_askingprice").val();

    App.contract.addProduct(newItemName,newAskingPrice);
  },
  handleBuy: function (event) {
    var productId = parseInt($(event.target).data("id"));
    console.log("productid is " + productId);
    App.contract.sellProduct(productId);
  },
};
$(function () {
  $(window).load(function () {
    App.init();
  });
});
