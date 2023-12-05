class RegexDefault {
  // Verify string matches '0 0'
  public static regex_two_numbers_int = /^\s*\d+\s+\d+\s*$/;
  // Verify string matches '0 1 N'
  public static regex_two_digits_one_cardinal_point = /^\d+\s\d+\s[NEWS]$/;
  // Verify string matches 'MRL'
  public static regex_MRL = /^[MRL]+$/;
}

export default RegexDefault;
