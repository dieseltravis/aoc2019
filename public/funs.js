(function () {
  "use strict";

  
  const all = {
    "day1":  {
      "part1": data => {
        return data.trim().split('\n').map(Number).reduce((t, n) => t + n, 0);
      },
      "part2": data => {

        return 0;
      }
    },
    "day2": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day3": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day3": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day4": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day5": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day6": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day7": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day8": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day9": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day10": {
      "part1": data => {
      },
      "part2": data => {
      }
    },
    "day11": {
      "part1": data => {},
      "part2": data => {}
    },
    "day12": {
      "part1": data => {},
      "part2": data => {}
    },
    "day13": {
      "part1": data => {},
      "part2": data => {}
    },
    "day14": {
      "part1": data => {},
      "part2": data => {}
    },
    "day15": {
      "part1": data => {},
      "part2": data => {}
    },
    "day16": {
      "part1": data => {},
      "part2": data => {}
    },
    "day17": {
      "part1": data => {},
      "part2": data => {}
    },
    "day18": {
      "part1": data => {},
      "part2": data => {}
    },
    "day19": {
      "part1": data => {},
      "part2": data => {}
    },
    "day20": {
      "part1": data => {},
      "part2": data => {}
    },
    "day21": {
      "part1": data => {},
      "part2": data => {}
    },
    "day22": {
      "part1": data => {},
      "part2": data => {}
    },
    "day23": {
      "part1": data => {},
      "part2": data => {}
    },
    "day24": {
      "part1": data => {},
      "part2": data => {}
    },
    "day25": {
      "part1": data => {},
      "part2": data => {}
    }
  };

  const funs = function (day, part) {    
    return all["day" + day]["part" + part];
  };
  
  this.funs = funs;
  
}).call(this);