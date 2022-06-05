import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";

import styles from "./country.module.css";
import { useState, useEffect } from "react";

// import dynamic CountryMap component to tell the map component to only render after the Next.js SSR has happened
// needed to make the Leaflet map render correctly
const CountryMap = dynamic(
  () => import("../../components/mapView/CountryMap"),
  { ssr: false }
);

// async func to take in country info from id to show flags for neighboring countries/borders
const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);

  const country = res.json();

  return country;
};

const Country = ({ country }) => {
  console.log(country);
  console.log(country.latlng);
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    // edge casing for countries with no neighbors / borders will be undefined
    if (country.borders != undefined) {
      const borders = await Promise.all(
        country.borders?.map((border) => getCountry(border))
      ).catch((error) => console.error(error));

      setBorders(borders);
      // if no neighbors and undefined make it null so doesn't effect next.js
    } else {
      setBorders((country.borders = null));
    }
  };

  // use useEffect so we get boarders as soon as page loads
  useEffect(() => {
    getBorders();
  }, []);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        {/* Container Left */}
        <div className={styles.container_left}>
          <div className={styles.overviewPanel}>
            <img alt={country.name} src={country.flags.png} />

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>
            <div className={styles.overview_subregion}>{country.subregion}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {/* adds commas to population */}
                  {numberWithCommas(country.population)}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>
                  {/* adds commas to Area & KM with superscript */}
                  {numberWithCommas(country.area)} km{" "}
                  <sup style={{ fontSize: "0.5rem" }}>2</sup>
                </div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>

        {/* container Right */}
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            {/* Capital */}
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {/* edge casing for places with no capital like ANTARCTICA */}
                {country.capital ? country.capital : "Doesn't have a capital"}
              </div>
            </div>

            {/* Languages */}
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {/* destructuring the map element so only get name allows us to keep array of obj in 1 line */}
                {country.languages
                  ? country.languages?.map(({ name }) => name).join(", ")
                  : "No Data about Languages"}
              </div>
            </div>

            {/* Regional Block Orgs + edge casing for places with no regional blocks */}
            {country.regionalBlocs ? (
              <>
                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>
                    Regional Block
                  </div>
                  <div className={styles.details_panel_value}>
                    {/* destructuring the map element so only get name allows us to keep array of obj in 1 line */}
                    {country.regionalBlocs.map(({ name }) => name).join(", ")}
                  </div>
                </div>
              </>
            ) : null}

            {/* Currencies */}
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {/* edge casing for places with no capital like ANTARCTICA */}
                {country.currencies
                  ? country.currencies
                      ?.map(({ name, symbol }) => `${name} ${symbol}`)
                      .join(", ")
                  : "Doesn't have a currency"}
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
                  <div className={styles.details_panel_value}>
                    {country.gini
                      ? `${country.gini} %`
                      : "No information about Gini Measure"}
                  </div>
                </div>
              </>
            )}

            {/* using async func to pull flags for borders */}
            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighboring Countries
              </div>
              <div className={styles.details_panel_borders_container}>
                {/* ternary operator to handle if no borders */}
                {borders != null ? (
                  <>
                    {borders?.map((place) => (
                      <Link
                        key={place.name}
                        href={`/country/${place.alpha3Code}`}
                      >
                        <div className={styles.details_panel_borders_country}>
                          <img src={place.flag} alt={place.name} />
                          <div className={styles.details_panel_borders_name}>
                            {place.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  "Doesn't Border Any Country"
                )}
              </div>
            </div>
          </div>
          {/* leaflet map */}

          <CountryMap latLong={country.latlng} countryName={country.name} />
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
