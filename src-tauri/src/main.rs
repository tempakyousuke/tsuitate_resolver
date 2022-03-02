#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![resolve])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[derive(Debug, Serialize, Deserialize)]
struct InputCap {
  hu: i32,
  kyo: i32,
  kei: i32,
  gin: i32,
  kin: i32,
  hisha: i32,
  kaku: i32,
}

#[derive(Debug, Serialize, Deserialize)]
struct InputBoard {
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

#[tauri::command]
fn resolve(black_cap: InputCap, white_cap: InputCap, board: InputBoard) {
  println!("{:#?}", black_cap);
  println!("{:#?}", white_cap);
  println!("{:#?}", board);
}
