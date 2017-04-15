//set the two functions we need from chai and mocha as variables
var expect = chai.expect
var describe = mocha.describe

//Mocha has some work to do before it is ready to run your test suite
mocha.setup('bdd')

//testing is intented to read like plain english, first we "describe" the thing were testing
describe('initGrids', function(){

  // making a statement about a particular behavior of our code we expect
  it('should have an onclick attribute atttribute', function(){
    initGrids();
    //This is an assertion we are making about our code, again, reads like plain english
    expect(document.getElementById("4-5").getAttribute("onclick")).to.equal("handleClick([4,5])");
  })

})

mocha.run()
