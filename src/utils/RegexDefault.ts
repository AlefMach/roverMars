/**
 * Class representing default regular expressions.
 *
 * @class RegexDefault
 */
class RegexDefault {
  /**
   * Regular expression to verify a string matches '0 0'.
   *
   * @member {RegExp}
   * @public
   * @static
   * @readonly
   */
  public static regexTwoNumbersInt: RegExp = /^\s*\d+\s+\d+\s*$/;

  /**
   * Regular expression to verify a string matches '0 1 N'.
   *
   * @member {RegExp}
   * @public
   * @static
   * @readonly
   */
  public static regexTwoDigitsOneCardinalPoint: RegExp = /^\d+\s\d+\s[NEWS]$/;

  /**
   * Regular expression to verify a string matches 'MRL'.
   *
   * @member {RegExp}
   * @public
   * @static
   * @readonly
   */
  public static regexMRL: RegExp = /^[MRL]+$/;
}

export default RegexDefault;
