import React, { useEffect, useState } from "react";
import "./gifs.css";
import Button from "../../node_modules/@material-ui/core/Button/Button";

function ApiFetch() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [expand, setExpend] = useState(false);

  const onClickHandle = () => {
    setReverse(!reverse);
  };

  const expendIt = () => {
    setExpend(!expand);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setLoading(true);

      try {
        const result = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=xQ1dCumvjQcPPojDWO2OLO99a3HoG2bw`
        );
        const actualData = await result.json();
        setData(actualData.data);
        console.log(actualData.data[0].username);
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
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: "30%",
            borderBottom: "1px solid rgb(134, 31, 31)",
          }}
        >
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
                <img src={val.images.fixed_height.url} onClick={expendIt} />
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
