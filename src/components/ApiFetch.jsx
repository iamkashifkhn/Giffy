import React, { useEffect, useState } from "react";
import "./gifs.css";
import Button from "../../node_modules/@material-ui/core/Button/Button";

function ApiFetch() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [expand, setExpend] = useState(false);
  const [show, setShow] = useState(false);
  const [fData, setFData] = useState(null);
  useEffect(() => {
    setFData(JSON.parse(localStorage.getItem("data")));
    // const a = JSON.parse(localStorage.getItem("data"));
    // console.log(JSON.parse(localStorage.getItem("data")));
  }, [show, favArr]);
  var favArr = JSON.parse(localStorage.getItem("data"));

  const onClickHandle = () => {
    setReverse(!reverse);
  };

  const expendIt = () => {
    setExpend(!expand);
  };

  const addFavGif = (val) => {
    favArr.unshift(val);
    localStorage.setItem("data", JSON.stringify(favArr));
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
            <Button variant="contained" onClick={() => setShow(false)}>
              &#8701; Home
            </Button>
          </div>

          <div className="favorite">
            <Button variant="contained" onClick={() => setShow(true)}>
              &#9733; Favorites
            </Button>
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
      {show ? (
        <div className="gifs">
          {fData &&
            fData.map((data, index) => {
              return (
                <div key={index} className="gif">
                  {loading ? (
                    <h1> Loading .... </h1>
                  ) : (
                    <img
                      src={data?.images?.fixed_height?.url}
                      onClick={expendIt}
                    />
                  )}
                  {expand ? (
                    <div className="showDetails">
                      <p style={{ color: "white" }}>
                        <span className="names">Name:</span>
                        {data?.username}
                      </p>
                      <p style={{ color: "white" }}>
                        <span className="names">Rating:</span>
                        {data?.rating}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      ) : (
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
                      <div className="details">
                        <p>
                          <span className="names">Name:</span>
                          {val?.username}
                        </p>
                        <p>
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
                          <span style={{ fontSize: "24px" }}> &hearts;</span>
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default ApiFetch;
