
// 1. This is a typewriter component that was a part of some challenge and I was able to 
// implement lean and effective solution how to print each letter with short delay.

import { useCallback, useEffect, useMemo, useState } from "react";
import { decodeStringFromData } from "./ctfHelper";
import { rawData } from "./data";

export default function App() {

const [typeWriterStr, setTypeWriterStr] = useState("");
const decodedString = useMemo(() => decodeStringFromData(rawData), []);
const waitForMe = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const typeWriter = useCallback(async (str) => {
    for (const letter of str) {
      await waitForMe(500);
      setTypeWriterStr((txt) => txt + letter);
    }
  }, []);

  useEffect(() => typeWriter(decodedString), [typeWriter, decodedString]);

  return (
    <div className="App">
      <ul>
        {typeWriterStr.split("").map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </div>
  );
}

// 2. Second piece of code one composed of two utility functions that let us implement 
// inter dependent filter fields. 
// Imagine we have a component with several filter fields (for ex.: 'Type', 'Size', 'Color'). Values in each of them are restricted 
// to a list of several available options that are dynamically . 
// 'Type': 'baseball', 'football', 'basketball. 'Size': 'small', 'medium', 'large'. 'Color': 'red', 'blue', 'yellow
// These functions let us choose a value in any of the filter fileds and list of options avaiable 
// to other filter fields will be recalculated accordinly.
//  For ex. we can choose Color 'blue', and we will ve left with 'Type': 'baseball', 'basketball. 'Size': 'small', 'large'.

import { ITest } from '../store/interfaces'

const testAllConditions = (el: any, conditions: {}) => {
  return Object.entries(conditions).reduce((acc, cond) => {
    return acc && (cond[1] !== '' ? el[cond[0]].name === cond[1] : true)
  }, true)
}
export const setItemsList = (
  conditions: {},
  inputValue: string,
  testsArray: ITest[]
) => {
  return testsArray.reduce((acc, el: ITest) => {
    //send el and conditions to testAllConditions function
    if (testAllConditions(el, conditions)) {
      acc = [...acc, { id: el[inputValue]._id, value: el[inputValue].name }]
    }
    //returns unique values
    return acc.filter(
      (a: any, i: any, self: any) =>
        self.findIndex((s: any) => a.value === s.value) === i
    )
  }, [] as any)
}