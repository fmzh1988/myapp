const utils = require('./utils/utils.js')
const constant = require('./utils/constant.js')
const module1 = require('./module/module1')
const module2 = require('./module/module2')

/**
  extensions is an Array and each item has such format:
  {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
  lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
**/

/**
  Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
**/
function sortExtensionsByName(extensions) {
  if (!extensions || !extensions instanceof Array) throw('the type of in-param is not array ')

	extensions.sort(utils.compare(['firstName', 'lastName', 'ext']))
}

/**
  Question 2: sort extensions by extType follow these orders ASC
  DigitalUser < VitrualUser < FaxUser < AO < Dept.
**/
function sortExtensionsByExtType(extensions) {
  if (!extensions || !extensions instanceof Array) throw('the type of in-param is not array ')

  extensions.sort(utils.compareByExtType())
}


/**
  saleItems is an Array has each item has such format:
  {
	month: n, //[1-12],
	date: n, //[1-31],
	transationId: "xxx",
	salePrice: number
  }
**/

/**
  Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
  [
  	{quarter: 1, totalPrices: xxx, transactionNums: n},
  	{....}
  ]
**/

function sumByQuarter(saleItems) {
  if (!saleItems || !saleItems instanceof Array) throw('the type of in-param is not array ')

  let result = {
    spring : { quarter: 1, totalPrices: 0, transactionNums: 0 },
    summer : { quarter: 2, totalPrices: 0, transactionNums: 0 },
    autumn : { quarter: 3, totalPrices: 0, transactionNums: 0 },
    winter : { quarter: 4, totalPrices: 0, transactionNums: 0 }
  }

  saleItems.forEach((item, index, array) => {
    let q = 'winter'
    let tmp = utils.padStart(item.month) + utils.padStart(item.date)
    if (tmp >= constant.quarterStartDate.spring && tmp < constant.quarterStartDate.summer) q = 'spring'
    if (tmp >= constant.quarterStartDate.summer && tmp < constant.quarterStartDate.autumn) q = 'summer'
    if (tmp >= constant.quarterStartDate.autumn && tmp < constant.quarterStartDate.winter) q= 'autumn'

    result[q].totalPrices = Number((result[q].totalPrices + item.salePrice).toFixed(3))
    result[q].transactionNums++
  })

  return [result.spring, result.summer, result.autumn, result.winter]
}

/**
  Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
  [
    {quarter: 1, averagePrices: xxx, transactionNums: n},
    {....}
  ]
**/

function averageByQuarter(saleItems) {
  if (!saleItems || !saleItems instanceof Array) throw('the type of in-param is not array ')

  const sum = sumByQuarter(saleItems)
  
  const result = []
  for (let i = 0; i < sum.length; i++) {
    let tmp = sum[i]
    result.push({
      quarter: tmp.quarter, 
      averagePrices: tmp.transactionNums === 0 ? 0 : Number((tmp.totalPrices/tmp.transactionNums).toFixed(3)), 
      transactionNums: tmp.transactionNums
    })
  }
  
  return result
}


/**
  Question 5: please create a tool to generate Sequence
  Expected to be used like:
  var sequence1 = new Sequence();
  sequence1.next() --> return 1;
  sequence1.next() --> return 2;
  
  in another module:
  var sequence2 = new Sequence();
  sequence2.next() --> 3;
  sequence2.next() --> 4;
**/
// module1()
// module2()


/**
    Question 6:
    AllKeys: 0-9;
    usedKeys: an array to store all used keys like [2,3,4];
    We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
**/

function getUnUsedKeys(allKeys, usedKeys) {
  if (!allKeys || !usedKeys || !allKeys instanceof Array || !usedKeys instanceof Array) throw('the type of in-param is not array ')

  if (allKeys.length==0 || usedKeys.length==0) return []

	return allKeys.filter( item => {
    return usedKeys.indexOf(item) === -1
  })
}



module.exports = {
  sortExtensionsByName,
  sortExtensionsByExtType,
  sumByQuarter,
  averageByQuarter,
  module1,
  module2,
  getUnUsedKeys
}

