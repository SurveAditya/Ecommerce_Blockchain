// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
     address public owner;

    //Here we define the data type for our items
    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    //Here we define the data type for our orders
    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;
    event List(string name, uint256 cost, uint256 quantity);
    event Buy(string name, uint256 cost, uint256 quantity);


     constructor() {    
        owner = msg.sender;
     }

     modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
     }

     function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
     ) public onlyOwner{
        //Create item
       Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);
       
        //Add item to mapping
        items[_id] = item;

        // Emit event
        //We can use this event to trigger a notification to the frontend that a new item has been listed, i.e whenever this function is called
        emit List(_name, _cost, _stock);
     }

     function buy(uint256 _id) public payable{
        //Fetch item
        Item memory item = items[_id];

        //Check if item is in stock
        require(item.stock > 0, "Item is out of stock");

        //Check if buyer has enough ether
        require(msg.value >= item.cost, "Not enough ether");

        //Create order
        Order memory order = Order(block.timestamp,item);

        //Add order for user
        orderCount[msg.sender] += 1;
        orders[msg.sender][orderCount[msg.sender]] = order;

        //Subtract item from stock
        items[_id].stock -= 1;

        // Emit event
        emit Buy(item.name, item.cost, item.id);

     }

     function withdraw() public onlyOwner{
        //Transfer ether to owner
        payable(owner).transfer(address(this).balance);
     }
}
