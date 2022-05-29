import Layout from "../../components/Layout/Layout";

import styles from "./country.module.css";
// import { dict_country_alpha3 } from "./Constant";
import { useState, useEffect } from "react";
// import Image from "next/image";

// async func to ake in country info from id to show flags for neighbouring countries/borders
const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);

  const country = res.json();
  return country;
};

const Country = ({ country }) => {
  console.log("COUNTRY :::", country);
  const [borders, setBorders] = useState([]);

  // FIXME need to figure out how to use Promises.allSettled for situation where there is no border for that country
  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders?.map((border) => getCountry(border))
    );

    setBorders(borders);
  };

  // use useEffect so we get boarders as soon as page loads
  useEffect(() => {
    getBorders();
  }, [borders]);

  console.log("BORDERS :::", borders);

  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overviewPanel}>
          <img alt={country.name} src={country.flags.png} />

          <h1 className={styles.overview_name}>{country.name}</h1>
          <div className={styles.overview_region}>{country.region}</div>

          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>{country.population}</div>
              <div className={styles.overview_label}>Population</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{country.area}</div>
              <div className={styles.overview_label}>Area</div>
            </div>
          </div>
        </div>

        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>Details</h4>

          {/* Capital */}
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>{country.capital}</div>
          </div>

          {/* Languages */}
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Languages</div>
            <div className={styles.details_panel_value}>
              {/* destructuring the map element so only get name allowes us to keep array of obj in 1 line */}
              {country.languages.map(({ name }) => name).join(", ")}
            </div>
          </div>

          {/* Regional Block Orgs */}
          {country.regionalBlocs ? (
            <>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Regional Block</div>
                <div className={styles.details_panel_value}>
                  {/* destructuring the map element so only get name allowes us to keep array of obj in 1 line */}
                  {country.regionalBlocs.map(({ name }) => name).join(", ")}
                </div>
              </div>
            </>
          ) : null}

          {/* Currencies */}
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Currencies</div>
            <div className={styles.details_panel_value}>
              {country.currencies
                .map(({ name, symbol }) => `${name} ${symbol}`)
                .join(", ")}
            </div>
          </div>

          {/* Native Name */}
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Native Name</div>
            <div className={styles.details_panel_value}>
              {country.nativeName}
            </div>
          </div>

          {/* Gini */}
          {country.gini && (
            <>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  Gini - measure of wealth inequality
                </div>
                <div className={styles.details_panel_value}>{country.gini}</div>
              </div>
            </>
          )}

          {/* using async func to pull flags for borders */}
          <div className={styles.details_panel_borders}>
            <div className={styles.details_panel_borders_label}>
              Neighbouring Countries
            </div>
            <div className={styles.details_panel_borders_container}>
              {borders?.map((place) => (
                <div
                  key={place.name}
                  className={styles.details_panel_borders_country}
                >
                  <img src={place.flag} alt={place.name} />
                  <div className={styles.details_panel_borders_name}>
                    {place.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Borders / Neighbouring Countries */}
          {/* <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>
              Neighbouring Countries
            </div>

            {country.borders ? (
              <>
                <div className={styles.details_panel_value}>
                  {country.borders
                    //   no destructuring here as name of elm being map has to be in key of obj to be destructured.
                    .map((place) => dict_country_alpha3[place])
                    .join(",  ")}
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className={styles.details_panel_value}>No Neighbours</div>
              </>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  // const res = await fetch(`https://restcountries.com/v2/alpha/${params.id}`);

  // const country = await res.json();

  return {
    props: {
      country,
    },
  };
};
