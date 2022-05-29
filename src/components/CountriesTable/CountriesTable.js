import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/link";
import Image from "next/image";

// func to order population depending on direction
const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

// func to change direction of KeyboardArrow__rounded
const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  // states below allow us to control values and direction
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  // we set the direction and order countries
  const orderedCountries = orderBy(countries, value, direction);

  // func that feeds into onClick event for btn changing direction
  const switchDirection = () => {
    if (!direction) {
      // default is 'desc
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  // func onClick event to change value with switchDirection
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
    console.log("value :::", value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          {/* <SortArrow direction={direction} /> */}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>
      </div>

      {/* feed in the orderedCountries version of countries */}
      {orderedCountries?.map((country) => (
        <Link key={country.alpha3Code} href={`/country/${country.alpha3Code}`}>
          <div className={styles.row}>
            {/* API requires country.name.common */}
            <div className={styles.name}>{country.name}</div>

            <div className={styles.population}>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
