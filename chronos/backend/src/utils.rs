pub fn get_date(t: u128) -> u128 {
    // input: epoch unix
    // returns date in epoch-ish format
    // 0 -> 1 jan 1970
    // 1 -> 2 jan 1970

    ((t as f64) / (86400f64)).floor() as u128
}