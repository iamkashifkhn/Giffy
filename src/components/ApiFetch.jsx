import React, { useEffect, useState } from "react";
import "./gifs.css";
import Button from "../../node_modules/@material-ui/core/Button/Button";
// import Loader from "../components/Loader/loader";

function ApiFetch() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [expand, setExpend] = useState(false);
  var favArr = [];

  const onClickHandle = () => {
    setReverse(!reverse);
  };

  const expendIt = () => {
    setExpend(!expand);
  };

  const addFavGif = (val) => {
    favArr.unshift(val);
    console.log(favArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=xQ1dCumvjQcPPojDWO2OLO99a3HoG2bw`
        );
        const actualData = await result.json();
        setData(actualData.data);
      } catch (error) {
        console.log("error", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setData(data.reverse());
  }, [reverse]);

  return (
    <>
      <div className="searchbar">
        <div className="inputs">
          &#128270;
          <input
            type="search"
            placeholder="Search by Name or Title"
            className="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="myButton">
          <div className="favorite">
            <Button variant="contained">&#9733; Favorites </Button>
          </div>
          <div className="myOrder">
            {reverse ? (
              <Button variant="contained" onClick={onClickHandle}>
                &uarr; Ascending
              </Button>
            ) : (
              <Button variant="contained" onClick={onClickHandle}>
                &darr; Descending
              </Button>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="gifs">
        {data
          .filter((current) => {
            if (
              current.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return current;
            } else {
              return console.log(current);
            }
          })
          .map((val, idx) => {
            return (
              <div key={idx} className="gif">
                {loading ? (
                  <h1> Loading .... </h1>
                ) : (
                  <img src={val.images.fixed_height.url} onClick={expendIt} />
                )}
                {expand ? (
                  <div className="showDetails">
                    <p style={{ color: "white" }}>
                      <span className="names">Name:</span>
                      {val?.username}
                    </p>
                    <p style={{ color: "white" }}>
                      <span className="names">Rating:</span>
                      {val?.rating}
                    </p>
                    <Button
                      variant="contained"
                      onClick={() => {
                        addFavGif(val);
                      }}
                      className="favButton"
                    >
                      Fav
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ApiFetch;
