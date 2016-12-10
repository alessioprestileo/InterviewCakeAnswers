export interface Duration {
  startTime: number,
  endTime: number
}
export interface Meeting {
  startTime: number,
  endTime: number
}

export class AppleStocks {
  /* INPUT FOR TESTING */
  // let stockPricesYesterday = [10, 18, 7, 5, 8, 11, 14, 9];
  //
  /* Public methods */
  public static getMaxProfit(prices: number[]) : number {
    let maxProfit: number;
    let length: number = prices.length;
    switch (length) {
      case 0:
      case 1:
        maxProfit = 0;
        break;
      case 2:
        maxProfit = prices[1] - prices[0];
        break;
      default:
        maxProfit = prices[1] - prices[0];
        let newProfit: number;
        for (let i = 0; i < length - 1; i++) {
          for (let j = i + 1; j < length; j++) {
            newProfit = prices[j] - prices[i];
            if (newProfit > maxProfit) {
              maxProfit = newProfit;
              if (newProfit < 0) {
                break;
              }
            }
          }
        }
    }
    return maxProfit
  }
}
export class HighestProductOfN {
  /* INPUT FOR TESTING */
  // let input: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //
  /* Private methods */
  private static recursiveMultiplication(
    numbers: number[],
    loopLevel: number,
    loopStart: number,
    nOfLoops: number,
    factorsFromParentLoops: number[],
    tempMaxProduct: number
  ) : number {
    loopLevel++;
    let length: number = numbers.length;
    let newProduct: number;
    let productFromParentLoops: number;
    for (let i = loopStart; i < length - (nOfLoops - loopLevel); i++) {
      if (loopLevel === nOfLoops) {
        productFromParentLoops = 1;
        for (let factor of factorsFromParentLoops) {
          productFromParentLoops *= factor;
        }
        newProduct = productFromParentLoops * numbers[i];
        if (newProduct > tempMaxProduct) {
          tempMaxProduct = newProduct;
        }
      }
      else {
        if (factorsFromParentLoops.length < loopLevel) {
          factorsFromParentLoops.push(1);
        }
        factorsFromParentLoops[loopLevel - 1] = numbers[i];
        let newLoopStart: number = i + 1;
        newProduct = this.recursiveMultiplication(
          numbers,
          loopLevel,
          newLoopStart,
          nOfLoops,
          factorsFromParentLoops,
          tempMaxProduct
        );
        if (newProduct > tempMaxProduct) {
          tempMaxProduct = newProduct;
        }
      }
    }
    return tempMaxProduct;
  }
  /* Public methods */
  public static getHighestProductOfN(
    numbers: number[],
    nOfFactors: number
  ) : number {
    let length: number = numbers.length;
    if (nOfFactors < 2) {
      return 0;
    }
    else if (length < nOfFactors) {
      return 0;
    }
    else if (length === nOfFactors) {
      let product: number = 1;
      for (let number of numbers) {
        product *= number;
      }
    }
    else {
      let loopLevel: number = 0;
      let loopStart: number = 0;
      let nOfLoops: number = nOfFactors;
      let factorsFromParentLoops: number[] = [1];
      let tempMaxProduct: number = 1;
      for (let i = 0; i < nOfFactors; i++) {
        tempMaxProduct *= numbers[i];
      }
      return this.recursiveMultiplication(
        numbers,
        loopLevel,
        loopStart,
        nOfLoops,
        factorsFromParentLoops,
        tempMaxProduct
      );
    }
  }
}
export class HighestProductOfThree {
  /* INPUT FOR TESTING */
  // let input: number[] = [11, 7, 3, 4, 2, 10];
  //
  /* Public methods */
  public static getHighestProductOfThree(numbers: number[]) : number {
    let length: number = numbers.length;
    switch (length) {
      case 0:
      case 1:
      case 2:
        return 0;
      case 3:
        return numbers[0] * numbers[1] * numbers[2];
      default:
        let maxProduct: number = numbers[0] * numbers[1] * numbers[2];
        let newProduct: number;
        for (let i = 0; i < length - 2; i++) {
          for (let j = i + 1; j < length - 1; j++) {
            for (let k = j + 1; k < length; k++) {
              newProduct = numbers[i] * numbers[j] * numbers[k];
              if (newProduct > maxProduct) {
                maxProduct = newProduct;
              }
            }
          }
        }
        return maxProduct;
    }
  }
}
export class MergingMeetingTimes {
  /* INPUT FOR TESTING */
  // let input: Meeting[] = [
  //   {startTime: 13,  endTime: 14},
  //   {startTime: 0,  endTime: 1},
  //   {startTime: 3,  endTime: 5},
  //   {startTime: 4,  endTime: 8},
  //   {startTime: 10, endTime: 12},
  //   {startTime: 9,  endTime: 10},
  //   {startTime: 14,  endTime: 15},
  //   {startTime: 20,  endTime: 21},
  //   {startTime: 15,  endTime: 16},
  //   {startTime: 14,  endTime: 18}
  // ];
  //
  /* Public methods */
  public static mergeTimes(meetings: Meeting[]) : Duration[] {
    let result: Duration[];
    let length: number = meetings.length;
    switch (length) {
      case 0:
        result = [];
        break;
      case 1:
        result = [(<Duration>meetings[0])];
        break;
      default:
        meetings.sort((a, b) => (a.startTime - b.startTime));
        let i: number = 0;
        let meeting: Meeting = meetings[i];
        let mergedMeetings: Duration[] = [];
        for (++i; i < length; i++) {
          if (meeting.endTime >= meetings[i].startTime) {
            if (meeting.endTime < meetings[i].endTime) {
              meeting.endTime = meetings[i].endTime;
            }
          } else {
            mergedMeetings.push(<Duration>meeting);
            meeting = meetings[i];
          }
        }
        result = mergedMeetings;
    }
    return result;
  }
}
export class ProductOfAllOtherNumbers {
  /* INPUT FOR TESTING */
  // let input: number[] = [1, 7, 3, 4];
  //
  /* Public methods */
  public static getProductsOfAllNumbersExceptAtIndex(
    numbers: number[]
  ) : number[] {
    let result: number[] = [];
    let length: number = numbers.length;
    switch (length) {
      case 0:
      case 1:
        break;
      default:
        for (let i = 0; i < length; i++) {
          let productPrecedingNumbers: number = 1;
          if (i > 0) {
            for (let j = i - 1; j > -1; j--) {
              productPrecedingNumbers *= numbers[j];
            }
          }
          let productFollowingNumbers: number = 1;
          if (i < length - 1) {
            for (let k = i + 1; k < length; k++) {
              productFollowingNumbers *= numbers[k];
            }
          }
          result.push(productPrecedingNumbers * productFollowingNumbers);
        }
    }
    return result;
  }
}
