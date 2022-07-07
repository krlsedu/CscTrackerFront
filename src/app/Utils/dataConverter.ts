export class DataConverter {

  public static format(value: number): string {
    let unit = "ms";
    if (value > 1000) {
      value = value / 1000;
      unit = "s";
    }
    if (value > 60 && unit === "s") {
      value = value / 60;
      unit = "min";
    }
    if (value > 60 && unit === "min") {
      value = value / 60;
      unit = "h";
    }
    if (value > 24 && unit === "h") {
      value = value / 24;
      unit = "d";
    }
    if (value > 7 && unit === "d") {
      value = value / 7;
      unit = "w";
    }
    if (value > 4 && unit === "w") {
      value = value / 4;
      unit = "m";
    }
    if (value > 12 && unit === "m") {
      value = value / 12;
      unit = "y";
    }
    try {
      return value.toFixed(2) + " " + unit;
    } catch (e) {
      let val: number = 0;
      for (let i = 0; i < value['data'].length; i++) {
        val += value['data'][i]
      }
      return DataConverter.format(val);
    }
  }

  public static formatDate(date: Date): string {
    return date.toLocaleString()
  }
}
