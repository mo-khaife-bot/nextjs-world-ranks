import SearchRounded from "@mui/icons-material/SearchRounded";
import Input from "@mui/material/Input";

import styles from "./SearchInput.module.css";

const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <Input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchInput;
