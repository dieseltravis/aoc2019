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
            //console.log(val, p.slice());
            if (val.dir === "U") {
              p[1] += val.amt;
            } else if (val.dir === "D") {
              p[1] -= val.amt;
            } else if (val.dir === "L") {
              p[0] -= val.amt;
            } else if (val.dir === "R") {
              p[0] += val.amt;
            }
            //console.log("pdiff", p.slice());

            // it's not the points, it's the lines between
            //console.log(p[0] - previous[0], p[1] - previous[1]);
            let dx = p[0] - previous[0];
            let dy = p[1] - previous[1];
            do {
              do {
                // set current point
                let point = [p[0] - dx, p[1] - dy];
                //console.log(dx, dy, point);
                if (point[0] == previous[0] && point[1] == previous[1]) {
                  // skip previous point
                  
                //} else if (point[0] == p[0] && point[1] == p[1]) {
                  // skip current point?
                  
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
                dy === 0 ? 0 : dy < 0 ? dy++ : dy--;
              } while ( dy != 0)
              dx === 0 ? 0 : dx < 0 ? dx++ : dx--;
            } while (dx != 0)

            previous = p.slice();
          }
          wire++;
        }

        console.log(intersects);
        // input
/*
R8,U5,L5,D3
U7,R6,D4,L4
*/

        let lowest = Infinity;
        for (let i = 0, l = intersects.length; i < l; i++) {
          let x = intersects[i];
          let distance = Math.abs(x.x) + Math.abs(x.y);
          lowest = Math.min(lowest, distance);
        }

        return lowest;
      },
      part2: data => {}
    },
    day4: {
      part1: data => {},
      part2: data => {}
    },
    day5: {
      part1: data => {},
      part2: data => {}
    },
    day6: {
      part1: data => {},
      part2: data => {}
    },
    day7: {
      part1: data => {},
      part2: data => {}
    },
    day8: {
      part1: data => {},
      part2: data => {}
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
