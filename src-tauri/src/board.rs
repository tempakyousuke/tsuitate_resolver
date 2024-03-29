use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct InputCap {
  hu: i32,
  kyo: i32,
  kei: i32,
  gin: i32,
  kin: i32,
  hisha: i32,
  kaku: i32,
}

impl InputCap {
  fn to_vec(&self) -> Vec<i32> {
    vec![
      self.hu, self.kyo, self.kei, self.gin, self.kin, self.hisha, self.kaku,
    ]
  }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InputBoard {
  sq00: Vec<i32>,
  sq01: Vec<i32>,
  sq02: Vec<i32>,
  sq03: Vec<i32>,
  sq04: Vec<i32>,
  sq05: Vec<i32>,
  sq06: Vec<i32>,
  sq07: Vec<i32>,
  sq08: Vec<i32>,
  sq09: Vec<i32>,
  sq10: Vec<i32>,
  sq11: Vec<i32>,
  sq12: Vec<i32>,
  sq13: Vec<i32>,
  sq14: Vec<i32>,
  sq15: Vec<i32>,
  sq16: Vec<i32>,
  sq17: Vec<i32>,
  sq18: Vec<i32>,
  sq19: Vec<i32>,
  sq20: Vec<i32>,
  sq21: Vec<i32>,
  sq22: Vec<i32>,
  sq23: Vec<i32>,
  sq24: Vec<i32>,
  sq25: Vec<i32>,
  sq26: Vec<i32>,
  sq27: Vec<i32>,
  sq28: Vec<i32>,
  sq29: Vec<i32>,
  sq30: Vec<i32>,
  sq31: Vec<i32>,
  sq32: Vec<i32>,
  sq33: Vec<i32>,
  sq34: Vec<i32>,
  sq35: Vec<i32>,
  sq36: Vec<i32>,
  sq37: Vec<i32>,
  sq38: Vec<i32>,
  sq39: Vec<i32>,
  sq40: Vec<i32>,
  sq41: Vec<i32>,
  sq42: Vec<i32>,
  sq43: Vec<i32>,
  sq44: Vec<i32>,
  sq45: Vec<i32>,
  sq46: Vec<i32>,
  sq47: Vec<i32>,
  sq48: Vec<i32>,
  sq49: Vec<i32>,
  sq50: Vec<i32>,
  sq51: Vec<i32>,
  sq52: Vec<i32>,
  sq53: Vec<i32>,
  sq54: Vec<i32>,
  sq55: Vec<i32>,
  sq56: Vec<i32>,
  sq57: Vec<i32>,
  sq58: Vec<i32>,
  sq59: Vec<i32>,
  sq60: Vec<i32>,
  sq61: Vec<i32>,
  sq62: Vec<i32>,
  sq63: Vec<i32>,
  sq64: Vec<i32>,
  sq65: Vec<i32>,
  sq66: Vec<i32>,
  sq67: Vec<i32>,
  sq68: Vec<i32>,
  sq69: Vec<i32>,
  sq70: Vec<i32>,
  sq71: Vec<i32>,
  sq72: Vec<i32>,
  sq73: Vec<i32>,
  sq74: Vec<i32>,
  sq75: Vec<i32>,
  sq76: Vec<i32>,
  sq77: Vec<i32>,
  sq78: Vec<i32>,
  sq79: Vec<i32>,
  sq80: Vec<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Board {
  white_cap: Vec<i32>,
  black_cap: Vec<i32>,
  sq00: Vec<i32>,
  sq01: Vec<i32>,
  sq02: Vec<i32>,
  sq03: Vec<i32>,
  sq04: Vec<i32>,
  sq05: Vec<i32>,
  sq06: Vec<i32>,
  sq07: Vec<i32>,
  sq08: Vec<i32>,
  sq09: Vec<i32>,
  sq10: Vec<i32>,
  sq11: Vec<i32>,
  sq12: Vec<i32>,
  sq13: Vec<i32>,
  sq14: Vec<i32>,
  sq15: Vec<i32>,
  sq16: Vec<i32>,
  sq17: Vec<i32>,
  sq18: Vec<i32>,
  sq19: Vec<i32>,
  sq20: Vec<i32>,
  sq21: Vec<i32>,
  sq22: Vec<i32>,
  sq23: Vec<i32>,
  sq24: Vec<i32>,
  sq25: Vec<i32>,
  sq26: Vec<i32>,
  sq27: Vec<i32>,
  sq28: Vec<i32>,
  sq29: Vec<i32>,
  sq30: Vec<i32>,
  sq31: Vec<i32>,
  sq32: Vec<i32>,
  sq33: Vec<i32>,
  sq34: Vec<i32>,
  sq35: Vec<i32>,
  sq36: Vec<i32>,
  sq37: Vec<i32>,
  sq38: Vec<i32>,
  sq39: Vec<i32>,
  sq40: Vec<i32>,
  sq41: Vec<i32>,
  sq42: Vec<i32>,
  sq43: Vec<i32>,
  sq44: Vec<i32>,
  sq45: Vec<i32>,
  sq46: Vec<i32>,
  sq47: Vec<i32>,
  sq48: Vec<i32>,
  sq49: Vec<i32>,
  sq50: Vec<i32>,
  sq51: Vec<i32>,
  sq52: Vec<i32>,
  sq53: Vec<i32>,
  sq54: Vec<i32>,
  sq55: Vec<i32>,
  sq56: Vec<i32>,
  sq57: Vec<i32>,
  sq58: Vec<i32>,
  sq59: Vec<i32>,
  sq60: Vec<i32>,
  sq61: Vec<i32>,
  sq62: Vec<i32>,
  sq63: Vec<i32>,
  sq64: Vec<i32>,
  sq65: Vec<i32>,
  sq66: Vec<i32>,
  sq67: Vec<i32>,
  sq68: Vec<i32>,
  sq69: Vec<i32>,
  sq70: Vec<i32>,
  sq71: Vec<i32>,
  sq72: Vec<i32>,
  sq73: Vec<i32>,
  sq74: Vec<i32>,
  sq75: Vec<i32>,
  sq76: Vec<i32>,
  sq77: Vec<i32>,
  sq78: Vec<i32>,
  sq79: Vec<i32>,
  sq80: Vec<i32>,
}

impl Board {
  pub fn new(white_cap: InputCap, black_cap: InputCap, board: InputBoard) -> Self {
    let white = white_cap.to_vec();
    let black = black_cap.to_vec();
    Board {
      white_cap: white,
      black_cap: black,
      sq00: board.sq00,
      sq01: board.sq01,
      sq02: board.sq02,
      sq03: board.sq03,
      sq04: board.sq04,
      sq05: board.sq05,
      sq06: board.sq06,
      sq07: board.sq07,
      sq08: board.sq08,
      sq09: board.sq09,
      sq10: board.sq10,
      sq11: board.sq11,
      sq12: board.sq12,
      sq13: board.sq13,
      sq14: board.sq14,
      sq15: board.sq15,
      sq16: board.sq16,
      sq17: board.sq17,
      sq18: board.sq18,
      sq19: board.sq19,
      sq20: board.sq20,
      sq21: board.sq21,
      sq22: board.sq22,
      sq23: board.sq23,
      sq24: board.sq24,
      sq25: board.sq25,
      sq26: board.sq26,
      sq27: board.sq27,
      sq28: board.sq28,
      sq29: board.sq29,
      sq30: board.sq30,
      sq31: board.sq31,
      sq32: board.sq32,
      sq33: board.sq33,
      sq34: board.sq34,
      sq35: board.sq35,
      sq36: board.sq36,
      sq37: board.sq37,
      sq38: board.sq38,
      sq39: board.sq39,
      sq40: board.sq40,
      sq41: board.sq41,
      sq42: board.sq42,
      sq43: board.sq43,
      sq44: board.sq44,
      sq45: board.sq45,
      sq46: board.sq46,
      sq47: board.sq47,
      sq48: board.sq48,
      sq49: board.sq49,
      sq50: board.sq50,
      sq51: board.sq51,
      sq52: board.sq52,
      sq53: board.sq53,
      sq54: board.sq54,
      sq55: board.sq55,
      sq56: board.sq56,
      sq57: board.sq57,
      sq58: board.sq58,
      sq59: board.sq59,
      sq60: board.sq60,
      sq61: board.sq61,
      sq62: board.sq62,
      sq63: board.sq63,
      sq64: board.sq64,
      sq65: board.sq65,
      sq66: board.sq66,
      sq67: board.sq67,
      sq68: board.sq68,
      sq69: board.sq69,
      sq70: board.sq70,
      sq71: board.sq71,
      sq72: board.sq72,
      sq73: board.sq73,
      sq74: board.sq74,
      sq75: board.sq75,
      sq76: board.sq76,
      sq77: board.sq77,
      sq78: board.sq78,
      sq79: board.sq79,
      sq80: board.sq80,
    }
  }
}

pub fn get_square(board: &Board, number: i32) -> &Vec<i32> {
  match number {
    0 => &board.sq00,
    1 => &board.sq01,
    2 => &board.sq02,
    3 => &board.sq03,
    4 => &board.sq04,
    5 => &board.sq05,
    6 => &board.sq06,
    7 => &board.sq07,
    8 => &board.sq08,
    9 => &board.sq09,
    10 => &board.sq10,
    11 => &board.sq11,
    12 => &board.sq12,
    13 => &board.sq13,
    14 => &board.sq14,
    15 => &board.sq15,
    16 => &board.sq16,
    17 => &board.sq17,
    18 => &board.sq18,
    19 => &board.sq19,
    20 => &board.sq20,
    21 => &board.sq21,
    22 => &board.sq22,
    23 => &board.sq23,
    24 => &board.sq24,
    25 => &board.sq25,
    26 => &board.sq26,
    27 => &board.sq27,
    28 => &board.sq28,
    29 => &board.sq29,
    30 => &board.sq30,
    31 => &board.sq31,
    32 => &board.sq32,
    33 => &board.sq33,
    34 => &board.sq34,
    35 => &board.sq35,
    36 => &board.sq36,
    37 => &board.sq37,
    38 => &board.sq38,
    39 => &board.sq39,
    40 => &board.sq40,
    41 => &board.sq41,
    42 => &board.sq42,
    43 => &board.sq43,
    44 => &board.sq44,
    45 => &board.sq45,
    46 => &board.sq46,
    47 => &board.sq47,
    48 => &board.sq48,
    49 => &board.sq49,
    50 => &board.sq50,
    51 => &board.sq51,
    52 => &board.sq52,
    53 => &board.sq53,
    54 => &board.sq54,
    55 => &board.sq55,
    56 => &board.sq56,
    57 => &board.sq57,
    58 => &board.sq58,
    59 => &board.sq59,
    60 => &board.sq60,
    61 => &board.sq61,
    62 => &board.sq62,
    63 => &board.sq63,
    64 => &board.sq64,
    65 => &board.sq65,
    66 => &board.sq66,
    67 => &board.sq67,
    68 => &board.sq68,
    69 => &board.sq69,
    70 => &board.sq70,
    71 => &board.sq71,
    72 => &board.sq72,
    73 => &board.sq73,
    74 => &board.sq74,
    75 => &board.sq75,
    76 => &board.sq76,
    77 => &board.sq77,
    78 => &board.sq78,
    79 => &board.sq79,
    80 => &board.sq80,
    _ => &board.sq00,
  }
}

pub fn get_king_square(board: &Board, owner: i32) -> i32 {
  let squares = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
    75, 76, 77, 78, 79, 80,
  ];
  let mut result = 81;
  for i in squares {
    let square = get_square(board, i);
    if square[0] == 8 && square[1] == owner {
      result = i;
    }
  }
  result
}

pub fn check_tsumi(board: &Board, owner: i32) {
  let checking_square = get_checking_squares(board, owner);
  println!("{:?}", checking_square);
}

pub fn get_checking_squares(board: &Board, owner: i32) -> Vec<Vec<i32>> {
  let king_square = get_king_square(&board, owner);
  let mut result: Vec<Vec<i32>> = vec![];

  // 桂馬チェック
  if owner == 1 {
    // 王が先手
    let keima_square_num1 = king_square - 11;
    let keima_square_num2 = king_square + 7;
    let keima_square1 = get_square(&board, keima_square_num1);
    let keima_square2 = get_square(&board, keima_square_num2);
    if keima_square1[0] == 3 && keima_square1[1] == 2 {
      result.push(vec![keima_square_num1, 3])
    }
    if keima_square2[0] == 3 && keima_square2[1] == 2 {
      result.push(vec![keima_square_num2, 3])
    }
  } else {
    // 王が後手
    let keima_square_num1 = king_square - 7;
    let keima_square_num2 = king_square + 11;
    let keima_square1 = get_square(&board, keima_square_num1);
    let keima_square2 = get_square(&board, keima_square_num2);
    if keima_square1[0] == 3 && keima_square1[1] == 1 {
      result.push(vec![keima_square_num1, 3])
    }
    if keima_square2[0] == 3 && keima_square2[1] == 1 {
      result.push(vec![keima_square_num2, 3])
    }
  }

  // 歩の動きチェック
  if owner == 1 {
    let checking_square_num = king_square - 1;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        1 => result.push(vec![checking_square_num, 1]),
        2 => result.push(vec![checking_square_num, 2]),
        3 => result.push(vec![checking_square_num, 3]),
        4 => result.push(vec![checking_square_num, 4]),
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square + 1;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        1 => result.push(vec![checking_square_num, 1]),
        2 => result.push(vec![checking_square_num, 2]),
        3 => result.push(vec![checking_square_num, 3]),
        4 => result.push(vec![checking_square_num, 4]),
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 右斜め上からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square - 10;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square + 10;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 左斜め上からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square + 8;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square - 8;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 右斜め下からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square - 8;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square + 8;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 左斜め下からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square + 10;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square - 10;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        4 => result.push(vec![checking_square_num, 4]),
        6 => result.push(vec![checking_square_num, 6]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 右からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square - 9;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square + 9;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 左からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square + 9;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square - 9;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  // 下からの王手チェック
  if owner == 1 {
    let checking_square_num = king_square + 1;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 2 {
      match checking_square[0] {
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  } else {
    let checking_square_num = king_square - 1;
    let checking_square = get_square(&board, checking_square_num);
    if checking_square[1] == 1 {
      match checking_square[0] {
        5 => result.push(vec![checking_square_num, 5]),
        7 => result.push(vec![checking_square_num, 7]),
        9 => result.push(vec![checking_square_num, 9]),
        10 => result.push(vec![checking_square_num, 10]),
        11 => result.push(vec![checking_square_num, 11]),
        12 => result.push(vec![checking_square_num, 12]),
        13 => result.push(vec![checking_square_num, 13]),
        14 => result.push(vec![checking_square_num, 14]),
        _ => (),
      }
    }
  }
  result
}
