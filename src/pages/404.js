import Link from "next/link";
import scarecrowPic from "../../public/img/Scarecrow.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="left-not-found">
        <Image
          style={{ margin: "0 auto", border: "1px solid black" }}
          src={scarecrowPic}
          alt="Scarecrow"
        />
      </div>
      <div className="right-not-found">
        <h1 className="title-not-found">Oooops... </h1>
        <h2 className="lesser-title-not-found">That page cannot be found</h2>
        <p className="paragraph-not-found">
          <Link href="/">
            <a>Go back to the Homepage</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
