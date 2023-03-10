import React, { useEffect, useState } from "react";
import "./Journeys.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";

const AddJourney = (props) => {
  const [name, setName] = useState("");
  const [dateInit, setDateInit] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState("")

  const { fileRejections, getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted: setFiles,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: (filesUpload) => {
      const formData = new FormData();
      const token = process.env.CMS_TOKEN;

      const file = filesUpload[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        const url = 'data:image/png;base64,'+base64
        setFileUrl(url)
      };

      reader.readAsDataURL(file);
    },
  });

  const createJourney = async () => {
    console.log("Name", name);
    console.log("Init", dateInit);
    console.log("End", dateEnd);
    console.log("Description", description);

    if (fileUrl != "" && name != "" && dateInit != "" && dateEnd != "" && description != "") {
      const newJourneys = JSON.parse(JSON.stringify(props.journeys));

      const journey = {
        name: name,
        description: description,
        initialDate: dateInit,
        endDate: dateEnd,
        picture: fileUrl,
        stages: [],
      };

      newJourneys.push(journey);

      await fetch("http://localhost:3001/journeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journey),
      });

      props.setCreateJourney(0);
      props.setJourneys(newJourneys);
    }
  };

  return (
    <div class="card-create-journey">
      <div class="card-header">
        <h3>Create Journey</h3>
      </div>
      <div class="card-body">
        <form>
          
          <div class="form-group">
          {files.length == 0 ?
            <IconButton onClick={open}>
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 40 }} />
            </IconButton>
            :
            <img src={fileUrl} />
          }
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="form-group">
            <input
              type="date"
              class="form-control"
              id="initial_date"
              value={dateInit}
              onChange={(e) => setDateInit(e.target.value)}
            />
          </div>
          <div class="form-group">
            <input
              type="date"
              class="form-control"
              id="end_date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </div>
          <div class="form-group">
            <textarea
              class="form-control"
              id="description"
              rows="3"
              value={description}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button onClick={createJourney}>Create Journey</button>
      </div>
    </div>
  );
};

const Journey = (props) => {
  const [showStages, setShowStages] = useState(false);

  return (
    <div className="journey">
      <h1>{props.journey.name}</h1>
      <img src={props.journey.picture} />
      <h4>{props.journey.initialDate}</h4>
      <h4>{props.journey.endDate}</h4>
      <span>{props.journey.description}</span>
      <Link to={`/journey/${props.journey.id}`}>
        <button>Open</button>
      </Link>
    </div>
  );
};

function Journeys() {
  const [createJourney, setCreateJourney] = useState(0);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/journeys");
      const resJson = await res.json();
      setJourneys(resJson);
    })();
  }, []);

  return (
    <>
      {createJourney == 0 ? (
        <>
          Journeys
          <button onClick={() => setCreateJourney(1)}>Add Journeys</button>
          <br></br>
          <br></br>
          <div className="journeys">
            <Swiper spaceBetween={50} slidesPerView={journeys.length == 1 ? 1: journeys.length == 2 ? 2: 3 }>
              {journeys.map((journey) => (
                <SwiperSlide>
                  <Journey journey={journey} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <AddJourney
          setJourneys={setJourneys}
          journeys={journeys}
          setCreateJourney={setCreateJourney}
        />
      )}
    </>
  );
}

export default Journeys;
