const NotarizeTx = artifacts.require('NotarizeTx')
const NotaryInteraction = artifacts.require('NotaryInteraction')
contract('NotarizeTx', addresses => {
  console.log('comienza test')
  const owner = addresses[0]
  const buyer = addresses[1]
  const seller = addresses[2]
  const operator = addresses[3]
  const id =  "0x785334f8"
  const date = "326462"
  const value = 1
  const key =  "0xa06d8c92805e40b767afa80b81b0bdabbea6d10af016a1dd121bc5c6651623a1"
  const status = 0
  const statusUpdated = 1
  const instanceNotarizeTx =  async () => {
    return await NotarizeTx.at("0xfb6358078fa612a1a14d7e11f347bbf74bec0ad2")
  }
  const instanceNotaryInteraction =  async () => {
    return await NotaryInteraction.at("0x3f5a1fb25cae465e3d5877522c93fb456df9c76a")
  }

  describe('testing interaction contract', () => {

    it('operator cant use newTx when is not instantiated', async () => {
      try {
        let instance = await instanceNotarizeTx()
        await instance.newTx( buyer, seller, id, date, value, key , { from: operator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

    it('owner can use initOperator from NotaryInteraction', async () => {
      try {
        let instance = await instanceNotaryInteraction()
        console.log(instance);
        await instance.initOperator( operator,{ from: owner})
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('operator can use newTx', async () => {
      try {
        let instance = await instanceNotarizeTx()
        await instance.newTx( buyer, seller, id, date, value, key ,{ from: operator})
        instance.newTxEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

  })
})
