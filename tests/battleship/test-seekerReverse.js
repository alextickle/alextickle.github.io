//set the two functions we need from chai and mocha as variables
var expect = chai.expect
var describe = mocha.describe

//Mocha has some work to do before it is ready to run your test suite
mocha.setup('bdd')

//testing is intented to read like plain english, first we "describe" the thing were testing
describe('seeker.reverse()', function(){

  // making a statement about a particular behavior of our code we expect
  it('should reverse direction from 0 to 2', function(){
    var seeker = {
      targetAcquired: false,
      directionIndex: 0,
      directionAcquired: false,
      initialHit: [],
      lastHit: [],
      recentHits: [],
      tries: 0,
      recentShipsSunk: [],
      rotate: function(){
        if (this.directionIndex == 3){
          this.directionIndex = 0;
        }
        else {
          this.directionIndex++;
        }
      },
      reverse: function(){
        if (this.directionIndex < 2){
          this.directionIndex += 2;
        }
        else {
          this.directionIndex -= 2;
        }
      },
      logSelf: function(){
        console.log("------");
        console.log("targetAcquired: " + this.targetAcquired);
        console.log("directionAcquired: " + this.directionAcquired);
        console.log("directionIndex: " + this.directionIndex);
        console.log("initialHit: " + this.initialHit[0] + "-" + this.initialHit[1]);
        console.log("lastHit: " + this.lastHit[0] + "-" + this.initialHit[1]);
        console.log("tries: " + this.tries);
        console.log("------");
      }
    }
    //This is an assertion we are making about our code, again, reads like plain english
    expect(seeker.directionIndex).to.equal(0);
  })

  it('should reverse direction from 0 to 2', function(){
    seeker.reverse()
    //This is an assertion we are making about our code, again, reads like plain english
    expect(seeker.directionIndex).to.equal(2);
  })

  it('should rotate from 2 to 3', function(){
    seeker.rotate()
    expect(seeker.directionIndex).to.equal(3);
  })
})

mocha.run()
