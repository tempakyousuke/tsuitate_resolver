#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod board;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![resolve])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn resolve(black_cap: board::InputCap, white_cap: board::InputCap, board: board::InputBoard) {
  let new_board = board::Board::new(white_cap, black_cap, board);
  board::check_tsumi(&new_board, 2);
}
