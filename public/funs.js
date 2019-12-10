(function() {
  "use strict";

  const all = {
    day1: {
      part1: data => {
        return data
          .trim()
          .split("\n")
          .map(Number)
          .reduce((t, mass) => {
            var fuel = Math.floor(mass / 3) - 2;
            return t + fuel;
          }, 0);
      },
      part2: data => {
        return data
          .trim()
          .split("\n")
          .map(Number)
          .reduce((t, mass) => {
            var fuel = 0;
            var lastmass = mass;

            while (lastmass > 0) {
              lastmass = Math.floor(lastmass / 3) - 2;
              if (lastmass > 0) {
                fuel += lastmass;
              }
            }
            return t + fuel;
          }, 0);
      }
    },
    day2: {
      part1: data => {
        var commands = data
          .trim()
          .split(",")
          .map(Number);
        commands[1] = 12;
        commands[2] = 2;
        for (let i = 0, l = commands.length; i < l; i++) {
          if (commands[i] == 99) break;

          let op = commands[i]; // 1 add or 2 multiply
          i++;
          let posA = commands[i];
          let numA = commands[posA];
          i++;
          let posB = commands[i];
          let numB = commands[posB];
          i++;
          let posResult = commands[i];

          let result = op == 1 ? numA + numB : numA * numB;
          commands[posResult] = result;
        }

        return commands[0];
      },
      part2: data => {
        const end = 19690720;
        const inputData = data
          .trim()
          .split(",")
          .map(Number);
        const dataLength = inputData.length;

        for (let noun = 0; noun <= 99; noun++) {
          for (let verb = 0; verb <= 99; verb++) {
            let commands = inputData.slice();
            commands[1] = noun;
            commands[2] = verb;

            for (let i = 0; i < dataLength; i++) {
              if (commands[i] === 99) break;

              let op = commands[i]; // 1 add or 2 multiply
              i++;
              let posA = commands[i];
              let numA = commands[posA];
              i++;
              let posB = commands[i];
              let numB = commands[posB];
              i++;
              let posResult = commands[i];

              let result = op === 1 ? numA + numB : numA * numB;
              commands[posResult] = result;
            }

            //console.log(commands[0]);
            if (commands[0] === end) {
              return noun * 100 + verb;
            }
          }
        }

        return "error";
      }
    },
    day3: {
      part1: data => {
        var dirs = data
          .trim()
          .split("\n")
          .map(csv =>
            csv.split(",").map(cmd => {
              let val = {};
              val.dir = cmd[0];
              val.amt = Number(cmd.slice(1));
              return val;
            })
          );
        const o = [0, 0]; // x, y
        let path = {};
        let intersects = [];
        let wire = 0;

        for (let i = 0, l = dirs.length; i < l; i++) {
          let previous = o.slice();
          let p = o.slice();
          for (let ii = 0, ll = dirs[i].length; ii < ll; ii++) {
            let val = dirs[i][ii];
            if (val.dir === "U") {
              p[1] += val.amt;
            } else if (val.dir === "D") {
              p[1] -= val.amt;
            } else if (val.dir === "L") {
              p[0] -= val.amt;
            } else if (val.dir === "R") {
              p[0] += val.amt;
            }

            // it's not the points, it's the lines between
            let dx = p[0] - previous[0];
            let dy = p[1] - previous[1];
            do {
              do {
                // set current point
                let point = [p[0] - dx, p[1] - dy];
                if (point[0] == previous[0] && point[1] == previous[1]) {
                  // skip previous point
                } else {
                  let key = wire + "," + point[0] + "," + point[1];
                  if (path[key]) {
                    path[key].i += 1;
                  } else {
                    path[key] = {
                      x: point[0],
                      y: point[1],
                      i: 1
                    };
                  }
                  
                  // when on the second wire, look for points in the first
                  if (wire === 1 && path["0," + point[0] + "," + point[1]]) {
                    intersects.push({
                      x: point[0],
                      y: point[1]
                    });
                  }
                }
                if (dy !== 0) {
                  if (dy < 0) {
                    dy++;
                  } else {
                    dy--; 
                  }
                }
              } while ( dy != 0);
              if (dx !== 0) {
                if (dx < 0) {
                  dx++;
                } else {
                  dx--; 
                }
              }
            } while (dx != 0);

            previous = p.slice();
          }
          wire++;
        }

        console.log(intersects);

        let lowest = Infinity;
        for (let i = 0, l = intersects.length; i < l; i++) {
          let x = intersects[i];
          let distance = Math.abs(x.x) + Math.abs(x.y);
          lowest = Math.min(lowest, distance);
        }

        return lowest;
      },
      part2: data => {
        var dirs = data
          .trim()
          .split("\n")
          .map(csv =>
            csv.split(",").map(cmd => {
              let val = {};
              val.dir = cmd[0];
              val.amt = Number(cmd.slice(1));
              return val;
            })
          );
        const o = [0, 0]; // x, y
        let path = {};
        let intersects = [];
        let wire = 0;

        for (let i = 0, l = dirs.length; i < l; i++) {
          let previous = o.slice();
          let p = o.slice();
          let travelled = -1;
          for (let ii = 0, ll = dirs[i].length; ii < ll; ii++) {
            let val = dirs[i][ii];
            if (val.dir === "U") {
              p[1] += val.amt;
            } else if (val.dir === "D") {
              p[1] -= val.amt;
            } else if (val.dir === "L") {
              p[0] -= val.amt;
            } else if (val.dir === "R") {
              p[0] += val.amt;
            }

            // it's not the points, it's the lines between
            let dx = p[0] - previous[0];
            let dy = p[1] - previous[1];
            do {
              do {
                // set current point
                let point = [p[0] - dx, p[1] - dy];
                travelled++;
                if (point[0] == previous[0] && point[1] == previous[1]) {
                  // skip previous point
                } else {
                  let key = wire + "," + point[0] + "," + point[1];
                  if (path[key]) {
                    path[key].i += 1;
                    path[key].shortdistance = Math.min(path[key].shortdistance, travelled);
                  } else {
                    path[key] = {
                      x: point[0],
                      y: point[1],
                      i: 1,
                      shortdistance: travelled
                    };
                  }
                  
                  // when on the second wire, look for points in the first
                  if (wire === 1 && path["0," + point[0] + "," + point[1]]) {
                    let d0 = path["0," + point[0] + "," + point[1]].shortdistance;
                    let d1 = path["1," + point[0] + "," + point[1]].shortdistance;
                    intersects.push({
                      x: point[0],
                      y: point[1],
                      d0: d0,
                      d1: d1,
                      sum: d0 + d1
                    });
                  }
                }
                if (dy !== 0) {
                  if (dy < 0) {
                    dy++;
                  } else {
                    dy--; 
                  }
                }
              } while ( dy != 0);
              if (dx !== 0) {
                if (dx < 0) {
                  dx++;
                } else {
                  dx--; 
                }
              }
            } while (dx != 0);

            previous = p.slice();
          }
          wire++;
        }

        console.log(intersects);

        let lowest = Infinity;
        for (let i = 0, l = intersects.length; i < l; i++) {
          let x = intersects[i];
          let distance = x.sum;
          lowest = Math.min(lowest, distance);
        }

        return lowest;
      }
    },
    day4: {
      part1: data => {
        const range = data
          .trim()
          .split("-")
          .map(Number);
        const len = 6;
        
        const validate = function (input) {
          let isDouble = false;
          let isIncreasing = true;
          
          for (let l = len - 1; l--;) {
            if (!isDouble && input[l] === input[l + 1]) {
              isDouble = true;
            }
            isIncreasing = isIncreasing && (input[l] <= input[l + 1]);
          }
          
          return isDouble && isIncreasing;
        };
        
        let count = 0;
        for (let i = range[0]; i <= range[1]; i++) {
          if (validate(Array.from(String(i), Number))) {
            count++;
          }
        }
        
        return count;
      },
      part2: data => {
        const range = data
          .trim()
          .split("-")
          .map(Number);
        const len = 6;
        const rx = /(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+)/g;
        
        const validate = function (inputString) {
          let input = Array.from(inputString, Number);
          let isDouble = inputString.match(rx).some((m) => m.length === 2);
          let isIncreasing = true;
          
          for (let l = len - 1; l--;) {
            isIncreasing = isIncreasing && (input[l] <= input[l + 1]);
          }
          
          return isDouble && isIncreasing;
        };
        
        let count = 0;
        for (let i = range[0]; i <= range[1]; i++) {
          if (validate(String(i))) {
            count++;
          }
        }
        
        // not 984
        return count;
      }
    },
    day5: {  // broken
      part1: data => {
        const input = 1;
        let output = null;
        const inputData = data
          .trim()
          .split(",")
          .map(Number);
        const dataLength = inputData.length;

        for (let i = 0; i < dataLength; i++) {
          if (inputData[i] === 99) break;

          let op = inputData[i]; // 1 add, 2 multiply, 3 input, 4 output
          
          let modes = [];
          if (op > 4) {
            let opstr = String(op);
            op = parseInt(opstr.slice(-2), 10);
            if (op === 99) break;
            modes = opstr.slice(0, opstr.length - 2).split().map(Number);
          }
          i++;
          let posA = inputData[i];
          // if the mode is 1 (true), use immediate value
          // if the mode is 0 or undefined (false), use value at position
          let numA = modes.pop() ? posA : inputData[posA];

          if (op === 1 || op === 2) {
            i++;
            let posB = inputData[i];
            let numB = modes.pop() ? posB : inputData[posB];
            i++;
            let posResult = inputData[i];

            let result = null;

            if (op === 1) {
              result = numA + numB;
            } else if (op === 2) {
              result = numA * numB;
            }
            inputData[posResult] = result;
          }

          if (op === 3) {
            // input
            inputData[posA] = input;
          } else if (op === 4) {
            // output
            output = numA;
          }
        }

        return output;
      },
      part2: data => {
        
      }
    },
    day6: {
      part1: data => {
        let input = data
          .trim()
          .split("\n")
          .map((row) => row.split(")"));
        let orbits = {
          "COM": { // center of mass
            orbits: []
          }
        };
        const getOrbits = function (key) {
          if (key === "COM") return 0;
          
          // loop through sub-orbits and sum
          let planet = orbits[key];
          let orbiting = planet.orbits.slice();
          let sum = orbiting.length;
          planet.direct = sum;
          
          for (let i = 0, l = orbiting.length; i < l; i++) {
            sum += getOrbits(orbiting[i]);
          }
          planet.all = sum;
          planet.indirect = planet.all - planet.direct;
          
          return sum;
        };
        
        for (let i = 0, l = input.length; i < l; i++) {
          let orbit = input[i];
          if (orbits[orbit[1]]) {
            orbits[orbit[1]].orbits.push(orbit[0]);
          } else {
            orbits[orbit[1]] = {
              orbits: [ orbit[0] ]
            };
          }
        }
        
        //console.log(orbits);
        
        let total = 0;
        for (const key in orbits) {
          total += getOrbits(key);
        }
        return total;
      },
      part2: data => {
        let input = data
          .trim()
          .split("\n")
          .map((row) => row.split(")"));
        let orbits = {
          "COM": { // center of mass
            orbits: []
          }
        };
        const getParents = function (key) {
          if (key === "COM") return [];
          
          let planet = orbits[key];
          let orbiting = planet.orbits.slice();
          planet.ancestors = orbiting.slice();
          
          for (let i = 0, l = orbiting.length; i < l; i++) {
            planet.ancestors.push(...getParents(orbiting[i]));
          }
          
          return planet.ancestors;
        };
        
        for (let i = 0, l = input.length; i < l; i++) {
          let orbit = input[i];
          if (orbits[orbit[1]]) {
            orbits[orbit[1]].orbits.push(orbit[0]);
          } else {
            orbits[orbit[1]] = {
              orbits: [ orbit[0] ]
            };
          }
        }
        
        let youParents = getParents("YOU");
        let sanParents = getParents("SAN");
        //console.log(youParents, sanParents);
        
        let hops = 0;
        for (let i = 0, l = youParents.length; i < l; i++) {
          const foundAt = sanParents.indexOf(youParents[i]);
          if (foundAt > -1) {
            // a common ancestor was found
            hops = i + foundAt;
            break;
          }
        }
        return hops;
      }
    },
    day7: {  // broken
      part1: data => {
        const input = 0;
        let output = null;
        const inputData = data
          .trim()
          .split(",")
          .map(Number);
        const dataLength = inputData.length;
        
        // there's gotta be a better way...
        let amps = new Set();
        for (let a = 5;a--;) for (let b = 5;b--;) for (let c = 5;c--;) for (let d = 5;d--;) for (let e = 5;e--;) { 
          let set = new Set().add(a).add(b).add(c).add(d).add(e); 
          if (set.size === 5) { 
            amps.add(Array.from(set));
          }
        }

        for (let i = 0; i < dataLength; i++) {
          //TODO:
        }
      },
      part2: data => {
        //TODO:
      }
    },
    day8: {
      part1: data => {
        const width = 25;
        const height = 6;
        const input = data
          .trim()
          .split("")
          .map(Number);
        const length = input.length;
        let index = 0;
        let min = Infinity;
        let lowest = null;
        
        while (index < length) {
          let layer = {
            d0: 0, 
            d1: 0, 
            d2: 0
          };
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              let val = input[index];
              if (val === 0) {
                layer.d0++;
              } else if (val === 1) {
                layer.d1++;
              } else if (val === 2) {
                layer.d2++;
              }
              index++;
            }
          }
          
          if (layer.d0 <= min) {
            min = layer.d0;
            lowest = layer;
          }
        }

        return lowest.d1 * lowest.d2;
      },
      part2: data => {
        const width = 25;
        const height = 6;
        const input = data
          .trim()
          .split("")
          .map(Number);
        const length = input.length;
        let index = 0;
        let min = Infinity;
        let image = [];
        
        // backwards
        while (index < length) {
          for (let y = 0; y < height; y++) {
            if (image[y] == null) {
              image[y] = new Array(width).fill(2);
            }
            for (let x = 0; x < width; x++) {
              let val = input[index];
              let compare = image[y][x];
              if (compare === 2) {
                // transparent
                image[y][x] = val;
              } else if (compare === 1) {
                // white
              } else if (compare === 0) {
                // black
              }
              index++;
            }
          }
        }

        console.log("image: \n" + 
          image.map((yy) => yy.join(""))
          .join("\n")
          .replace(/2/g, "_")
          .replace(/1/g, "▓")
          .replace(/0/g, "░")
        );
        
        return "look in the console"
      }
    },
    day9: {
      part1: data => {},
      part2: data => {}
    },
    day10: {
      part1: data => {},
      part2: data => {}
    },
    day11: {
      part1: data => {},
      part2: data => {}
    },
    day12: {
      part1: data => {},
      part2: data => {}
    },
    day13: {
      part1: data => {},
      part2: data => {}
    },
    day14: {
      part1: data => {},
      part2: data => {}
    },
    day15: {
      part1: data => {},
      part2: data => {}
    },
    day16: {
      part1: data => {},
      part2: data => {}
    },
    day17: {
      part1: data => {},
      part2: data => {}
    },
    day18: {
      part1: data => {},
      part2: data => {}
    },
    day19: {
      part1: data => {},
      part2: data => {}
    },
    day20: {
      part1: data => {},
      part2: data => {}
    },
    day21: {
      part1: data => {},
      part2: data => {}
    },
    day22: {
      part1: data => {},
      part2: data => {}
    },
    day23: {
      part1: data => {},
      part2: data => {}
    },
    day24: {
      part1: data => {},
      part2: data => {}
    },
    day25: {
      part1: data => {},
      part2: data => {}
    }
  };

  const funs = function(day, part) {
    return all["day" + day]["part" + part];
  };

  this.funs = funs;
}.call(this));
