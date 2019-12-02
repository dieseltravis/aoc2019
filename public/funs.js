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
      part1: data => {},
      part2: data => {}
    },
    day3: {
      part1: data => {},
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
