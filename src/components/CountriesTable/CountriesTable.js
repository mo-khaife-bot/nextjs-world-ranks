import React from "react";
import styles from "./CountriesTable.module.css";

const CountriesTable = ({ countries }) => {
  //   const tableCountries = countries.map((country, idx) => {
  //     return (
  //       <div key={idx} className={styles.row}>
  //         <div className={styles.name}>{country.name}</div>

  //         <div className={styles.population}>{country.population}</div>
  //       </div>
  //     );
  //   });

  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>Name</div>
        </button>

        <button className={styles.heading_population}>
          <div>Population</div>
        </button>
      </div>

      {countries.map((country, idx) => (
        <div key={idx} className={styles.row}>
          <div className={styles.name}>{country.name.common}</div>

          <div className={styles.population}>{country.population}</div>
        </div>
      ))}

      {/* <React.Fragment>{tableCountries}</React.Fragment> */}
    </div>
  );
};

export default CountriesTable;
