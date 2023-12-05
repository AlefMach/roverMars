class RegexDefault {
  // Verify string matches '0 0'
  public static regexTwoNumbersInt: RegExp = /^\s*\d+\s+\d+\s*$/;
  // Verify string matches '0 1 N'
  public static regexTwoDigitsOneCardinalPoint: RegExp = /^\d+\s\d+\s[NEWS]$/;
  // Verify string matches 'MRL'
  public static regexMRL: RegExp = /^[MRL]+$/;
}

export default RegexDefault;
